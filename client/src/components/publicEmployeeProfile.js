import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PublicEmployeeProfile = () => {

  // can view employee info include rating, can rate employee here if have relationship
  const { id } = useParams()
  const [ employee, setEmployee ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/user-profile/${ id }`)
        setEmployee({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  console.log(employee, 'employee on public page')

  return (
    <>
      <footer>
        <p >These are all the PublicEmployeeProfile we have!!!!</p>
      </footer>
    </>
  )
}

export default PublicEmployeeProfile