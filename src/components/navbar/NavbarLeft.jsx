import React from 'react'

// To reuse  change the Following -- for logo part
import Logo from "./icon-5359553_1280.webp"
import { Link } from 'react-router-dom'

function NavbarLeft() {

  // To reuse  change the Following -- for name part
  const name = "Mr. Shrivastav"

  //Working left in link part to redirect it

  return (
    <nav className=' pt-5 pl-4  border-r border-blue-400  h-screen bg-sky-500	'>
        <div>
          <div className='flex justify-center items-center'>
          <img src={Logo}  className='h-44 rounded-3xl bg-black mb-5 '/>
          </div>
          <span className=' font-bold text-xl text-blue-500'>
            {`Welcome ${name}`}
          </span>
          <hr className='p-4'/>
        </div>
        <ul className='flex text-xl flex-col text-center '>
        {/* className={(isActive) => `${isActive ? text-orange-500 : text-cyan-400} `}  */}
          <li className='pt-4 font-serif'>
            <Link to="/dashboard" >Dashboard</Link> 
          </li>
          <li className='pt-4 font-serif'>
            <Link  to="/transaction" >Transaction</Link> 
          </li>
          <li className='pt-4 font-serif'>
            <Link  to="/report" >Report</Link> 
          </li>
          <li className='pt-4 font-serif'>
            <Link  to="/logout" >Logout</Link> 
          </li>
        </ul>
      </nav>
  )
}

export default NavbarLeft
