using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Order;
using api.Models;

namespace api.Mappers
{
    public static class OrderMappers
    {
        public static OrderDto ToOrderDto(this Order orderModel)
        {
            return new OrderDto
            {
                Id = orderModel.Id,
                Cliente = orderModel.Cliente,
                Produto = orderModel.Produto,
                Valor = orderModel.Valor,
                Status = orderModel.Status,
                CreatedAt = orderModel.CreatedAt,
            };
        }

        public static Order ToOrderFromCreateDTO(this CreateOrderRequestDto orderDto)
        {
            return new Order
            {
                Cliente = orderDto.Cliente,
                Produto = orderDto.Produto,
                Valor = orderDto.Valor,
                Status = orderDto.Status,
                CreatedAt = orderDto.CreatedAt
            };
        }
    }
}