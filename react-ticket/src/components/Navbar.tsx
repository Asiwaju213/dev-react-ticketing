import 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import '../styles/navbar.css'

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('ticketapp_session')
    setUser(null)
    navigate('/auth/login')
  }

  return (
    <header className="nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">Ticketing System</Link>
        <nav aria-label="Main navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            {user && <li><Link to="/dashboard">Dashboard</Link></li>}
            {user && <li><Link to="/tickets">Tickets</Link></li>}
          </ul>
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user">{user.email}</span>
              <button className="btn btn-ghost" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="btn btn-outline">Login</Link>
              <Link to="/auth/signup" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
