import React from 'react';
import './Product.css'

const Product = ({product, handleAddToCart}) => {
    const {id, name, img, price, seller, ratings} = product;
    // console.log(product);

    return (
        <div className='product'>
            <img src={img ? img : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=740'} alt={name} />
            <div className='product-items'>
                <h4>{name}</h4>
                <p>Price: ${price}</p>
                <p>Manufacturer: {seller}</p>
                <p>Ratings: {ratings} Stars</p>
            </div>
            <button onClick={() => handleAddToCart(product)} className='btn-cart'>Add To Cart</button>
        </div>
    );
};

export default Product;