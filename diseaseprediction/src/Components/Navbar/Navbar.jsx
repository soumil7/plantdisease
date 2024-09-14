import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav className="navBar">
            <ul className="navList">
                <Link to = '/'><li className="navItem">Home</li></Link>
                <Link to = '/plantdisease'><li className="navItem">Plant Disease</li></Link>
                <Link to = '/chimneydetection'><li className="navItem">Chimney Detection</li></Link>
                <Link to = '/crackdetection'><li className="navItem">Crack Detection</li></Link>
                <Link to = '/about'><li className="navItem">About</li></Link>
                {/* <li className="navItem">Logout</li> */}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
