import React from 'react'
import { useNavigate} from 'react-router-dom'


function Home() {

  const navigate = useNavigate()


  const handleCreateAccountAdmin = () => {
    navigate("/adminsignup")
  } 
  
  const handleLoginAdmin = () => {
    navigate("/adminlogin")
  } 
  

  const handleCreateAccount = () => {
    navigate("/signup")
  } 
  const handleLogin = () => {
    navigate("/login")
  } 
  

  return (
    <>
      
      <div className='flex h-screen w-full'>
        <div className=' w-1/2 bg-violet-500 text-center items-center text-white p-32'> 
        
          display login btn and signup btn for admin
          <button className="my-2 mx-2 bg-green-500 p-2 w-fit text-white rounded-md  hover:bg-green-400" onClick={handleCreateAccountAdmin}>Create account</button>
          <button className="my-2 mx-2 bg-green-500 p-2 w-fit text-white rounded-md  hover:bg-green-400" onClick={handleLoginAdmin}>Login account</button>

        
        </div>
        <div className=' w-1/2 bg-red-600 text-center items-center text-white p-32'>
          
        display login btn and signup btn for user
        <button className="my-2 mx-2 bg-green-500 p-2 w-fit text-white rounded-md  hover:bg-green-400" onClick={handleCreateAccount}>Create account</button>
        <button className="my-2 mx-2 bg-green-500 p-2 w-fit text-white rounded-md  hover:bg-green-400" onClick={handleLogin}>Login account</button>

          </div>
      </div>
    </>
  )
}

export default Home









