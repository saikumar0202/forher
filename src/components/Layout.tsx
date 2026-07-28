import { useEffect, useRef } from 'react'
import { FaCircleInfo, FaGamepad, FaGear, FaHouse, FaWandMagicSparkles } from 'react-icons/fa6'
import { NavLink, Outlet } from 'react-router-dom'
import { randomToastMessages } from '../lib/data'
import { useChaos } from '../context/ChaosContext'
import { Logo } from './Logo'
import { Toasts } from './Toasts'

const nav = [
  { to: '/', label: 'Home', icon: FaHouse },
  { to: '/games', label: 'Games', icon: FaGamepad },
  { to: '/settings', label: 'Settings', icon: FaGear },
  { to: '/about', label: 'About', icon: FaCircleInfo },
]

export function Layout() {
  const { trackMouse, settings, showToast, unlock } = useChaos()
  const keyBuffer = useRef<string[]>([])
  const footerClicks = useRef(0)

  useEffect(() => {
    let lastTracked = 0
    const onMove = () => {
      const now = Date.now()
      if (now - lastTracked > 250) {
        trackMouse()
        lastTracked = now
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [trackMouse])

  useEffect(() => {
    if (!settings.notifications) return
    const timer = window.setInterval(() => {
      const [title, body] = randomToastMessages[Math.floor(Math.random() * randomToastMessages.length)]
      showToast(title, body)
    }, 31000)
    return () => window.clearInterval(timer)
  }, [settings.notifications, showToast])

  useEffect(() => {
    const konami = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === 'INPUT') return
      const key = event.key.toLowerCase()
      if (key === 'b') {
        window.dispatchEvent(new CustomEvent('banana-rain'))
        unlock('banana-bender')
      }
      keyBuffer.current = [...keyBuffer.current, key].slice(-konami.length)
      if (keyBuffer.current.slice(-5).join('') === 'pizza') {
        unlock('pizza-party')
        window.dispatchEvent(new CustomEvent('pizza-party'))
        showToast('Pizza protocol accepted.', 'You have excellent taste.', 'yellow')
      }
      if (keyBuffer.current.join(',') === konami.join(',')) {
        unlock('code-master')
        window.dispatchEvent(new CustomEvent('konami-chaos'))
        showToast('↑ ↑ ↓ ↓ ← → ← → B A', 'Respect. You know the old magic.', 'yellow')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showToast, unlock])

  const handleFooter = () => {
    footerClicks.current += 1
    if (footerClicks.current === 5) {
      unlock('footer-fiend')
      showToast('Footer achievement found.', 'You actually clicked it five times.', 'pink')
    }
  }

  return (
    <div className={`min-h-screen overflow-x-clip bg-ink text-white selection:bg-pink-400/40 ${settings.reducedMotion ? 'reduce-motion' : ''}`}>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-8 h-[31rem] w-[31rem] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="dot-grid absolute inset-0 opacity-30" />
      </div>
      <header className="sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#100b1c]/75 px-3 py-2 backdrop-blur-xl shadow-2xl shadow-black/20 sm:gap-10">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-white/10 text-white' : 'text-white/45 hover:text-white'}`}>
                <Icon className="mr-1.5 inline-block text-xs" />{label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 text-xs font-bold text-white/45 sm:flex"><FaWandMagicSparkles className="text-pink" /> System status: nominal</div>
      </header>
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-7 sm:px-6 sm:pt-11"><Outlet /></main>
      <nav className="fixed inset-x-3 bottom-3 z-50 flex justify-around rounded-2xl border border-white/10 bg-[#100b1c]/90 p-2 backdrop-blur-xl md:hidden">
        {nav.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold transition ${isActive ? 'bg-violet-400/15 text-violet-200' : 'text-white/45'}`}><Icon className="text-sm" />{label}</NavLink>)}
      </nav>
      <footer onClick={handleFooter} className="relative z-10 mb-20 cursor-default px-6 pb-8 text-center text-xs text-white/25 md:mb-0">© AnnoyHer.exe · System diagnostics</footer>
      <Toasts />
    </div>
  )
}
