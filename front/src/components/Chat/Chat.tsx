import React, { useState, useRef, useEffect } from 'react'
import { useChatStore } from '../../utils/zustand/chat'

const Chat = () => {
    const { messages, addMessage, loading, setLoading } = useChatStore()
    const [input, setInput] = useState('')
    const chatEndRef = useRef<HTMLDivElement>(null)

    const sendMessage = async () => {
        if (!input.trim()) return

        addMessage(input)
        setInput('')
        setLoading(true)

        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            })

            const data = await response.json()

            addMessage(data.reply)
        } catch (error) {
            addMessage('Error connecting to server. ' + error)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    // Auto scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    return (
        <div className="flex flex-col h-[300px] bg-gray-500 rounded-lg overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow`}>
                        {msg}
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="px-4 py-2 rounded-2xl bg-white shadow text-gray-500 animate-pulse">
                            Typing...
                        </div>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50">
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat
