import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
    const [formData, setformData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('http://localhost:6400/api/auth/sign-in', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log("data of response", data)
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/')
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                <input type='email' required placeholder='email' className='border p-3 rounded-lg' id='email' name='email' onChange={handleChange} />
                <input type='password' required placeholder='password' className='border p-3 rounded-lg' name='email' id='password' onChange={handleChange} />

                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase  hover:opacity-80 disabled:opacity-80'>
                    {loading ? 'loading...' : 'Sign In'}
                </button>


            </form>
            <div className='flex gap-2 mt-5'>
                <p>
                    Dont  have an account ?
                </p>
                <Link to={"/sign-up"}>
                    <span className='text-blue-700'>
                        SignUp
                    </span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}



export default SignIn;