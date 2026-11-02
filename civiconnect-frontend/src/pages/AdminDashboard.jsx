import { useState, useEffect } from 'react'
import api from '../api'

export default function AdminDashboard() {
  const [rows, setRows] = useState([])
  const [message, setMessage] = useState('')

  const load = () =>
    api.get('complaints/')
      .then((res) => setRows(Array.isArray(res.data) ? res.data : res.data.results || []))
      .catch((err) => console.log(err.response?.data))

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`complaints/${id}/status/`, { status })
      setMessage('Status updated')
      load()
    } catch (err) {
      console.log(err.response?.data)
      setMessage('Could not update: ' + JSON.stringify(err.response?.data || 'error'))
    }
  }

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      {message && <p className="muted">{message}</p>}
      <table>
        <thead>
          <tr><th>ID</th><th>Issue</th><th>Location</th><th>Status</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.title || r.category}</td>
              <td>{r.location}</td>
              <td>
                <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}