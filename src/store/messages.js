import { create } from 'zustand';
const API_URL = '/api/chat';

export const useMessageStore = create((set, get) => ({
    messages: [],
    sendPrompt: async ({ prompt }) => {
        const messageIAid = get().messages.length + 1
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    id: state.messages.length,
                    ia: false,
                    message: prompt[0]?.ingredients
                },
                {
                    id: state.messages.length + 1,
                    ia: true,
                    message: ''
                }
            ]
        }))

        try {
            const ingredients = prompt[0]?.ingredients;
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: ingredients, qty: prompt[0]?.qty, messages: get().messages ? get().messages : [], type: prompt[0]?.type }),
            })

            const json = await response.json()

            // Update AI Message
            set((state) => ({
                messages: state.messages.map((oldMessages) => {
                    if (oldMessages.id === messageIAid) {
                        return {
                            ...oldMessages,
                            message: json.response
                        }
                    }
                    return oldMessages
                })
            }))
        } catch (error) {
            console.error(error)
        }
    },
    reset: () => {
        set({ messages: [] })
    }
}))

export const useTypeStore = create((set, get) => ({
    type: '',
    sendType: (typeChat) => set(state => ({ type: typeChat }))
}))