import React, { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MainPage from './components/mainPage'
import Header from './components/header'
import Jobs from './components/jobs'
import Footer from './components/footer'

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
        <Switch>
          <Route exact path='/'>
            <MainPage />
            <Footer />
          </Route>
          <Route exact path='/jobs'>
            <Header />
            <Jobs />
            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
    </>)
}

export default App
