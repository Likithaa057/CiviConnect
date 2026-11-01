import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  const close = () => setOpen(false)

  const logout = () => {
    localStorage.removeItem('user')
    close()
    navigate('/login')
    window.location.reload()
  }

  return (
    <nav className="navbar">
      <h2 className="logo">CiviConnect</h2>
      <button className="menu-btn" onClick={() => setOpen(!open)}>☰</button>
      <div className={`nav-links ${open ? 'show' : ''}`}>
        <Link to="/" onClick={close}>Home</Link>
        <Link to="/dashboard" onClick={close}>Dashboard</Link>
        <Link to="/submit" onClick={close}>Report Issue</Link>
        <Link to="/track" onClick={close}>Track</Link>
        <Link to="/admin" onClick={close}>Admin</Link>
        {user ? (
          <button className="btn" onClick={logout}>Logout</button>
        ) : (
          <Link to="/login" className="btn" onClick={close}>Login</Link>
        )}
      </div>
    </nav>
  )
}