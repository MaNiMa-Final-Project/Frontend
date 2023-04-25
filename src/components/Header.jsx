
import { Link, useNavigate } from 'react-router-dom'
import { useLegitUser } from '../hooks/useLegitUser.jsx'
import { useCartData } from '../hooks/useCartData.jsx';


function Navbar(){
    const userData = useLegitUser();
    const cartData = useCartData();
    const navigate = useNavigate();

    const handleLogout =  () => userData.userLogout(navigate);

    let dashboard = userData.success ? 
        <li><Link to="/dashboard">DASHBOARD</Link></li> : <></>

    let createEvent = userData.isAdmin || userData.isCreator ?
        <li><Link to="/newcourse">Kurs erstellen</Link></li> : <></>
        

    let logOutOrIn = userData.success ?
            <li onClick={handleLogout}>LOGOUT</li>
        :
        <>
            <li><Link to="/login">EINLOGGEN</Link></li>
            <li><Link to="/register">REGISTRIEREN</Link></li>
        </>

    let cartBadge = cartData.cart.length > 0 ?
        <span className='cartBadge'>{cartData.cart.length}</span>
        :
        <></>

    return(
        <nav className="nav">
            <ul>
            
                <li><Link to="/" className="site-title"><img src={"src/assets/images/artshuttle_logo.png"} width="100" height="100" /></Link></li>
                {dashboard}
                {createEvent}
        
            </ul>
            
            <form>
                <input type="text" placeholder="Suche" />
            </form>

            <ul className="controls">
                <li className='kurse' ><Link to="/kurse">KURSE{}</Link></li>
                <li className='dozenten' ><Link to="/dozenten">DOZENTEN{}</Link></li>
                <li className='cartAnchor' ><Link to="/shoppingcart">SHOP{cartBadge}</Link></li>
                <li className='info' ><Link to="/info">INFO{}</Link></li>
                {logOutOrIn}
            </ul>
        </nav>
    )
}

export default Navbar;