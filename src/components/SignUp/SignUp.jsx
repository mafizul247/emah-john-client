import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Providers/AuthProvider';
import useTitle from '../../hooks/useTitle';

const SignUp = () => {
    useTitle('Sign UP')
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleSignUp = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirm = event.target.confirm.value;
        // console.log(email, password, confirm);

        if (password !== confirm) {
            toast.error('Password & Confirm password does not match');
            return;
        } else if (password.length < 6) {
            toast.error('Password must be more than 6 charecters');
            return;
        }

        createUser(email, password)
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser);
                toast(`${logedUser.email} Create Usaer Successfully`);
                navigate(from, { replace: true });
            }).catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    return (
        <div className='login-contianer'>
            <h2 className='form-title'>Please Sign Up!</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name='email' placeholder='Entry your email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="passwrod">Passwrod:</label>
                    <input type="password" name='password' placeholder='Entry your password' />
                </div>
                <div className="form-control">
                    <label htmlFor="passwrod">Confirm Passwrod:</label>
                    <input type="password" name='confirm' placeholder='Entry your confirm password' />
                </div>
                <input className='submit-btn' type="submit" value="Sign Up" required />
            </form>
            <div className='login-toggle'>
                <p>Already Have an Account? <Link to='/login'>Please Login</Link> </p>
            </div>
            <hr />
            <SocialLogin />
        </div>
    );
};

export default SignUp;