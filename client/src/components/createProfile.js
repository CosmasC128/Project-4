import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/helpers'

const CreateProfile = () => {
  
  // History
  const history = useHistory()

  const [ employees, setEmployees ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/user-profile/')
        setEmployees(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  console.log(employees)
  // ## USER CREATION ##

  // Inputs data to post for both
  const [ formData, setFormData ] = useState({
    firstname: '',
    lastname: '',
    location: '',
    coverletter: '',
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
      history.push('/profile/redirector')
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
      history.push('/profile/redirector')
    } catch (err) {
      console.log(err.message)
    }
  }

  const employeeForm = document.getElementById('user-creation')
  const BusinessForm = document.getElementById('business-creation')
  // console.log(employeeForm)
  // const question = document.getElementById('question-box')
  const handleUserShow = () => {
    if (employeeForm){
      if (employeeForm.style.display !== 'flex'){
        employeeForm.style.display = 'flex'
        BusinessForm.style.display = 'none'
      } else {
        employeeForm.style.display = 'none'
        BusinessForm.style.display = 'flex'
        // question.innerHTML = 'Job seeker'
      }
    } else {
      console.log('that get element by id isn\'t working')
    }
  }
  // const handleEmpShow = () => {
  //   if (BusinessForm.style.display === 'none'){
  //     BusinessForm.style.display = 'flex'
  //     question.style.display = 'none'
  //   } else {
  //     BusinessForm.style.display = 'none'
  //   }
  // }
  //formLabelInputWrap
  return (
    <div className="profileCreationWrapper">
      <div className="regPage">
        <div id="toggleUserBusinessBox">
          <div>Do you want to register as:</div>
          <button id='question-box' onClick={handleUserShow}>Toggle</button>
        </div>
      </div>
      {/* User creation */} 
      <div id="user-creation" style={{ display: 'flex' }} >
        <div className="regPage">
          <div className="regBox" id="regBox">
            <form onSubmit={handleUserSubmit} id="regForm">
              <h3 id="regTitle">REGISTER AS A JOB SEEKER</h3>
              <div className="formLabelInputWrap" >
                <label htmlFor="username" className="regLabel">First Name</label>
                <input onInput={handleChange} className="regInputField" type="text" name="firstname" placeholder="First Name" value={formData.firstname} />
              </div>
              <div className="formLabelInputWrap">
                <label htmlFor="email" className="regLabel">Last Name</label>
                <input onInput={handleChange} className="regInputField" type="text" name="lastname" placeholder="Last Name" value={formData.lastname}/>
              </div>
              <div className="formLabelInputWrap">
                <label htmlFor="password" className="regLabel">Location</label>
                <input onInput={handleChange} className="regInputField" type="text" name="location" placeholder="Location" value={formData.location} />
              </div>
              <div className="formLabelInputWrap" id="formLabelInputWrapTextareaCL">
                <label htmlFor="password_confirmation" className="regLabel">Cover Letter</label>
                <textarea onInput={handleChange} className="regInputField" type="text" name="coverletter" placeholder="Paste your Cover Letter"  value={formData.coverletter} />
              </div>
              <div className="formLabelInputWrap" id="formLabelInputWrapTextareaCV">
                <label htmlFor="cv" className="regLabel">CV</label>
                <textarea onInput={handleChange} className="regInputField" type="text" name="cv" placeholder="Paste your CV"  value={formData.cv} />
              </div>
              <button id="regBtn">Create Profile</button>
            </form>
          </div>
        </div>
      </div>
      {/* Business creation */}
      <div id="business-creation" style={{ display: 'none' }}> 
        <div className="regPage">
          <div className="regBox" id="regBox">
            <form onSubmit={handleBizSubmit} id="regForm">
              <h3 id="regTitle">REGISTER AS A BUSINESS</h3>
              <div className="formLabelInputWrap" >
                <label htmlFor="username" className="regLabel">Business Name</label>
                <input onInput={handleChange} className="regInputField" type="text" name="title" placeholder="Business Name" value={formData.title} />
              </div>
              <div className="formLabelInputWrap">
                <label htmlFor="email" className="regLabel">Location</label>
                <input onInput={handleChange} className="regInputField" type="text" name="location" placeholder="Location" value={formData.location}/>
              </div>
              <div className="formLabelInputWrap">
                <label htmlFor="password" className="regLabel">Description</label>
                <input onInput={handleChange} className="regInputField" type="text" name="description" placeholder="Describe what your business does" value={formData.description} />
              </div>
              <button className="btn btn-dark " id="regBtn">Create Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProfile