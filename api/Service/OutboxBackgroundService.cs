
namespace api.Service
{
    internal class OutboxBackgroundService(
        IServiceScopeFactory serviceScopeFactory,
        ILogger<OutboxBackgroundService> logger
    ) : BackgroundService
    {
        private const int OutboxProcessorFrequency = 7;

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                logger.LogInformation("\n Starting OutboxBackgroundService... \n");//remover

                while (!stoppingToken.IsCancellationRequested)
                {
                    using var scope = serviceScopeFactory.CreateScope();
                    var outboxProcessor = scope.ServiceProvider.GetRequiredService<OutboxProcessorService>();

                    await outboxProcessor.Execute(stoppingToken);

                    // Simulate running Outbox processing every N seconds
                    await Task.Delay(TimeSpan.FromSeconds(OutboxProcessorFrequency), stoppingToken);
                }
            }
            catch (OperationCanceledException)
            {
                logger.LogInformation("OutboxBackgroundService cancelled.");//remover
            }
            // catch (Exception ex)
            // {
            //     logger.LogError(ex, "An error occurred in OutboxBackgroundService");//remover
            // }
            finally
            {
                logger.LogInformation("OutboxBackgroundService finished.");//remover
            }
        }
    }
}