import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const JobCard = (props) => { //pull in usersViewed array through here as well

  // Get job post fields from passed props
  const id = props.id
  const title = props.title
  const location = props.location
  const businessID = props.business
  const text = props.text
  const jobrole = props.jobrole.jobrole
  const image = props.image
  
  // get the associated business to provide link to business and business name
  const [ business, setBusiness ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`api/business-profile/${ businessID }`)
        setBusiness({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [businessID])

  // buttons for expanding the job post and applying

  // apply to the job

  // const handleApply = async () => {
  //   try {
  //     await axios.put(
  //       `/api/matches/${matchId}/comments/${_id}`,
  //       {
  //         headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
  //       }
  //     )
  //     getMatch()
  //   } catch (err) {
  //     console.log(err)  
  //   }
  // }

  const jobCard = document.getElementById(`job${id}`)
  const jobCardMax = document.getElementById(`jobCardMax${id}`)
  if (jobCardMax){
    jobCardMax.style.display = 'none'
  }

  const handleExpand = () => {
    if (jobCard.style.color !== 'blue') {
      jobCard.style.color = 'blue'
      jobCardMax.style.display = 'flex'
    } else {
      jobCard.style.color = 'red'
      jobCardMax.style.display = 'none'
    }
  }

  return (<>
    <div className="jobCardWrapper" id={'job' + String(id)}>
      <button id="expandJobCard" onClick={handleExpand}>VIEW</button>
      <img className="jobCardImage" src={image} alt="Job Image"></img>
      <div id="jobCardTitle">Title: {title}</div>
      <div className="jobCardLocRole">
        location {location} jobrole {jobrole}
      </div>
      <div className="jobCardMin">
        <Link to={`/all-businesses/${businessID}`} id="jobCardBusinessLink">{business.title}</Link> <br/>
      </div>
      <div id={`jobCardMax${id}`}>
        text: {text}
        <button id="applyToJobCard" >Apply</button>
      </div>
    </div>
  </>)
  // onClick={handleApply}
}
export default JobCard