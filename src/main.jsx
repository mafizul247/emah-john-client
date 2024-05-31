import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './Layout/Main.jsx'
import Shop from './components/Shop/Shop.jsx'
import Order from './components/Order/Order.jsx'
import Inventory from './components/Inventory/Inventory.jsx'
import Login from './components/Login/Login.jsx'
import cartPorductLoader from './Loaders/cartProductsLoader.js'
import Checkout from './components/Checkout/Checkout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Shop />
      },
      {
        path: 'order',
        element: <Order />,
        loader: cartPorductLoader
      },
      {
        path: 'inventory',
        element: <Inventory />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
