import React from 'react'
import UserDashboard from './components/dashboard/UserDashboard';
import Transaction from './components/transaction/Transaction'
import AddTransaction from './components/transaction/AddTransaction';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './components/context/TransactionState';


const Layout = () => {
  return (
    <NoteState>
      <Router>
        <Routes>
          <Route path='/userdashboard' element={<UserDashboard/>}></Route>
          <Route path='/transaction' element={<Transaction/>} ></Route>
          <Route path='/addtransaction' element={<AddTransaction/>} ></Route>
        </Routes>
      </Router>

      
    </NoteState>
  )
}

export default Layout
