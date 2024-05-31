import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Cart.css'

const Cart = ({ cart, handleClearCart, children }) => {
    // console.log(cart);
    let total = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {
        // if(product.quantity == 0) {
        //     product.quantity = 1;
        // }
        // product.quantity = product.quanity || 1;
        total = total + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping * product.quantity;
        quantity = quantity + product.quantity;
    }
    let tax = total * 0.05;
    let grandTotal = total + totalShipping + tax;

    return (
        <div className='cart-items'>
            <h3>Order Summary</h3>
            <h4>Selected Items: {quantity}</h4>
            <p>Total Price: ${total}</p>
            <p>Total Shipping Charge: ${totalShipping} </p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
            <button onClick={handleClearCart} className='clear-cart'><span>Clear Cart</span> <FontAwesomeIcon className='icon' icon={faTrashAlt} /></button>
            {children}
        </div>
    );
};

export default Cart;