import React from 'react' //, { useState, useEffect }
// import { Link } from 'react-router-dom'
import axios from 'axios'

const ManageJobCard = (props) => { 

  //need to re-render the page when availability changes

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

  // *** CHANGE AVAILABILITY AND SUBMIT FORM

  const handleSubmit = async () => {
    console.log(`submit job # ${id}`)
  }
  const jobAvailibilityToggler = document.getElementById(`availability${id}`)
  const availabilityButton = document.getElementById(`toggleAvailability${id}`)
  if  (jobAvailibilityToggler){
    if (availability === true){
      availabilityText = 'Available'
      console.log(availabilityButton, 'this is here')
      // availabilityButton.innerHTML = availabilityText
    } else {
      availabilityText = 'Unavailable'
      // availabilityButton.innerHTML = availabilityText
    }
  }


  const handleAvailability = async () => {
    if (availabilityText === 'Available' ){
      try {
        availabilityText = 'Unavailable'
        console.log(`job # ${id} is now: `, availabilityText)
        // availabilityButton.innerHTML = availabilityText
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
        console.log(`job # ${id} is now: `, availabilityText)
        // availabilityButton.innerHTML = availabilityText
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
    console.log(`You don't actually want to delete job # ${id}`)
  }
  return (<>
    <div className="manageJobWrapper" id={'job' + String(id)}>
      <img className="manageJobImage" src={image} alt="Job Image"></img>
      <div id="manageJobTitle">Title: {title}</div>
      <div className="manageJobLocRole">
        location: {location} - jobrole: {jobroleName}
      </div>
      <div className="manageJobMin">
        text: {text}
        <div id={`availability${id}`}>{availabilityText}</div>
        <button id={`toggleAvailability${id}`} onClick={handleAvailability}>Availability</button>
        <button id={`submit${id}`} onClick={handleSubmit}>Submit Changes</button>
        <button id={`delete${id}`} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </>)
}

export default ManageJobCard