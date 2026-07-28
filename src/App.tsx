import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChaosProvider } from './context/ChaosContext'
import { Layout } from './components/Layout'
import { LoadingScreen } from './components/LoadingScreen'
import { About } from './pages/About'
import { Games } from './pages/Games'
import { Home } from './pages/Home'
import { Settings } from './pages/Settings'

export default function App() {
  const [loading, setLoading] = useState(true)
  return <ChaosProvider><BrowserRouter><Routes><Route element={<Layout />}><Route path="/" element={<Home />} /><Route path="/games" element={<Games />} /><Route path="/settings" element={<Settings />} /><Route path="/about" element={<About />} /></Route></Routes></BrowserRouter><AnimatePresence>{loading && <LoadingScreen onComplete={() => setLoading(false)} />}</AnimatePresence></ChaosProvider>
}
