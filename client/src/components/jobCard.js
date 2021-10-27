import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { getPayload } from '../helpers/auth.js'

const JobCard = (props) => { //pull in usersViewed array through here as well
  // console.log(props, 'props')
  // Get job post fields from passed props
  const id = props.id
  const owner = props.owner
  const title = props.title
  const location = props.location
  const businessID = props.business
  const text = props.text
  const jobrole = props.jobrole.jobrole
  const image = props.image
  const Userprofiles = props.Userprofiles

  // const userID = getPayload().sub

  // console.log(userID, 'userid if it exists')

  // const findUserprofileId = () => {
  //   for (let i = 0; i < allUserData.length; i++){
  //     if (allUserData[i].owner.id === userID){
  //       PageID = allUserData[i].id
  //     }
  //   }
  // }

  // findMatchingId()


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

  const handleApply = async () => {
    try {
      console.log('youve applied to this job')
      Userprofiles.push(4)
      console.log(Userprofiles, 'updated profiles after push')
      await axios.put(`api/jobposts/${id}/`, { 
        Userprofiles: Userprofiles,
        id: id,
        owner: owner,
        title: title,
        location: location,
        businessID: businessID,
        text: text,
        jobrole: jobrole,
      })
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
        location {location} jobrole {jobrole}
      </div>
      <div className="jobCardMin">
        <Link to={`/all-businesses/${businessID}`} id="jobCardBusinessLink">{business.title}</Link> <br/>
      </div>
      <div id={`jobCardMax${id}`}>
        text: {text}
        <button id="applyToJobCard" onClick={handleApply}>Apply</button>
      </div>
    </div>
  </>)
}

export default JobCard