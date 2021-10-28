import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PublicEmployeeProfile = () => {

  // can view employee info include rating, can rate employee here if have relationship

  const { id } = useParams()
  console.log(id)
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
    console.log(onerating, 'onerating')
    
    for (let i = 0; i < onerating.length; i++){
      total += onerating[i].passion + onerating[i].presence + onerating[i].punctuality + onerating[i].presentation
      console.log(onerating[i].passion, 'passion', onerating[i].presence, 'presence', onerating[i].punctuality, 'punctuality', onerating[i].presentation   )
    }
    //Get the average overall rating for an employee user
    avgRating = total / (onerating.length * 4)
    console.log(avgRating, 'avgrating')
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
  return (
    <>
      {employee.id ? 
        <div className="d-flex p-2">
          <div className="d-flex-row p-2"><h1><strong>Employee Profile Page</strong></h1></div><br/>
          <div className="d-flex-row p-2"> {firstName}  {lastName}</div> <br/>
          <div className="d-flex-column p-2">{image} 😊 </div> <br/>
          <div className="d-flex-column p-2">{location}🏡 </div> <br/>
          <div className="d-flex-column p-2">{avgRating}⭐️</div> <br/>
          <div className="d-flex p-2">{avgPresence}😃 {avgPassion} 😡 {avgPresentation} 👨🏻‍💼 {avgPunctuality} ⏰</div> <br/>
          <div className="d-flex p-2"><strong>{firstName}s CV {cv} 🧾</strong></div> <br/>
          <div className="d-flex p-2"><strong>Cover Letter: {coverLetter} 📄</strong></div> <br/>
        </div>
        : 
        <>Loading</>
      }
    </>
  )
}

export default PublicEmployeeProfile