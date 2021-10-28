import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import ApplicantCard from './applicantCard.js'

const ManageJobCard = (props) => { 

  //need to re-render the page when availability changes
  // *** JOB POST INFORMATION (CENTER OF PAGE)
  const id = props.id
  const ownerID = props.owner.id 
  const title = props.title
  const location = props.location
  const businessID = props.business 
  const availability = props.available
  const text = props.text
  const jobroleName = props.jobrole.jobrole
  const jobroleID = props.jobrole.id
  const image = props.image
  const Userprofiles = [ ...props.Userprofiles ]
  let availabilityText = ''

  // ***  

  // {
  //   "id": 1,
  // ***  "owner": 2,
  // ***  "jobrole": 2,
  //   "title": "Taco maker - Spicy Shack - south london location",
  //   "location": "london",
  //   "text": "10 pounds an hour, back breaking labour, bring a shovel",
  //   "available": true,
  // ***  "business": 2,
  //  *** "Userprofiles": [
  //     3,
  //     4
  //   ]
  // }

  // *** CHANGE AVAILABILITY ~~~ UPDATE JOB ~~~ DELETE JOB

  const handleSubmit = async () => {
    console.log(`submit job # ${id}`)
  }

  if (availability === true){
    availabilityText = 'Available'
  } else {
    availabilityText = 'Unavailable'
  }

  const handleAvailability = async () => {
    if (availabilityText === 'Available' ){
      try {
        availabilityText = 'Unavailable'
        document.getElementById(`toggleAvailability${id}`).innerHTML = availabilityText
        document.getElementById(`toggleAvailability${id}`).style.color = 'red'
        await axios.put(`/api/jobposts/${id}/`, { 
          available: false,
          owner: ownerID,
          jobrole: jobroleID,
          title: title,
          location: location,
          text: text,
          business: businessID,
          Userprofiles: Userprofiles,
        })
      } catch (err) {
        console.log(err)  
      }
    } else {
      try {
        availabilityText = 'Available'
        document.getElementById(`toggleAvailability${id}`).innerHTML = availabilityText
        document.getElementById(`toggleAvailability${id}`).style.color = 'black'
        await axios.put(`/api/jobposts/${id}/`, { 
          available: true,
          owner: ownerID,
          jobrole: jobroleID,
          title: title,
          location: location,
          text: text,
          business: businessID,
          Userprofiles: Userprofiles,
        })
      } catch (err) {
        console.log(err)  
      }
    }
  }

  const handleDelete = async () => {
    const finalDeleteButton = document.getElementById(`areYouSure${id}`)
    if (finalDeleteButton.style.display !== 'flex'){
      finalDeleteButton.style.display = 'flex'
    } else {
      finalDeleteButton.style.display = 'none'
    }
  }

  const handleAreYouSure = async () => {
    console.log(`You don't actually want to delete job # ${id}`)
  }

  // *** DISPLAY USERS APPLIED TO JOB AND ACCEPT USERS

  const [ applicants, setApplicants ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/user-profile/')
        const arr1 = Object.values({ ...data })
        const applicantsOnly = arr1.filter(userprofile => Userprofiles.includes(userprofile.id))
        setApplicants(applicantsOnly)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const allApplicants = document.getElementById(`allApplicants${id}`)

  const handleShow = () => {
    if (allApplicants.style.display !== 'flex') {
      allApplicants.style.display = 'flex'
      if (Userprofiles.length < 1){
        allApplicants.innerHTML = 'No Applicants Yet'
      }
    } else {
      allApplicants.style.display = 'none'
      allApplicants.innerHTML = ''
    }
  }

  return (<>
    <div className="manageJobWrapper" id={'job' + String(id)} style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="manageJobTopHalf" style={{ display: 'flex' }}>
        <div className="manageJobButtons" style={{ display: 'flex', flexDirection: 'column', width: '120px', marginRight: '10px' }}>
          <button id={`toggleAvailability${id}`} onClick={handleAvailability} style={ availability === true ? { color: 'black' } : { color: 'red' }}>{availability === true ? 'Available' : 'Unavailable'}</button>
          <button id={`submit${id}`} onClick={handleSubmit}>Update Job</button>
          <button id={`delete${id}`} onClick={handleDelete}>Delete</button>
          <button className="sureButton" id={`areYouSure${id}`} onClick={handleAreYouSure}>Are You Sure?</button>
          <button id={`applicants${id}`} onClick={ handleShow }>Show Applicants</button>
        </div>
        <div className="manageJobInfo" style={{ textAlign: 'center' }}>
          <img className="manageJobImage" src={image} alt="Job Image"></img>
          <div id="manageJobTitle">Title: {title}</div>
          <div className="manageJobLocRole">
            location: {location} - jobrole: {jobroleName}
          </div>
          text: {text}
        </div>
      </div>
      <div className="manageBottomHalf" style={{ textAlign: 'center', marginBottom: '25px' }}>
        <div id={`allApplicants${id}`} style={{ display: 'none' }}>
          { applicants.map(applicant => { 
            return <ApplicantCard key={applicant.id} { ...{ ...applicant, businessID } }/>
          })}
        </div>
      </div>
    </div>
  </>)
}

export default ManageJobCard