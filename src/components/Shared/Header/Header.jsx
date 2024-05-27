import React from 'react';
import './Header.css';
import logo from './../../../../src/assets/images/Logo.svg';

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} alt="Header" />
            <div className="nav-items">
                <a href="/">Shop</a>
                <a href="/order">Order</a>
                <a href="/Inventory">Inventory</a>
                <a href="/login">Login</a>
            </div>
        </nav>
    );
};

export default Header;