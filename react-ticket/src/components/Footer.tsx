import 'react'
import '../styles/footer.css'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Ticketing System</p>
      </div>
    </footer>
  )
}
