import { create } from 'zustand'
import type { Order } from '../config'
import { fetchAllOrders, fetchCreateOrder } from '../fetch'

interface OrderState {
    orders: Order[]
    loading: boolean
    getOrdersRequest: () => void
    createOrdersRequest: (order: Omit<Order, 'id' | 'createdAt'>) => void
}

export const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    loading: false,
    getOrdersRequest: async () => {
        set({ loading: true })
        const orders = await fetchAllOrders()
        set({ orders, loading: false })
    },
    createOrdersRequest: async (order) => {
        set({ loading: true })
        await fetchCreateOrder(order)
        location.reload()
        set({ loading: false })
    },
}))

// export const useGetOrdersRequest = async () => {
//     return await fetchAllOrders()
// }
