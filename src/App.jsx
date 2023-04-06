import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Login from './components/ProvidePermission/Login'
import Register from './components/ProvidePermission/Register'
import ShoppingCart from './pages/ShoppingCart'
import Home from './pages/Home'
import CourseDetails from './pages/CourseDetails'
import Layout from './components/Layout';



export default function App() {


    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />}  />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shoppingcart" element={<ShoppingCart />} />
                    <Route path="/course/:id" element={<CourseDetails />} />
                </Routes>
            </Layout>
        </>
    )
}
