using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> CreateAsync(Order orderModel);
        Task<List<Order>> GetAllAsync(QueryObject query);
        Task<Order?> GetByIdAsync(Guid id);
        // Task<Pedido?> GetBySymbolAsync(string symbol);
        // Task<Pedido?> DeleteAsync(int id);
    }
}