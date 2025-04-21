import React, { useState } from 'react'
import { userAuthStore } from '../store/useAuthStore'
import { Camera, Loader2, Mail, User } from 'lucide-react'

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = userAuthStore()
const [selectedImage , setSelectedImage] = useState(null)

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64image =  reader.result;
            setSelectedImage(base64image)
            await updateProfile ({profilePic : base64image})
        } 
    }

    return (
        <div className='min-h-screen bg-base-200 flex justify-center items-start py-10 px-4'>
            <div className='w-full max-w-3xl space-y-10'>

                {/* Profile Card */}
                <div className='bg-base-100 p-6 sm:p-8 rounded-2xl shadow-md'>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='relative'>
                            <img
                                src={selectedImage ||authUser.profilePic || '/avatar.png'}
                                alt='Profile'
                                className='w-32 h-32 rounded-full object-cover border-4 border-base-300 shadow-sm'
                            />
                            <label
                                htmlFor='avatar-upload'
                                className={`absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full cursor-pointer hover:scale-105 transition-transform ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
                                    }`}
                            >
                                <Camera size={18} />
                                <input
                                    type='file'
                                    id='avatar-upload'
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <div className='text-center'>
                            <p className='text-xs text-zinc-400 mt-2'>
                                {isUpdatingProfile ? (
                                    <span className='flex items-center justify-center gap-2'>
                                        <Loader2 className='w-4 h-4 animate-spin' /> Uploading...
                                    </span>
                                ) : (
                                    'Click camera icon to update photo'
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-base-100 p-6 rounded-xl shadow'>
                        <div className='flex items-center gap-2 mb-2 text-zinc-500 text-sm'>
                            <User size={16} />
                            Full Name
                        </div>
                        <div className='bg-base-200 p-3 rounded-lg text-sm font-medium'>
                            {authUser?.fullName}
                        </div>
                    </div>

                    <div className='bg-base-100 p-6 rounded-xl shadow'>
                        <div className='flex items-center gap-2 mb-2 text-zinc-500 text-sm'>
                            <Mail size={16} />
                            Email Address
                        </div>
                        <div className='bg-base-200 p-3 rounded-lg text-sm font-medium'>
                            {authUser?.email}
                        </div>
                    </div>
                </div>

                {/* Account Info */}
                <div className='bg-base-100 p-6 rounded-xl shadow'>
                    <h3 className='text-lg font-semibold mb-4'>Account Information</h3>
                    <div className='space-y-3 text-sm'>
                        <div className='flex items-center justify-between text-sm py-2 border-b border-zinc-700'>
                            <span className='text-zinc-500'>Member Since</span>
                            <span className='font-semibold'>{authUser.createdAt?.split('T')[0]}</span>
                        </div>
                        <div className='flex items-center justify-between text-sm'>
                            <span className='text-zinc-500'>Status</span>
                            <span className='text-green-500 font-semibold'>Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
