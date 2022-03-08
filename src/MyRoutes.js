import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './Components/Admin/AddProduct/AddProduct';
import EditProduct from './Components/Admin/EditProduct/EditProduct';
import Login from './Components/Auth/Login/Login';
import SignUp from './Components/Auth/SignUp/SignUp';
import Cart from './Components/Cart/Cart';
import Star from './Components/Star/Star';
import Home from './Components/Home/Home';
import MyNavbar from './Components/Navbar/MyNavbar';
import ProductDetail from './Components/Product/ProductDetail/ProductDetail';
import ProductContextProvider from './Contexts/ProductContext';

const MyRoutes = () => {
    return (
        <ProductContextProvider>
            <BrowserRouter>
                <MyNavbar/>
                <Routes>
                    <Route path="/add" element={<AddProduct/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/edit/:id" element={<EditProduct/>} />
                    <Route path="/detail/:id" element={<ProductDetail/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/star" element={<Star/>} />
                </Routes>
            </BrowserRouter>
        </ProductContextProvider>
    );
};

export default MyRoutes;