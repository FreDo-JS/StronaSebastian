import { useState, useEffect } from 'react'
import { R } from './motion.js'
import { SERVICES, PACKAGES } from './data.js'
import { SERVICE_PAGES, pageUrl } from './pages.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/* ───────── Decorative organic blobs ───────── */

function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Closed smooth path through n jittered points (Catmull-Rom → cubic Bézier), viewBox -100..100
function blobPath(seed, n = 8) {
  const rand = mulberry32(seed)
  const pts = Array.from({ length: n }, (_, i) => {
    const r = 68 + rand() * 30
    const a = (Math.PI * 2 * i) / n
    return [Math.cos(a) * r, Math.sin(a) * r]
  })
  const at = i => pts[(i + n) % n]
  let d = `M${at(0)[0].toFixed(1)},${at(0)[1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2)
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d + 'Z'
}

const BLOB_PATHS = [3, 8, 15, 21].map(s => blobPath(s))

export function Blob({ tone, variant = 0, className = '', style }) {
  return (
    <svg className={`blob blob--${tone} ${className}`} style={style} viewBox="-100 -100 200 200" aria-hidden="true">
      <path d={BLOB_PATHS[variant % BLOB_PATHS.length]} />
    </svg>
  )
}

/* ───────── Shared bits ───────── */

export function Arrow() {
  return (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ───────── Nav ───────── */

const NAV_LINKS = [
  { label: 'O mnie', href: '#o-mnie' },
  { label: 'Oferta', href: '#oferta' },
  { label: 'Jak pracuję', href: '#proces' },
  { label: 'Realizacje', href: '#realizacje' },
  { label: 'Cennik', href: '#cennik' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

// base: '' na stronie głównej, '/' na podstronach (linki do sekcji prowadzą wtedy do strony głównej)
export function Nav({ base = '' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)
  const hrefOf = l => (l.href === '#kontakt' ? l.href : base + l.href)

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <a href={base || '#'} className="nav__logo">Sebastian Michałek</a>

          <nav aria-label="Główna nawigacja">
            <ul className="nav__links">
              {NAV_LINKS.map(l => (
                <li key={l.href}><a href={hrefOf(l)}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <a href="#kontakt" className="btn btn--primary btn--sm nav__cta">Bezpłatna wycena</a>

          <button
            className="nav__burger"
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`overlay${open ? ' overlay--open' : ''}`} aria-hidden={!open} inert={!open}>
        <div className="overlay__header">
          <span className="nav__logo">Sebastian Michałek</span>
          <button className="overlay__close" onClick={close} aria-label="Zamknij menu">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="overlay__nav">
          {NAV_LINKS.map((l, i) => (
            <a key={l.href} href={hrefOf(l)} className="overlay__link" onClick={close}
              style={{ animationDelay: open ? `${i * 0.05}s` : '0s' }}>
              <span>0{i + 1}</span>{l.label}
            </a>
          ))}
        </div>
        <div className="overlay__footer">
          <a href="#kontakt" className="btn btn--primary btn--block" onClick={close}>Bezpłatna wycena</a>
        </div>
      </div>
    </>
  )
}

/* ───────── Contact ───────── */

export function Contact({ interest, setInterest }) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const toggle = title =>
    setInterest(list => (list.includes(title) ? list.filter(t => t !== title) : [...list, title]))

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    setError(null)
    const message = interest.length
      ? `Interesuje mnie: ${interest.join(', ')}\n\n${form.message}`
      : form.message
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, message }),
      })
      const data = await res.json()
      if (res.ok) setSent(true)
      else setError(data.error || 'Coś poszło nie tak. Spróbuj ponownie.')
    } catch {
      setError('Brak połączenia z serwerem. Spróbuj ponownie.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section" id="kontakt">
      <div className="container split">
        <div>
          <span className="eyebrow" {...R(0)}>Kontakt</span>
          <h2 className="h2" {...R(0.05)}>Potrzebujesz strony, sklepu lub pozycjonowania w Poznaniu? Porozmawiajmy.</h2>
          <p className="lead" {...R(0.1)}>
            Opisz mi swój projekt, a ja odezwę się w ciągu 24 godzin z bezpłatną wyceną
            i odpowiedziami na Twoje pytania.
          </p>
          <dl className="contact-info">
            <div {...R(0.15)}><dt>E-mail</dt><dd><a href="mailto:sebastian20020505@gmail.com">sebastian20020505@gmail.com</a></dd></div>
            <div {...R(0.23)}><dt>Telefon</dt><dd><a href="tel:+48797052895">+48 797 052 895</a></dd></div>
            <div {...R(0.31)}><dt>Dostępność</dt><dd>Pon–Pt, 9:00–17:00</dd></div>
          </dl>
        </div>

        <div className="form-card" {...R(0.15, 'right')}>
          {sent ? (
            <div className="sent">
              <h3>Wiadomość wysłana</h3>
              <p>Odezwę się w ciągu 24 godzin. Dziękuję za kontakt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <fieldset className="chips">
                <legend>Czego potrzebujesz?</legend>
                {SERVICES.map(s => (
                  <label key={s.title} className={`chip${interest.includes(s.title) ? ' chip--on' : ''}`}>
                    <input type="checkbox" checked={interest.includes(s.title)} onChange={() => toggle(s.title)} />
                    {s.title}
                  </label>
                ))}
              </fieldset>
              <fieldset className="chips">
                <legend>Pakiet (opcjonalnie)</legend>
                {PACKAGES.map(p => (
                  <label key={p.name} className={`chip${interest.includes(p.name) ? ' chip--on' : ''}`}>
                    <input type="checkbox" checked={interest.includes(p.name)} onChange={() => toggle(p.name)} />
                    {p.name}
                  </label>
                ))}
              </fieldset>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Imię i nazwisko</label>
                  <input id="name" name="name" type="text" placeholder="Jan Kowalski"
                    value={form.name} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="company">Firma (opcjonalnie)</label>
                  <input id="company" name="company" type="text" placeholder="Nazwa firmy"
                    value={form.company} onChange={handleChange} />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" placeholder="jan@example.pl"
                    value={form.email} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Telefon (opcjonalnie)</label>
                  <input id="phone" name="phone" type="tel" placeholder="+48 000 000 000"
                    value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">Opis projektu</label>
                <textarea id="message" name="message" rows="4"
                  placeholder="Opisz, czego potrzebujesz: rodzaj strony, branża, cele, termin, budżet..."
                  value={form.message} onChange={handleChange} required />
              </div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button type="submit" className="btn btn--primary btn--block" disabled={sending}>
                {sending ? 'Wysyłanie…' : 'Poproś o bezpłatną wycenę'}
              </button>
              <p className="form-note">Odpowiadam w ciągu 24 godzin. Żadnego spamu, żadnych zobowiązań.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ───────── Footer ───────── */

export function Footer({ base = '' }) {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__statement" {...R(0)}>
          Strony internetowe, sklepy, SEO i reklamy w Poznaniu — wszystko, żeby klienci znaleźli Ciebie.
        </p>
        <nav className="footer__services" aria-label="Usługi w Poznaniu" {...R(0.1)}>
          <span>Usługi w Poznaniu</span>
          <ul>
            {SERVICE_PAGES.map(p => (
              <li key={p.slug}><a href={pageUrl(p)}>{p.navLabel}</a></li>
            ))}
          </ul>
        </nav>
        <div className="footer__bar" {...R(0.15)}>
          <span className="footer__logo">Sebastian Michałek</span>
          <ul>
            {NAV_LINKS.map(l => (
              <li key={l.href}><a href={l.href === '#kontakt' ? l.href : base + l.href}>{l.label}</a></li>
            ))}
          </ul>
          <span className="footer__copy">© {year} Wszelkie prawa zastrzeżone</span>
        </div>
      </div>
    </footer>
  )
}
