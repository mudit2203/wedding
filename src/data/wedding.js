/*
 * The core facts of the wedding. Text marked "Placeholder" is temporary
 * and will be replaced with the families' own words.
 */
export const wedding = {
  bride: 'Manubha',
  groom: 'Himanshu',
  hashtag: '#ManuWedsHimanshu', // Placeholder
  city: 'Jaipur',
  // The countdown runs to the Baraat Aagman, 5 PM India time.
  countdownTo: '2027-01-27T17:00:00+05:30',
  dateLabel: 'Wednesday, 27 January 2027',
  dateShort: '27 · 01 · 2027',
  celebrationDates: '24 – 27 January 2027',
  rsvpBy: '31 December 2026', // Placeholder

  venue: {
    name: 'Roop Garh Palace',
    city: 'Jaipur, Rajasthan',
    directionsUrl: 'https://maps.app.goo.gl/xgCt9SBRPEksyXd58',
    mapQuery: 'Roop Garh Palace, Jaipur',
    dates: '26 – 27 January 2027',
  },

  invocation: {
    hindi: 'ॐ श्री गणेशाय नमः',
    blessingHindi: 'श्री गोविंद देव जी की कृपा एवं कुल देवताओं के आशीर्वाद से',
    blessing: 'With the grace of Shri Govind Dev Ji and the blessings of our family deities',
  },

  invitation: {
    hindi: 'हम आपको सादर आमंत्रित करते हैं इस शुभ विवाह समारोह में',
    english: 'We joyfully invite you to celebrate the wedding of',
  },

  // Placeholder: parents' names to be confirmed by the families.
  families: {
    bride: { hindi: 'श्रीमती एवं श्री ___ की सुपुत्री', english: 'Daughter of Mrs & Mr ___' },
    groom: { hindi: 'श्रीमती एवं श्री ___ के सुपुत्र', english: 'Son of Mrs & Mr ___' },
  },
}

// Family contacts for guests. Numbers are Indian mobiles, stored without +91.
export const contacts = [
  { name: 'Vishnu Kumar Sharma', role: 'Bride’s father', roleHindi: 'वधू के पिता', phone: '9829344740' },
  { name: 'Mudit Sharma', role: 'Bride’s brother', roleHindi: 'वधू के भाई', phone: '9983444740' },
  { name: 'Himanshu Goyal', role: 'The groom', roleHindi: 'वर', phone: '8559856991' },
]

export const instagram = {
  handle: '@h_n_m_forever',
  url: 'https://www.instagram.com/h_n_m_forever',
}

export const navLinks = [
  { to: '/story', label: 'Our Story', hindi: 'हमारी कहानी' },
  { to: '/couple', label: 'Bride & Groom', hindi: 'वर-वधू' },
  { to: '/celebrations', label: 'Celebrations', hindi: 'उत्सव' },
  { to: '/dress-code', label: 'Dress Code', hindi: 'पहनावा' },
  { to: '/venue', label: 'Venue & Travel', hindi: 'विवाह स्थल' },
  { to: '/contact', label: 'Contact', hindi: 'संपर्क' },
]
