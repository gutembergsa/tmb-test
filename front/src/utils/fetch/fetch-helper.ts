// export const fetchCommand = async (comandName: string, data: boolean) => {
//     console.log({ data })
//     await fetch(ESP_SERVER_URL + '/comando', {
//         method: 'POST',
//         mode: 'no-cors',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: comandName, state: data }),
//     })
// }

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
): Promise<Response> => {
    console.log({ order, teste: JSON.stringify(order) })
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
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}
