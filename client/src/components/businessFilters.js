import React from 'react'

const BusinessFilters = ({ handleFilterChange, searchTerm }) => {

  return (
    <>
      <div className="businessFilterWrapper" style={{ marginBottom: '40px' }}>
        <input onChange={handleFilterChange} name="searchTerm" value={searchTerm} placeholder=' search businesss'/>
      </div>
    </>
  )
}

export default BusinessFilters