import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom'

function Login() {
  const [credentials, setCredentials] = useState({username: "", password: ""}) 

  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:5000/api/auth/login",{
  method : 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: credentials.username, password: credentials.password})
  });
  const json = await response.json()
  console.log(json);
  if (json.success){
      // Save the auth token and redirect
      setCredentials({username: "", password: ""})
      localStorage.setItem('token', json.authtoken);
      navigate("/userdashboard") 
      
  }
  else{
      console.log("Invalid credentials");
  }

}

  const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  
  return (
    <>
     <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login -- User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              name='username'
              className="border p-2 w-full"
              placeholder="Enter your username"
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
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <Link className='p-4 hover:text-blue-500 hover:underline' to={'/signup'}>Create Account</Link>
        </form>
      </div>
    </div>
      
    </>
  )
}

export default Login
