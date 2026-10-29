import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import Site from './Site.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <Site path={window.location.pathname} />
  </StrictMode>
)

// Zbudowane strony mają HTML wyrenderowany podczas builda (prerender) — wtedy tylko podpinamy obsługę.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
