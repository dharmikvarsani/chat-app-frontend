import { EyeIcon, EyeOffIcon, Loader2, User } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userAuthStore } from '../store/useAuthStore';

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, isLogingIng } = userAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
  }
  return (
    <div className='min-h-screen flex justify-center items-center flex-col gap-3  bg-base-200 px-4 '>
      <div className="w-[300px] flex justify-center flex-col items-center max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <div className='flex flex-col items-center gap-0'>
          <img src="logo.png" alt="logo" className='h-auto w-[110px] object-contain' />
          <h2 className="text-xl font-bold flex flex-row items-center gap-2  text-center mb-6"> <User /> Welcome Back!</h2>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>

          <div>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
              <input type="email" placeholder="mail@site.com" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </label>
          </div>

          <div>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <span
                className="absolute right-3 top-2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}  >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
            </label>
          </div>

          <button className="btn w-full btn-soft btn-success" disabled={isLogingIng}>
            {isLogingIng ? <Loader2 className='size-5 animate-spin' /> : 'Login'}
          </button>
        </form>
        <div>
          <p className='mt-3'>Don't have an account?{''} <Link to='/signup' className='underline text-primary'>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LogInPage
