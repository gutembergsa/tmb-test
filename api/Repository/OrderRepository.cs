using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDBContext _context;
        public OrderRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Order> CreateAsync(Order orderModel)
        {
            await _context.Orders.AddAsync(orderModel);
            await _context.SaveChangesAsync();
            return orderModel;
        }

        public async Task<List<Order>> GetAllAsync(QueryObject query)
        {
            var pedidos = _context.Orders.AsQueryable();

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await pedidos.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Order?> GetByIdAsync(Guid id)
        {
            return await _context.Orders.FirstOrDefaultAsync(i => i.Id == id);
        }

    }
}