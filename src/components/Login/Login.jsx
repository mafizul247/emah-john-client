import React, { useContext } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Providers/AuthProvider';
import useTitle from '../../hooks/useTitle';

const Login = () => {
    useTitle('Login')
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log(email, password);
        if (password.length < 6) {
            toast.error('Passowrd length must be 6 charects');
            return;
        }
        loginUser(email, password)
            .then(result => {
                const logedUser = result.user;
                toast(`${logedUser.email} Login Successfully`);
            }).catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    return (
        <div className='login-contianer'>
            <h2 className='form-title'>Please Login!</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name='email' placeholder='Entry your email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="passwrod">Passwrod:</label>
                    <input type="password" name='password' placeholder='Entry your password' />
                </div>
                <input className='submit-btn' type="submit" value="Login" required />
            </form>
            <div className='login-toggle'>
                <p>New to Ema-john? <Link to='/signup' state={location.state}>Create New Account</Link> </p>
            </div>
            <hr />
            <SocialLogin />
        </div>
    );
};

export default Login;