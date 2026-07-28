export type AchievementId =
  | 'first-click'
  | 'ten-clicks'
  | 'fifty-clicks'
  | 'mouse-marathon'
  | 'patient-human'
  | 'secret-finder'
  | 'banana-bender'
  | 'pizza-party'
  | 'code-master'
  | 'footer-fiend'
  | 'shutdown-survivor'

export type Achievement = {
  id: AchievementId
  title: string
  description: string
  icon: string
}

export type Settings = {
  soundEffects: boolean
  notifications: boolean
  reducedMotion: boolean
}

export type Toast = {
  id: number
  title: string
  body?: string
  tone?: 'purple' | 'pink' | 'yellow'
}
