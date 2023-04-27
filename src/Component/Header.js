import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import toast from 'react-hot-toast';

function Header() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"))
    if (token) {
      setAuth(token)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("auth")
    toast.success("Logout Successfully")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" href="#"> USERS</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {
                auth?.user ? (
                  <>
                    <li className="nav-item mt-2">
                      {`Wel-Come ${auth?.user?.FirstName}`}
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/users" >All Users</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/adduser" className="nav-link">Add User</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link" href="#">Register</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link" href="#">Login</NavLink>
                    </li>
                  </>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
