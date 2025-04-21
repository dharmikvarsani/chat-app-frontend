import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstnce } from '../lib/axios';
import { userAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,


    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstnce.get('/messages/users')
            set({ users: res.data })

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstnce.get(`/messages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstnce.post(`messages/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    listenMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const socket = userAuthStore.getState().socket;

        socket.on('newMessage', (newMessage) => {
            if(newMessage.senderId !==  selectedUser._id) return;
            set({ messages: [...get().messages, newMessage] })
        })
    },

    unListenMessage: () => {
        const socket = userAuthStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({ selectedUser })


}))
