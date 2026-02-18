import { create } from 'zustand'

interface UIState {
    showModalCreateOrder: boolean
    dataModalCreateOrder: unknown
    toggleModalCreateOrder: (data?: unknown) => void
}

export const useUIStore = create<UIState>((set) => ({
    showModalCreateOrder: false,
    dataModalCreateOrder: {},
    toggleModalCreateOrder: (data) =>
        set((state) => {
            return {
                ...state,
                dataModalCreateOrder: data,
                showModalCreateOrder: !state.showModalCreateOrder,
            }
        }),
}))
