import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../FirebaseAuth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

function Oauth() {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:6400/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
            })
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
        } catch (error) {
            console.log('could not processed with google ', error);
        }
    }
    return (
        <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>
            continue with google
        </button>
    )
}

export default Oauth