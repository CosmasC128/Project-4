import React from 'react'
import { Link } from 'react-router-dom'


const EmployeeCard = ({ id, firstname, lastname, location, coverletter, image }) => { //pull in usersViewed array through here as well

  return (<>
    <div className="employeeCardWrapper">
      <Link to={`/all-employeees/${ id }`} id="employeeLink">
        <div id="employeeCardTitle">Name: {first_name} {last_name}</div>
        <img className="employeeCardImage" src={image} alt="Employee Image"></img>
        <div className="employeeCardData">
          location {location} <br/>
          cover_letter {cover_letter.slice(0, 30)}
        </div>  
      </Link>  
    </div>
  </>)
}
export default EmployeeCard