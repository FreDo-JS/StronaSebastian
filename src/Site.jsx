import App from './App.jsx'
import ServicePage from './ServicePage.jsx'
import { findPage } from './pages.js'

// Jedna aplikacja, wiele adresów: podstrona usługowa albo strona główna.
export default function Site({ path }) {
  const page = findPage(path)
  return page ? <ServicePage page={page} /> : <App />
}
