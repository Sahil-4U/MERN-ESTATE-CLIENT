import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../FirebaseAuth';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

function Profile() {
    const { currentUser } = useSelector(state => state.user);
    const fileRef = useRef(null);   
    const [file, setFile] = useState(undefined);
    const [fileperc, setFilePerc] = useState(0);
    const [fileError, setFileError] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();




    useEffect(() => {
        if (file) {
            handlefileUpload(file);
        }
    }, [file]);
    const handlefileUpload = (file) => {
        // here we arrange a storage from firebase
        const storage = getStorage(app);

        // here we add currenttime of user pc to for a new name everytime
        const fileName = new Date().getTime() + file.name;

        // here we create a reference for image storage in firebase;
        const storageRef = ref(storage, fileName);

        // this method shows the percentage for uploading the images
        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(() => Math.round(progress));
            },
            (error) => {
                setFileError(true);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => setFormData({ ...formData, avatar: downloadUrl }));
            }

        );
    }
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(updateUserStart());
            console.log(currentUser);
            const res = await fetch(`http://localhost:6400/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess());

        } catch (error) {
            console.log(error);
            dispatch(updateUserFailure(error.message));
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='file' ref={fileRef} hidden onChange={(e) => setFile(e.target.files[0])} />
                <img onClick={() => fileRef.current.click()} src={formData?.avatar || currentUser?.avatar} alt='profile' className='w-24 h-24 mt-2  self-center rounded-full object-cover cursor-pointer hover:border-8 border-green-700' />
                <p className='text-sm self-center'>
                    {
                        fileError ? (
                            <span className='text-red-700'>Error while image upload</span>
                        ) : fileperc > 0 && fileperc < 100 ? (
                                <span className='text-slate-700 '>{`Uploading ${fileperc}%`}</span>
                        ) : fileperc === 100 ? (
                                    <span className='text-green-700 '>Image Upload Successfully</span>
                        ) : " "

                    }
                </p>

                <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' defaultValue={currentUser.username} onChange={handleChange} />
                <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' defaultValue={currentUser.email} onChange={handleChange} />
                <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
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

export default Profile;