import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getPayload } from '../helpers/auth.js'
import { useHistory } from 'react-router-dom'


const ProfileRedirector = () => {

  const [userProfiles, setUserProfiles ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/user-profile/')
        setUserProfiles(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const [businessProfiles, setBusinessProfiles ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/business-profile/')
        setBusinessProfiles(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const history = useHistory()
  let profileType = ''
  let profileID = 0
  const userID = getPayload().sub
  let bigArray = []
  if (userProfiles.length > 0){
    bigArray = userProfiles.concat(businessProfiles)
    // console.log(userProfiles.length)
    // console.log(businessProfiles.length)
    // console.log(bigArray.length)
  }

  const findProfileId = () => {
    for (let i = 0; i < bigArray.length; i++){
      if (bigArray[i].owner.id === userID){
        profileID = bigArray[i].id
        if (typeof bigArray[i].firstname === typeof 'cat'){
          profileType = 'employee'
        } else {
          profileType = 'business'
        }
        history.push(`/profile/${profileType}/${profileID}`)
      }
      // if (profileID > 0){
      //   console.log('profile ID found ', profileID)
      // }
    }
  }

  findProfileId()


  return (<>
    Loading your profile...
  </>)
}
export default ProfileRedirector