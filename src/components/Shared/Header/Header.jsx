import React from 'react';
import './Header.css';
import logo from './../../../../src/assets/images/Logo.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} alt="Header" />
            <div className="nav-items">
                <NavLink className={({isActive}) => isActive && 'active'} to="/">Shop</NavLink>
                <NavLink className={({isActive}) => isActive && 'active'} to="/order">Order</NavLink>
                <NavLink className={({isActive}) => isActive && 'active'} to="/Inventory">Inventory</NavLink>
                <NavLink className={({isActive}) => isActive && 'active'} to="/login">Login</NavLink>
            </div>
        </nav>
    );
};

export default Header;