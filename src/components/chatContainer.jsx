import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './chatHeader'
import MessageInput from './messageInput'
import ChatHeaderSkeleton from './Skeletons/chatHeaderSkeleton'
import { userAuthStore } from '../store/useAuthStore'

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, listenMessages, unListenMessage } = useChatStore()
    const { authUser } = userAuthStore()
    const messageEndRef = useRef(null)

    useEffect(() => {
        getMessages(selectedUser._id)
        listenMessages()
        return () => unListenMessage()
    }, [selectedUser._id, getMessages, listenMessages, unListenMessage])

    // Format time for when message is send
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    if (isMessagesLoading) {
        return (
            <div className='flex flex-1 flex-col overflow-auto'>
                <ChatHeader />
                <ChatHeaderSkeleton />
                <MessageInput />
            </div>
        )
    }

    return (
        <div className='flex h-[500px] flex-1 flex-col overflow-auto'>
            <ChatHeader />

            <div className='flex-1  overflow-y-scroll scrollbar-thin p-2 sm:p-4 space-y-4'>
                {
                    messages.map((message) => {
                        const isSender = message.senderId === authUser._id;

                        return (
                            <div
                                key={message._id}
                                className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}
                                ref={messageEndRef}
                            >
                                <div className='chat-image avatar'>
                                    <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full border'>
                                        <img
                                            src={isSender
                                                ? authUser.profilePic || '/avatar.png'
                                                : selectedUser.profilePic || '/avatar.png'}
                                            alt='Profile'
                                        />
                                    </div>
                                </div>

                                <div className='chat-bubble bg-base-200 text-base-content max-w-[80%] sm:max-w-[60%]'>
                                    {message.image && (
                                        <img
                                            src={message.image}
                                            alt='message'
                                            className='rounded-md mb-2 mt-2 max-w-full max-h-[250px]'
                                        />
                                    )}
                                    {message.text && <p className='text-[12px]
                                     md:text-[17px] break-words'>{message.text}</p>}
                                    <div className='text-xs text-right opacity-50 mt-1'>
                                        {formatTime(message.createdAt)}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <MessageInput />
        </div>
    )
}

export default ChatContainer



