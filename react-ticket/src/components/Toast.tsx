import 'react'
import { createContext, useContext, useState, useCallback } from 'react'
import '../styles/toast.css'

type ToastCtx = { push: (m: string)=>void }
const Ctx = createContext<ToastCtx>({ push: ()=>{} })

export default function ToastProvider({ children }: { children: React.ReactNode }){
  const [messages, setMessages] = useState<string[]>([])
  const push = useCallback((m: string)=>{
    setMessages(s => [...s, m])
    setTimeout(()=> setMessages(s => s.slice(1)), 3500)
  },[])
  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="toast-outer" aria-live="polite">
        {messages.map((m,i)=>(<div key={i} className="toast">{m}</div>))}
      </div>
    </Ctx.Provider>
  )
}

export const useToast = ()=> useContext(Ctx)
