import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    const [formData, setformData] = useState({});
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:6400/api/auth/sing-up', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        alert(data);
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
                <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase  hover:opacity-80 disabled:opacity-80'>
                    Sing up
                </button>
                <div className='flex gap-2 mt-5'>
                    <p>
                        Have an account ?
                    </p>
                    <Link to={"/sign-in"}>
                        <span className='text-blue-700'>
                            SignIn
                        </span>
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default SignUp;