using System.Text.Json;
using api.Interfaces;
using api.Models;
using Azure.Messaging.ServiceBus.Administration;
using Dapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Npgsql;

namespace api.Service
{
    internal class OrderStatusBackgroundService(NpgsqlDataSource dataSource, ILogger<OrderStatusBackgroundService> logger) : BackgroundService
    {
        private readonly NpgsqlDataSource _dataSource = dataSource;

        protected override async Task ExecuteAsync(CancellationToken cancellationToken = default)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                logger.LogInformation("\n TEST \n");

                await using var connection = await _dataSource.OpenConnectionAsync(cancellationToken);
                await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

                // await connection.ExecuteAsync(
                //     """
                //     UPDATE "Orders"
                //     SET "Status" = 'Finalizado'
                //     WHERE "Status" = 'Processando'
                //     AND NOW() >= "UpdatedAt" + INTERVAL '5 seconds'
                //     """
                // );

                await connection.ExecuteAsync(
                    """
                        UPDATE "Orders"
                        SET "Status" = @Status_1
                        WHERE "Status" = @Status_2
                        AND NOW() >= "UpdatedAt" + INTERVAL '5 seconds'
                        """,
                    new { Status_1 = "Finalizado", Status_2 = "Processando" },
                    transaction: transaction
                );

                await transaction.CommitAsync(cancellationToken);

                await Task.Delay(1000, cancellationToken);
            }
        }
    }

}
