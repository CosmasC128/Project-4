import React, { useEffect, useState } from 'react'
import axios from 'axios'

import JobCard from './jobCard.js'
import JobFilters from './jobFilters.js'

const AllJobs = () => {

  // this should have a map of the Jobs cards

  const [ jobs, setJobs ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/jobs/')
        const dataArray = Object.values({ ...data })
        const availableOnly = dataArray.filter(job => job.available === true) //only save available jobs
        setJobs(availableOnly)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])


  const [ filteredJobs, setFilteredJobs ] = useState([])
  const [ filters, setFilters ] = useState({ role: 'All', searchTerm: '' })

  // Handle updates to select and text input
  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    setFilters(newObj)
  }

  // Listening for updates on Jobs and filters and updating filteredJobs
  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setFilteredJobs(jobs.filter(job => {
      return regexSearch.test(job.title) && (filters.role === job.jobrole.jobrole || filters.role === 'All')
    }))
  }, [filters, jobs])

  return (<>
    <div className="allJobsWrapper">
      <div id="aboveAllJobsGrid">
        <h1 id="allJobsTitle">All The Jobs</h1>
        <h2 id="allJobsFlavour">Search for Jobs by title or by job role</h2>
      </div>
      <JobFilters handleFilterChange={handleFilterChange} {...filters}/>
      <div className="allJobsGrid">
        { ( filters.role !== '' || filters.searchTerm !== '' ? filteredJobs : jobs).map(job => { 
          return <JobCard key={job.id} { ...job } />
        })}
      </div>
    </div>
  </>)
}

export default AllJobs