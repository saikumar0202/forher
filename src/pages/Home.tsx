import { motion } from 'framer-motion'
import { FaArrowDown, FaBolt } from 'react-icons/fa6'
import { useChaos } from '../context/ChaosContext'
import { AchievementShelf, BananaRain, DoNotClick, FakeAi, FakeProgress, HiddenButton, MoodDetector, RunawayButton, ShutdownButton, VirusCard } from '../components/PrankCards'

export function Home() {
  const { visits } = useChaos()
  return <>
    <BananaRain />
    <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] px-6 py-12 shadow-glow sm:px-10 sm:py-16">
      <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-pink-400/20 blur-[70px]" />
      <div className="absolute bottom-0 left-1/3 h-40 w-60 rounded-full bg-violet-500/20 blur-[70px]" />
      <motion.div className="relative max-w-3xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/10 px-3 py-1.5 text-xs font-extrabold text-violet-200"><FaBolt className="text-pink" /> System dashboard v1.0</div>
        <h1 className="font-display text-4xl font-black leading-[.94] tracking-tight text-white sm:text-6xl lg:text-7xl">Everything appears to be<br /><span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">working normally.</span></h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">Review the active modules below to keep your system running smoothly.</p>
        <div className="mt-8 flex flex-wrap items-center gap-3"><a href="#chaos" className="rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-ink transition hover:bg-violet-100">Open dashboard <FaArrowDown className="ml-1 inline text-xs" /></a><ShutdownButton /></div>
      </motion.div>
      <div className="relative mt-10 flex flex-wrap gap-5 border-t border-white/10 pt-5 text-xs font-semibold text-white/40"><span><b className="text-white">{visits}</b> sessions recorded</span><span>All systems nominal</span><span>Last checked: just now</span></div>
      <HiddenButton />
    </section>
    <div id="chaos" className="mb-5 flex items-end justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-pink-300">System dashboard</p><h2 className="font-display mt-1 text-2xl font-black text-white sm:text-3xl">Active modules.</h2></div><span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/35 sm:block">Status: operational</span></div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DoNotClick />
      <RunawayButton />
      <FakeProgress />
      <VirusCard />
      <MoodDetector />
      <FakeAi />
      <AchievementShelf />
    </div>
  </>
}
