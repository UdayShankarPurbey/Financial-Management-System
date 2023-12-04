import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './components/context/TransactionState';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';


const AdminLayout = () => {
  return (
    <NoteState>
        <Router>
            <Routes>
            <Route path='/admindashboard' element={<AdminDashboard/>}></Route>

            </Routes>
        </Router>
      
    </NoteState>
  )
}

export default AdminLayout
