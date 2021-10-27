import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ManageJobCard from './manageJobCard.js'

const ManageJobs = () => {
  const id = 2
  // add update or delete job templates/posts, accept employees applications
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

  let businessID
  let title
  let location
  let jobposts

  if (business.id){
    businessID = business.id
    jobposts = business.jobposts
  }

  // let total = 0
  // console.log(jobposts[0].punishment)
  // for (let i = 0; i < jobposts.length; i++){
  //   total += employeeReviews[i].pay + employeeReviews[i].patience + employeeReviews[i].positivity + employeeReviews[i].punishment
  // }
  // const avgRating = total / (employeeReviews.length * 4)
  // console.log(avgRating)

  return (
    <>
      {business.id ? 
        <footer>
          {title} <br/>
          {location} <br/>
          {businessID} <br/>
          {jobposts.map(job => {
            return <ManageJobCard key={job.id} { ...job }  />
          })}
        </footer>
        : 
        <>Loading</>
      }
    </>
  )
}

export default ManageJobs