import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import './Order.css';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import useTitle from '../../hooks/useTitle';

const Order = () => {
    useTitle('Order')
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleRemoveFromCart = (id) => {
        const remaining = cart?.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="review-container">
                {
                    cart?.map(product => <ReviewItem product={product} handleRemoveFromCart={handleRemoveFromCart} />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} handleClearCart={handleClearCart} >
                    <Link to="/checkout" className='btn-link'>
                        <button className='btn-checkout'><span>Proced Checkout</span> <FontAwesomeIcon className='icon' icon={faWallet} /></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Order;