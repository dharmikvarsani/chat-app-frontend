import React from 'react'
import { Link } from 'react-router-dom';
import { LogOut, Settings, User2 } from 'lucide-react'
import { userAuthStore } from '../store/useAuthStore'

const Navbar = () => {
  const { authUser, logout } = userAuthStore()
  return (
    <header className=' h-[50px] sm:h-[60px] shadow-2xl flex flex-row justify-between md:ps-7 md:pe-7 sm:ps-5 sm:pe-5 ps-2 pe-2 items-center'>
      <div>
        <Link to='/' >
          <img src="logo.png" alt="logo" className='h-auto w-[75px] sm:w-[110px] cursor-pointer' />
        </Link>
      </div>

      <div className='flex items-center md:gap-8 sm:gap-5 gap-3'>
        <Link to='/setting' className='flex flex-row items-center gap-1' >
          <Settings className='animate-spin w-4 h-4' />
          <span className='hidden sm:inline font-semibold'>Setting</span>
        </Link>

        {
          authUser && (
            <>
              <Link to='profile' className='flex flex-row items-center gap-1'>
                <User2 className='size-5' />
                <span className='hidden sm:inline font-semibold'>Profile</span>
              </Link>

              <button className="btn btn-soft btn-error p-3 " onClick={logout}>
                <LogOut className='size-4' />
                <span className='hidden sm:inline font-semibold'>Logout</span>
              </button>
            </>
          )
        }
      </div>

    </header>
  )
}

export default Navbar
