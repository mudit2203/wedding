/*
 * The couple's photos. Each is served as WebP at 480px and 960px wide from
 * /public/images/photos/<id>-<width>.webp. `focus` is the CSS object-position
 * that keeps faces in frame when a photo is cropped.
 *
 * To add a photo: export it at both widths with the same id, then add an entry.
 */
export const photos = {
  roka: {
    alt: 'Manubha and Himanshu in ivory and gold in front of a floral arch',
    ratio: '16 / 10',
    focus: '50% 30%',
  },
  bougainvilleaBench: {
    file: 'bougainvillea-bench',
    alt: 'Manubha offering Himanshu a flower on a bench under bougainvillea',
    ratio: '9 / 16',
    focus: '50% 70%',
  },
  garden: {
    alt: 'Himanshu and Manubha smiling in a garden',
    ratio: '9 / 16',
    focus: '50% 30%',
  },
  festiveLights: {
    file: 'festive-lights',
    alt: 'Manubha in sage green and Himanshu in wine, in a hall of light',
    ratio: '3 / 4',
    focus: '50% 40%',
  },
  proposal: {
    alt: 'Himanshu on one knee, putting a ring on Manubha’s finger',
    ratio: '3 / 4',
    focus: '55% 45%',
  },
  pampas: {
    alt: 'Manubha and Himanshu standing between pampas grass',
    ratio: '3 / 4',
    focus: '45% 55%',
  },
  seaLaugh: {
    file: 'sea-laugh',
    alt: 'Manubha laughing beside Himanshu by the sea',
    ratio: '4 / 3',
    focus: '40% 50%',
  },
  seaClose: {
    file: 'sea-close',
    alt: 'Manubha hiding a laugh while Himanshu smiles, by the sea',
    ratio: '3 / 4',
    focus: '50% 45%',
  },
  traditional: {
    alt: 'Himanshu and Manubha in cream and gold traditional clothes',
    ratio: '9 / 16',
    focus: '50% 35%',
  },
}

export function photoSources(id) {
  const photo = photos[id]
  if (!photo) return null
  const file = photo.file ?? id
  return {
    ...photo,
    src: `/images/photos/${file}-960.webp`,
    srcSet: `/images/photos/${file}-480.webp 480w, /images/photos/${file}-960.webp 960w`,
  }
}
