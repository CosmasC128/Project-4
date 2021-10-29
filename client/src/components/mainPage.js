import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// import { userIsAuthenticated } from '../helpers/helpers.js'


const MainPage = () => {

  // login or registration, can toggle between two forms
  // don't display header or footer
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

  const loginForm = document.getElementById('login')
  const registerForm = document.getElementById('register')
  // const question = document.getElementById('question-box')
  const handleUserShow = () => {
    if (loginForm.style.display !== 'flex'){
      loginForm.style.display = 'flex'
      registerForm.style.display = 'none'
      
    } else {
      loginForm.style.display = 'none'
    }
  }
  const handleEmpShow = () => {
    if (registerForm.style.display !== 'flex'){
      registerForm.style.display = 'flex'
      loginForm.style.display = 'none'
      
    } else {
      registerForm.style.display = 'none'
    }
  }


  return (
    <div className="mainPageWrapper">

      <div className="regPage" id='question-box'>
        <div className="regBox row" id="regForm">
          <button onClick={handleUserShow}>Login</button>
          <button onClick={handleEmpShow}>Register</button>
        </div>
      </div>

      <div className='d-flex justify-content-around m-5'>
        <div id="login" style={{ display: 'none' }}> 
          <div className="loginPage">
            <div className="logContainer">
              <div className="logBox" id="logBox">
                <form id="logForm" onSubmit={handleLogSubmit}>
                  <h3 id="logTitle">LOGIN</h3>
                  <div className="formLabelInputWrap">
                    <label htmlFor="email" className="logLabel">Email</label>
                    <input onInput={handleChange} type="email" name="email" placeholder="Email" value={formData.email}/>
                  </div>
                  <div className="formLabelInputWrap">
                    <label htmlFor="password" className="logLabel">Password</label>
                    <input onInput={handleChange} type="password" name="password" placeholder="Password" value={formData.password} />
                  </div>
                  <button className='btn btn-dark' id="logBtn">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div> 
        <div id="register" style={{ display: 'flex' }} >
          <div className="regPage" >
            <div className="regBox" id="regBox">
              <form onSubmit={handleRegSubmit} id="regForm">
                <h3 id="regTitle">REGISTRATION </h3>
                <div className="formLabelInputWrap" >
                  <label htmlFor="username" className="regLabel">Username</label>
                  <input onInput={handleChange} className="regInputField" type="text" name="username" placeholder="Username" value={formData.username} />
                </div>
                <div className="formLabelInputWrap">
                  <label htmlFor="email" className="regLabel">Email</label>
                  <input onInput={handleChange} className="regInputField" type="email" name="email" placeholder="Email" value={formData.email}/>
                </div>
                <div className="formLabelInputWrap">
                  <label htmlFor="password" className="regLabel">Password</label>
                  <input onInput={handleChange} className="regInputField" type="password" name="password" placeholder="Password" value={formData.password} />
                </div>
                <div className="formLabelInputWrap">
                  <label htmlFor="password_confirmation" className="regLabel">Confirmation</label>
                  <input onInput={handleChange} className="regInputField" type="password" name="password_confirmation" placeholder="Password Confirmation"  value={formData.password_confirmation} />
                </div>
                <button className="btn btn-dark " id="regBtn">Register</button>
              </form>
            </div>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default MainPage

// {userIsAuthenticated ? <p>Register</p> : <span></span> } 