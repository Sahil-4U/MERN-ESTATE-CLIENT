import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
    const { currentUser } = useSelector(state => state.user);
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <img src={currentUser.avatar} alt='profile' className='w-24 h-24 mt-2  self-center rounded-full object-cover cursor-pointer hover:border-8 border-green-700' />
                <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' />
                <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' />
                <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' />
                <button className='p-3 rounded-lg uppercase bg-slate-600 text-white'>
                    update
                </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer '>Delete account</span>
                <span className='text-red-700 cursor-pointer '>Sign out</span>
            </div>
        </div>
    )
}

export default Profile