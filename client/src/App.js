import React from 'react'
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
import BusinessCard from './components/businessCard.js'

function App() {

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
          <Route exact path='/profile/creation'> 
            <CreateProfile />
          </Route>
          <Route exact path='/profile/employee/:id'> 
            <EmployeeProfile />
          </Route>
          <Route exact path='/profile/business/:id'> 
            <BusinessProfile />
          </Route>
          {/* Employees land on jobs next, can apply to jobs, map of all jobs in cards, and click to expand job to apply to it, or click through to business public profile */}
          <Route exact path='/jobs'>
            <Jobs />
          </Route>
          <Route exact path='/all-businesses'>
            <AllBusinesses />
          </Route>
          <Route exact path="/all-businesses/BusinessCard">
            <BusinessCard />
          </Route>
          <Route exact path="/all-businesses/:id">
            <PublicBusinessProfile />
          </Route>
          {/* business creates jobes makes some available hires employees */}
          <Route exact path='/manage-jobs'>
            <ManageJobs />
          </Route>
          <Route exact path='/all-employees'>
            <AllEmployees />
          </Route>
          {/* very few methods, just display pages */}
          {/* what employees can look at, has business info and rating, can review the business there */}
          {/* view employee public info and rating / rate them */}
          <Route exact path='/all-employees/:id'>
            <PublicEmployeeProfile />
          </Route>

        </Switch>
        <Footer />
      </BrowserRouter>
    </>)
}

export default App
