import 'react'
import { useState } from 'react'
import '../styles/ticketcard.css'

type Ticket = { id: string; title: string; description?: string; status: 'open'|'in_progress'|'closed' }

export default function TicketCard({ ticket, onUpdate, onDelete }: { ticket: Ticket; onUpdate: (t: Ticket)=>void; onDelete: ()=>void }){
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(ticket.title)
  const [desc, setDesc] = useState(ticket.description || '')
  const [status, setStatus] = useState<Ticket['status']>(ticket.status)
  const [error, setError] = useState('')

  function save(){
    setError('')
    if (!title) return setError('Title is required')
    if (!['open','in_progress','closed'].includes(status)) return setError('Invalid status')
    onUpdate({ ...ticket, title, description: desc, status })
    setEditing(false)
  }

  return (
    <article className="ticket-card" aria-labelledby={`t-${ticket.id}`}>
      <header>
        <h3 id={`t-${ticket.id}`}>{ticket.title}</h3>
        <div className={`status ${ticket.status}`}>{ticket.status.replace('_',' ')}</div>
      </header>
      <div className="body">
        <p className="desc">{ticket.description}</p>
      </div>
      <footer className="card-actions">
        {editing ? (
          <div className="edit-form">
            <label>Title <input value={title} onChange={e=>setTitle(e.target.value)} /></label>
            <label>Description <textarea value={desc} onChange={e=>setDesc(e.target.value)} /></label>
            <label>Status <select value={status} onChange={e=>setStatus(e.target.value as any)}>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select></label>
            {error && <p role="alert" className="form-error">{error}</p>}
            <div className="actions">
              <button className="btn btn-primary" onClick={save}>Save</button>
              <button className="btn btn-ghost" onClick={()=>setEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="actions">
            <button className="btn btn-outline" onClick={()=>setEditing(true)}>Edit</button>
            <button className="btn btn-danger" onClick={onDelete}>Delete</button>
          </div>
        )}
      </footer>
    </article>
  )
}
