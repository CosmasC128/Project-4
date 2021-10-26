import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {

  // sexy header for the whole website, don't display on MainPaige(?)
  // Business profile is standin for private user profile that switches for whomever the user is
  return (
    <div id='navbar'>
      <div id="navwrap">
        <Link to="/jobs" id="navLink">Jobs</Link>
        <Link to="/all-businesses" id="navLink">Businesses</Link>
        <Link to="/all-employees" id="navLink">Employees</Link>
        <Link to="/private-business-profile" id="navLink">Profile</Link>
      </div>
    </div>
  )
}

export default Header