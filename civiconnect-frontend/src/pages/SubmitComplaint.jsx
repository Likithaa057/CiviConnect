import { useState } from 'react'

export default function SubmitComplaint() {
  const [form, setForm] = useState({ category: 'garbage', description: '', location: '' })
  const [photo, setPhoto] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm({ ...form, location: `${pos.coords.latitude}, ${pos.coords.longitude}` })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    if (photo) data.append('photo', photo)
    console.log('Submitting...', form, photo)
    alert('Complaint submitted!')
  }

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Report a Civic Issue</h2>
      <select name="category" onChange={handleChange}>
        <option value="garbage">Garbage</option>
        <option value="streetlight">Broken Streetlight</option>
        <option value="pothole">Pothole</option>
        <option value="water">Water Issue</option>
      </select>
      <textarea name="description" placeholder="Describe the problem" onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <button type="button" onClick={getLocation}>📍 Use my location</button>
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
      <button type="submit">Submit Complaint</button>
    </form>
  )
}