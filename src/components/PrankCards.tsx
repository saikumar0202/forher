import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { FaArrowRotateRight, FaBug, FaCheck, FaCommentDots, FaFaceGrinStars, FaLock, FaPowerOff, FaRobot, FaSkullCrossbones, FaWandMagicSparkles, FaXmark } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { achievements, aiReplies, prankMessages, refreshMood } from '../lib/data'
import { useChaos } from '../context/ChaosContext'

export function ChaosCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <motion.section layout className={`glass-card relative overflow-hidden rounded-3xl p-5 sm:p-6 ${className}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} whileHover={{ y: -3, borderColor: 'rgba(255,255,255,.18)' }}>{children}</motion.section>
}

export function CardTop({ icon, eyebrow, title, description }: { icon: React.ReactNode, eyebrow: string, title: string, description?: string }) {
  return <div className="mb-5 flex gap-3">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/8 text-violet-200">{icon}</span>
    <div>
      <p className="mb-0.5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-pink-300/85">{eyebrow}</p>
      <h2 className="font-display text-lg font-extrabold text-white sm:text-xl">{title}</h2>
      {description && <p className="mt-1 text-sm leading-relaxed text-white/45">{description}</p>}
    </div>
  </div>
}

export function DoNotClick() {
  const { clicks, addClick, unlock, showToast, playSound } = useChaos()
  const [pop, setPop] = useState(false)
  const click = () => {
    const next = clicks + 1
    addClick()
    playSound('warning')
    setPop(true)
    window.setTimeout(() => setPop(false), 200)
    if (next === 1) unlock('first-click')
    if (next === 10) unlock('ten-clicks')
    if (next === 50) {
      unlock('fifty-clicks')
      confetti({ particleCount: 180, spread: 90, origin: { y: 0.7 }, colors: ['#bba5ff', '#fb7ecb', '#fcd46c'] })
      showToast('Fifty clicks?', 'Honestly, that is impressive.', 'yellow')
    }
  }
  const message = clicks === 0 ? 'Restricted control. Continue only if required.' : prankMessages[(clicks - 1) % prankMessages.length]
  return <ChaosCard className="min-h-[298px] bg-gradient-to-br from-rose-500/10 via-transparent to-transparent">
    <CardTop icon={<FaSkullCrossbones />} eyebrow="Priority action" title="Restricted control" description={message} />
    <div className="mt-7 flex flex-col items-center justify-center">
      <motion.button onClick={click} className="relative w-full max-w-[290px] rounded-2xl bg-gradient-to-b from-red-400 to-rose-600 px-5 py-5 text-lg font-black text-white shadow-[0_15px_35px_rgba(244,63,94,.3)] ring-1 ring-white/30" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.94 }} animate={pop ? { x: [-2, 3, -3, 0] } : {}}>
        <span className="relative z-10">{clicks === 0 ? 'CONTINUE' : 'DO NOT CLICK'}</span><span className="absolute inset-x-6 bottom-1 h-4 rounded-full bg-black/15 blur-lg" />
      </motion.button>
      <p className="mt-4 text-xs font-bold text-white/35">Input attempts: <span className="text-pink-200">{clicks}</span></p>
    </div>
  </ChaosCard>
}

export function RunawayButton() {
  const [position, setPosition] = useState({ x: 110, y: 84 })
  const [escapes, setEscapes] = useState(0)
  const [won, setWon] = useState(false)
  const areaRef = useRef<HTMLDivElement>(null)
  const move = () => {
    if (!areaRef.current) return
    const box = areaRef.current.getBoundingClientRect()
    setPosition({ x: Math.max(8, Math.random() * (box.width - 135)), y: Math.max(8, Math.random() * (box.height - 52)) })
    setEscapes((count) => count + 1)
  }
  const { playSound } = useChaos()
  return <ChaosCard className="min-h-[298px]">
    <CardTop icon={<FaArrowRotateRight />} eyebrow="Connection test" title="Confirm presence" description={won ? 'Presence confirmed.' : escapes >= 5 ? 'Verification ready.' : 'Click the marker to continue.'} />
    <div ref={areaRef} className="relative mt-3 h-[148px] rounded-2xl border border-dashed border-white/15 bg-black/10" onMouseMove={(event) => {
      const button = event.currentTarget.querySelector('button')?.getBoundingClientRect()
      if (!won && button && Math.hypot(event.clientX - (button.left + button.width / 2), event.clientY - (button.top + button.height / 2)) < 90) {
        console.log("moving")
        move()
      }
    }}>
      <motion.button style={{ left: position.x, top: position.y }} animate={{ left: position.x, top: position.y }} transition={{ type: 'spring', stiffness: 320, damping: 20 }} onMouseEnter={move} onFocus={move} onClick={() => { setWon(true); playSound('success') }} className={`absolute rounded-xl px-4 py-3 text-xs font-extrabold shadow-lg ${won ? 'bg-emerald-400 text-emerald-950' : 'bg-violet-400 text-violet-950'}`}>
        {won ? 'Confirmed ✦' : escapes >= 5 ? 'Verify' : 'Continue'}
      </motion.button>
    </div>
  </ChaosCard>
}

export function FakeProgress() {
  const [progress, setProgress] = useState(5)
  const [phase, setPhase] = useState<'filling' | 'paused' | 'finishing' | 'done'>('filling')
  useEffect(() => {
    if (phase === 'filling') {
      const timer = window.setTimeout(() => setProgress((value) => {
        const next = Math.min(99, value + Math.max(2, Math.floor(Math.random() * 10)))
        if (next === 99) setPhase('paused')
        return next
      }), 210)
      return () => window.clearTimeout(timer)
    }
    if (phase === 'paused') {
      const timer = window.setTimeout(() => { setProgress(15); setPhase('finishing') }, 2600)
      return () => window.clearTimeout(timer)
    }
    if (phase === 'finishing') {
      const timer = window.setTimeout(() => setProgress((value) => {
        const next = Math.min(100, value + 3)
        if (next === 100) setPhase('done')
        return next
      }), 80)
      return () => window.clearTimeout(timer)
    }
  }, [phase, progress])
  const reset = () => { setProgress(5); setPhase('filling') }
  const label = phase === 'paused' ? '99% — finalizing...' : phase === 'finishing' ? 'Resuming process...' : phase === 'done' ? 'Update complete.' : 'Synchronizing workspace...'
  return <ChaosCard className="min-h-[298px]">
    <CardTop icon={<FaWandMagicSparkles />} eyebrow="Background update" title="System update" description={label} />
    <div className="mt-11">
      <div className="flex items-end justify-between"><span className="font-display text-5xl font-black text-white">{progress}<span className="text-xl text-white/35">%</span></span><button onClick={reset} className="rounded-lg p-2 text-white/35 transition hover:bg-white/10 hover:text-white" aria-label="Restart progress"><FaArrowRotateRight /></button></div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/8"><motion.div className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400" animate={{ width: `${progress}%` }} transition={{ duration: phase === 'paused' ? 0.2 : 0.35 }} /></div>
    </div>
  </ChaosCard>
}

export function MoodDetector() {
  const [scan, setScan] = useState(false)
  return <ChaosCard className="min-h-[298px] bg-gradient-to-br from-violet-500/10 via-transparent to-transparent">
    <CardTop icon={<FaFaceGrinStars />} eyebrow="Status sensor" title="Current status" description="Reading input from this device." />
    <button className="relative mt-7 w-full overflow-hidden rounded-2xl border border-violet-300/20 bg-violet-400/10 px-5 py-6 text-center transition hover:bg-violet-400/15" onClick={() => { setScan(true); window.setTimeout(() => setScan(false), 600) }}>
      <AnimatePresence mode="wait"><motion.p key={scan ? 'scanning' : refreshMood} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} className="font-display text-2xl font-black text-violet-100">{scan ? 'Scanning your aura...' : refreshMood}</motion.p></AnimatePresence>
      <p className="mt-1 text-xs font-semibold text-violet-200/50">Last checked just now</p>
    </button>
  </ChaosCard>
}

export function FakeAi() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ user: string, bot: string }[]>([])
  const { playSound } = useChaos()
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!input.trim()) return
    playSound('tap')
    setMessages((current) => [...current.slice(-2), { user: input.trim(), bot: aiReplies[Math.floor(Math.random() * aiReplies.length)] }])
    setInput('')
  }
  return <ChaosCard className="min-h-[365px] lg:col-span-2">
    <CardTop icon={<FaRobot />} eyebrow="Assistant console" title="Ask the assistant" description="Submit a question to continue." />
    <div className="mb-3 flex h-[135px] flex-col justify-end gap-2 overflow-y-auto rounded-2xl bg-black/15 p-3">
      {messages.length === 0 ? <p className="m-auto text-center text-sm text-white/30">Assistant standing by.</p> : messages.map((message, index) => <div key={`${message.user}-${index}`} className="space-y-1"><p className="ml-auto w-fit max-w-[82%] rounded-xl rounded-br-sm bg-violet-400/15 px-3 py-1.5 text-xs text-violet-100">{message.user}</p><p className="w-fit max-w-[82%] rounded-xl rounded-bl-sm bg-white/8 px-3 py-1.5 text-xs text-white/75">{message.bot}</p></div>)}
    </div>
    <form onSubmit={submit} className="flex gap-2"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a deeply important question..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-300/50" /><button className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-400 to-pink-400 text-ink transition hover:brightness-110" aria-label="Ask fake AI"><FaCommentDots /></button></form>
  </ChaosCard>
}

export function VirusCard() {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState<'scan' | 'found' | 'fixed'>('scan')
  const { playSound } = useChaos()
  const openVirus = () => { setStage('scan'); setOpen(true); playSound('scan') }
  useEffect(() => {
    if (!open || stage === 'fixed') return
    const timer = window.setTimeout(() => setStage((current) => current === 'scan' ? 'found' : 'fixed'), stage === 'scan' ? 2300 : 1400)
    return () => window.clearTimeout(timer)
  }, [open, stage])
  return <>
    <ChaosCard className="min-h-[298px] bg-gradient-to-br from-amber-400/10 via-transparent to-transparent">
      <CardTop icon={<FaBug />} eyebrow="Security status" title="System check" description="Run a quick device scan." />
      <button onClick={openVirus} className="mt-8 w-full rounded-2xl border border-amber-300/25 bg-amber-300/10 py-4 text-sm font-extrabold text-amber-100 transition hover:bg-amber-300/20">Start scan <FaBug className="ml-2 inline" /></button>
    </ChaosCard>
    <AnimatePresence>{open && <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}><motion.div onClick={(event) => event.stopPropagation()} className="w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#181024] p-6 text-center shadow-2xl" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}><button onClick={() => setOpen(false)} className="float-right text-white/40 hover:text-white" aria-label="Close scan"><FaXmark /></button><div className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl ${stage === 'fixed' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-red-400/15 text-red-300'}`}>{stage === 'fixed' ? <FaCheck className="text-2xl" /> : <FaBug className="text-2xl" />}</div><h3 className="mt-5 font-display text-2xl font-black text-white">{stage === 'scan' ? 'Virus detected.' : stage === 'found' ? 'Problem found:' : 'System repaired.'}</h3>{stage === 'scan' && <><p className="mt-2 text-sm text-white/50">Scanning every questionable byte...</p><div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full bg-red-400" animate={{ x: ['-100%', '400%'] }} transition={{ repeat: Infinity, duration: 1.2 }} /></div></>}{stage === 'found' && <p className="mt-3 text-lg font-bold text-pink-200">Too much awesomeness.</p>}{stage === 'fixed' && <p className="mt-3 text-sm text-white/55">System status: exceptional.</p>}</motion.div></motion.div>}</AnimatePresence>
  </>
}

