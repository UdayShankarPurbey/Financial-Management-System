import React from 'react'
import NavbarTop from '../navbar/NavbarTop'
import NavbarLeft from '../navbar/NavbarLeft'
import Footer from '../footer/Footer'

function UserDashboard() {
  return (
    <>
      <NavbarTop/>
      <div className='flex'>
        <div className='w-1/5'>
          <NavbarLeft/>
        </div>
        <div className='w-4/5'>

        </div>
      </div>

    </>
  )
}

export default UserDashboard
