import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ManageJobCard from './manageJobCard.js'

const ManageJobs = () => {
  const id = 2

  const [ business, setBusiness ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/business-profile/${id}/`)
        setBusiness({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  let jobposts
  if (business.id){
    jobposts = business.jobposts
  }

  return (
    <>
      
      <p>Manage your Job Listings: </p>
      {business.id ? 
        <div className="manageJobsPageWrapper">
          {jobposts.map(job => {
            return <ManageJobCard key={job.id} { ...job }  />
          })}
        </div>
        : 
        <>Loading</>
      }
    </>
  )
}

export default ManageJobs