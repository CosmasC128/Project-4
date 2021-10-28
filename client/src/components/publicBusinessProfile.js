import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PublicBusinessProfile = () => {

  // link from business card, or from job post, can rate the business here if have relationship
  const { id } = useParams()
  console.log(id)
  const [ business, setBusiness ] = useState([])

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
    
    
  
  //const user = { ...business.owner }
  const description = business.description
  const image = business.image
  //const jobPost = business.jobposts 
  //const newJobPost = { ...jobPost }
  //const text = newJobPost[0].text 
  // const jobPost = business.jobposts
  // const newJobPost = { ...jobPost }
  // console.log('THIS ONE', newJobPost)
  // //const text = newJobPost[0].text   

  let businessID
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
    businessID = business.id
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


    
    console.log(businessID, 'business id')
    console.log(payTotal, 'paytotal')
    console.log(avgPay, 'avgpay')
    console.log(employeeReviews.length, 'empreviewlength')
  
    
  }
  
  return (
    <>
      {business.id ? 
        <div>
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
        : 
        <>Loading</>
      }
    </>
  )
}


export default PublicBusinessProfile