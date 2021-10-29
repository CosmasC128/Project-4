import React from 'react'
import { Link } from 'react-router-dom'


const BusinessCard = ({ id, title, location, description, image }) => { //pull in usersViewed array through here as well

  return (<>
    <Link to={`/all-businesses/${ id }`} id="businessLink">
      <div className="businessCardWrapper">
        <img className="businessCardImage" src={image} alt="Business Image"></img>
        <div className="businessCardNotImage">
          <div id="businessCardTitle">{title}</div>
          <div className="businessCardData">
            {location} <br/>
            {description}
          </div>  
        </div>
      </div>
    </Link> 
  </>)
}
export default BusinessCard