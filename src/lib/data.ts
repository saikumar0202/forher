import type { Achievement, AchievementId, Settings } from '../types'

export const STORAGE_KEYS = {
  clicks: 'annoyher-clicks',
  visits: 'annoyher-visits',
  achievements: 'annoyher-achievements',
  settings: 'annoyher-settings',
  mouseMoves: 'annoyher-mouse-moves',
} as const

export const defaultSettings: Settings = {
  soundEffects: true,
  notifications: true,
  reducedMotion: false,
}

export const achievements: Achievement[] = [
  { id: 'first-click', title: 'Rule Breaker', description: 'Clicked the forbidden button once.', icon: '⚡' },
  { id: 'ten-clicks', title: 'Very Persistent', description: 'Clicked it 10 times.', icon: '🔁' },
  { id: 'fifty-clicks', title: 'Button Enthusiast', description: 'Clicked it 50 times.', icon: '🏆' },
  { id: 'mouse-marathon', title: 'Mouse Athlete', description: 'Moved your cursor a whole lot.', icon: '🖱️' },
  { id: 'patient-human', title: 'Still Here?', description: 'Survived two minutes of chaos.', icon: '⏳' },
  { id: 'secret-finder', title: 'Secret Agent', description: 'Found a very tiny hidden button.', icon: '🕵️' },
  { id: 'banana-bender', title: 'Banana Bender', description: 'Summoned a fruit storm.', icon: '🍌' },
  { id: 'pizza-party', title: 'Pizza Protocol', description: 'Typed the sacred food word.', icon: '🍕' },
  { id: 'code-master', title: 'Classic Gamer', description: 'Entered the Konami Code.', icon: '🎮' },
  { id: 'footer-fiend', title: 'Footer Fiend', description: 'Clicked the footer five times.', icon: '🦶' },
  { id: 'shutdown-survivor', title: 'Nice Try', description: 'Attempted a fake shutdown.', icon: '🧯' },
]

export const achievementById = Object.fromEntries(
  achievements.map((achievement) => [achievement.id, achievement]),
) as Record<AchievementId, Achievement>

export const prankMessages = [
  'That was not a continue button.',
  'I literally told you not to.',
  'Again?',
  "You're very stubborn.",
  'Fine... keep clicking.',
  'This is your personality now.',
  'The button is judging you.',
  'One more? I dare you.',
  'At this point, we are both committed.',
]

export const moods = ['Hungry', 'Sleepy', 'Needs coffee', 'Planning revenge', 'Loading...', 'Suspiciously fabulous']
export const refreshMood = moods[Math.floor(Math.random() * moods.length)]

export const aiReplies = [
  'Maybe.',
  'No.',
  'Try again.',
  'I refuse to answer.',
  'Ask your cat.',
  'The vibes say: absolutely not.',
  'Have you tried turning your thoughts off and on?',
  'That sounds like a tomorrow problem.',
]

export const randomToastMessages = [
  ['Downloading ducks...', 'They are almost ready.'],
  ['Bug installed successfully.', 'It is emotionally attached now.'],
  ['Coffee level low.', 'Please locate a mug immediately.'],
  ['Task failed successfully.', 'A truly efficient failure.'],
  ['Suspicion detected.', 'No one is accusing you. Yet.'],
] as const
