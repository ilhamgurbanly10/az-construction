import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import Cart from '../pages/Cart';
import Error404 from '../pages/Error_404';

function Routing() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<Error404 />} />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
        </Routes>    
    );
}

export default Routing;
