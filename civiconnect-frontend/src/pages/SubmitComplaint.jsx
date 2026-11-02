import { useState } from 'react'
import api from '../api'

export default function SubmitComplaint() {
  const [form, setForm] = useState({ category: 'garbage', description: '', location: '' })
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm({ ...form, location: `${pos.coords.latitude}, ${pos.coords.longitude}` })
      },
      () => alert('Could not get location. Please allow location access.')
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!localStorage.getItem('access')) {
      alert('Please login first.')
      return
    }

    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    if (photo) data.append('photo', photo)

    setLoading(true)
    try {
      await api.post('complaints/', data)
      alert('Complaint submitted successfully!')
      setForm({ category: 'garbage', description: '', location: '' })
      setPhoto(null)
      e.target.reset()
    } catch (err) {
      console.log(err.response?.data)
      alert('Could not submit: ' + JSON.stringify(err.response?.data || 'Server not reachable'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Report a Civic Issue</h2>

      <select name="category" value={form.category} onChange={handleChange}>
        <option value="garbage">Garbage</option>
        <option value="streetlight">Broken Streetlight</option>
        <option value="pothole">Pothole</option>
        <option value="water">Water Issue</option>
      </select>

      <textarea
        name="description"
        placeholder="Describe the problem"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <button type="button" onClick={getLocation}>📍 Use my location</button>

      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Complaint'}
      </button>
    </form>
  )
}