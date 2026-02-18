using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Orders")]
    public class Order
    {
        public Guid Id { get; set; }
        public string Cliente { get; set; } = string.Empty;
        public string Produto { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class OrderCreatedEvent
    {
        public Guid EventId { get; set; } = Guid.NewGuid();
        public Guid OrderId { get; set; }
        public decimal TotalAmount { get; set; }
        public string EventType { get; set; } = "OrderCreated";
    }
}