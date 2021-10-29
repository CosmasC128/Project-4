import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ManageJobCard from './manageJobCard.js'
import { useParams } from 'react-router'
import { getTokenFromLocalStorage } from '../helpers/helpers.js'

const ManageJobs = () => {
  const { id } = useParams()

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

  const [ jobFormData, setJobFormData ] = useState({
    jobrole: '',
    location: '',
    text: '',
    title: '',
    
  })
  
  // Input form handle for both
  const handleJobPost = (event) => {
    const newObj = { ...jobFormData, business: id, [event.target.name]: event.target.value }
    
    setJobFormData(newObj)
  }

  const handleJobSub = async () => {
    try {
      await axios.post('/api/jobposts/', jobFormData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push(`/profile/business/${id}/manage-jobs`)
    } catch (err) {
      console.log(err.message)
    }
  }
  const [ jobroles, setJobroles ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/jobroles/')
        setJobroles(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <>
      <div className="manageJobsPageWrapper">
        <h1 >Manage your Job Listings</h1>
        <div className="createJobPostWrap">
          <h2 id="manageJobPostsTitle">CREATE JOB POST</h2>
          <form onSubmit={handleJobSub} id="manageJobsPostJobsForm">
            <div className="postJobPostInputWrappers">
              <label>Title</label>
              <input onChange={handleJobPost} type='text' name='title' value={jobFormData.title} placeholder='add title'></input>
            </div>
            <div className="postJobPostInputWrappers">
              <label>Jobrole</label>
              <input onChange={handleJobPost} type='text' name='jobrole' value={jobFormData.jobrole} placeholder='add job role' style={{ display: 'none' }}></input>
              <select onChange={handleJobPost} name="jobrole" value={jobFormData.jobrole}>
                <option value="">-</option>
                { jobroles.map(job => { 
                  return <option key={job.id} value={`${job.id}`}>{job.jobrole}</option>
                })}
              </select>
            </div>
            <div className="postJobPostInputWrappers">
              <label>Location</label>
              <input onChange={handleJobPost} type='text' name='location' value={jobFormData.location} placeholder='add location'></input>
            </div>
            <div className="postJobPostInputWrappers" id="postJobTextArea">
              <label>Job description</label>
              <textarea onChange={handleJobPost} type="text" name='text' value={jobFormData.text} placeholder='add job description'/>
            </div>
            <button>CREATE POST</button>
          </form>
        </div>
        
        {business.id ? 
          <div className="jobcardWrapper">
            {jobposts.map(job => {
              return <ManageJobCard key={job.id} { ...job }  />
            })}
          </div>
          : 
          <>Loading</>
        }
      </div>
    </>
  )
}

export default ManageJobs