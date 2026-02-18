using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Order
{
    public class CreateOutboxMessageRequestDto
    {
        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public string Cliente { get; set; } = string.Empty;

        [Required]
        public string Produto { get; set; } = string.Empty;

        [Required]
        [Range(1, 1000000000)]
        public decimal Valor { get; set; }

        [Required]
        public string Status { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}