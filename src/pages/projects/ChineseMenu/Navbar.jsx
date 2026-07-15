import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">DvCafe</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Menu</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <button className="nav-btn">Order Now</button>
    </div>
  )
}

export default Navbar
