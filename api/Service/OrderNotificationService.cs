using System.Text.Json;
using api.Models;
using Azure.Messaging.ServiceBus;
namespace api.Service
{
    class OrderNotificationService(ServiceBusClient serviceBusClient, ILogger<OrderNotificationService> logger) : BackgroundService
    {

        private const string TopicName = "order-events";
        private const string SubscriptionName = "notifications";
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var topicTask = ConsumeFromTopicAsync(stoppingToken);
            await Task.WhenAny(topicTask);
        }

        private async Task ConsumeFromTopicAsync(CancellationToken ct)
        {
            await using var processor = serviceBusClient.CreateProcessor(TopicName, SubscriptionName, new ServiceBusProcessorOptions
            {
                AutoCompleteMessages = false,
                MaxConcurrentCalls = 1
            });

            processor.ProcessMessageAsync += args => ProcessMessageAsync(args, "topic");
            processor.ProcessErrorAsync += ProcessErrorAsync;

            await processor.StartProcessingAsync(ct);

            try
            {
                await Task.Delay(Timeout.Infinite, ct);
            }
            catch (System.Exception)
            {

                throw;
            }

            await processor.StopProcessingAsync(ct);
        }

        private async Task ProcessMessageAsync(ProcessMessageEventArgs args, string source)
        {
            try
            {
                var messageBody = args.Message.Body.ToString();
                var orderEvent = JsonSerializer.Deserialize<OrderCreatedEvent>(messageBody);

                if (orderEvent != null)
                {
                    string json = JsonSerializer.Serialize(orderEvent);
                    logger.LogInformation("\n {Source} Mensagem recebida - CorrelationId: {OrderId} \n", source, json);
                    await Task.Delay(100, args.CancellationToken);
                }

                await args.CompleteMessageAsync(args.Message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Erro: {Source}", source);
                await args.AbandonMessageAsync(args.Message);
            }
        }

        private Task ProcessErrorAsync(ProcessErrorEventArgs args)
        {
            logger.LogError(args.Exception, "Service Bus Erro: {ErrorSource}", args.ErrorSource);
            return Task.CompletedTask;
        }

    }
}

