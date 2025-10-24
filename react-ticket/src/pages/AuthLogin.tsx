import 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import '../styles/auth.css'

export default function AuthLogin() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Please fill in all fields.')
    // mock credentials
    if (email === 'demo@ticketflow.com' && password === 'demo123') {
      const session = { email }
      localStorage.setItem('ticketapp_session', JSON.stringify(session))
      setUser(session)
      navigate('/dashboard')
    } else {
      setError('Invalid credentials.')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} aria-labelledby="login-heading">
        <h2 id="login-heading">Sign in to Ticketing System</h2>
        <label>
          Email
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" aria-required="true" />
        </label>
        <label>
          Password
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" aria-required="true" />
        </label>
        {error && <p role="alert" className="form-error">{error}</p>}
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">Login</button>
          <Link to="/auth/signup" className="btn btn-outline">Create account</Link>
        </div>
      </form>
    </div>
  )
}
