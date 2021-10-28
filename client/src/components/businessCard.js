import React from 'react'
import { Link } from 'react-router-dom'


const BusinessCard = ({ id, title, location, description, image }) => { //pull in usersViewed array through here as well

  return (<>
    <div className="businessCardWrapper">
      <Link to={`/all-businesses/${ id }`} id="businessLink">
        <div id="businessCardTitle">{title} title</div>
        <img className="businessCardImage" src={image} alt="Business Image"></img>
        <div className="businessCardData">
          location {location} <br/>
          description {description}
        </div>  
      </Link>  
    </div>
  </>)
}
export default BusinessCard