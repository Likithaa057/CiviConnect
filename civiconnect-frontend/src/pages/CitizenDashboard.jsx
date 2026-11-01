import { Link } from 'react-router-dom'

export default function CitizenDashboard() {
  const stats = [['Total Complaints', 5], ['Pending', 2], ['In Progress', 2], ['Resolved', 1]]
  return (
    <div className="page">
      <h2>Welcome, Citizen 👋</h2>
      <div className="stats">
        {stats.map(([label, num]) => (
          <div className="card" key={label}><h1>{num}</h1><p>{label}</p></div>
        ))}
      </div>
      <Link to="/submit" className="btn">+ New Complaint</Link>
      <Link to="/track" className="btn">Track Complaints</Link>
      <a href="tel:100" className="btn danger">📞 Urgent Helpline</a>
    </div>
  )
}