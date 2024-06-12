import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './ReviewItem.css';

const ReviewItem = ({ product, handleRemoveFromCart }) => {
    const { _id, name, img, price, quantity, shipping } = product;
    return (
        <div className='review-items'>
            <img src={img} alt={name} />
            <div className='review-details'>
                <h4 className='product-title'>{name}</h4>
                <p>Price: <span className='orange-text'>${price}</span> </p>
                <p>Quantity: <span className='orange-text'>${quantity}</span> </p>
                <p>Shipping Charge: <span className='orange-text'>${shipping}</span> </p>
            </div>
            <button onClick={() => handleRemoveFromCart(_id)} className='btn-delete'><FontAwesomeIcon className='icon' icon={faTrashAlt} /></button>
        </div>
    );
};

export default ReviewItem;