import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [credentials, setCredentials] = useState({name:"",username:"",password:"",cpassword:""});
  let navigate = useNavigate();


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,username,password} = credentials; 

    //creating user via web and link with db
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name,username,password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
                //save the auth token and redirect
                setCredentials({name:"",username:"",password:"",cpassword:""})
                localStorage.setItem('token',json.authtoken);
                navigate('/userdashboard');
            }
          else{
            console.log("Invalid Credentials");
          }
  };


  const onChange =(e) =>{
    setCredentials({...credentials,[e.target.name]: e.target.value})
  }

  
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up -- User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name='name'
              className="border p-2 w-full"
              placeholder="Enter your full name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="email"
              name='username'
              className="border p-2 w-full"
              placeholder="Enter your Username"
              value={credentials.username}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name='password'
              className="border p-2 w-full"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 "
          >
            Sign Up
          </button>
          <Link className='p-4 hover:text-green-500 hover:underline' to={'/login'}>Already Have an Account</Link>
        </form>
      </div>
    </div>
    </>
  )
  
}

  
export default Signup
