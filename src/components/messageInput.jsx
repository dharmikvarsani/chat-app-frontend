import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file')
            return;
        }

        const reader = new FileReader()
        reader.onload = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const removeImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = '';
    }


    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            })

            setText('');
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            console.log('Failed to send message', error)

        }
    }

    return (
        <div className='p-4 w-full'>
            {imagePreview && (
                <div className="mb-4 flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-base-300 hover:bg-base-200 transition"
                        >
                            <X className="size-3 text-base-content" />
                        </button>
                    </div>
                    {/* <span clas sName="text-sm text-base-content/80">Image Preview</span> */}
                </div>
            )}

            <form onSubmit={handleSendMessage} className='flex items-center gap-1 sm:gap-2'>
                <div className='flex-1 flex items-center gap-1 sm:gap-2'>
                    <input
                        type="text"
                        className='w-full text-[10px] sm:text-[15px] input input-bordered rounded-lg input-sm sm:input-md'
                        placeholder='Type a message...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept='image/*'
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                    />

                    <button
                        type='button'
                        className={`btn btn-circle size-8 sm:size-11 sm:p-2 ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={15} className="sm:size-5" />
                    </button>
                </div>
                <button
                    type='submit'
                    className='btn btn-sm btn-circle size-6.5 sm:size-9 sm:p-2 '
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    )
}

export default MessageInput
