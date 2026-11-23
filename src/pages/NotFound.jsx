import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

export default function NotFound() {
  return (
    <PageHeader hindi="रास्ता भटक गए?" title="This page wandered off" intro="Let’s get you back to the celebrations.">
      <p className="page-header__action">
        <Link to="/" viewTransition className="button">
          Back home
        </Link>
      </p>
    </PageHeader>
  )
}
