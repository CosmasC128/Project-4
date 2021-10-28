import React from 'react'
import { Link } from 'react-router-dom'


const ApplicantCard = ({ id, firstname, lastname, location, coverletter, image }) => {

  // need to do a single business get on the user logged in
  // need to pass the business into a single click business PUT that updates the business's associated Userprofiles
  // const acceptButton = document.getElementById(`acceptApplicant${id}`)

  const handleAccept = async () => {
    try {
      console.log(`userprofile ${id} now works for you!`)
      // Userprofiles.push(profileID)
      // console.log(Userprofiles, 'updated profiles after push')
      // await axios.put(`api/jobposts/${id}/`, { 
      //   owner: ownerID,
      //   jobrole: jobroleID,
      //   title: title,
      //   location: location,
      //   text: text,
      //   business: businessID,
      //   Userprofiles: Userprofiles,
      // })
      // applyButton.style.color = 'green'
      // applyButton.disabled = 'true'
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