import './SocialLogin.css'
import googleIcon from './../../assets/icons/google-icon.png'
import { useContext } from 'react'
import { AuthContext } from '../../Providers/AuthProvider'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser);
                navigate(from, { replace: true });
                toast(`${logedUser.email} Login Successfully`);
            }).catch(error => {
                console.log(error);
                toast.error(error.message)
            })
    }

    return (
        <div onClick={handleGoogleLogin} className='social-login'>
            <img className='google-icon' src={googleIcon} alt="Google" />
            <span>Continue with google</span>
        </div>
    )
}

export default SocialLogin;