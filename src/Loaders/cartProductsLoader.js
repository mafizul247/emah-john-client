import { getShoppingCart } from "../utilities/fakedb";

const cartPorductLoader = async () => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    // console.log(ids.length);
    const loadedProducts = await fetch(`http://localhost:5000/productsByids`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loadedProducts.json();


    const savedCart = [];

    if (storedCart) {
        for (const id in storedCart) {
            const addedProducts = products.find(product => product._id === id);
            if (addedProducts) {
                const quantity = storedCart[id];
                addedProducts.quantity = quantity;
                savedCart.push(addedProducts);
            }
            // console.log(addedProducts);
        }
    }

    return savedCart;
}

export default cartPorductLoader;