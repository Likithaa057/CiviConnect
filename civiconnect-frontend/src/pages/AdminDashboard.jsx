import { useState } from 'react'

export default function AdminDashboard() {
  const [rows, setRows] = useState([
    { id: 1, title: 'Garbage', location: 'MG Road', status: 'Pending' },
    { id: 2, title: 'Streetlight', location: 'Market St', status: 'In Progress' },
  ])

  const updateStatus = (id, status) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)))

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <table>
        <thead><tr><th>ID</th><th>Issue</th><th>Location</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td><td>{r.title}</td><td>{r.location}</td>
              <td>
                <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}>
                  <option>Pending</option><option>In Progress</option><option>Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}