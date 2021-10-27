import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { getPayload } from '../helpers/auth.js'

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
  const jobroleID = props.jobrole.id
  const image = props.image
  const Userprofiles = [ ...props.Userprofiles ]

  // *** GET THE LOGGED IN USERS ID, USE IT TO FIND THEIR PROFILE
  // that profile id will be later pushed into the applicants array in the job post
  const userID = 4 // getPayload().sub only add this in once I have a login functionality
  let profileID = 0
  // console.log(userID, 'userid if it exists')

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
  console.log(profileID)

  // get the associated business to provide link to business and business name
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

  // buttons for expanding the job post and applying

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



  const jobCard = document.getElementById(`job${id}`)
  const jobCardMax = document.getElementById(`jobCardMax${id}`)
  if (jobCardMax){
    jobCardMax.style.display = 'none'
  }

  const handleExpand = () => {
    if (jobCard.style.color !== 'blue') {
      jobCard.style.color = 'blue'
      jobCardMax.style.display = 'flex'
    } else {
      jobCard.style.color = 'black'
      jobCardMax.style.display = 'none'
    }
  }

  return (<>
    <div className="jobCardWrapper" id={'job' + String(id)}>
      <button id="expandJobCard" onClick={handleExpand}>VIEW</button>
      <img className="jobCardImage" src={image} alt="Job Image"></img>
      <div id="jobCardTitle">Title: {title}</div>
      <div className="jobCardLocRole">
        location {location} jobrole {jobroleName}
      </div>
      <div className="jobCardMin">
        Posted By <Link to={`/all-businesses/${businessID}`} id="jobCardBusinessLink">{business.title}</Link> <br/>
      </div>
      <div id={`jobCardMax${id}`}>
        text: {text}
        <button id={`applyToJobCard${id}`} onClick={handleApply}>Apply</button>
      </div>
    </div>
  </>)
}

export default JobCard