
import { useState, useEffect, createContext, type Dispatch, type SetStateAction } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.tsx'
import AuthLogin from './pages/AuthLogin.tsx'
import AuthSignup from './pages/AuthSignup.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Tickets from './pages/Tickets.tsx'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import ToastProvider from './components/Toast.tsx'

type AuthUser = { email: string } | null
type AuthContextType = {
	user: AuthUser
	setUser: Dispatch<SetStateAction<AuthUser>>
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	// placeholder - real setter comes from provider
	setUser: (() => undefined) as unknown as Dispatch<SetStateAction<AuthUser>>,
})

type Theme = 'dark' | 'light'
type ThemeContextType = {
	theme: Theme
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
	theme: 'dark',
	toggleTheme: () => undefined,
})

function RequireAuth({ children }: { children: React.ReactNode }) { // Changed typing to ReactNode
	const session = localStorage.getItem('ticketapp_session')
	if (!session) return <Navigate to="/auth/login" replace />
	return children
}

function AppInner() {
	const [user, setUser] = useState<null | { email: string }>(null)
	const [theme, setTheme] = useState<Theme>('dark')
	useEffect(() => {
		const s = localStorage.getItem('ticketapp_session')
		if (s) {
			try {
				setUser(JSON.parse(s))
			} catch {
				setUser({ email: s })
			}
		}
		// read theme preference
		const t = localStorage.getItem('ticketapp_theme') as Theme | null
		if (t === 'light' || t === 'dark') setTheme(t)
	}, [])

	useEffect(() => {
		// apply theme class on body
		document.body.classList.toggle('light-theme', theme === 'light')
		localStorage.setItem('ticketapp_theme', theme)
	}, [theme])

	function toggleTheme() {
		setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
	}


	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<AuthContext.Provider value={{ user, setUser }}>
			<ToastProvider>
				<BrowserRouter>
					<div className="app-root">
						<Navbar />
						<main className="container">
							<Routes>
								<Route path="/" element={<Landing />} />
								<Route path="/auth/login" element={<AuthLogin />} />
								<Route path="/auth/signup" element={<AuthSignup />} />
								<Route
									path="/dashboard"
									element={<RequireAuth>{<Dashboard />}</RequireAuth>}
								/>
								<Route
									path="/tickets"
									element={<RequireAuth>{<Tickets />}</RequireAuth>}
								/>
								<Route path="*" element={<Navigate to="/" replace />} />
							</Routes>
						</main>
						<Footer />
					</div>
				</BrowserRouter>
			</ToastProvider>
			</AuthContext.Provider>
		</ThemeContext.Provider>
	)
}

export default function App() {
	return <AppInner />
}
