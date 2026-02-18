using api.Data;
using api.Interfaces;
using api.Repository;
using api.Service;
using Microsoft.EntityFrameworkCore;
using Azure.Messaging.ServiceBus;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

builder.Services.AddHostedService<OrderNotificationService>();
builder.Services.AddHostedService<OrderStatusBackgroundService>();
builder.Services.AddHostedService<OutboxBackgroundService>();

builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddSingleton(_ =>
{
    return new NpgsqlDataSourceBuilder(builder.Configuration.GetConnectionString("DefaultConnection")!).Build();
});

builder.Services.AddSingleton(_ =>
{
    return new ServiceBusClient(builder.Configuration.GetConnectionString("AzureServiceBusConnection")!);
});


builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IServiceBusPublisher, ServiceBusPublisher>();

builder.Services.AddScoped<OutboxProcessorService>();


builder.Services.AddLogging(builder => builder.SetMinimumLevel(LogLevel.Debug).AddConsole());

builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!)
    .AddAzureServiceBusTopic(builder.Configuration.GetConnectionString("AzureServiceBusConnection")!, "order-events");

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    .SetIsOriginAllowed(origin => true));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<OrderHubService>("/orderHub");
app.MapHealthChecks("/health");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
    db.Database.Migrate();
}

app.Run();

