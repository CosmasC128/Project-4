import React from 'react'
import { Link } from 'react-router-dom'


const EmployeeCard = ({ id, firstname, lastname, location, coverletter, image }) => { //pull in usersViewed array through here as well

  return (<>
    <div className="employeeCardWrapper">
      <Link to={`/all-employees/${ id }`} id="employeeLink">
        <div id="employeeCardTitle">Name: {firstname} {lastname}</div>
        <img className="employeeCardImage" src={image} alt="Employee Image"></img>
        <div className="employeeCardData">
          location {location} <br/>
          cover letter {coverletter}
        </div>  
      </Link>  
    </div>
  </>)
}
export default EmployeeCard