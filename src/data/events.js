/*
 * The celebrations, grouped by day. `sky` sets the colour of the painted sky
 * behind each event card to match its time of day. `dressCode` links to an
 * entry in dressCodes.js. `directions` is a Google Maps link, or null
 * while the venue's link is still to come.
 *
 * Venues and times for 24 and 25 January are placeholders until confirmed.
 */
import { wedding } from './wedding.js'

const palaceDirections = wedding.venue.directionsUrl

export const days = [
  {
    id: 'day-1',
    date: '24 January 2027',
    dateHindi: '२४ जनवरी २०२७',
    weekday: 'Sunday',
    events: [
      {
        id: 'mehendi-bride',
        name: 'Mehendi',
        hindi: 'मेहंदी',
        side: 'Bride’s family',
        time: 'Time to be shared',
        venue: 'Bride’s family venue · to be shared',
        directions: null, // Link to come
        dressCode: 'mehendi',
        about:
          'Henna for the bride and every hand that wants it, with folk songs, chai and a lot of laughter.',
        sky: ['#f4e3c9', '#e9c9a0'],
      },
    ],
  },
  {
    id: 'day-2',
    date: '25 January 2027',
    dateHindi: '२५ जनवरी २०२७',
    weekday: 'Monday',
    events: [
      {
        id: 'mehendi-groom',
        name: 'Mehendi',
        hindi: 'मेहंदी',
        side: 'Groom’s family',
        time: 'Time to be shared',
        venue: 'Groom’s family venue · to be shared',
        directions: null, // Link to come
        dressCode: 'mehendi',
        about: 'The groom’s side gathers for their own afternoon of henna and music.',
        sky: ['#f6ead3', '#e8cfa6'],
      },
      {
        id: 'chak-bhat',
        name: 'Chak Bhat',
        hindi: 'चाक भात',
        side: 'Bride’s family',
        time: 'Time to be shared',
        venue: 'Bride’s family venue · to be shared',
        directions: null, // Link to come
        dressCode: 'chak-bhat',
        about:
          'The potter’s wheel is worshipped and the maternal family is welcomed with gifts, an old Rajasthani blessing for a new home.',
        sky: ['#efe0c4', '#d9b88a'],
      },
    ],
  },
  {
    id: 'day-3',
    date: '26 January 2027',
    dateHindi: '२६ जनवरी २०२७',
    weekday: 'Tuesday',
    events: [
      {
        id: 'mayara',
        name: 'Mamayro Maan',
        hindi: 'मायरा',
        side: 'Groom’s family',
        time: '12:00 PM onwards',
        venue: 'Roop Garh Palace',
        directions: palaceDirections,
        about:
          'The maternal uncles arrive with gifts and blessings, honouring the bond between a mother and her brothers.',
        dressCode: 'mayara',
        sky: ['#fbe9c8', '#f1c27d'],
      },
      {
        id: 'sangeet',
        name: 'Sangeet Night',
        hindi: 'संगीत संध्या',
        side: 'Both families',
        time: '8:00 PM onwards',
        venue: 'Roop Garh Palace',
        directions: palaceDirections,
        about: 'Both families take the stage. Expect rehearsed dances, unrehearsed dances and a late night.',
        dressCode: 'sangeet',
        sky: ['#1f2a4a', '#3a3556'],
        night: true,
      },
    ],
  },
  {
    id: 'day-4',
    date: '27 January 2027',
    dateHindi: '२७ जनवरी २०२७',
    weekday: 'Wednesday',
    events: [
      {
        id: 'haldi',
        name: 'Haldi Carnival',
        hindi: 'हल्दी',
        side: 'Both families',
        time: '11:00 AM',
        venue: 'Roop Garh Palace',
        directions: palaceDirections,
        about: 'Turmeric, marigolds and a morning of colour to bless the couple before the wedding.',
        dressCode: 'haldi',
        sky: ['#fff1c9', '#f6c453'],
      },
      {
        id: 'baraat',
        name: 'Baraat Aagman',
        hindi: 'बारात आगमन',
        side: 'Everyone',
        time: '5:00 PM',
        venue: 'Roop Garh Palace',
        directions: palaceDirections,
        about: 'The groom arrives with dhol, band and dancing, and is welcomed by the bride’s family.',
        dressCode: 'wedding',
        sky: ['#f6c79a', '#d9828f'],
      },
      {
        id: 'varmala',
        name: 'Varmala',
        hindi: 'वरमाला',
        side: 'Everyone',
        time: '7:15 PM',
        venue: 'Roop Garh Palace',
        directions: palaceDirections,
        about: 'The bride and groom exchange garlands, accepting each other in front of everyone they love.',
        dressCode: 'wedding',
        sky: ['#8c5a6e', '#3f3550'],
        night: true,
      },
      {
        id: 'vivah',
        name: 'Shubh Vivah',
        hindi: 'शुभ विवाह',
        side: 'Everyone',
        time: '9:15 PM',
        venue: 'Roop Garh Palace',
        directions: palaceDirections,
        about: 'Seven pheras around the sacred fire and seven promises, made for life.',
        dressCode: 'wedding',
        sky: ['#2a2238', '#4b2530'],
        night: true,
      },
    ],
  },
]
