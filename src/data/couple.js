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
      'A psychologist by profession and a calm, patient listener by nature. Happiest with a cup of matcha and a plate of sushi.',
    photos: ['bougainvilleaBench', 'seaClose', 'pampas'],
    facts: [
      { label: 'Profession', value: 'Psychologist' },
      { label: 'Can’t live without', value: 'A cup of matcha' },
      { label: 'Favourite food', value: 'Sushi, always sushi' },
      { label: 'Best known for', value: 'Staying calm and truly listening' },
    ],
  },
  {
    id: 'groom',
    role: 'The Groom',
    roleHindi: 'वर',
    name: 'Himanshu',
    initial: 'H',
    intro:
      'An entrepreneur who plans everything, from business to birthdays. Runs on chai, and is always first on the dance floor.',
    photos: ['garden', 'festiveLights', 'traditional'],
    facts: [
      { label: 'Profession', value: 'Entrepreneur' },
      { label: 'Can’t live without', value: 'Masala chai' },
      { label: 'Favourite food', value: 'Pyaaz kachori and dal baati churma' },
      { label: 'Most likely to', value: 'Plan every detail, for everyone' },
    ],
  },
]

export const numbers = [
  { value: 'Since school', label: 'in the same corridors' },
  { value: '4', label: 'years as best friends' },
  { value: '1,000+', label: 'cups of chai and matcha' },
  { value: '1', label: 'question, and one yes' },
]

// "Who is more likely to…" — tap a card to reveal the answer.
export const quiz = [
  { question: 'Who said “I love you” first?', answer: 'Himanshu' },
  { question: 'Who is the better listener?', answer: 'Manubha' },
  { question: 'Who plans every trip?', answer: 'Himanshu' },
  { question: 'Who is the better dancer?', answer: 'Himanshu' },
  { question: 'Who cries at movies?', answer: 'Both of us' },
  { question: 'Who wins every argument?', answer: 'Manubha' },
]
