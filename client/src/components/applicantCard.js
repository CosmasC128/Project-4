import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const ApplicantCard = ({ businessID, id, owner, firstname, lastname, location, image, Businessprofile }) => {

  // need to do a single business get on the user logged in
  // need to pass the business into a single click business PUT that updates the business's associated Userprofiles
  // const acceptButton = document.getElementById(`acceptApplicant${id}`)
  console.log(image, 'image')

  let reconstructedImage = ''
  if (image){
    if (id !== 36){
      reconstructedImage = 'https://i.imgur.com/' + image.slice(-11)
    } else {
      reconstructedImage = 'https://i.imgur.com/' + image.slice(-12)
    }
  }

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

  let Userprofiles = []
  let businessOwner = {}
  let businessOwnerID = 0
  const userOwnerID = owner.id
  if (business.id){
    businessOwner = business.owner
    businessOwnerID = businessOwner.id
    Userprofiles = business.Userprofiles
    // console.log(`Business ${business.id} has hired: `, Userprofiles)
  }
  
  const handleAccept = async () => {
    try {
      console.log(`userprofile ${id} now works for ${businessID}!`)
      Userprofiles.push(id) // id here is the ID of the userprofile being accepted by the business
      await axios.put(`/api/business-profile/${businessID}/`, { 
        owner: businessOwnerID, //owner id here has to be the owner of the business profile page
        Userprofiles: Userprofiles,
      })
      // above adds user ID into Userprofiles on the business profile page,
      //below adds businessprofile ID into Businessprofile on the userprofile page
      Businessprofile.push(business.id)
      // console.log(Businessprofile, 'here is the business profile update')
      await axios.put(`/api/user-profile/${id}/`, { 
        owner: userOwnerID, //owner id here has to be the id of the owner of the userprofile page
        Businessprofile: Businessprofile,
      })
    } catch (err) {
      console.log(err)  
    }
  }

  return (<>
    <div className="applicantCardWrapper">
      <img className="applicantCardImage" src={reconstructedImage} style={{ height: '120px', width: '120px' }} alt="applicant Image"></img>
      <div className="applicantNotImage">  
        <div className="applicantOverButton">  
          <Link to={`/all-employees/${ id }`} id="applicantLink">
            <div id="applicantCardTitle">{lastname}, {firstname}</div>
            <div className="applicantCardData">
              {location}
            </div>  
          </Link>
        </div>  
        <button id={`acceptApplicant${id}`} onClick={handleAccept}>Hire!</button>
      </div>  
    </div>
  </>)
}
export default ApplicantCard