import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/user/Login"
import Signup from './components/user/Signup'
import Footer from "./components/footer/Footer"
import NavbarLeft from "./components/navbar/NavbarLeft"
import NavbarTop from "./components/navbar/NavbarTop"
import Dashboard from "./components/dashboard/Dashboard"
import Home from './components/home/Home';
import ContextTransaction from './components/context/ContextTransaction';
import NoteState from './components/context/TransactionState';
import AdminLogin from './components/admin/Login'
import AdminSignup from './components/admin/Signup'
import Header from './components/header/Header'
// import Layout from './Layout';
// import AdminLayout from './AdminLayout';
import UserDashboard from './components/dashboard/UserDashboard';
import Transaction from './components/transaction/Transaction'
import AddTransaction from './components/transaction/AddTransaction';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import Transactioncard from './components/transaction/Transactioncard';
import EditTransaction from './components/transaction/EditTransaction';


const App = () => {
  return (
    <>
      {/* <ContextTransaction> */}
      <NoteState >
        <Router>
            <Header/>
            <div className="flex flex-col min-h-screen">
            <div  className="flex-grow">
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/adminlogin' element={<AdminLogin />} ></Route>
                <Route path='/adminsignup' element={<AdminSignup />}></Route>
                <Route path='/admindashboard' element={<AdminDashboard/>}></Route>

                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />} ></Route>
                <Route path='/userdashboard' element={<UserDashboard/>}></Route>
                <Route path='/transaction' element={<Transaction/>} ></Route>
                <Route path='/transactioncard' element={<Transactioncard/>}></Route>
                <Route path='/addtransaction' element={<AddTransaction/>} ></Route>
                <Route path='/dashboard' element={<Dashboard/>} ></Route>
                <Route path='/edittransaction' element={<EditTransaction/>}></Route>
              </Routes>  
            </div>   
            </div> 
            <Footer />
        </Router>
        {/* <Router>
          <NavbarTop/>
            <div className='flex'>
              <div className=' w-1/5'> 
                <NavbarLeft/>
              </div>
              <div className='w-4/5'>
                <Routes>
                <Route path='/userdashboard' element={<UserDashboard/>}></Route>

                  <Route path='/' element={} ></Route>
                </Routes>
              </div>
            </div>
          <Footer/>
        </Router> */}
      </NoteState>
      {/* </ContextTransaction> */}


    </>


  )
}

export default App


