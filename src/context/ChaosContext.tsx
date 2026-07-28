import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { achievementById, defaultSettings, STORAGE_KEYS } from '../lib/data'
import { playInterfaceSound, type SoundEffect } from '../lib/sound'
import { readStorage, writeStorage } from '../lib/storage'
import type { AchievementId, Settings, Toast } from '../types'

type ChaosContextValue = {
  clicks: number
  visits: number
  mouseMoves: number
  unlocked: AchievementId[]
  settings: Settings
  addClick: () => number
  trackMouse: () => void
  unlock: (id: AchievementId) => void
  updateSettings: (next: Partial<Settings>) => void
  playSound: (effect?: SoundEffect) => void
  resetData: () => void
  showToast: (title: string, body?: string, tone?: Toast['tone']) => void
  removeToast: (id: number) => void
  toasts: Toast[]
}

const ChaosContext = createContext<ChaosContextValue | null>(null)

export function ChaosProvider({ children }: { children: React.ReactNode }) {
  const [clicks, setClicks] = useState(() => readStorage(STORAGE_KEYS.clicks, 0))
  const [visits, setVisits] = useState(() => readStorage(STORAGE_KEYS.visits, 0) + 1)
  const [mouseMoves, setMouseMoves] = useState(() => readStorage(STORAGE_KEYS.mouseMoves, 0))
  const [unlocked, setUnlocked] = useState<AchievementId[]>(() => readStorage(STORAGE_KEYS.achievements, []))
  const [settings, setSettings] = useState<Settings>(() => readStorage(STORAGE_KEYS.settings, defaultSettings))
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => writeStorage(STORAGE_KEYS.clicks, clicks), [clicks])
  useEffect(() => writeStorage(STORAGE_KEYS.visits, visits), [visits])
  useEffect(() => writeStorage(STORAGE_KEYS.mouseMoves, mouseMoves), [mouseMoves])
  useEffect(() => writeStorage(STORAGE_KEYS.achievements, unlocked), [unlocked])
  useEffect(() => writeStorage(STORAGE_KEYS.settings, settings), [settings])

  const showToast = useCallback((title: string, body?: string, tone: Toast['tone'] = 'purple') => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setToasts((current) => [...current.slice(-3), { id, title, body, tone }])
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4200)
  }, [])

  const unlock = useCallback((id: AchievementId) => {
    setUnlocked((current) => {
      if (current.includes(id)) return current
      const achievement = achievementById[id]
      window.setTimeout(() => showToast('Achievement unlocked!', `${achievement.icon} ${achievement.title}`, 'yellow'), 150)
      return [...current, id]
    })
  }, [showToast])

  useEffect(() => {
    const timer = window.setTimeout(() => unlock('patient-human'), 120000)
    return () => window.clearTimeout(timer)
  }, [unlock])

  const addClick = useCallback(() => {
    let nextValue = 0
    setClicks((current) => {
      nextValue = current + 1
      return nextValue
    })
    return nextValue
  }, [])

  const trackMouse = useCallback(() => {
    setMouseMoves((current) => {
      const next = current + 1
      if (next === 160) unlock('mouse-marathon')
      return next
    })
  }, [unlock])

  const updateSettings = useCallback((next: Partial<Settings>) => {
    setSettings((current) => ({ ...current, ...next }))
  }, [])

  const playSound = useCallback((effect: SoundEffect = 'tap') => {
    playInterfaceSound(settings.soundEffects, effect)
  }, [settings.soundEffects])

  const resetData = useCallback(() => {
    setClicks(0)
    setVisits(0)
    setMouseMoves(0)
    setUnlocked([])
    setSettings(defaultSettings)
    showToast('Fresh chaos installed.', 'Your stats have been reset.', 'pink')
  }, [showToast])

  const value = useMemo(() => ({
    clicks, visits, mouseMoves, unlocked, settings, addClick, trackMouse, unlock,
    updateSettings, playSound, resetData, showToast, removeToast: (id: number) => setToasts((current) => current.filter((toast) => toast.id !== id)), toasts,
  }), [clicks, visits, mouseMoves, unlocked, settings, addClick, trackMouse, unlock, updateSettings, playSound, resetData, showToast, toasts])

  return <ChaosContext.Provider value={value}>{children}</ChaosContext.Provider>
}

export function useChaos() {
  const context = useContext(ChaosContext)
  if (!context) throw new Error('useChaos must be used inside ChaosProvider')
  return context
}
