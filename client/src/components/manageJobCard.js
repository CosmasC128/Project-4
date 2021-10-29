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
  const Userprofiles = [ ...props.Userprofiles ]
  let availabilityText = ''

  // *** CHANGE AVAILABILITY ~~~ UPDATE JOB ~~~ DELETE JOB

  const [ business, setBusiness ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/business-profile/${businessID}/`)
        setBusiness({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

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
        document.getElementById(`toggleAvailability${id}`).style.color = 'inherit'
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
  
  const updateShower = document.getElementById(`updating${id}`)
  const updateShower2 = document.getElementById(`updating2${id}`)
  const updateShower3 = document.getElementById(`updating3${id}`)
  const updateShower4 = document.getElementById(`updating4${id}`)
  const updateShower5 = document.getElementById(`updating5${id}`)
  const updateShower6 = document.getElementById(`updating6${id}`)
  const updateShowerbtn = document.getElementById(`updatingbtn${id}`)
  
  const showUpdate = () => {
    if ((updateShower.style.display !== 'flex') && (updateShower3.style.display !== 'flex') && (updateShower5.style.display !== 'flex')) {
      updateShower2.style.display = 'flex'
      updateShower3.style.display = 'flex'
      updateShower4.style.display = 'flex'
      updateShower5.style.display = 'flex'
      updateShower6.style.display = 'flex'
      updateShower.style.display = 'flex'
      updateShowerbtn.innerHTML = 'Cancel'
    } else {
      updateShower.style.display = 'none'
      updateShower2.style.display = 'none'
      updateShower3.style.display = 'none'
      updateShower4.style.display = 'none'
      updateShower5.style.display = 'none'
      updateShower6.style.display = 'none'
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

  // console.log(business)
  if (business){
    console.log(business.image, 'business.image')
  }
  let reconstructedImage = ''
  if (business.image){
    reconstructedImage = 'https://i.imgur.com/' + (business.image).slice(-7) + '.jpeg'
    console.log(reconstructedImage, 'reconstructed image job card')
  }

  return (<>

    <div className="manageJobWrapper" id={'job' + String(id)} style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="manageJobTopHalf">
        <div className="manageJobInfo" style={{ textAlign: 'center' }}>
          <img className="manageJobImage" src={reconstructedImage} style={{ height: '100px', width: '100px' }} alt="Job Image"></img>
          <div className="manageJobNotImage">
            <div id="manageJobTitle">{title}<form onSubmit={handleUpdateSub}><input id={`updating${id}`} onChange={handleUpdate} style={{ display: 'none' }} type='text' name='title' value={formData.title} placeholder='Change title here'></input><button  style={{ display: 'none' }} id={`updating2${id}`} >Update</button></form></div>
            <div className="manageJobLocRole">
              {location} 
              <form onSubmit={handleUpdateSub}><input id={`updating3${id}`} onChange={handleUpdate} style={{ display: 'none' }} type='text' name='location' value={formData.location} placeholder='Change loc here'></input><button  style={{ display: 'none' }} id={`updating4${id}`}>Update</button></form>
            </div>
            <div className="manageJobLocRole">
              {jobroleName}
            </div><div className="manageJobLocRole">
              {text}<form onSubmit={handleUpdateSub}><input id={`updating5${id}`} onChange={handleUpdate} style={{ display: 'none' }} type='text' name='text' value={formData.text} placeholder='Change text here'></input><button  style={{ display: 'none' }} id={`updating6${id}`}>Update</button></form>
            </div>
          </div>
        </div>
        <div className="manageJobButtons">
          <button id={`toggleAvailability${id}`} onClick={handleAvailability} style={ availability === true ? { color: 'inherit' } : { color: 'red' }}>{availability === true ? 'Available' : 'Unavailable'}</button>
          <button id={`updatingbtn${id}`}  onClick={showUpdate}>Update</button>
          <button id={`delete${id}`} onClick={handleDelete}>Delete</button>
          <button className="sureButton" id={`areYouSure${id}`} onClick={handleAreYouSure}>Are You Sure?</button>
          <button id={`applicants${id}`} onClick={ handleShow }>Applicants</button>
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