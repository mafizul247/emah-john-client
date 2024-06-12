import React, { useContext } from 'react';
import './Header.css';
import logo from './../../../../src/assets/images/Logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { toast } from 'react-toastify';

const Header = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleLogOut = () => {
        if (user && user.email) {
            signOutUser()
                .then(() => {
                    toast('Logout Successfully');
                }).catch(error => {
                    toast.error(error.message)
                })
        }
    }

    return (
        <nav className='header'>
            <img src={logo} alt="Header" />
            <div className="nav-items">
                <NavLink className={({ isActive }) => isActive && 'active'} to="/">Shop</NavLink>
                <NavLink className={({ isActive }) => isActive && 'active'} to="/order">Order</NavLink>
                <NavLink className={({ isActive }) => isActive && 'active'} to="/Inventory">Inventory</NavLink>
                {
                    user && user.email ? <Link onClick={handleLogOut}>LogOut</Link> : <NavLink className={({ isActive }) => isActive && 'active'} to="/login">Login</NavLink>
                }
            </div>
        </nav>
    );
};

export default Header;