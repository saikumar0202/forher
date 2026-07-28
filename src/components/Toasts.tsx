import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'
import { useChaos } from '../context/ChaosContext'

const tones = {
  purple: 'border-violet-400/25 bg-violet-400/10',
  pink: 'border-pink-400/25 bg-pink-400/10',
  yellow: 'border-amber-300/30 bg-amber-300/10',
}

export function Toasts() {
  const { toasts, removeToast } = useChaos()
  return (
    <div className="fixed right-4 top-20 z-[80] flex w-[min(92vw,340px)] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div key={toast.id} layout initial={{ opacity: 0, x: 24, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 30, scale: 0.95 }} className={`flex gap-3 rounded-2xl border p-3 backdrop-blur-xl ${tones[toast.tone ?? 'purple']}`}>
            <span className="mt-0.5 text-base">✦</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">{toast.title}</p>
              {toast.body && <p className="mt-0.5 text-xs text-white/55">{toast.body}</p>}
            </div>
            <button aria-label="Dismiss notification" onClick={() => removeToast(toast.id)} className="text-white/40 transition hover:text-white"><FaXmark /></button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
