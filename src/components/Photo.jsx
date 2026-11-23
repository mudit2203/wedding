import { photoSources } from '../data/photos.js'
import './Photo.css'

/**
 * One of the couple's photos, lazy-loaded at the right size.
 * `shape` frames it: 'rect' (default), 'arch' (a jharokha arch) or 'polaroid'.
 */
export default function Photo({
  id,
  shape = 'rect',
  sizes = '(min-width: 60rem) 30vw, 90vw',
  ratio,
  caption,
  priority = false,
  className = '',
}) {
  const photo = photoSources(id)
  if (!photo) return null

  return (
    <figure className={`photo photo--${shape} ${className}`.trim()}>
      <div className="photo__frame" style={{ aspectRatio: ratio ?? photo.ratio }}>
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes={sizes}
          alt={photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectPosition: photo.focus }}
        />
      </div>
      {caption && <figcaption className="photo__caption">{caption}</figcaption>}
    </figure>
  )
}
