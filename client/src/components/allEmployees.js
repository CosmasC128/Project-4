import EmployeeCard from './employeeCard.js'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllEmployees = () => {

  // this should have a map of the employees cards

  const [ employees, setEmployees ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/user-profile/')
        setEmployees(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  // console.log( 'type of Employees: ', typeof Employees)
  // console.log(employees, 'employees')
  // <Filters id="matchesFilters" handleFilterChange={handleFilterChange} handleSortBy={handleSortBy} {...filters}/>
  // (filters.searchTerm !== '' ? searchMatches : sortedArray )
  return (<>
    <div className="allEmployeesWrapper">
      <div id="aboveAllEmployeesGrid">
        <h1 id="allEmployeesTitle">All The Employees</h1>
        <h2 id="allEmployeesFlavour">Search for Employees to work at, or to review.</h2>
      </div>
      <div className="allEmployeesGrid">
        { employees.map(employee => { 
          return <EmployeeCard key={employee.id} { ...employee } />
        })}
      </div>
    </div>
  </>)
}

export default AllEmployees