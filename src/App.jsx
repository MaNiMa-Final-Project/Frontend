import { Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar"
import Login from './components/ProvidePermission/Login'
import Register from './components/ProvidePermission/Register'
import ShoppingCart from './pages/ShoppingCart'
import Home from './pages/Home'

export default function App() {
    return (
        <>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shoppingcart" element={<ShoppingCart />} />


                </Routes>
            </div>
        </>
    )
}
