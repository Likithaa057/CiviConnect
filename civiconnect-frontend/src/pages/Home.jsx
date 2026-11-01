import { Link } from 'react-router-dom'

export default function Home() {
  const stats = [
    ['1,240', 'Issues Reported'],
    ['980', 'Resolved'],
    ['150', 'Local Workers Paid'],
    ['24', 'NGO Partners'],
  ]
  const steps = [
    ['1', 'Report', 'Upload a photo, location and description.'],
    ['2', 'Assign', 'A local worker or nearby NGO is notified.'],
    ['3', 'Fix', 'Worker fixes it and uploads before/after photos.'],
    ['4', 'Verify', 'Track the status and see proof of the work.'],
  ]
  const features = [
    ['📸 Easy Reporting', 'Photo, GPS location and description in one form.'],
    ['📊 Live Tracking', 'Follow every complaint from Pending to Resolved.'],
    ['📞 Urgent Helpline', 'One tap to call for emergencies.'],
    ['👷 Local Employment', 'Residents earn by fixing public spaces.'],
    ['🤝 NGO Support', 'NGOs step in when workers are unavailable.'],
    ['🔍 Full Transparency', 'Before/after photos build public trust.'],
  ]

  return (
    <div>
      <section className="home-hero">
        <div>
          <h1>Your city. <span>Your voice.</span> Real action.</h1>
          <p>CiviConnect lets citizens report civic problems, track progress and see local workers fix them, with proof.</p>
          <Link to="/submit" className="btn orange">Report a Problem</Link>
          <Link to="/track" className="btn ghost">Track Complaints</Link>
        </div>
        <div className="glass">
          <h4>🔴 Live updates</h4>
          <div className="row"><span>Garbage - MG Road</span><span>✅ Resolved</span></div>
          <div className="row"><span>Streetlight - Market St</span><span>🔧 In Progress</span></div>
          <div className="row"><span>Pothole - Bus Stand</span><span>⏳ Pending</span></div>
          <div className="row"><span>Water leak - Ward 5</span><span>🔧 In Progress</span></div>
        </div>
      </section>

      <div className="band">
        {stats.map(([num, label]) => (
          <div key={label}><h2>{num}</h2><p>{label}</p></div>
        ))}
      </div>

      <section className="section">
        <h2>How it works</h2>
        <p className="sub">From complaint to clean street in four simple steps</p>
        <div className="steps">
          {steps.map(([n, title, text]) => (
            <div className="step" key={n}>
              <div className="num">{n}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Why CiviConnect?</h2>
        <p className="sub">Transparent, fast and community-driven</p>
        <div className="feat-grid">
          {features.map(([title, text]) => (
            <div className="feat" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ready to make your area better?</h2>
        <Link to="/register" className="btn orange">Join CiviConnect</Link>
      </section>

      <footer className="footer">© 2026 CiviConnect · Team VORTEX · Shree Devi Institute of Technology</footer>
    </div>
  )
}