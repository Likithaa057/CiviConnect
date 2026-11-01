import { useState } from 'react'

const complaints = [
  { id: 1, icon: '🗑️', title: 'Garbage not collected', location: 'MG Road', date: '1 Nov 2026', status: 'Pending', worker: null, before: null, after: null },
  { id: 2, icon: '💡', title: 'Broken streetlight', location: 'Market Street', date: '30 Oct 2026', status: 'In Progress', worker: 'Ramesh K.', before: 'https://placehold.co/400x250?text=Before', after: null },
  { id: 3, icon: '🕳️', title: 'Pothole on road', location: 'Bus Stand', date: '27 Oct 2026', status: 'Resolved', worker: 'Suresh M.', before: 'https://placehold.co/400x250?text=Before', after: 'https://placehold.co/400x250/2e7d32/ffffff?text=After' },
  { id: 4, icon: '🚰', title: 'Water pipe leakage', location: 'Ward 5', date: '26 Oct 2026', status: 'In Progress', worker: 'NGO: Clean City', before: 'https://placehold.co/400x250?text=Before', after: null },
]

const steps = ['Reported', 'Assigned', 'Fixing', 'Resolved']
const currentStep = { Pending: 0, 'In Progress': 2, Resolved: 3 }

export default function TrackComplaint() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const count = (s) => complaints.filter((c) => c.status === s).length

  const shown = complaints.filter(
    (c) =>
      (filter === 'All' || c.status === filter) &&
      (c.title + c.location).toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div className="trk-head">
        <h2>📍 Track Your Complaints</h2>
        <p>See exactly who is working on your issue and what has been done.</p>
      </div>

      <div className="trk-summary">
        <div><h1>{complaints.length}</h1><p>Total</p></div>
        <div className="y"><h1>{count('Pending')}</h1><p>Pending</p></div>
        <div className="b"><h1>{count('In Progress')}</h1><p>In Progress</p></div>
        <div className="g"><h1>{count('Resolved')}</h1><p>Resolved</p></div>
      </div>

      <div className="trk-tools">
        <input
          placeholder="🔍 Search by issue or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="trk-tabs">
          {['All', 'Pending', 'In Progress', 'Resolved'].map((t) => (
            <button key={t} className={filter === t ? 'active' : ''} onClick={() => setFilter(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 && <div className="panel muted">No complaints found.</div>}

      {shown.map((c) => {
        const cur = currentStep[c.status]
        return (
          <div className={`trk-card ${c.status.replace(' ', '').toLowerCase()}`} key={c.id}>
            <div className="trk-top">
              <div className="trk-icon">{c.icon}</div>
              <div className="trk-info">
                <h3>{c.title}</h3>
                <p>📍 {c.location} · 📅 {c.date}</p>
                <p>👷 {c.worker ? c.worker : 'Not assigned yet'}</p>
              </div>
              <span className={`badge ${c.status.replace(' ', '').toLowerCase()}`}>{c.status}</span>
            </div>

            <div className="tl">
              {steps.map((s, i) => (
                <div className={`tl-step ${i <= cur ? 'done' : ''}`} key={s}>
                  <div className="tl-dot">{i <= cur ? '✓' : i + 1}</div>
                  {s}
                </div>
              ))}
            </div>

            {c.before && (
              <div className="trk-photos">
                <div>
                  <span className="tag">Before</span>
                  <img src={c.before} alt="Before" />
                </div>
                <div>
                  <span className="tag after">After</span>
                  {c.after ? (
                    <img src={c.after} alt="After" />
                  ) : (
                    <div className="trk-wait">🔧 Work in progress...</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}