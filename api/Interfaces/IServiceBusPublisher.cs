using api.Models;

namespace api.Interfaces
{
    public interface IServiceBusPublisher
    {
        Task PublishOrderCreatedEventAsync(OrderCreatedEvent orderEvent);
        Task PublishAsync(object message, Guid id);
    }
}