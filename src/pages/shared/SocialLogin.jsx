import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';

const SocialLogin = () => {
    const {signInWithGoogle}=useContext(AuthContext);

    const handleGoogleSignIn=()=>{
        signInWithGoogle()
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    return (
        <div className='m-2'>
             <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className='btn btn-success w-full'> Login with Google</button>
            
        </div>
    );
};

export default SocialLogin;