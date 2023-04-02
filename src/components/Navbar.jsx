import { Link } from 'react-router-dom'

function Navbar(){

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
                <li>
                    <Link to="/login">Einloggen</Link>
                </li>
                <li>
                    <Link to="/register">Anmelden</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;