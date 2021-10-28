import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { userIsAuthenticated } from '../helpers/helpers.js'


const MainPage = () => {

  // login or registration, can toggle between two forms
  // don't display header or footer

  // Token storage
  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  // History
  const history = useHistory()

  // State and changehandle for both Login and Register
  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
  }

  // ## LOGIN ##

  const handleLogSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      
      history.push('/jobs')

    } catch (err) {
      console.log(err)
    }
  }

  // ## REGISTER ##
  
  const afterRegLogin = async () => {
    try {
      const { data } = await axios.post('api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      history.push('/profile/creation')

    } catch (err) {
      console.log(err.message)
    }
  }
  const handleRegSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('api/auth/register/', formData)

    } catch (err) {
      console.log(err.message)
    }
    afterRegLogin()
  }


  return (
    <div className='d-flex justify-content-around m-5'>
      <div className="loginPage">
        <div className="logContainer">
          <div className="logBox" id="logBox">
            <form id="logForm" onSubmit={handleLogSubmit}>
              <h3 id="logTitle">LOGIN</h3>
              <div className="form-field logField">
                <label htmlFor="email" className="logLabel">Email</label>
                <input onInput={handleChange} type="email" name="email" placeholder="Email" value={formData.email}/>
              </div>
              <div className="form-field logField">
                <label htmlFor="password" className="logLabel">Password</label>
                <input onInput={handleChange} type="password" name="password" placeholder="Password" value={formData.password} />
              </div>
              <button className='btn btn-dark' id="logBtn">Login</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="regPage">
        <div className="regBox" id="regBox">
          <form onSubmit={handleRegSubmit} id="regForm">
            <h3 id="regTitle">REGISTRATION </h3>
            <div className="form-field regField" >
              <label htmlFor="username" className="regLabel">Username</label>
              <input onInput={handleChange} className="regInputField" type="text" name="username" placeholder="Username" value={formData.username} />
            </div>
            <div className="form-field regField">
              <label htmlFor="email" className="regLabel">Email</label>
              <input onInput={handleChange} className="regInputField" type="email" name="email" placeholder="Email" value={formData.email}/>
            </div>
            <div className="form-field regField">
              <label htmlFor="password" className="regLabel">Password</label>
              <input onInput={handleChange} className="regInputField" type="password" name="password" placeholder="Password" value={formData.password} />
            </div>
            <div className="form-field regField">
              <label htmlFor="password_confirmation" className="regLabel">Confirmation</label>
              <input onInput={handleChange} className="regInputField" type="password" name="password_confirmation" placeholder="Password Confirmation"  value={formData.password_confirmation} />
            </div>
            <button className="btn btn-dark " id="regBtn">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MainPage

// {userIsAuthenticated ? <p>Register</p> : <span></span> } 