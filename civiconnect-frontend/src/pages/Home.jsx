import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    ['📸 Report Issues', 'Upload photo, location and description.'],
    ['📊 Track Progress', 'See the live status of your complaint.'],
    ['📞 Urgent Helpline', 'Call immediately for emergencies.'],
    ['👷 Local Employment', 'Local workers get paid to fix problems.'],
    ['🤝 NGO Support', 'Nearby NGOs help when workers are unavailable.'],
  ]
  return (
    <div>
      <section className="hero">
        <h1>Report. Track. Resolve.</h1>
        <p>A transparent, community-driven platform for civic problems.</p>
        <Link to="/submit" className="btn">Report a Problem</Link>
      </section>
      <section className="features">
        {features.map(([title, text]) => (
          <div className="card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}