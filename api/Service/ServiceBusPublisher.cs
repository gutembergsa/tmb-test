using System.Text.Json;
using api.Interfaces;
using api.Models;
using Azure.Messaging.ServiceBus;

namespace api.Service
{
    public class ServiceBusPublisher(ServiceBusClient serviceBusClient) : IServiceBusPublisher
    {

        private const string TopicName = "order-events";

        public async Task PublishOrderCreatedEventAsync(OrderCreatedEvent orderEvent)
        {
            var messageBody = JsonSerializer.Serialize(orderEvent);
            var message = new ServiceBusMessage(messageBody)
            {
                MessageId = orderEvent.EventId.ToString(),
                Subject = orderEvent.EventType,
                ApplicationProperties =
                {
                    { "CorrelationId", orderEvent.OrderId },
                    { "EventType", orderEvent.EventType },
                    { "TotalAmount", orderEvent.TotalAmount }
                }
            };


            await using var topicSender = serviceBusClient.CreateSender(TopicName);
            await topicSender.SendMessageAsync(message);
        }

        public async Task PublishAsync(object message, Guid id)
        {
            var messageBody = JsonSerializer.Serialize(message);
            var messageData = new ServiceBusMessage(messageBody)
            {
                MessageId = id.ToString()
            };

            await using var topicSender = serviceBusClient.CreateSender(TopicName);
            await topicSender.SendMessageAsync(messageData);
        }
    }
}