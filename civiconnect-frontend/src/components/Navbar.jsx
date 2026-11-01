import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">CiviConnect</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/submit">Report Issue</Link>
        <Link to="/track">Track</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login" className="btn">Login</Link>
      </div>
    </nav>
  )
}