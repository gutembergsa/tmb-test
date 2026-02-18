import type { Order } from '../config'

export const fetchAllOrders = async (): Promise<Order[]> => {
    return await fetch('http://localhost:5167/api/order')
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const fetchOrdersById = async (id: string): Promise<Order> => {
    return await fetch(`http://localhost:5167/api/order/${id}`)
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const fetchCreateOrder = async (
    order: Omit<Order, 'id' | 'createdAt'>
): Promise<Order> => {
    return await fetch('http://localhost:5167/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Cliente: order.cliente,
            Produto: order.produto,
            Valor: order.valor,
            Status: order.status,
        }),
    })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}
