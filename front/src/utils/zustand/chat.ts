import { create } from 'zustand'

interface ChatState {
    messages: string[]
    loading: boolean
    addMessage: (message: string) => void
    setLoading: (loading: boolean) => void
    clearChat: () => void
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    loading: false,

    addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

    setLoading: (value) => set({ loading: value }),

    clearChat: () => set({ messages: [] }),
}))
