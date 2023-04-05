import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useLegitUser } from '../hooks/useLegitUser.jsx'

import { BASE_URL_PUBLIC } from '../service/config'


function Navbar(){

    const userData = useLegitUser();
    console.log("🚀 ~ file: Header.jsx:7 ~ Navbar ~ userData:", userData.success)

    const handleLogout = async ()=>{
        await userData.userLogout();
    }

    let logOutOrIn = userData.success ?
        <>
            <li onClick={handleLogout}>
                <Link to="/">Logout</Link>
            </li>
        </>
        :
        <>
            <li>
                <Link to="/login">Einloggen</Link>
            </li>
            <li>
                <Link to="/register">Anmelden</Link>
            </li>
        </>

    return(
        <nav className="nav">
            <ul>
                <li>
                    <Link to="/" className="site-title">MaNiMa</Link>
                </li>
                <li>
                    <Link to="/">Kurse</Link>
                </li>
                <li>
                    <Link to="/">Creator</Link>
                </li>
            </ul>
            <form>
                <input type="text" placeholder="Search" />
            </form>


            <ul className="controls">
                <li>
                    <Link to="/shoppingcart">Warenkorb</Link>
                </li>
                {logOutOrIn}
            </ul>
        </nav>
    )
}

export default Navbar;