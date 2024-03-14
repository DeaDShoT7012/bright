import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer mt-4 bg-dark'>
        <Link to={''}>Terms and Conditions &nbsp; | &nbsp; Privacy Policy</Link>
        <Link to={''}>2023 © DeadShot &nbsp; - &nbsp; All rights reserved</Link>
    </div>
  )
}

export default Footer