import React from 'react'
import { Link } from 'react-router-dom'


const EmployeeCard = ({ id, firstname, lastname, location, coverletter, image }) => {

  return (<>
    <Link to={`/all-employees/${ id }`} id="employeeLink">
      <div className="employeeCardWrapper">
        <img className="employeeCardImage" src={image} alt="Employee Image"></img>
        <div className="employeeCardNotImage">
          <div id="employeeCardTitle">{lastname}, {firstname}</div>
          <div className="employeeCardData">
            {location} <br/>
            {coverletter ? coverletter.slice(0, 25) : <></>}
          </div>  
        </div> 
      </div>
    </Link> 
  </>)
}
export default EmployeeCard