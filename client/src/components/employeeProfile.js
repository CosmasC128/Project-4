import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getPayload, getTokenFromLocalStorage } from '../helpers/helpers'

const EmployeeProfile = () => {

  // business can update profile info that's it. (put method only)

  const [ userData, setUserInfo ] = useState([])
  const [ allUserData, setAllUserData ] = useState([])
  const userID = getPayload().sub

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/user-profile/'
        )
        setAllUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    
  }, [])
  console.log('Users',allUserData)
  let pageID = ''

  const findMatchingId = () => {
    for (let i = 0; i < allUserData.length; i++){
      if (allUserData[i].owner.id === userID){
        pageID = allUserData[i].id
      }
    }
  }

  findMatchingId()

  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/user-profile/${pageID}`,
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          })
        setUserInfo({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    
  }, [pageID])

  const ownerStuff = { ...userData.owner }
  const ownerID = ownerStuff.id
  const ownerEmail = ownerStuff.email
  const ownerUsername = ownerStuff.username
  
  const [ formData, setFormData ] = useState({
    first_name: '',
  })
  const [ formData2, setFormData2 ] = useState({
    last_name: '',
  })
  const [ formData3, setFormData3 ] = useState({
    cover_letter: '',
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
      history.push('/profile/employee/:id')
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
      history.push('/profile/employee/:id')
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
      history.push('/profile/employee/:id')
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

  console.log('END PRODUCT', userData)
  console.log('owner Email =>', ownerEmail)
  console.log('Owner Username =>', ownerUsername)
  console.log('ID =>', userID)
  console.log('Page ID =>', pageID)

  return (
    <>
      <div>
        {userData ? 
          <div className='d-flex text-center row'>
            <p>This is your profile</p>
            <p>First Name: {userData.first_name ? userData.first_name : <span>Loading...</span>}</p><form onSubmit={handleSubmit} ><input type="text" name="first_name" placeholder="New First Name" onInput={handleChange}  value={formData.first_name} /><button>Update</button></form>
            <p>Last Name: {userData.last_name ? userData.last_name : <span>Loading...</span>}</p><form onSubmit={handleSubmit2} ><input type="text" name="last_name" placeholder="New Last Name" onInput={handleChange2}  value={formData2.last_name} /><button>Update</button></form>
            <p>COVER LETTER: {userData.cover_letter ? userData.cover_letter : <span>Loading...</span>}</p><form onSubmit={handleSubmit3} ><input type="text" name="cover_letter" placeholder="New First Name" onInput={handleChange3}  value={formData3.cover_letter} /><button>Update</button></form>
            <p>CV: {userData.cv ? userData.cv : <span>Loading...</span>}</p><form onInput={handleSubmit4} ><input type="text" name="cv" placeholder="New First Name" onInput={handleChange4}  value={formData.cv} /><button>Update</button></form>
            <p>Email : {ownerEmail ? ownerEmail : <span>Loading...</span>}</p>
            <p>Username: {ownerUsername ? ownerUsername : <span>Loading...</span>}</p>
          </div>
          :
          <div>Loading...</div>
        }
      </div>
    </>
  )
}

export default EmployeeProfile