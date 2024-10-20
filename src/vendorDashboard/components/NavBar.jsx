import React from 'react'

const NavBar = ({showLoginHandler,showRegisterHandler,showLogout,logoutHandler,showWelcomeHandler}) => {
  const firmName=localStorage.getItem('firmName')
  
  return (
    <div className="navSection">
        <div className="company" >
            <span onClick={showWelcomeHandler} >Vendor Dashboard</span>  
        </div>
        <div className="firmname">
          <h4>Restaurant Name:- {firmName} </h4>
        </div>
        <div className="userAuth">
          {!showLogout? <>
          <span onClick={showLoginHandler}>Login / </span>
          <span onClick={showRegisterHandler}>Register</span>
          </> : <span onClick={logoutHandler} >Logout</span> }
          
            
            
        </div>
    </div>


  )
}

export default NavBar