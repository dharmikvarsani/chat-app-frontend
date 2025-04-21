import { create } from 'zustand'
import { axiosInstnce } from '../lib/axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const userAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLogingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstnce.get('/auth/check')
            set({ authUser: res.data })
            get().connectSocket()
        } catch (error) {
            // console.log("error in checkauth store", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstnce.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success("Signup Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
            // console.log('Error in signup data in store ', error)
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLogingIng: true })
        try {
            const res = await axiosInstnce.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success("Login successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLogingIng: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstnce.post('/auth/logout')
            set({ authUser: null })
            toast.success('Logout successfully')
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
            // console.log("error in logout store", error)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstnce.put('/auth/profile-update', data)
            set({ authUser: res.data })
            toast.success(
                window.innerWidth < 640
                    ? 'Profile updated!'
                    : 'Profile image update successfully'
            )
        } catch (error) {
            // console.log('Error in update profile image store', error)
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,
            {
                // withCredentials: true,
                query: {
                    userId: authUser._id
                }

            })
        socket.connect()
        set({ socket: socket })
        socket.on('getOnlineUsers' ,(userIds) => {
            set({onlineUsers :userIds})
        })
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect()
    }

})) 
