/*
 * Bride & Groom page. Everything here is a placeholder for now; the couple
 * will send their real answers before launch.
 */
export const profiles = [
  {
    id: 'bride',
    role: 'The Bride',
    roleHindi: 'वधू',
    name: 'Manubha',
    initial: 'M',
    intro:
      'Grew up in Jaipur, loves a good cup of chai, old Hindi songs and planning every trip down to the last detail.',
    photos: ['bougainvilleaBench', 'seaClose', 'pampas'],
    facts: [
      { label: 'Can’t live without', value: 'Masala chai, twice a day' },
      { label: 'Favourite Jaipur food', value: 'Pyaaz kachori from the old city' },
      { label: 'Secret talent', value: 'Remembers every birthday, ever' },
      { label: 'Most likely to', value: 'Plan the itinerary for everyone' },
    ],
  },
  {
    id: 'groom',
    role: 'The Groom',
    roleHindi: 'वर',
    name: 'Himanshu',
    initial: 'H',
    intro:
      'Calm in every storm, always five minutes late, and happiest with a long drive and a good playlist.',
    photos: ['garden', 'festiveLights', 'traditional'],
    facts: [
      { label: 'Can’t live without', value: 'A long drive with music on' },
      { label: 'Favourite Jaipur food', value: 'Dal baati churma, no question' },
      { label: 'Secret talent', value: 'Can sleep anywhere, instantly' },
      { label: 'Most likely to', value: 'Be the last one on the dance floor' },
    ],
  },
]

export const numbers = [
  { value: 'Since school', label: 'in the same corridors' },
  { value: '4', label: 'years as best friends' },
  { value: '1,000+', label: 'cups of chai together' },
  { value: '1', label: 'question, and one yes' },
]

// "Who is more likely to…" — tap a card to reveal the answer.
export const quiz = [
  { question: 'Who said “I love you” first?', answer: 'Himanshu' },
  { question: 'Who is always running late?', answer: 'Himanshu' },
  { question: 'Who plans every trip?', answer: 'Manubha' },
  { question: 'Who is the better dancer?', answer: 'Manubha' },
  { question: 'Who cries at movies?', answer: 'Both of us' },
  { question: 'Who wins every argument?', answer: 'Manubha' },
]
