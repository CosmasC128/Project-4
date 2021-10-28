import React, { useEffect, useState } from 'react'
import axios from 'axios'

import BusinessCard from './businessCard.js'
import BusinessFilters from './businessFilters.js'

const AllBusinesses = () => {

  const [ businesses, setBusinesses ] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/business-profile/')
        setBusinesses(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const [ filteredBusinesses, setFilteredBusinesses ] = useState([])
  const [ filters, setFilters ] = useState({ searchTerm: '' })

  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    setFilters(newObj)
  }
  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setFilteredBusinesses(businesses.filter(business => {
      return regexSearch.test(business.title)
    }))
  }, [filters, businesses])

  return (<>
    <div className="allBusinessesWrapper">
      <div id="aboveAllBusinessesGrid">
        <h1 id="allBusinessesTitle">All The Businesses</h1>
        <h2 id="allBusinessesFlavour">Search for businesses to work at, or to review.</h2>
      </div>
      <BusinessFilters handleFilterChange={handleFilterChange} {...filters}/>
      <div className="allBusinessesGrid">
        { ( filters.searchTerm !== '' ? filteredBusinesses : businesses).map(business => { 
          return <BusinessCard key={business.id} { ...business } />
        })}
      </div>
    </div>
  </>)
}

export default AllBusinesses