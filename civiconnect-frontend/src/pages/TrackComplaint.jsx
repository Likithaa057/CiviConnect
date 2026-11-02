import { useState, useEffect } from 'react'
import api from '../api'

const steps = ['Reported', 'Assigned', 'Fixing', 'Resolved']
const currentStep = { Pending: 0, 'In Progress': 2, Resolved: 3 }

export default function TrackComplaint() {
  const [complaints, setComplaints] = useState([])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('complaints/')
      .then((res) => setComplaints(Array.isArray(res.data) ? res.data : res.data.results || []))
      .catch((err) => console.log(err.response?.data))
  }, [])

  const count = (s) => complaints.filter((c) => c.status === s).length

  const shown = complaints.filter(
    (c) =>
      (filter === 'All' || c.status === filter) &&
      ((c.title || '') + (c.location || '')).toLowerCase().includes(search.toLowerCase())
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
        const cur = currentStep[c.status] ?? 0
        const statusClass = (c.status || 'Pending').replace(' ', '').toLowerCase()
        return (
          <div className={`trk-card ${statusClass}`} key={c.id}>
            <div className="trk-top">
              <div className="trk-icon">📋</div>
              <div className="trk-info">
                <h3>{c.title || c.category || 'Complaint'}</h3>
                <p>📍 {c.location}</p>
                <p>👷 {c.worker || 'Not assigned yet'}</p>
              </div>
              <span className={`badge ${statusClass}`}>{c.status}</span>
            </div>

            <div className="tl">
              {steps.map((s, i) => (
                <div className={`tl-step ${i <= cur ? 'done' : ''}`} key={s}>
                  <div className="tl-dot">{i <= cur ? '✓' : i + 1}</div>
                  {s}
                </div>
              ))}
            </div>

            {(c.photo || c.before) && (
              <div className="trk-photos">
                <div>
                  <span className="tag">Before</span>
                  <img src={c.before || c.photo} alt="Before" />
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