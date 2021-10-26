import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div id='navbar'>
      <div id="navwrap">
        <Link to="/" id="navLink">Login/Register</Link>
        <Link to="/jobs" id="navLink">Jobs</Link>
      </div>
    </div>
  )
}

export default Header