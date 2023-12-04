import React from 'react'
import { useNavigate } from 'react-router-dom';


// To reuse  change the Following -- for logo part
import Logo from "./icon-5359553_1280.webp"

function NavbarTop() {

  let navigate = useNavigate();



  // To reuse  change the Following -- for company details 
  const name = "Mr. Shrivastav"
  // To reuse  change the Following -- for Balance details
  const balance = 100000

  

  const handelTrans = () => {
    navigate("/addtransaction")
  }


  return (
    <>
      <nav className='flex justify-between w-full border-b border-blue-400 sticky top-0 bg-sky-500	'>
        <span className=' flex my-2 mx-2 p-2 justify-start'>{`${name}`}</span>
        <p className='my-2 p-2 text-red-500'>{`₹ ${balance}`}</p>
        <div className='flex '>
          <button className="my-2 mx-2 bg-green-500 p-2 w-fit text-white rounded-md  hover:bg-green-400" onClick={handelTrans}>Add Transaction</button>
          <img className='h-9 m-2 mr-9 rounded-2xl bg-blue-500' src={Logo}/>
        </div>
      </nav>
    </>
  )
}

export default NavbarTop
