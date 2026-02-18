using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Order;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Repository;
using api.Service;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Azure.Amqp.Framing;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace api.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController(ApplicationDBContext context, IOrderRepository orderRepo, IServiceBusPublisher serviceBusPublisher, NpgsqlDataSource dataSource) : ControllerBase
    {
        private readonly ApplicationDBContext _context = context;
        private readonly IOrderRepository _orderRepo = orderRepo;
        public readonly IServiceBusPublisher _serviceBusPublisher = serviceBusPublisher;
        private readonly NpgsqlDataSource _dataSource = dataSource;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderRequestDto orderDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var orderModel = orderDto.ToOrderFromCreateDTO();

            const string sql = """
                INSERT INTO "Orders" ("Cliente", "Produto", "Valor", "Status")
                VALUES (@Cliente, @Produto, @Valor, @Status)
                RETURNING "Id";
            """;
            await using var connection = await _dataSource.OpenConnectionAsync();
            await using var transaction = await connection.BeginTransactionAsync();

            orderModel.Id = await connection.ExecuteScalarAsync<Guid>(
                sql,
                orderModel,
                transaction
            );

            if (await _context.MessageConsumers.AnyAsync(msg => msg.MessageId == orderModel.Id))
            {
                return Conflict(new
                {
                    message = "Order already exists.",
                    code = "DUPLICATE_ORDER"
                });
            }

            await connection.InsertOutboxMessage(orderModel, transaction);

            await transaction.CommitAsync();

            return CreatedAtAction(
                nameof(GetById),
                new { id = orderModel.Id },
                orderModel.ToOrderDto()
            );
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var orders = await _orderRepo.GetAllAsync(query);

            var orderDto = orders.Select(s => s.ToOrderDto()).OrderByDescending(o => o.CreatedAt).ToList();

            return Ok(orderDto);
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var order = await _orderRepo.GetByIdAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order.ToOrderDto());
        }
    }
}