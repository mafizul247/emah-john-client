import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData, useNavigation } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Shop = () => {
    const navigation = useNavigation();
    if(navigation.state === 'loading') {
        return <LoadingSpinner />
    }
    
    useTitle('Shop');
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(12);
    const { totalProducts } = useLoaderData();

    const totalPages = Math.ceil(totalProducts / itemPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const pageNumbersN = [...Array(totalPages).keys()];

    // console.log(currentPage)

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, itemPerPage]);

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);
        fetch(`http://localhost:5000/productsByids`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                // console.log(data);
                const savedCart = [];
                // console.log(storedCart);
                for (const id in storedCart) {
                    const addProduct = cartProducts.find(product => product._id === id);
                    // console.log(addProduct);
                    if (addProduct) {
                        const quantity = storedCart[id];
                        addProduct.quantity = quantity;
                        savedCart.push(addProduct);
                    }
                }
                setCart(savedCart);
            })


    }, [])

    const handleAddToCart = (product) => {
        let newCart = [];

        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product._id);
    }

    // const handleAddToCart = (product) => {
    //     const newCart = [...cart, product];
    //     setCart(newCart);
    //     addToDb(product._id);
    // }

    const handleSelectChange = (event) => {
        setItemPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    }

    return (
        <>
            <div className='shop-container'>
                <div className="product-container">
                    {
                        products?.map(product => <Product key={product._id} product={product} handleAddToCart={handleAddToCart} />)
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
            {/* Pagination  */}
            <div className="pagination">
                <p>Current Page {currentPage} and Item Per Page {itemPerPage}</p>
                <div>
                    {
                        pageNumbers?.map(number => <button
                            onClick={() => setCurrentPage(number)}
                            key={number}
                            className={`${currentPage === number ? 'active' : 'pagination-btn'}`}
                        >{number}</button>)
                    }

                    <select onChange={handleSelectChange} name="selectItem" className='seletPage'>
                        <option value="12">12</option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="100">100</option>
                        <option value={totalProducts} >All</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default Shop;