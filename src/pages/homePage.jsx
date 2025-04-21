import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/sidebar';
import NoChatSelected from '../components/noChatSelected';
import ChatContainer from '../components/chatContainer';


const HomePage = () => {

  const { selectedUser } = useChatStore();

  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center md:pt-15 pt-8 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]:'>
          <div className='flex rounded-lg h-full overflow-hidden'>
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
