const complaints = [
  {
    id: 1,
    title: 'Garbage not collected',
    location: 'MG Road',
    status: 'Pending',
    before: null,
    after: null,
  },
  {
    id: 2,
    title: 'Broken streetlight',
    location: 'Market Street',
    status: 'In Progress',
    before: 'https://placehold.co/300x200?text=Before',
    after: null,
  },
  {
    id: 3,
    title: 'Pothole',
    location: 'Bus Stand',
    status: 'Resolved',
    before: 'https://placehold.co/300x200?text=Before',
    after: 'https://placehold.co/300x200/2e7d32/ffffff?text=After',
  },
]

export default function TrackComplaint() {
  return (
    <div className="page">
      <h2>Track Your Complaints</h2>
      {complaints.map((c) => (
        <div className="card" key={c.id}>
          <h3>{c.title}</h3>
          <p>📍 {c.location}</p>
          <span className={`badge ${c.status.replace(' ', '').toLowerCase()}`}>
            {c.status}
          </span>

          {c.before && (
            <div className="photos">
              <div>
                <p><b>Before</b></p>
                <img src={c.before} alt="Before" />
              </div>
              {c.after ? (
                <div>
                  <p><b>After</b></p>
                  <img src={c.after} alt="After" />
                </div>
              ) : (
                <div>
                  <p><b>After</b></p>
                  <p className="muted">Work in progress...</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}