using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> CreateAsync(Order orderModel);
        Task<List<Order>> GetAllAsync(QueryObject query);
        Task<Order?> GetByIdAsync(Guid id);

    }
}