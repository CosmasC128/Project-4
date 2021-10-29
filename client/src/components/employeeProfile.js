import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/helpers'
import { useParams } from 'react-router'

const EmployeeProfile = () => {
  const { id } = useParams()
  const history = useHistory()
  
  const pageID = id


  
  const [ userData, setUserInfo ] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/user-profile/${pageID}`)
        setUserInfo({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    
  }, [])

  const ownerStuff = { ...userData.owner }
  const ownerID = ownerStuff.id
  // const ownerEmail = ownerStuff.email
  // const ownerUsername = ownerStuff.username

  const [ formData, setFormData ] = useState({
    firstname: '',
  })
  const [ formData2, setFormData2 ] = useState({
    lastname: '',
  })
  const [ formData3, setFormData3 ] = useState({
    coverletter: '',
  })
  const [ formData4, setFormData4 ] = useState({
    cv: '',
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
  const handleChange4 = (event) => {
    const newObj = { ...formData4, owner: ownerID, [event.target.name]: event.target.value }
    setFormData4(newObj)
  }
  const handleSubmit = async () => {
  
    try {
      await axios.put(`/api/user-profile/${pageID}/`, formData,
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
      await axios.put(`/api/user-profile/${pageID}/`, formData2,
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
      await axios.put(`/api/user-profile/${pageID}/`, formData3,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push(`/profile/business/${pageID}`)
    } catch (err) {
      console.log(err.message)
    }
  }
  const handleSubmit4 = async () => {
  
    try {
      await axios.put(`/api/user-profile/${pageID}/`, formData4,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push('/profile/employee/:id')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <div className="employeeProfileWrapper">
        {userData ? 
          <div className="userUpdateFormWrapper">
            <h2 id="userUpdateTitle" >Welcome, {userData.firstname}!</h2>
            <h3 style={{ textAlign: 'center', width: '100%' }}>Edit your profile data:</h3>
            <p>First Name: {userData.firstname ? userData.firstname : <span>Loading...</span>}</p>
            <form className="userUpdateFormWraps" onSubmit={handleSubmit} >
              <input type="text" name="firstname" placeholder="New First Name" onInput={handleChange}  value={formData.firstname} />
              <button>Update</button>
            </form>
            
            <p>Last Name: {userData.lastname ? userData.lastname : <span>Loading...</span>}</p>
            <form className="userUpdateFormWraps" onSubmit={handleSubmit2} >
              <input type="text" name="lastname" placeholder="New Last Name" onInput={handleChange2}  value={formData2.lastname} />
              <button>Update</button>
            </form>
            
            <p>COVER LETTER: {userData.coverletter ? userData.coverletter : <span>Loading...</span>}</p><form className="userUpdateFormWraps" onSubmit={handleSubmit3} ><input type="text" name="coverletter" placeholder="New First Name" onInput={handleChange3}  value={formData3.coverletter} /><button>Update</button></form>
            
            <p>CV: {userData.cv ? userData.cv : <span>Loading...</span>}</p>
            <form className="userUpdateFormWraps" onInput={handleSubmit4} >
              <input type="text" name="cv" placeholder="New First Name" onInput={handleChange4}  value={formData.cv} />
              <button>Update</button>
            </form>
          </div>
          :
          <div>Loading...</div>
        }
      </div>
    </>
  )
}

export default EmployeeProfile