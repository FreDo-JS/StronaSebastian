import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import './index.css'
import Site from './Site.jsx'

export function render(path) {
  return renderToString(
    <StrictMode>
      <Site path={path} />
    </StrictMode>,
  )
}
