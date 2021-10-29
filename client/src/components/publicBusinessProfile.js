import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getPayload, getTokenFromLocalStorage } from '../helpers/helpers.js'
import { useHistory } from 'react-router'

const PublicBusinessProfile = () => {

  // can get id from business card we are linked from.
  // 

  const { id } = useParams() //this is the ID of the BUSINESSES profile
  const userID = getPayload().sub // this is the ID 
  const [ business, setBusiness ] = useState([]) // getting the business profile for the page
  let profileID = 0
  const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/business-profile/${ id }/`)
        setBusiness({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])
  

  const Userprofiles = business.Userprofiles

  // get ALL the users, then find the userprofile for the currently logged in user

  const findProfileId = () => {
    for (let i = 0; i < usersArray.length; i++){
      if (usersArray[i].owner.id === userID){
        profileID = usersArray[i].id 
      }
    }
  }

  const [ usersArray, setUsersArray ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/user-profile/')
        setUsersArray(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  findProfileId()

  const [ user, setUser ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        if (profileID > 0){
          const { data } = await axios.get(`/api/user-profile/${profileID}`)
          setUser({ ...data })
        } else {
          console.log('not ready yet')
        }
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [usersArray])  
  
  const verifyRelationship = () => {
    if (user.id){
      if (Userprofiles.includes(user.id)){
        return true
      } else {
        return false
      }
    }
  }

  const description = business.description
  const image = business.image
  // console.log(image, 'business image')

  let title
  let location
  let employeeReviews
  let total = 0
  let avgRating
  let avgPay
  let payTotal = 0
  let avgPatience
  let patienceTotal = 0
  let avgPositivity
  let positivityTotal = 0
  let avgPunishment
  let punishmentTotal = 0
  
  if (business.id){
    title = business.title
    location = business.location
    employeeReviews = business.employeereviews
    
    // emp reviews total average
    for (let i = 0; i < employeeReviews.length; i++){
      total += employeeReviews[i].pay + employeeReviews[i].patience + employeeReviews[i].positivity + employeeReviews[i].punishment
    }
    avgRating = total / (employeeReviews.length * 4)
    //emp reviews regarding pay  
    for (let j = 0 ; j < employeeReviews.length; j++){
      payTotal += employeeReviews[j].pay 
    }
    avgPay = (payTotal / employeeReviews.length)

    //emp reviews regarding patience
    for (let k = 0 ; k < employeeReviews.length; k++){
      patienceTotal += employeeReviews[k].patience 
    }
    avgPatience = (patienceTotal / employeeReviews.length)

    //emp reviews regarding positivity
    for (let l = 0 ; l < employeeReviews.length; l++){
      positivityTotal += employeeReviews[l].positivity 
    }
    avgPositivity = (positivityTotal / employeeReviews.length)

    //emp reviews regarding punishment!
    for (let m = 0 ; m < employeeReviews.length; m++){
      punishmentTotal += employeeReviews[m].punishment 
    }
    avgPunishment = (punishmentTotal / employeeReviews.length)
  }
  
  // *** APPLY TO THE JOB

  const reviewButton = document.getElementById('reviewBusinessForm')
  
  if (verifyRelationship() === true){
    console.log('youve worked together and can review this business')
    reviewButton.style.display = 'flex'
  }
  
  const [ formData, setFormData ] = useState({
    pay: '',
    patience: '',
    positivity: '',
    punishment: '',
  })

  const handleReviewChange = (event) => {
    const newObj = { ...formData, businessprofile: id, [event.target.name]: event.target.value }
    
    setFormData(newObj)
  }

  const handleReview = async () => {
    try {
      console.log(profileID, 'has reviewed this business')
      await axios.post('/api/empreview/', formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push(`/api/all-businesses/${id}/`)
    } catch (err) {
      console.log(err)  
    }
  }

  return (
    <>
      {business.id ? 
        <div className="publicBusinessProfileWrapper">
          <div>
            <img src="" alt="QOWHJDOIQJWDIOJQWDIOJDWOIJDW"></img>
            <h1>{title} </h1><br/>
            <div>{image} </div><br/>
            <div>Overall {avgRating}⭐️ </div> <br/>
            <div>Pay Rating {avgPay ? avgPay : <span>0</span>}💰 </div> <br/>
            <div>Pay Rating {avgPay}💰 Patience Rating {avgPatience}😇 Positivity Rating {avgPositivity}🎉 Punishment Rating {avgPunishment}💀  </div> <br/>
            <div>Positivity Rating {avgPositivity}🎉 </div> <br/>
            <div>Punishment Rating {avgPunishment}💀 </div> <br/>
            <div>{description}</div> <br/>
            <div> Location: {location}</div> <br/>
          </div>
          <div>
            <form id='reviewBusinessForm' onSubmit={handleReview} style={{ display: 'none' }}>
              <label>Pay</label>
              <select onChange={handleReviewChange} name="pay" value={formData.pay} >
                <option value="1">one star</option>
                <option value="2">two star</option>
                <option value="3">three star</option>
                <option value="4">four star</option>
                <option value="5">five star</option>
              </select>
              <label>Patience</label>
              <select onChange={handleReviewChange} name="patience" value={formData.patience} >
                <option value="1">one star</option>
                <option value="2">two star</option>
                <option value="3">three star</option>
                <option value="4">four star</option>
                <option value="5">five star</option>
              </select>
              <label>Positivity</label>
              <select onChange={handleReviewChange} name="positivity" value={formData.positivity} >
                <option value="1">one star</option>
                <option value="2">two star</option>
                <option value="3">three star</option>
                <option value="4">four star</option>
                <option value="5">five star</option>
              </select>
              <label>Punishment</label>
              <select onChange={handleReviewChange} name="punishment" value={formData.punishment} >
                <option value="1">one star</option>
                <option value="2">two star</option>
                <option value="3">three star</option>
                <option value="4">four star</option>
                <option value="5">five star</option>
              </select>
              <button >Review Business</button>
            </form>
          </div>
        </div>
        : 
        <>Loading</>
      }
    </>
  )
}


export default PublicBusinessProfile