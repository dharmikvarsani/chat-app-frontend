import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { userAuthStore } from '../store/useAuthStore'
import { X } from 'lucide-react'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = userAuthStore()

  return (
    <div className="p-3 border-b border-base-300 bg-base-100 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative">
            <img
              src={selectedUser.profilePic || './avatar.png'}
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-base truncate">{selectedUser.fullName}</h3>
            <p className="text-xs text-gray-500">
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-base-200 transition"
          aria-label="Close Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
