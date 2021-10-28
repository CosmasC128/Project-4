import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import ApplicantCard from './applicantCard.js'


const ManageJobCard = (props) => { 
  const history = useHistory()
  const getTokenFromLocalStorage = () => {
    return window.localStorage.getItem('token')
  }
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
  
  const updateShower = document.getElementById('updating')
  const updateShower2 = document.getElementById('updating2')
  const updateShowerbtn = document.getElementById('updatingbtn')
  
  const showUpdate = () => {
    if (updateShower.style.display !== 'flex') {
      updateShower2.style.display = 'flex'
      updateShower.style.display = 'flex'
      updateShowerbtn.innerHTML = 'Cancel'
    } else {
      updateShower.style.display = 'none'
      updateShower2.style.display = 'none'
      updateShowerbtn.innerHTML = 'Modify'
    }
  }

  const [ formData, setFormData ] = useState({
    jobrole: '',
    location: '',
    text: '',
    title: '',
    
  })
  
  // Input form handle for both
  const handleUpdate = (event) => {
    const newObj = { ...formData, 
      owner: ownerID,
      jobrole: jobroleID,
      location: location,
      text: text,
      business: businessID,
      Userprofiles: Userprofiles,
      [event.target.name]: event.target.value }
    
    setFormData(newObj)
  }

  const handleUpdateSub = async () => {
    try {
      await axios.put(`/api/jobposts/${id}/`, formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push(`/profile/business/${businessID}/manage-jobs`)
    } catch (err) {
      console.log(err.message)
    }
  }

<<<<<<< HEAD



  // <input onChange={handleJobPost} type='text' name='title' value={jobFormData.title} placeholder='Change it here'>1</input>
  // <input onChange={handleJobPost} type='text' name='location' value={jobFormData.location} placeholder='Change it here'>2</input>
  // <input onChange={handleJobPost} type='text' name='title' value={jobFormData.jobrole} placeholder='Change it here'>3</input>

=======
>>>>>>> d2e083c35dc85a94c483a8a65ce0248035cdc868
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
          <div>
            <img className="manageJobImage" src={image} alt="Job Image"></img>
            <div id="manageJobTitle">Title: {title}<form onSubmit={handleUpdateSub}><input id='updating' onChange={handleUpdate} style={{ display: 'none' }} type='text' name='title' value={formData.title} placeholder='Change it here'></input><button  style={{ display: 'none' }} id='updating2'>Update</button></form><button id='updatingbtn' onClick={showUpdate}>Modify</button></div>
            <div className="manageJobLocRole">
            Location: {location} 
            </div>
            <div className="manageJobLocRole">
            Jobrole: {jobroleName}
            </div><div className="manageJobLocRole">
            Job Description: {text}
            </div>
          
          </div>
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