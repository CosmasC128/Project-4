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

  console.log(business, 'business on public page')

  return (
    <>
      <footer>
        <p >These are all the PublicBusinessProfile we have!!!!</p>
      </footer>
    </>
  )
}

export default PublicBusinessProfile