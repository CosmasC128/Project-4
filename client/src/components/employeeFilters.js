import React from 'react'

const EmployeeFilters = ({ handleFilterChange, searchTerm }) => {

  return (
    <>
      <div className="employeeFilterWrapper" style={{ marginBottom: '40px' }}>
        <input onChange={handleFilterChange} name="searchTerm" value={searchTerm} placeholder=' search employees'/>
      </div>
    </>
  )
}

export default EmployeeFilters