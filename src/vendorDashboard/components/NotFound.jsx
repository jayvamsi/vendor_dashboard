import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    
    <div className='errorSection'>
    <Link to="/" style={{fontSize:'1rem',color:'darkblue'}}>
    <p>go back</p></Link>
    <h1>404</h1>
    <div><h3>Page Not Found</h3></div>
</div></>
    
  )
}

export default NotFound