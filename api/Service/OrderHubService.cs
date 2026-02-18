using Microsoft.AspNetCore.SignalR;

namespace api.Service
{
    public sealed class OrderHubService : Hub
    {
        public async Task SendOrderStatusUpdate(Models.Order order)
        {
            await Clients.All.SendAsync("OrderStatusUpdated", order);
        }
    }
}