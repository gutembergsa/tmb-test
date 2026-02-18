using System.Text.Json;
using api.Interfaces;
using api.Models;
using Azure.Messaging.ServiceBus.Administration;
using Dapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.SignalR;
using Npgsql;

namespace api.Service
{
    internal class OrderStatusBackgroundService(NpgsqlDataSource dataSource, IHubContext<OrderHubService> orderHub) : BackgroundService
    {
        private readonly NpgsqlDataSource _dataSource = dataSource;

        protected override async Task ExecuteAsync(CancellationToken cancellationToken = default)
        {
            while (!cancellationToken.IsCancellationRequested)
            {

                List<Order> orders = [];

                await using var connection = await _dataSource.OpenConnectionAsync(cancellationToken);
                await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

                orders = [.. (await connection.QueryAsync<Order>(
                    """
                    UPDATE "Orders"
                    SET "Status" = @Status_1
                    WHERE "Status" = @Status_2
                    AND NOW() >= "UpdatedAt" + INTERVAL '5 seconds'
                    RETURNING *;
                    """,
                    new { Status_1 = "Finalizado", Status_2 = "Processando" },
                    transaction: transaction
                ))];

                await transaction.CommitAsync(cancellationToken);

                foreach (Order order in orders)
                {
                    await orderHub.Clients.All.SendAsync("OrderStatusUpdated", order, cancellationToken: cancellationToken);
                }

                await Task.Delay(1000, cancellationToken);
            }
        }
    }

}
