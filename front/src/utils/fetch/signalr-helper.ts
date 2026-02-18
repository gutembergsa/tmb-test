import * as signalR from '@microsoft/signalr'
import { useOrderStore } from '../zustand'
import type { Order } from '../config'

export function setupSignalRConnection() {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5167/orderHub')
        .withAutomaticReconnect()
        .build()

    connection.on('OrderStatusUpdated', (order: Order) => {
        console.log('OrderStatusUpdated', { order })
        useOrderStore.getState().updateOrder(order)
    })

    connection
        .start()
        .then(() => console.log('Connected to SignalR hub'))
        .catch((err) => console.error('SignalR connection error: ', err))
}
