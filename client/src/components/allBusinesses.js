import BusinessCard from './businessCard.js'
import React, { useEffect, useState } from 'react'
import axios from 'axios'


const AllBusinesses = () => {

  // this should have a map of the businesses cards

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
  // console.log( 'type of businesses: ', typeof businesses)
  console.log(businesses, 'businesses')
  // <Filters id="matchesFilters" handleFilterChange={handleFilterChange} handleSortBy={handleSortBy} {...filters}/>
  // (filters.searchTerm !== '' ? searchMatches : sortedArray )
  return (<>
    <div className="allBusinessesWrapper">
      <div id="aboveAllBusinessesGrid">
        <h1 id="allBusinessesTitle">All The Businesses</h1>
        <h2 id="allBusinessesFlavour">Search for businesses to work at, or to review.</h2>
      </div>
      <div className="allBusinessesGrid">
        { businesses.map(business => { 
          return <BusinessCard key={business.id} { ...business } />
        })}
      </div>
    </div>
  </>)
}

export default AllBusinesses