import React, { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MainPage from './components/mainPage.js'
import Header from './components/header.js'
import Footer from './components/footer.js'

import CreateProfile from './components/createProfile.js'
import Jobs from './components/jobs.js'
import AllEmployees from './components/allEmployees.js'
import AllBusinesses from './components/allBusinesses.js'
import ManageJobs from './components/manageJobs.js'
import PublicBusinessProfile from './components/publicBusinessProfile.js'
import PublicEmployeeProfile from './components/publicEmployeeProfile.js'
import BusinessProfile from './components/businessProfile.js'
import EmployeeProfile from './components/employeeProfile.js'

function App() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/business-profile/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          {/* registration CHANGE THE LINK, or login */}
          <Route exact path='/'> 
            <MainPage />
          </Route>
          {/* put method for all aspects of profile */}
          <Route exact path='/profile-creation'> 
            <CreateProfile />
          </Route>
          {/* Employees land on jobs next, can apply to jobs, map of all jobs in cards, and click to expand job to apply to it, or click through to business public profile */}
          <Route exact path='/jobs'>
            <Jobs />
          </Route>
          <Route exact path='/all-employees'>
            <AllEmployees />
          </Route>
          <Route exact path='/all-businesses'>
            <AllBusinesses />
          </Route>
          {/* business creates jobes makes some available hires employees */}
          <Route exact path='/manage-jobs'>
            <ManageJobs />
          </Route>
          
          {/* very few methods, just display pages */}
          {/* what employees can look at, has business info and rating, can review the business there */}
          <Route exact path='/public-business-profile'>
            <PublicBusinessProfile />
          </Route>
          {/* view employee public info and rating / rate them */}
          <Route exact path='/public-employee-profile'>
            <PublicEmployeeProfile />
          </Route>

          {/* for a business account to update its own info/picture etc */}
          <Route exact path='/private-business-profile'>
            <BusinessProfile />
          </Route>
          {/* for employee to update info */}
          <Route exact path='/private-employee-profile'>
            <EmployeeProfile />
          </Route>

        </Switch>
        <Footer />
      </BrowserRouter>
    </>)
}

export default App
