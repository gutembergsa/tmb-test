
using System.Text.Json;
using api.Interfaces;
using api.Models;
using Azure.Messaging.ServiceBus.Administration;
using Dapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Npgsql;

namespace api.Service
{
    internal sealed class OutboxProcessorService(NpgsqlDataSource dataSource, IServiceBusPublisher serviceBusPublisher, ILogger<OrderNotificationService> logger)
    {
        private const int BatchSize = 10;

        public async Task<int> Execute(CancellationToken cancellationToken = default)
        {
            await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
            await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

            var outboxMessages = (await connection.QueryAsync<OutboxMessage>(
                """
                SELECT *
                FROM "OutboxMessages"
                WHERE "ProcessedOnUtc" IS NULL
                ORDER BY "OccurredOnUtc" 
                LIMIT @BatchSize
                """,
                new { BatchSize },
                transaction: transaction)).AsList();

            foreach (var outboxMessage in outboxMessages)
            {
                try
                {
                    var messageType = Helpers.AssemblyReference.Assembly.GetType(outboxMessage.Type)!;

                    if (JsonSerializer.Deserialize(outboxMessage.Content, messageType) is not Order deserializeMessage) throw new Exception("Order not found");

                    logger.LogInformation("\n Publicando {content}... \n", outboxMessage.Content); //remover

                    var orderCreatedEvent = new OrderCreatedEvent
                    {
                        OrderId = deserializeMessage.Id,
                        TotalAmount = deserializeMessage.Valor,
                        EventType = deserializeMessage.GetType().FullName!,
                    };

                    await serviceBusPublisher.PublishAsync(orderCreatedEvent, orderCreatedEvent.OrderId);

                    await connection.ExecuteAsync(
                        """
                        UPDATE "OutboxMessages"
                        SET "ProcessedOnUtc" = @ProcessedOnUtc
                        WHERE "Id" = @Id
                        """,
                        new { ProcessedOnUtc = DateTime.UtcNow, outboxMessage.Id },
                        transaction: transaction
                    );

                    await connection.ExecuteAsync(
                        """
                            INSERT INTO "MessageConsumers" 
                            ("MessageId", "Consumer", "ProcessedAtUtc")
                            VALUES (@MessageId, @Consumer, @ProcessedAtUtc);
                        """,
                        new { MessageId = orderCreatedEvent.OrderId, Consumer = "", ProcessedAtUtc = DateTime.UtcNow },
                        transaction: transaction
                    );

                    await connection.ExecuteAsync(
                        """
                        UPDATE "Orders"
                        SET "Status" = @Status, "UpdatedAt" = @UpdatedAt
                        WHERE "Id" = @Id
                        """,
                        new { Status = "Processando", UpdatedAt = DateTime.UtcNow, deserializeMessage.Id },
                        transaction: transaction
                    );

                }
                catch (Exception ex)
                {

                    logger.LogError(ex, "Error in OutboxProcessorService. Message: {Message} | StackTrace: {StackTrace}", ex.Message, ex.StackTrace);

                    await connection.ExecuteAsync(
                        """
                        UPDATE "OutboxMessages"
                        SET "ProcessedOnUtc" = @ProcessedOnUtc, "Error" = @Error
                        WHERE "Id" = @Id
                        """,
                        new { ProcessedOnUtc = DateTime.UtcNow, ex.Message },
                        transaction: transaction
                    );
                }
            }

            await transaction.CommitAsync(cancellationToken);

            return outboxMessages.Count;
        }
    }
}