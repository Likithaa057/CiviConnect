import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', phone: '', role: 'citizen', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('auth/register/', form)
      alert('Registered successfully! Please login.')
      navigate('/login')
    } catch (err) {
      console.log(err.response?.data)
      setError(JSON.stringify(err.response?.data) || 'Registration failed.')
    }
  }

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red', fontSize: 14 }}>{error}</p>}
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="citizen">Citizen</option>
        <option value="worker">Local Worker</option>
        <option value="ngo">NGO</option>
      </select>
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  )
}