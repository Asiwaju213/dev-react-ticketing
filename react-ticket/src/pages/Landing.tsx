import 'react'
import { Link } from 'react-router-dom'
import '../styles/layout.css'
import '../styles/landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-bg" aria-hidden="true">
          <svg className="wave" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#6c63ff" fillOpacity="1" d="M0,96L48,122.7C96,149,192,203,288,224C384,245,480,235,576,213.3C672,192,768,160,864,160C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
          <div className="hero-overlay" aria-hidden="true"></div>
          <span className="decor-circle" aria-hidden="true"></span>
        </div>

        <div className="hero-content">
          <h1 id="hero-title">Ticketing System</h1>
          <p className="lead">Simple, fast ticket management for teams and projects — built with care.</p>
          <div className="hero-cta">
            <Link to="/auth/login" className="btn btn-outline">Login</Link>
            <Link to="/auth/signup" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>

      <section className="features" aria-label="features">
        <div className="feature-grid">
          <article className="feature">
            <h3>Fast setup</h3>
            <p>Get started in seconds with local storage persistence.</p>
          </article>
          <article className="feature">
            <h3>Manage tickets</h3>
            <p>Create, update, and track the status of tickets in a compact, accessible UI.</p>
          </article>
          <article className="feature">
            <h3>Accessible</h3>
            <p>Semantic HTML, focus states, and color-contrast aware styling.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
