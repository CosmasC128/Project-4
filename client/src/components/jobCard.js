import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getPayload, userIsAuthenticated } from '../helpers/auth.js'

const JobCard = (props) => { //pull in usersViewed array through here as well
  // console.log(props, 'props')
  // Get job post fields from passed props
  const id = props.id
  const ownerID = props.owner.id
  const title = props.title
  const location = props.location
  const businessID = props.business
  // const available = props.available
  const text = props.text
  const jobroleName = props.jobrole.jobrole
  // console.log(props.jobrole, 'jobrole')
  // console.log(props.jobrole.jobrole, 'jobrole.jobrole')
  const jobroleID = props.jobrole.id
  const Userprofiles = [ ...props.Userprofiles ]

  // *** GET THE LOGGED IN USERS ID, USE IT TO FIND THEIR PROFILE
  // *** FIND THE USERPROFILE, SET THE PROFILE ID BASED ON IT
  // *** THIS IS LATER USED TO PUSH USERPROFILE ID INTO ARRAY ON JOB POST

  let profileID = 0
  let userID = 0
  if (userIsAuthenticated()){
    userID = getPayload().sub
  }

  const findProfileId = () => {
    for (let i = 0; i < usersArray.length; i++){
      if (usersArray[i].owner.id === userID){
        profileID = usersArray[i].id 
      }
    }
  }
  const [ usersArray, setUsersArray ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/user-profile/')
        setUsersArray(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  findProfileId()
  // console.log('checking profile and user id', profileID, userID, 'profile id then user id')
  // *** FIND ASSOCIATED BUSINESS TO LINK JOB POST TO BUSINESS PROFILE
  const [ business, setBusiness ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`api/business-profile/${ businessID }`)
        setBusiness({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [businessID])

  console.log(business)
  if (business){
    console.log(business.image, 'business.image')
  }
  let reconstructedImage = ''
  if (business.image){
    reconstructedImage = 'https://i.imgur.com/' + (business.image).slice(-7) + '.jpeg'
    console.log(reconstructedImage, 'reconstructed image job card')
  }
  // *** APPLY TO THE JOB

  const applyButton = document.getElementById(`applyToJobCard${id}`)
  const handleApply = async () => {
    try {
      console.log(profileID, 'has applied to this job')
      Userprofiles.push(profileID)
      // console.log(Userprofiles, 'updated profiles after push')
      await axios.put(`api/jobposts/${id}/`, { 
        owner: ownerID,
        jobrole: jobroleID,
        title: title,
        location: location,
        text: text,
        business: businessID,
        Userprofiles: Userprofiles,
      })
      applyButton.style.color = 'green'
      applyButton.disabled = 'true'
    } catch (err) {
      console.log(err)  
    }
  }

  // *** MAXIMIZE JOB CARD TO APPLY
  const jobCardMax1 = document.getElementById(`jobCardMax1${id}`)
  const jobCardMax2 = document.getElementById(`jobCardMax2${id}`)

  if (jobCardMax1 && jobCardMax2){
    jobCardMax1.style.display = 'none'
    jobCardMax2.style.display = 'none'
  }
  const handleExpand = () => {
    if (jobCardMax1.style.display !== 'flex') {
      jobCardMax1.style.display = 'flex'
      jobCardMax2.style.display = 'flex'
    } else {
      jobCardMax1.style.display = 'none'
      jobCardMax2.style.display = 'none'
    }
  }

  return (<>
    <div className="jobCardWrapper" id={'job' + String(id)}>
      <img className="jobCardImage" src={reconstructedImage} style={{ height: '100px', width: '100px' }} alt="Job Image"></img>
      <div className="jobCardNotImage">
        <div className="jobCardMinData">
          <div id="jobCardTitle">{title}</div>
          <div className="jobCardSubheading">
            <div>
              {location} 
            </div>
            <div>-</div>
            <div>
              {jobroleName}
            </div>
            <div>-</div>
            <div className="jobCardBusinessLink">
              <Link to={`/all-businesses/${businessID}`} id="jobCardBusinessLink">{business.title}</Link> <br/>
            </div>
          </div>
        </div>  
        <div className="jobCardMaxedData" id={`jobCardMax1${id}`}>
          {text}
        </div>
        <div className="jobCardButtons">
          <button id="expandJobCard" onClick={handleExpand}>VIEW MORE</button>
          <div className="jobCardMaxedData" id={`jobCardMax2${id}`}>
            { userIsAuthenticated() ? 
              <button id={`applyToJobCard${id}`} onClick={handleApply}>Apply</button> 
              :
              <></>
            }
          </div>
        </div>  
      </div>  
    </div>
  </>)
}

export default JobCard