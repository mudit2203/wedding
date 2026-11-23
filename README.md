# Wedding Invitation

A React + Vite starter for a wedding invitation website.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Customise

- Couple names, date, events and RSVP deadline: `src/data/wedding.js`
- Colours and fonts: `src/index.css` and `src/App.css`
- Sections: `src/components/` (Hero, Countdown, Events, Rsvp)

The RSVP form currently only logs to the console; connect it to a backend, Google Form, or email service in `src/components/Rsvp.jsx`.

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build
```
