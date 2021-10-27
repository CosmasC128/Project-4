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
  // const jobAvailibilityToggler = document.getElementById(`availability${id}`)

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
        document.getElementById(`toggleAvailability${id}`).innerHTML = availabilityText
        document.getElementById(`toggleAvailability${id}`).style.color = 'black'
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

  return (<>
    <div className="manageJobWrapper" id={'job' + String(id)}>
      <img className="manageJobImage" src={image} alt="Job Image"></img>
      <div id="manageJobTitle">Title: {title}</div>
      <div className="manageJobLocRole">
        location: {location} - jobrole: {jobroleName}
      </div>
      <div className="manageJobMin">
        text: {text}
        <div id={`availability${id}`}>{availability === true ? 'Available' : 'Unavailable'}</div>
        <button id={`toggleAvailability${id}`} onClick={handleAvailability}>Toggle Availability</button>
        <button id={`submit${id}`} onClick={handleSubmit}>Submit Changes</button>
        <button id={`delete${id}`} onClick={handleDelete}>Delete</button>
        <button className="sureButton" id={`areYouSure${id}`} onClick={handleAreYouSure}>Are You Sure?</button>
      </div>
    </div>
  </>)
}

export default ManageJobCard