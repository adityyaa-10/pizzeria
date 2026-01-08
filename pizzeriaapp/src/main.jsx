import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import OrderPizza from './pages/OrderPizza.jsx';
import BuildPizza from './pages/BuildPizza.jsx';
import CartPage from './pages/Cart.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/order",
    element: <OrderPizza />
  },
  {
    path: "/build",
    element: <BuildPizza />
  },
  {
    path: "/cart",
    element: <CartPage />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
