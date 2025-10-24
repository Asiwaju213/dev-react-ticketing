import 'react'
import { useEffect, useState } from 'react'
import TicketCard from '../components/TicketCard.tsx'
import '../styles/tickets.css'

type Ticket = { id: string; title: string; description?: string; status: 'open'|'in_progress'|'closed' }

function uid() { return Math.random().toString(36).slice(2,9) }

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const raw = localStorage.getItem('ticketapp_tickets')
    try { return raw ? JSON.parse(raw) : [] } catch { return [] }
  })
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [status, setStatus] = useState<'open'|'in_progress'|'closed'>('open')
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
  }, [tickets])

  function createTicket(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!title) return setError('Title is required.')
    if (!['open','in_progress','closed'].includes(status)) return setError('Invalid status.')
    const t: Ticket = { id: uid(), title, description: desc, status }
    setTickets(prev => [t, ...prev])
    setTitle('')
    setDesc('')
    setStatus('open')
  }

  function updateTicket(updated: Ticket) {
    setTickets(prev => prev.map(t => t.id === updated.id ? updated : t))
  }

  function deleteTicket(id: string) {
    if (!confirm('Delete this ticket?')) return
    setTickets(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="tickets-page">
      <section className="tickets-form">
        <h2>Create Ticket</h2>
        <form onSubmit={createTicket}>
          <label>
            Title
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <label>
            Description
            <textarea value={desc} onChange={e => setDesc(e.target.value)} />
          </label>
          <label>
            Status
            <select value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </label>
          {error && <p role="alert" className="form-error">{error}</p>}
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Create</button>
          </div>
        </form>
      </section>

      <section className="tickets-list">
        <h2>Your Tickets</h2>
        <div className="cards">
          {tickets.length === 0 && <p className="muted">No tickets yet — create one above.</p>}
          {tickets.map(t => (
            <TicketCard key={t.id} ticket={t} onUpdate={updateTicket} onDelete={() => deleteTicket(t.id)} />
          ))}
        </div>
      </section>
    </div>
  )
}
