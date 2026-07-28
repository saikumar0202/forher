import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaGamepad, FaTrophy, FaWandMagicSparkles } from 'react-icons/fa6'
import { achievements } from '../lib/data'
import { useChaos } from '../context/ChaosContext'
import { ChaosCard } from '../components/PrankCards'

export function Games() {
  const { unlocked, showToast } = useChaos()
  const [target, setTarget] = useState({ x: 48, y: 52 })
  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(10)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    if (seconds === 0) return
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [playing, seconds, score, showToast])
  useEffect(() => {
    if (!playing || seconds !== 0) return
    const timer = window.setTimeout(() => {
      setPlaying(false)
      showToast('Time!', `You booped ${score} sparkle${score === 1 ? '' : 's'}.`, 'pink')
    }, 0)
    return () => window.clearTimeout(timer)
  }, [playing, score, seconds, showToast])
  const start = () => { setScore(0); setSeconds(10); setPlaying(true); setTarget({ x: 48, y: 52 }) }
  const hit = () => { if (!playing) return; setScore((value) => value + 1); setTarget({ x: 8 + Math.random() * 82, y: 12 + Math.random() * 70 }) }
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
    <div className="mb-9 max-w-2xl"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-pink-300">Tiny arcade</p><h1 className="font-display mt-2 text-4xl font-black text-white sm:text-5xl">Games with very low stakes.</h1><p className="mt-3 text-white/50">A quick distraction for when the chaos dashboard is not quite chaotic enough.</p></div>
    <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <ChaosCard className="min-h-[390px]"><div className="flex items-start justify-between"><div><span className="grid h-10 w-10 place-items-center rounded-2xl bg-pink-400/10 text-pink"><FaWandMagicSparkles /></span><h2 className="font-display mt-4 text-2xl font-black">Sparkle boop</h2><p className="mt-1 text-sm text-white/45">Click the sparkle as fast as you can.</p></div><div className="text-right"><p className="font-display text-3xl font-black text-violet-200">{score}</p><p className="text-[10px] font-bold uppercase tracking-wider text-white/35">Score</p></div></div><div className="relative mt-6 h-48 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-violet-400/10 to-pink-400/10">{playing && <motion.button onClick={hit} className="absolute grid h-12 w-12 place-items-center rounded-full bg-white text-xl shadow-xl" style={{ left: `${target.x}%`, top: `${target.y}%` }} animate={{ left: `${target.x}%`, top: `${target.y}%`, rotate: [0, 16, -10, 0] }} transition={{ type: 'spring', stiffness: 360, damping: 20 }} aria-label="Boop sparkle">✦</motion.button>}{!playing && <div className="grid h-full place-items-center text-center"><p className="text-sm text-white/35">{seconds === 0 ? 'That was sparkly.' : 'Ready when you are.'}</p></div>}</div><div className="mt-5 flex items-center justify-between"><p className="font-display text-xl font-bold text-white">{playing ? `${seconds}s` : '10 seconds'}</p><button onClick={start} className="rounded-xl bg-gradient-to-r from-violet-400 to-pink-400 px-4 py-2.5 text-sm font-extrabold text-ink">{playing ? 'Restart' : 'Play now'}</button></div></ChaosCard>
      <ChaosCard><div className="mb-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-300/10 text-amber-200"><FaTrophy /></span><div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-pink-300">Activity record</p><h2 className="font-display text-xl font-black">Badge collection</h2></div></div><p className="mb-5 text-sm text-white/50">{unlocked.length} / {achievements.length} entries logged.</p><div className="space-y-2">{achievements.map((achievement) => { const earned = unlocked.includes(achievement.id); return <div key={achievement.id} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${earned ? 'border-violet-300/15 bg-violet-400/10' : 'border-white/5 bg-white/[.025]'}`}><span className={earned ? '' : 'grayscale opacity-30'}>{earned ? achievement.icon : '🔒'}</span><div><p className={`text-xs font-bold ${earned ? 'text-white' : 'text-white/30'}`}>{earned ? achievement.title : 'Mystery badge'}</p>{earned && <p className="text-[10px] text-white/35">{achievement.description}</p>}</div></div> })}</div></ChaosCard>
    </div>
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-center text-sm text-white/45"><FaGamepad className="mr-2 inline text-violet-300" />No leaderboards. No pressure. Only sparkle-related glory.</div>
  </motion.div>
}
