import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login data:', form)
    // Temporary: pretend login worked. Replace with a Django API call later.
    localStorage.setItem('user', form.email)
    navigate('/dashboard')
    window.location.reload()
  }

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
      <p>New user? <Link to="/register">Register</Link></p>
    </form>
  )
}