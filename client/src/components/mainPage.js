import React from 'react'

const MainPage = () => {
  const errors = 0
  const Gary = null
  const handleChange = () => {
    return Gary
  }
  const handleSubmit = () => {
    return Gary
  }
  
  return (
    <div className='d-flex'>
      <div className="loginPage">
        <div className="logContainer">
          <div className="logBox" id="logBox">
            <form id="logForm" >
              <h3 id="logTitle">LOGIN</h3>
              <div className="form-field logField">
                <label htmlFor="email" className="logLabel">Email</label>
                <input  type="email" name="email" placeholder="Email"/>
              </div>
              <div className="form-field logField">
                <label htmlFor="password" className="logLabel">Password</label>
                <input  type="password" name="password" placeholder="Password"  />
              </div>
              <button className='btn btn-dark' id="logBtn">Login</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="regPage">
        <div className="regBox" id="regBox">
          <form onSubmit={handleSubmit} id="regForm">
            <h3 id="regTitle">REGISTRATION</h3>
            <div className="form-field regField" >
              <label htmlFor="username" className="regLabel">Username</label>
              <input onInput={handleChange} className="regInputField" type="text" name="username" placeholder="Username" />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="form-field regField">
              <label htmlFor="email" className="regLabel">Email</label>
              <input onInput={handleChange} className="regInputField" type="email" name="email" placeholder="Email" />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-field regField">
              <label htmlFor="password" className="regLabel">Password</label>
              <input onInput={handleChange} className="regInputField" type="password" name="password" placeholder="Password"  />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-field regField">
              <label htmlFor="passwordConfirmation" className="regLabel">Confirmation</label>
              <input onInput={handleChange} className="regInputField" type="password" name="passwordConfirmation" placeholder="Password Confirmation"   />
              {errors.passwordConfirmation && <p className="error">{errors.passwordConfirmation}</p>}
            </div>
            <button className="btn btn-dark " id="regBtn">Register</button>
          </form>
        </div>
      </div>
    </div>
    
  )
}

export default MainPage