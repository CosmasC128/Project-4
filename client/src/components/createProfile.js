import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/helpers'

const CreateProfile = () => {


  console.log(getTokenFromLocalStorage())
  // needs toggle for employee or business, two forms, one post method for each
  // upon completion go to either manage jobs, or all jobs page

  // History
  const history = useHistory()

  // ## USER CREATION ##

  // Inputs data to post for both
  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    location: '',
    cover_letter: '',
    cv: '',
    title: '',
    description: '',
  })
  
  // Input form handle for both
  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
  }
  
  // ## EMPLOYEE CREATION ##

  const handleUserSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/user-profile/', formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push('/private-employee-profile')
    } catch (err) {
      console.log(err.message)
    }
  }

  // ## BUSINESS CREATION ##

  const handleBizSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/business-profile/', formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push('/private-business-profile')
    } catch (err) {
      console.log(err.message)
    }
  }


  return (
    <div className='d-flex justify-content-around m-5'>

      {/* User creation */}
      <div className="regPage">
        <div className="regBox" id="regBox">
          <form onSubmit={handleUserSubmit} id="regForm">
            <h3 id="regTitle">USER REGISTRATION</h3>
            <div className="form-field regField" >
              <label htmlFor="username" className="regLabel">First Name</label>
              <input onInput={handleChange} className="regInputField" type="text" name="first_name" placeholder="First Name" value={formData.first_name} />
            </div>
            <div className="form-field regField">
              <label htmlFor="email" className="regLabel">Last Name</label>
              <input onInput={handleChange} className="regInputField" type="text" name="last_name" placeholder="Last Name" value={formData.last_name}/>
            </div>
            <div className="form-field regField">
              <label htmlFor="password" className="regLabel">Location</label>
              <input onInput={handleChange} className="regInputField" type="text" name="location" placeholder="Location" value={formData.location} />
            </div>
            <div className="form-field regField">
              <label htmlFor="password_confirmation" className="regLabel">Cover Letter</label>
              <textarea onInput={handleChange} className="regInputField" type="text" name="cover_letter" placeholder="Type your Cover Letter"  value={formData.cover_letter} />
            </div>
            <div className="form-field regField">
              <label htmlFor="password_confirmation" className="regLabel">CV</label>
              <textarea onInput={handleChange} className="regInputField" type="text" name="cv" placeholder="Type your CV"  value={formData.cv} />
            </div>
            <button className="btn btn-dark " id="regBtn">Register</button>
          </form>
        </div>
      </div>

      {/* Business creation */}
      <div className="regPage">
        <div className="regBox" id="regBox">
          <form onSubmit={handleBizSubmit} id="regForm">
            <h3 id="regTitle">BUSINESS REGISTRATION</h3>
            <div className="form-field regField" >
              <label htmlFor="username" className="regLabel">Business Name</label>
              <input onInput={handleChange} className="regInputField" type="text" name="title" placeholder="Business Name" value={formData.title} />
            </div>
            <div className="form-field regField">
              <label htmlFor="email" className="regLabel">Location</label>
              <input onInput={handleChange} className="regInputField" type="text" name="location" placeholder="Location" value={formData.location}/>
            </div>
            <div className="form-field regField">
              <label htmlFor="password" className="regLabel">Description</label>
              <input onInput={handleChange} className="regInputField" type="text" name="description" placeholder="Describe what your business does" value={formData.description} />
            </div>
            <button className="btn btn-dark " id="regBtn">Register</button>
          </form>
        </div>
      </div>


    </div>
  )
}

export default CreateProfile