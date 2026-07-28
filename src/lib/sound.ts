export type SoundEffect = 'tap' | 'warning' | 'success' | 'scan'

const sounds: Record<SoundEffect, { frequency: number, duration: number, type: OscillatorType, volume: number }> = {
  tap: { frequency: 440, duration: 0.07, type: 'sine', volume: 0.035 },
  warning: { frequency: 196, duration: 0.12, type: 'square', volume: 0.045 },
  success: { frequency: 660, duration: 0.13, type: 'sine', volume: 0.04 },
  scan: { frequency: 320, duration: 0.16, type: 'triangle', volume: 0.035 },
}

export function playInterfaceSound(enabled: boolean, effect: SoundEffect = 'tap') {
  if (!enabled || typeof window === 'undefined') return

  const AudioContextClass = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioContextClass) return

  const context = new AudioContextClass()
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const sound = sounds[effect]
  const now = context.currentTime

  oscillator.type = sound.type
  oscillator.frequency.setValueAtTime(sound.frequency, now)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(sound.volume, now + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + sound.duration)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(now)
  oscillator.stop(now + sound.duration + 0.02)
  oscillator.addEventListener('ended', () => void context.close())
}
