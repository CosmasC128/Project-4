import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/helpers'
import { getPayload } from '../helpers/auth.js'
import axios from 'axios'

const Header = () => {


  const history = useHistory()
  const location = useLocation()
  

  const [ allBizData, setAllBizData ] = useState([])

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
  let pageID = 0

  const findMatchingId = () => {
    for (let i = 0; i < allBizData.length; i++){
      if (allBizData[i].owner.id === userID){
        pageID = allBizData[i].id
      }

    }
  }

  let userID = 0
  
  if (userIsAuthenticated()){
    userID = getPayload().sub
  }
  findMatchingId()

  const [ business, setBusiness ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        if (pageID > 0){
          const { data } = await axios.get(`/api/business-profile/${pageID}/`)
          setBusiness({ ...data })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  // console.log(business, 'business')
  const ownerStuff = { ...business.owner }
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
              <Link to="/profile/redirector" id="navLink">Profile: { ownerUsername ? ownerUsername : 'CosmasC' }</Link>
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