export function AchievementShelf() {
  const { unlocked } = useChaos()
  return <ChaosCard className="lg:col-span-2">
    <div className="mb-5 flex items-start justify-between gap-4"><CardTop icon={<FaLock />} eyebrow="Activity log" title="Recent discoveries" description={`${unlocked.length} of ${achievements.length} entries unlocked.`} /><Link to="/games" className="shrink-0 rounded-xl bg-white/6 px-3 py-2 text-xs font-bold text-white/55 transition hover:bg-white/10 hover:text-white">View log</Link></div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {achievements.slice(0, 4).map((achievement) => { const isUnlocked = unlocked.includes(achievement.id); return <div key={achievement.id} className={`rounded-2xl border p-3 ${isUnlocked ? 'border-violet-300/20 bg-violet-400/10' : 'border-white/5 bg-white/[.025]'}`}><span className={`text-xl ${isUnlocked ? '' : 'grayscale opacity-30'}`}>{isUnlocked ? achievement.icon : '🔒'}</span><p className={`mt-2 text-xs font-bold ${isUnlocked ? 'text-white' : 'text-white/30'}`}>{isUnlocked ? achievement.title : 'Classified'}</p></div> })}
    </div>
  </ChaosCard>
}

export function HiddenButton() {
  const { unlock, showToast, playSound } = useChaos()
  const [found, setFound] = useState(false)

  if (found) return null

  return <button
    aria-label="Unmarked control"
    className="absolute bottom-5 right-5 h-3 w-3 rounded-full bg-white/15 opacity-20 transition hover:scale-150 hover:opacity-70 focus:scale-150 focus:opacity-70"
    onClick={() => {
      setFound(true)
      unlock('secret-finder')
      playSound('success')
      showToast('New discovery logged.', 'That button was not on the map.', 'pink')
    }}
  />
}

