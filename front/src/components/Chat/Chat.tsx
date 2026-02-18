import React, { useState, useRef } from 'react'
import { useChatStore } from '../../utils/zustand/chat'
import { baseControlButtonLayout } from '../../utils/tailwindTemplates'

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

    // // Auto scroll
    // useEffect(() => {
    //     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    // }, [messages, loading])

    return (
        <div className="flex flex-col h-[300px] bg-gray-500 rounded-lg overflow-hidden">
            {/* Chat Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-4 text-white"
                ref={chatEndRef}>
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
            </div>

            <div className="p-4 bg-white border-t flex justify-between gap-2">
                <label className="w-full" htmlFor="message">
                    <input
                        required
                        id="message"
                        type="text"
                        min={1}
                        className="w-full h-[48px] p-[16px] bg-[#EDF5F3] rounded-lg text-[#555B58] text-sm"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Digite uma mensagem..."
                    />
                </label>

                <button
                    onClick={sendMessage}
                    className={`${baseControlButtonLayout} w-[85px] text-sm  bg-[#3AB45C] text-[#FFF]`}>
                    Enviar
                </button>
            </div>
        </div>
    )
}

export default Chat
