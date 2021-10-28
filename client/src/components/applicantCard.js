import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const ApplicantCard = ({ businessID, id, firstname, lastname, location, coverletter, image }) => {

  // need to do a single business get on the user logged in
  // need to pass the business into a single click business PUT that updates the business's associated Userprofiles
  // const acceptButton = document.getElementById(`acceptApplicant${id}`)

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

  let owner = {}
  let Userprofiles = []
  let ownerID = 0
  if (business.id){
    owner = business.owner
    ownerID = owner.id
    Userprofiles = business.Userprofiles
    // console.log(`Business ${business.id} has hired: `, Userprofiles)
  }
  
  const handleAccept = async () => {
    try {
      console.log(`userprofile ${id} now works for ${businessID}!`)
      Userprofiles.push(id)
      await axios.put(`/api/business-profile/${businessID}/`, { 
        owner: ownerID,
        Userprofiles: Userprofiles,
      })
    } catch (err) {
      console.log(err)  
    }
  }

  return (<>
    <div className="applicantCardWrapper">
      <Link to={`/all-employees/${ id }`} id="applicantLink">
        <div id="applicantCardTitle">Name: {firstname} {lastname}</div>
        <img className="applicantCardImage" src={image} alt="applicant Image"></img>
        <div className="applicantCardData">
          location {location} <br/>
          cover letter {coverletter}
        </div>  
      </Link>  
      <button id={`acceptApplicant${id}`} onClick={handleAccept}>Accept Applicant</button>
    </div>
  </>)
}
export default ApplicantCard