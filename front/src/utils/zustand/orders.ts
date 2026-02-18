import { create } from 'zustand'
import type { Order } from '../config'
import { fetchAllOrders, fetchCreateOrder } from '../fetch'

interface OrderState {
    orders: Order[]
    loading: boolean
    addOrder: (order: Order) => void
    updateOrder: (updatedOrder: Order) => void
    getOrdersRequest: () => void
    createOrdersRequest: (order: Omit<Order, 'id' | 'createdAt'>) => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
    orders: [],
    loading: false,
    addOrder: (order) =>
        set((state) => {
            const orders = state.orders.map((order) => ({ ...order }))
            return { orders: [{ ...order }, ...orders] }
        }),
    updateOrder: (updatedOrder) =>
        set((state) => {
            const orders = state.orders.map((order) => {
                if (order.id === updatedOrder.id) {
                    return { ...updatedOrder }
                }
                return { ...order }
            })
            console.log({ orders, updatedOrder })
            return { orders: [...orders] }
        }),
    getOrdersRequest: async () => {
        set({ loading: true })
        const orders = await fetchAllOrders()
        set({ orders, loading: false })
    },
    createOrdersRequest: async (order) => {
        set({ loading: true })

        const data = await fetchCreateOrder(order)
        get().addOrder(data)
        set({ loading: false })
    },
}))
