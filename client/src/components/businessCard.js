import React from 'react'
import { Link } from 'react-router-dom'


const BusinessCard = ({ id, title, location, description, image }) => { //pull in usersViewed array through here as well

  let reconstructedImage = ''
  if (image){
    reconstructedImage = 'https://i.imgur.com/' + image.slice(-7) + '.jpeg'
  }

  return (<>
    <Link to={`/all-businesses/${ id }`} id="businessLink">
      <div className="businessCardWrapper">
        <img className="businessCardImage" src={reconstructedImage} alt="Business Image" style={{ height: '120px', width: '120px' }}></img>
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