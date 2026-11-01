const complaints = [
  { id: 1, title: 'Garbage not collected', location: 'MG Road', status: 'Pending' },
  { id: 2, title: 'Broken streetlight', location: 'Market Street', status: 'In Progress' },
  { id: 3, title: 'Pothole', location: 'Bus Stand', status: 'Resolved' },
]

export default function TrackComplaint() {
  return (
    <div className="page">
      <h2>Track Your Complaints</h2>
      {complaints.map((c) => (
        <div className="card" key={c.id}>
          <h3>{c.title}</h3>
          <p>📍 {c.location}</p>
          <span className={`badge ${c.status.replace(' ', '').toLowerCase()}`}>{c.status}</span>
        </div>
      ))}
    </div>
  )
}