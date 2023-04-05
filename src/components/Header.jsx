
import { Link, useNavigate } from 'react-router-dom'
import { useLegitUser } from '../hooks/useLegitUser.jsx'


function Navbar(){
    const userData = useLegitUser();
    console.log("🚀 ~ file: Header.jsx:8 ~ Navbar ~ userData:", userData)


    const navigate = useNavigate();

    const handleLogout =  () => userData.userLogout(navigate);

    let dashboard = userData.success ? 
        <li><Link to="/dashboard">Dashboard</Link></li> : <></>

    let createEvent = userData.isAdmin || userData.isCreator ?
        <li><Link to="/create">create Course</Link></li> : <></>
        

    let logOutOrIn = userData.success ?
            <li onClick={handleLogout}>Logout</li>
        :
        <>
            <li><Link to="/login">Einloggen</Link></li>
            <li><Link to="/register">Anmelden</Link></li>
        </>

    return(
        <nav className="nav">
            <ul>
                <li><Link to="/" className="site-title">MaNiMa</Link></li>
                {dashboard}
                {createEvent}
            </ul>
            
            <form>
                <input type="text" placeholder="Search" />
            </form>

            <ul className="controls">
                <li><Link to="/shoppingcart">Warenkorb</Link></li>
                {logOutOrIn}
            </ul>
        </nav>
    )
}

export default Navbar;