using System.Data;
using System.Text.Json;
using api.Models;
using Dapper;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    static class OutboxMessageRepository
    {
        internal static async Task InsertOutboxMessage<T>(this IDbConnection connection, T message, IDbTransaction? transaction = default) where T : notnull
        {
            var outboxMessage = new OutboxMessage
            {
                Type = message.GetType().FullName!,
                Content = JsonSerializer.Serialize(message),
                OccurredOnUtc = DateTime.UtcNow
            };

            const string sql = """
                INSERT INTO "OutboxMessages"
                ("Type", "Content", "OccurredOnUtc")
                VALUES (@Type, @Content::jsonb, @OccurredOnUtc);
            """;

            await connection.ExecuteAsync(sql, outboxMessage, transaction: transaction);
        }
    }
}