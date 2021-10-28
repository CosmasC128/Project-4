import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/helpers'
import { useParams } from 'react-router'

const BusinessProfile = () => {
  const { id } = useParams()
  const history = useHistory()

  const pageID = id

  const [ bizInfo, setBizInfo ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/business-profile/${pageID}`)
        setBizInfo({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    
  }, [])

  const ownerStuff = { ...bizInfo.owner }
  const ownerID = ownerStuff.id
  const ownerEmail = ownerStuff.email
  const ownerUsername = ownerStuff.username

  const [ formData, setFormData ] = useState({
    title: '',
  })
  const [ formData2, setFormData2 ] = useState({
    location: '',
  })
  const [ formData3, setFormData3 ] = useState({
    description: '',
  })

  const handleChange = (event) => {
    const newObj = { ...formData, owner: ownerID, [event.target.name]: event.target.value }
    setFormData(newObj)
  }
  const handleChange2 = (event) => {
    const newObj = { ...formData2, owner: ownerID, [event.target.name]: event.target.value }
    setFormData2(newObj)
  }

  const handleChange3 = (event) => {
    const newObj = { ...formData3, owner: ownerID, [event.target.name]: event.target.value }
    setFormData3(newObj)
  }
  const handleSubmit = async () => {
  
    try {
      await axios.put(`/api/business-profile/${pageID}/`, formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push(`/profile/business/${pageID}`)
    } catch (err) {
      console.log(err.message)
    }
  }
  const handleSubmit2 = async () => {
  
    try {
      await axios.put(`/api/business-profile/${pageID}/`, formData2,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push(`/profile/business/${pageID}`)
    } catch (err) {
      console.log(err.message)
    }
  }
  const handleSubmit3 = async () => {
  
    try {
      await axios.put(`/api/business-profile/${pageID}/`, formData3,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push(`/profile/business/${pageID}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <div className="businessProfileWrapper">
        {bizInfo ? 
          <div className='d-flex row text-center'>
            <p >This is your profile</p>
            <p>Name of Business: {bizInfo.title ? bizInfo.title : <span>Loading...</span>}</p><form onSubmit={handleSubmit}><input type="text" name="title" onInput={handleChange}  value={formData.title} placeholder="New Name of Business"/><button >Update</button></form>
            <p>Location of Business: {bizInfo.location ? bizInfo.location : <span>Loading...</span>}</p><form onSubmit={handleSubmit2}><input onInput={handleChange2} type="location" name="location" placeholder="New Location of Business" value={formData.location} /><button>Update</button></form>
            <p>Description of Business: {bizInfo.description ? bizInfo.description : <span>Loading...</span>}</p><form onSubmit={handleSubmit3}><input onInput={handleChange3} type="description" name="description" placeholder="New Description of Business" value={formData.description}/><button>Update</button></form>
            <p>Image of Business: {bizInfo.image ? bizInfo.image : <span>Loading...</span>}</p>
            <p>Email of Business: {ownerEmail ? ownerEmail : <span>Loading...</span>}</p>
            <p>Username of Business: {ownerUsername ? ownerUsername : <span>Loading...</span>}</p>  
            <Link to={`/profile/business/${pageID}/manage-jobs`}>Manage your job posts</Link>
          </div>
          :
          <div>Loading...</div>
        }
      </div>
    </>
  )
}

export default BusinessProfile