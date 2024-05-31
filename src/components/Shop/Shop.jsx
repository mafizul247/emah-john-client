import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // console.log(storedCart);
        for (const id in storedCart) {
            const addProduct = products.find(product => product.id === id);
            // console.log(addProduct);
            if (addProduct) {
                const quantity = storedCart[id];
                addProduct.quantity = quantity;
                savedCart.push(addProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        let newCart = [];

        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id);
    }

    // const handleAddToCart = (product) => {
    //     const newCart = [...cart, product];
    //     setCart(newCart);
    //     addToDb(product.id);
    // }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products?.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart} />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} handleClearCart={handleClearCart} >
                    <Link to='/order' className='btn-link'>
                        <button className='btn-checkout'><span>Review Order</span> <FontAwesomeIcon className='icon' icon={faArrowRight} /></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;