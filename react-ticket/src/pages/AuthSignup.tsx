import 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import '../styles/auth.css'

export default function AuthSignup() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password || !confirm) return setError('Please fill in all fields.')
    if (password !== confirm) return setError('Passwords do not match.')
    const session = { email }
    localStorage.setItem('ticketapp_session', JSON.stringify(session))
    setUser(session)
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} aria-labelledby="signup-heading">
        <h2 id="signup-heading">Create your Ticketing System account</h2>
        <label>
          Email
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" aria-required="true" />
        </label>
        <label>
          Password
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" aria-required="true" />
        </label>
        <label>
          Confirm Password
          <input value={confirm} onChange={e => setConfirm(e.target.value)} type="password" aria-required="true" />
        </label>
        {error && <p role="alert" className="form-error">{error}</p>}
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">Create account</button>
        </div>
      </form>
    </div>
  )
}
