using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> GetAllAsync(QueryObject query);
        Task<Customer?> GetByIdAsync(int id);
        // Task<Pedido?> GetBySymbolAsync(string symbol);
        // Task<Pedido> CreateAsync(Pedido pedidoModel);
        // Task<Pedido?> DeleteAsync(int id);
    }
}