import React from 'react'

const JobCard = (props) => { //pull in usersViewed array through here as well

  const title = props.title
  const location = props.location
  const business = props.business
  const text = props.text
  const jobrole = props.jobrole.jobrole
  const image = props.image
  
  return (<>
    <div className="jobCardWrapper">
      <div id="jobCardTitle">Title: {title}</div>
      <img className="jobCardImage" src={image} alt="Job Image"></img>
      <div className="jobCardData">
        business {business} location {location} jobrole {jobrole} <br/>
        text: {text}
      </div>  
    </div>
  </>)
}
export default JobCard