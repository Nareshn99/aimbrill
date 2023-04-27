import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './Pages/Register'
import Login from './Pages/Login';
import Home from './Pages/Home';
import Users from './Pages/Users';
import UpdateUser from './User/UpdateUser';
import AddUser from './User/AddUser';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/adduser" element={<AddUser/>} />
        <Route path='users/update/:uid' element={<UpdateUser />} />
        <Route path='*' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App