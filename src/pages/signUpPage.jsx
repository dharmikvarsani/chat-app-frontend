import React, { useState } from 'react'
import { userAuthStore } from '../store/useAuthStore'
import { EyeIcon, EyeOffIcon, Loader2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const { signup, isSigningUp } = userAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Username is required")
        if (!formData.email.trim()) return toast.error('Email is required')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error('Invalid email format')
        if (!formData.password) return toast.error('Password is required')
        if (formData.password.length < 6) return toast.error('Password mustbe atleast 6 characters')

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm()
        if (success === true) signup(formData)
    }

    return (
        <div className='min-h-screen flex justify-center items-center flex-col gap-3  bg-base-200 px-4'>
            <div className="w-[300px] flex justify-center flex-col items-center max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
                <div className='flex flex-col items-center gap-0'>
                    <img src="logo.png" alt="logo" className='h-auto w-[110px] object-contain' />
                    <h2 className="text-xl font-bold flex flex-row items-center gap-2  text-center mb-6"> <User /> Create an Account</h2>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                            <input type="text" placeholder="Username" value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </label>
                    </div>

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

                    <button className="btn w-full btn-soft btn-success" disabled={isSigningUp}>
                        {isSigningUp ? <Loader2 className='size-5 animate-spin' /> : 'Sign Up'}
                    </button>
                </form>
                <div>
                    <p className='mt-3'>Already have an account?{''} <Link to='/login' className='underline text-primary'>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
