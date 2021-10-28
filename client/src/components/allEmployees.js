import React, { useEffect, useState } from 'react'
import axios from 'axios'

import EmployeeCard from './employeeCard.js'
import EmployeeFilters from './employeeFilters.js'

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


  const [ filteredEmployees, setFilteredEmployees ] = useState([])
  const [ filters, setFilters ] = useState({ searchTerm: '' })

  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    setFilters(newObj)
  }
  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setFilteredEmployees(employees.filter(employee => {
      return regexSearch.test(String(employee.firstname + ' ' + employee.lastname))
    }))
  }, [filters, employees])

  return (<>
    <div className="allEmployeesWrapper">
      <div id="aboveAllEmployeesGrid">
        <h1 id="allEmployeesTitle">All The Employees</h1>
        <h2 id="allEmployeesFlavour">Search for Employees to work at, or to review.</h2>
      </div>
      <EmployeeFilters handleFilterChange={handleFilterChange} {...filters}/>
      <div className="allEmployeesGrid">
        { ( filters.searchTerm !== '' ? filteredEmployees : employees).map(employee => { 
          return <EmployeeCard key={employee.id} { ...employee } />
        })}
      </div>
    </div>
  </>)
}

export default AllEmployees