export function ShutdownButton() {
  const { unlock, playSound } = useChaos()
  const [active, setActive] = useState(false)
  const [count, setCount] = useState(3)
  useEffect(() => {
    if (!active) return
    if (count === 0) { const timer = window.setTimeout(() => { unlock('shutdown-survivor'); setActive(false); setCount(3) }, 1800); return () => window.clearTimeout(timer) }
    const timer = window.setTimeout(() => setCount((value) => value - 1), 800)
    return () => window.clearTimeout(timer)
  }, [active, count, unlock])
  return <><button onClick={() => { setActive(true); playSound('warning') }} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/55 transition hover:border-red-300/30 hover:bg-red-400/10 hover:text-red-200"><FaPowerOff /> Power off</button><AnimatePresence>{active && <motion.div className="fixed inset-0 z-[120] grid place-items-center bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div key={count} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">{count > 0 ? <><p className="font-display text-[clamp(6rem,25vw,14rem)] font-black text-white">{count}</p><p className="text-sm font-bold uppercase tracking-[.3em] text-white/30">Powering down</p></> : <p className="font-display text-4xl font-black text-white sm:text-6xl">Nice try 😂</p>}</motion.div></motion.div>}</AnimatePresence></>
}

type Banana = { id: number, left: number, rotate: number, size: number }
export function BananaRain() {
  const { unlock } = useChaos()
  const [bananas, setBananas] = useState<Banana[]>([])
  useEffect(() => {
    const spawn = () => { const next = Array.from({ length: 20 }, (_, index) => ({ id: Date.now() + index, left: Math.random() * 100, rotate: Math.random() * 360, size: 22 + Math.random() * 26 })); setBananas(next); window.setTimeout(() => setBananas([]), 2700) }
    const banana = () => { unlock('banana-bender'); spawn() }
    const chaos = () => { confetti({ particleCount: 180, spread: 120, colors: ['#bba5ff', '#fb7ecb', '#fcd46c'] }); spawn() }
    const pizza = () => confetti({ particleCount: 140, spread: 95, origin: { y: 0.65 }, colors: ['#fb7ecb', '#bba5ff', '#fcd46c'] })
    window.addEventListener('banana-rain', banana)
    window.addEventListener('konami-chaos', chaos)
    window.addEventListener('pizza-party', pizza)
    return () => { window.removeEventListener('banana-rain', banana); window.removeEventListener('konami-chaos', chaos); window.removeEventListener('pizza-party', pizza) }
  }, [unlock])
  return <div className="pointer-events-none fixed inset-0 z-[110] overflow-hidden">{bananas.map((banana) => <motion.span key={banana.id} className="absolute -top-12" style={{ left: `${banana.left}%`, fontSize: banana.size }} initial={{ y: -40, rotate: banana.rotate, opacity: 0 }} animate={{ y: '112vh', rotate: banana.rotate + 480, opacity: [0, 1, 1, 0] }} transition={{ duration: 2.6, ease: 'linear' }}>🍌</motion.span>)}</div>
}
