using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("OutboxMessages")]
    public class OutboxMessage
    {
        public Guid Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime OccurredOnUtc { get; set; } = DateTime.UtcNow;
        public DateTime ProcessedOnUtc { get; set; } = DateTime.UtcNow;
        public string? Error { get; set; } = string.Empty;
    }
}