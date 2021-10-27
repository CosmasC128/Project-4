import JobCard from './jobCard.js'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllJobs = () => {

  // this should have a map of the Jobs cards

  const [ jobs, setJobs ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/jobs/')
        console.log(data)
        setJobs(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  // <Filters id="matchesFilters" handleFilterChange={handleFilterChange} handleSortBy={handleSortBy} {...filters}/>
  // (filters.searchTerm !== '' ? searchMatches : sortedArray )
  return (<>
    <div className="allJobsWrapper">
      <div id="aboveAllJobsGrid">
        <h1 id="allJobsTitle">All The Jobs</h1>
        <h2 id="allJobsFlavour">Search for Jobs to work at, or to review.</h2>
      </div>
      <div className="allJobsGrid">
        { jobs.map(job => { 
          return <JobCard key={job.id} { ...job } />
        })}
      </div>
    </div>
  </>)
}

export default AllJobs