import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getPayload, getTokenFromLocalStorage } from '../helpers/helpers.js'
import { useHistory } from 'react-router'

const PublicEmployeeProfile = () => {

  // can view employee info include rating, can rate employee here if have relationship

  const { id } = useParams()
  const userID = getPayload().sub // this is the ID 
  let profileID = 0
  const history = useHistory()

  const [ employee, setEmployee ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/user-profile/${ id }/`)
        setEmployee({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  const Businessprofile = employee.Businessprofile // this will always empty ADD A METHOD TO PUSH business profiles into employee array, on application(?)
  // console.log(employee, 'employee')
  // console.log(employee.Businessprofiles, 'employee Businessprofiles')

  // get ALL the users, then find the userprofile for the currently logged in user

  const findProfileId = () => {
    for (let i = 0; i < businessesArray.length; i++){
      if (businessesArray[i].owner.id === userID){
        profileID = businessesArray[i].id 
      }
    }
  }

  const [ businessesArray, setBusinessesArray ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/business-profile/')
        setBusinessesArray(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  findProfileId()

  const [ business, setBusiness ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        if (profileID > 0){
          const { data } = await axios.get(`/api/business-profile/${profileID}`)
          setBusiness({ ...data })
        } else {
          console.log('not ready yet')
        }
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [businessesArray])  
  
  const verifyRelationship = () => {
    if (business.id){ // fix this here
      if (Businessprofile.includes(business.id)){
        return true
      } else {
        return false
      }
    }
  }


  // gary code below

  const firstName = employee.firstname
  const lastName = employee.lastname
  const location = employee.location
  const image = employee.image
  const cv = employee.cv
  const coverLetter = employee.coverletter
  //! Using Let variables so we can redefine within the if statement for rendering in jsx
  let onerating
  let total = 0 
  let avgRating
  let passionTotal = 0
  let avgPassion = 0
  let presenceTotal = 0
  let avgPresence = 0
  let punctualityTotal = 0
  let avgPunctuality = 0
  let presentationTotal = 0
  let avgPresentation = 0
  
  //!check that we have an employee id and that we actually have a rating or this will not display
  if (employee.id && employee.businessratings.length > 0){
    onerating = employee.businessratings
    // console.log(onerating, 'onerating')
    
    for (let i = 0; i < onerating.length; i++){
      total += onerating[i].passion + onerating[i].presence + onerating[i].punctuality + onerating[i].presentation
      // console.log(onerating[i].passion, 'passion', onerating[i].presence, 'presence', onerating[i].punctuality, 'punctuality', onerating[i].presentation   )
    }
    //Get the average overall rating for an employee user
    avgRating = total / (onerating.length * 4)
    // console.log(avgRating, 'avgrating')
    //Get the average overall passion rating for one employee user
    for (let j = 0 ; j < onerating.length; j++){
      passionTotal += onerating[j].passion 
    }
    avgPassion = (passionTotal / onerating.length)
    //Get the average overall presence rating for one employee user
    for (let k = 0 ; k < onerating.length; k++){
      presenceTotal += onerating[k].presence 
    }
    avgPresence = (presenceTotal / onerating.length)
    //Get the average overall punctuality rating for one employee user
    for (let l = 0 ; l < onerating.length; l++){
      punctualityTotal += onerating[l].punctuality 
    }
    avgPunctuality = (punctualityTotal / onerating.length)
    //Get the average overall presentation rating for one employee user
    for (let m = 0 ; m < onerating.length; m++){
      presentationTotal += onerating[m].presentation 
    }
    avgPresentation = (presentationTotal / onerating.length)
  }

  const reviewButton = document.getElementById('reviewBusinessForm')
  
  if (verifyRelationship() === true){
    // console.log('youve worked together and can review this business')
    reviewButton.style.display = 'flex'
  }

  const [ formData, setFormData ] = useState({
    passion: '',
    presence: '',
    punctuality: '',
    presentation: '',
  })

  const handleReviewChange = (event) => {
    const newObj = { ...formData, userprofile: id, [event.target.name]: event.target.value }
    
    setFormData(newObj)
  }

  const handleReview = async () => {
    try {
      // console.log(profileID, 'has reviewed this business')
      await axios.post('/api/busrating/', formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push(`/api/all-employees/${id}/`)
    } catch (err) {
      console.log(err)  
    }
  }


  return (
    <>
      {employee.id ? 
        <div className="publicEmployeeProfileWrapper">
          <div className="d-flex p-2">
            <div className="d-flex-row p-2"><h1><strong>Employee Profile Page</strong></h1></div><br />
            <div className="d-flex-row p-2"> {firstName}  {lastName}</div> <br />
            <div className="d-flex-column p-2">{image} 😊 </div> <br />
            <div className="d-flex-column p-2">{location}🏡 </div> <br />
            <div className="d-flex-column p-2">{avgRating}⭐️</div> <br />
            <div className="d-flex p-2">{avgPresence}😃 {avgPassion} 😡 {avgPresentation} 👨🏻‍💼 {avgPunctuality} ⏰</div> <br />
            <div className="d-flex p-2"><strong>{firstName}s CV {cv} 🧾</strong></div> <br />
            <div className="d-flex p-2"><strong>Cover Letter: {coverLetter} 📄</strong></div> <br />
          </div>
          <div>
            <form id='reviewBusinessForm' onSubmit={handleReview} style={{ display: 'none' }}>
              <label>Passion</label>
              <select onChange={handleReviewChange} name="passion" value={formData.passion}>
                <option value="1">one star</option>
                <option value="2">two star</option>
                <option value="3">three star</option>
                <option value="4">four star</option>
                <option value="5">five star</option>
              </select>
              <label>Presence</label>
              <select onChange={handleReviewChange} name="presence" value={formData.presence}>
                <option value="1">one star</option>
                <option value="2">two star</option>
                <option value="3">three star</option>
                <option value="4">four star</option>
                <option value="5">five star</option>
              </select>
              <label>Punctuality</label>
              <select onChange={handleReviewChange} name="punctuality" value={formData.punctuality}>
                <option value="1">one star</option>
                <option value="2">two star</option>
                <option value="3">three star</option>
                <option value="4">four star</option>
                <option value="5">five star</option>
              </select>
              <label>Presentation</label>
              <select onChange={handleReviewChange} name="presentation" value={formData.presentation}>
                <option value="1">one star</option>
                <option value="2">two star</option>
                <option value="3">three star</option>
                <option value="4">four star</option>
                <option value="5">five star</option>
              </select>
              <button>Rate Employee</button>
            </form>
          </div>
        </div>
        : 
        <>Loading</>
      }
    </>
  )
}

export default PublicEmployeeProfile