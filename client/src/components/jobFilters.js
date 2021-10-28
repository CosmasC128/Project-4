import React, { useEffect, useState } from 'react'
import axios from 'axios'

const JobFilters = ({ handleFilterChange, role, searchTerm }) => {

  const [ jobroles, setJobroles ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/jobroles/')
        setJobroles(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <>
      <div className="jobFilterWrapper" style={{ marginBottom: '40px' }}>
        <select onChange={handleFilterChange} name="role" value={role}>
          <option value="All">All</option>
          { jobroles.map(job => { 
            return <option key={job.id} value={`${job.jobrole}`}>{job.jobrole}</option>
          })}
        </select>
        <input onChange={handleFilterChange} name="searchTerm" value={searchTerm} placeholder=' search jobs'/>
      </div>
    </>
  )
}

export default JobFilters