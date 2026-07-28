import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const steps = ['Starting system...', 'Syncing modules...', 'Checking status...', 'Ready.']

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step < steps.length - 1) {
      const timer = window.setTimeout(() => setStep((value) => value + 1), 620)
      return () => window.clearTimeout(timer)
    }
    const timer = window.setTimeout(onComplete, 760)
    return () => window.clearTimeout(timer)
  }, [step, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink px-6"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.55 }}
    >
      <div className="absolute h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />
      <motion.div className="relative w-full max-w-sm text-center" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <motion.div className="mx-auto mb-8 h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-400 to-pink-400 shadow-[0_0_70px_rgba(211,126,255,.48)]" animate={{ rotate: [0, -7, 7, 0], scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-violet-300">AnnoyHer.exe</p>
        <AnimatePresence mode="wait">
          <motion.h1 key={steps[step]} className="font-display text-3xl font-extrabold text-white" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {steps[step]}
          </motion.h1>
        </AnimatePresence>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400" animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ ease: 'easeInOut' }} />
        </div>
      </motion.div>
    </motion.div>
  )
}
