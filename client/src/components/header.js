import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/helpers'
// import { getPayload } from '../helpers/auth.js'


const Header = () => {

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
  }, [location.pathname])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  // sexy header for the whole website, don't display on MainPaige(?)
  // Business profile is standin for private user profile that switches for whomever the user is
  return (
    <div id='navbar'>
      <div id="navwrap">
        <Link to="/jobs" id="navLink">Jobs</Link>
        <Link to="/all-businesses" id="navLink">Businesses</Link>
        <Link to="/all-employees" id="navLink">Employees</Link>
        {
          userIsAuthenticated() ? 
            <>
              <Link to="/profile/redirector" id="navLink">Profile</Link>
              <span id="navLinkLogout" onClick={handleLogout}>Logout</span>
            </>
            :
            <>
              <Link to="/" id="navLink">Login/Register</Link>
              <Link to="/profile/creation" id="navLink">Profile Creation</Link>
            </>
        }
      </div>
    </div>
  )
}

export default Header