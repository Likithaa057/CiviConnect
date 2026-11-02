import { Link } from 'react-router-dom'

export default function CitizenDashboard() {
  const user = localStorage.getItem('user')
  const name = user ? user.split('@')[0] : 'Citizen'

  const stats = [
    ['📋', 5, 'Total Complaints', ''],
    ['⏳', 2, 'Pending', 'yellow'],
    ['🔧', 2, 'In Progress', 'blue'],
    ['✅', 1, 'Resolved', ''],
  ]
  const recent = [
    ['Garbage not collected', 'MG Road · 2 hours ago', 'Pending'],
    ['Broken streetlight', 'Market Street · Yesterday', 'In Progress'],
    ['Pothole', 'Bus Stand · 3 days ago', 'Resolved'],
  ]
  const percent = 20

  return (
    <div className="page">
      <div className="dash-banner">
        <div>
          <h2>Welcome back, {name} 👋</h2>
          <p>Here is what is happening with your complaints.</p>
        </div>
        <Link to="/submit" className="btn orange">+ New Complaint</Link>
      </div>

      <div className="stats">
        {stats.map(([icon, num, label, color]) => (
          <div className={`stat ${color}`} key={label}>
            <span className="icon">{icon}</span>
            <div><h1>{num}</h1><p>{label}</p></div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div>
          <div className="panel">
            <h3>Recent activity</h3>
            {recent.map(([title, info, status]) => (
              <div className="activity" key={title}>
                <div><b>{title}</b><br /><small>📍 {info}</small></div>
                <span className={`badge ${status.replace(' ', '').toLowerCase()}`}>{status}</span>
              </div>
            ))}
            <Link to="/track" className="btn">View all</Link>
          </div>
        </div>

        <div>
          <div className="panel">
            <h3>Resolution progress</h3>
            <div className="progress"><div style={{ width: `${percent}%` }}></div></div>
            <small>{percent}% of your complaints resolved</small>
          </div>
          <div className="panel helpline">
            <h3>🚨 Emergency?</h3>
            <p>Call the helpline right away.</p>
            <a href="tel:100" className="btn danger">📞 Call Helpline</a>
          </div>
        </div>
      </div>
    </div>
  )
}