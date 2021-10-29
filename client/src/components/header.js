import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/helpers'
import { getPayload } from '../helpers/auth.js'
import axios from 'axios'

const Header = () => {


  const history = useHistory()
  const location = useLocation()
  

  const [ allBizData, setAllBizData ] = useState([])
  const [ bizInfo, setBizInfo ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/business-profile/')
        setAllBizData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    
  }, [])
  let pageID = ''

  const findMatchingId = () => {
    for (let i = 0; i < allBizData.length; i++){
      if (allBizData[i].owner.id === userID){
        pageID = allBizData[i].id
      }
    }
  }

  let userID = 0


  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/business-profile/${pageID}`,
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          })
        setBizInfo({ ...data })
      } catch (error) {
        console.log(error)
      }
    }    
    getData()
  }, [userID])
  
  if (userIsAuthenticated()){
    userID = getPayload().sub
    findMatchingId()
  }

  const ownerStuff = { ...bizInfo.owner }
  const ownerUsername = ownerStuff.username

  useEffect(() => {
  }, [location.pathname])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <div id='navbar'>
      <div id="navwrap">
        <Link to="/jobs" id="navLink">Jobs</Link>
        <Link to="/all-businesses" id="navLink">Businesses</Link>
        <Link to="/all-employees" id="navLink">Employees</Link>
        {
          userIsAuthenticated() ? 
            <>
              <Link to="/profile/redirector" id="navLink">Profile: {ownerUsername}</Link>
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