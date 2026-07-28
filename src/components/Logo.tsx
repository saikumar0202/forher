import { motion } from 'framer-motion'
import { FaBolt } from 'react-icons/fa6'

export function Logo() {
  return (
    <motion.button
      aria-label="AnnoyHer home logo"
      className="group flex items-center gap-2 rounded-full text-left"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-400 to-pink-400 text-sm text-ink shadow-glow">
        <FaBolt />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-white">
        Annoy<span className="text-pink">Her</span><span className="text-violet-300">.exe</span>
      </span>
    </motion.button>
  )
}
