import 'react'
import { Link } from 'react-router-dom'
import '../styles/dashboard.css'

export default function Dashboard() {
  const raw = localStorage.getItem('ticketapp_tickets')
  let tickets = [] as any[]
  try { tickets = raw ? JSON.parse(raw) : [] } catch {}
  const total = tickets.length
  const open = tickets.filter(t => t.status === 'open').length
  const resolved = tickets.filter(t => t.status === 'closed').length

  return (
    <div className="dashboard">
      <header className="dash-header">
        <h1>Dashboard</h1>
        <p className="muted">Overview of your ticketing activity</p>
      </header>

      <section className="summary-cards" aria-label="summary">
        <div className="card">
          <h3>Total Tickets</h3>
          <p className="big">{total}</p>
        </div>
        <div className="card">
          <h3>Open Tickets</h3>
          <p className="big status-open">{open}</p>
        </div>
        <div className="card">
          <h3>Resolved Tickets</h3>
          <p className="big status-closed">{resolved}</p>
        </div>
      </section>

      <section className="manage">
        <h2>Manage Tickets</h2>
        <p><Link to="/tickets" className="btn btn-primary">Go to Tickets</Link></p>
      </section>
    </div>
  )
}
