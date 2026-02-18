using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("MessageConsumers")]
    public class MessageConsumer
    {
        public Guid MessageId { get; set; }
        public Guid Consumer { get; set; }
        public DateTime ProcessedAtUtc { get; set; } = DateTime.UtcNow;
    }
}