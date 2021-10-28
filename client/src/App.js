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
          <Route exact path='/profile/creation'> 
            <CreateProfile />
          </Route>
          <Route exact path='/profile/employee/:id'> 
            <EmployeeProfile />
          </Route>
          <Route exact path='/profile/business/:id'>
            <BusinessProfile />
          </Route>
          <Route exact path='/profile/business/:id/manage-jobs'>
            <ManageJobs />
          </Route>
          <Route exact path='/jobs'>
            <Jobs />
          </Route>
          <Route exact path='/all-businesses'>
            <AllBusinesses />ß
          </Route>
          <Route exact path="/all-businesses/:id">
            <PublicBusinessProfile />
          </Route>
          <Route exact path='/all-employees'>
            <AllEmployees />
          </Route>
          <Route exact path='/all-employees/:id'>
            <PublicEmployeeProfile />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>)
}

export default App