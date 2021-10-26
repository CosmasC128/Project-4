import React from 'react'
import { Link } from 'react-router-dom'


const BusinessCard = ({ id, owner, title, location, description, image }) => { //pull in usersViewed array through here as well

  if (id){
    console.log(id, 'id', owner, 'owner', title, 'title', location, 'location', description, 'description', image, 'image', 'FROM THE BUSINESS CARD')
  }

  return (<>
    <div className="businessCardWrapper">
      <Link to={`/all-businesses/${ id }`} id="businessLink">
        <div id="businessCardTitle">{title} title</div>
        <img className="businessCardImage" src={image} alt="Business thumbnail"></img>
        <div className="businessCardData">
          location {location} <br/>
          description {description}
        </div>  
      </Link>  
    </div>
  </>)
}
export default BusinessCard