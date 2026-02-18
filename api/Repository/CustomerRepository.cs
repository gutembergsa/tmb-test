using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDBContext _context;
        public CustomerRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Customer>> GetAllAsync(QueryObject query)
        {
            var pedidos = _context.Customers.AsQueryable();

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await pedidos.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Customer?> GetByIdAsync(int id)
        {
            return await _context.Customers.FirstOrDefaultAsync(i => i.Id == id);
        }

    }
}