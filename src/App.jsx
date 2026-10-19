import { useState, useEffect } from 'react'
import './App.css'
import photo from './img/IMG_1995 (1).webp'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/* ───────── Motion helpers ───────── */

// Props that mark an element for the scroll-reveal observer (variant: up | left | right | scale)
const R = (d = 0, v = 'up') => ({ 'data-reveal': v, style: { '--d': `${d}s` } })

function useScrollEffects() {
  useEffect(() => {
    const root = document.documentElement

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          // data attribute (not a class) so React re-renders of className can't wipe it
          e.target.setAttribute('data-visible', '')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))

    let raf = 0
    const update = () => {
      raf = 0
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--scroll', String(Math.round(window.scrollY)))
      root.style.setProperty('--progress', max > 0 ? String(window.scrollY / max) : '0')
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}

function Words({ text }) {
  return text.split(' ').map((w, i, arr) => (
    <span key={i}>
      <span className="word" style={{ '--i': i }}>{w}</span>
      {i < arr.length - 1 ? ' ' : ''}
    </span>
  ))
}

const SERVICES = [
  {
    n: '01', title: 'Strony internetowe', tone: 'terracotta', wide: true,
    desc: 'Wizytówki i strony firmowe, które dobrze wyglądają i prowadzą odwiedzającego prosto do kontaktu z Tobą.',
    items: ['Projekt graficzny', 'Wersja mobilna', 'Formularze i system zarządzania treścią', 'Szybkość i podstawy SEO'],
  },
  {
    n: '02', title: 'Sklepy internetowe', tone: 'sky', wide: true,
    desc: 'Sklep gotowy do sprzedaży — od płatności i wysyłki po raporty, które pokazują, co naprawdę się sprzedaje.',
    items: ['Płatności online', 'Zarządzanie produktami', 'Wysyłka i dostawy', 'Analityka sprzedaży'],
  },
  {
    n: '03', title: 'SEO', tone: 'cream',
    desc: 'Widoczność w Google na frazy, które wpisują Twoi klienci — bez płacenia za każde kliknięcie.',
    items: ['Audyt techniczny', 'Dobór słów kluczowych', 'Optymalizacja treści', 'Lokalne SEO i wizytówka Google'],
  },
  {
    n: '04', title: 'Google Ads', tone: 'lavender',
    desc: 'Kampanie w wyszukiwarce i sieci reklamowej, które docierają do ludzi gotowych na zakup lub zapytanie.',
    items: ['Kampanie w wyszukiwarce', 'Reklamy produktowe (Shopping)', 'Remarketing', 'Śledzenie konwersji'],
  },
  {
    n: '05', title: 'Kampanie reklamowe', tone: 'mist',
    desc: 'Reklamy w mediach społecznościowych i kampanie wizerunkowe dopasowane do celu oraz budżetu.',
    items: ['Facebook i Instagram', 'Strategia i kreacje', 'Testy reklam A/B', 'Raporty i optymalizacja'],
  },
]

const HERO_CARDS = [
  { tone: 'terracotta', eyebrow: 'Strony', title: 'Strony internetowe', desc: 'Wizytówki i strony firmowe, które zamieniają odwiedzających w zapytania.' },
  { tone: 'sky', eyebrow: 'Sklepy', title: 'Sklepy internetowe', desc: 'Płatności, wysyłka i panel produktów — gotowe do sprzedaży.' },
  { tone: 'lavender', eyebrow: 'SEO i reklamy', title: 'Google, SEO i kampanie', desc: 'Widoczność w Google oraz płatne kampanie, które przyprowadzają klientów.' },
]

const FLOW = [
  { title: 'Reklama', desc: 'Google Ads i kampanie w social mediach przyprowadzają ruch od razu.' },
  { title: 'Strona lub sklep', desc: 'Szybka, czytelna, zaprojektowana tak, by zamieniać odwiedzających w zapytania i zamówienia.' },
  { title: 'SEO', desc: 'Stopniowo buduje bezpłatny ruch z Google, który zostaje z Tobą na lata.' },
  { title: 'Raport', desc: 'Mierzymy wyniki, wyciągamy wnioski i poprawiamy to, co działa słabiej.' },
]

const STEPS = [
  { n: '1', title: 'Rozmowa i analiza', desc: 'Poznajemy Twój biznes, klientów i cele — sprzedaż, zapytania albo rozpoznawalność.' },
  { n: '2', title: 'Strategia', desc: 'Ustalamy, co jest potrzebne: strona, sklep, SEO, reklamy — i w jakiej kolejności.' },
  { n: '3', title: 'Realizacja', desc: 'Projektuję i buduję stronę lub sklep, konfiguruję kampanie i śledzenie wyników.' },
  { n: '4', title: 'Uruchomienie', desc: 'Testuję na każdym urządzeniu, publikuję i włączam kampanie.' },
  { n: '5', title: 'Optymalizacja', desc: 'Regularnie sprawdzam dane i poprawiam wyniki — razem z Tobą.' },
]

const WHY_ITEMS = [
  'Jeden partner do strony, SEO i reklam',
  'Bezpośredni kontakt — bez pośredników',
  'Decyzje oparte na danych, nie na przeczuciu',
  'Strony zoptymalizowane pod urządzenia mobilne',
  'Terminowa realizacja i jasna komunikacja',
  'Regularne raporty z kampanii i pozycji w Google',
]

const FAQS = [
  {
    q: 'Ile kosztuje strona, sklep albo kampania?',
    a: 'Cena zależy od zakresu i potrzebnych funkcji. Każda wycena jest bezpłatna i przygotowana indywidualnie — opisz projekt w formularzu, a odpowiem z konkretną propozycją.',
  },
  {
    q: 'Ile trwa wykonanie strony lub sklepu?',
    a: 'Prosta strona wizytówka powstaje zwykle w 1–2 tygodnie, rozbudowane projekty i sklepy mogą zająć kilka tygodni. Konkretny harmonogram podaję przed rozpoczęciem współpracy.',
  },
  {
    q: 'Po jakim czasie widać efekty SEO?',
    a: 'SEO to proces długoterminowy — pierwsze efekty zwykle widać po kilku miesiącach. Zaczynamy od solidnych fundamentów technicznych i treści, a kolejne pozycje budujemy krok po kroku.',
  },
  {
    q: 'Czym różni się SEO od Google Ads?',
    a: 'Google Ads daje ruch od razu, ale płacisz za każde kliknięcie. SEO buduje bezpłatną widoczność w wyniku dłuższej pracy. Najlepsze rezultaty daje połączenie obu — dobieram proporcje do Twojego budżetu i celów.',
  },
  {
    q: 'Jak rozliczany jest budżet reklamowy?',
    a: 'Budżet na reklamy ustalamy wspólnie, zanim ruszy kampania, i rozliczamy go osobno od mojej pracy. Wiesz zawsze, na co wydawane są pieniądze.',
  },
  {
    q: 'Czy pomagasz z domeną i hostingiem?',
    a: 'Tak, przeprowadzam przez cały proces — od wyboru domeny i konfiguracji hostingu po uruchomienie. Mogę też zmodernizować Twoją istniejącą stronę bez utraty treści.',
  },
  {
    q: 'Czy mogę później samodzielnie edytować stronę?',
    a: 'Oczywiście. Przygotowuję stronę z systemem zarządzania treścią, który umożliwia samodzielną edycję tekstów, zdjęć i wpisów bez znajomości programowania.',
  },
]

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

function Blob({ tone, variant = 0, className = '', style }) {
  return (
    <svg className={`blob blob--${tone} ${className}`} style={style} viewBox="-100 -100 200 200" aria-hidden="true">
      <path d={BLOB_PATHS[variant % BLOB_PATHS.length]} />
    </svg>
  )
}

/* ───────── Shared bits ───────── */

function Arrow() {
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

function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <a href="#" className="nav__logo">Sebastian Michałek</a>

          <nav aria-label="Główna nawigacja">
            <ul className="nav__links">
              {NAV_LINKS.map(l => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
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
            <a key={l.href} href={l.href} className="overlay__link" onClick={close}
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

/* ───────── Hero ───────── */

function Hero() {
  return (
    <section className="hero">
      <Blob tone="terracotta" variant={0} className="hero__blob hero__blob--tl" style={{ '--k': 0.18, '--dur': '11s' }} />
      <Blob tone="lavender" variant={1} className="hero__blob hero__blob--tr" style={{ '--k': 0.1, '--dur': '13s' }} />
      <Blob tone="sky" variant={2} className="hero__blob hero__blob--bl" style={{ '--k': -0.12, '--dur': '10s' }} />
      <Blob tone="cream" variant={3} className="hero__blob hero__blob--br" style={{ '--k': -0.2, '--dur': '14s' }} />

      <div className="container hero__inner">
        <p className="eyebrow" {...R(0)}>Strony · Sklepy · SEO · Google Ads · Kampanie</p>
        <h1><Words text="Strony, sklepy i reklamy, które przynoszą klientów" /></h1>
        <p className="hero__sub" {...R(0.55)}>
          Buduję strony i sklepy internetowe, a potem sprawiam, że ktoś na nie trafia —
          dzięki SEO, Google Ads i kampaniom reklamowym.
        </p>
        <div className="hero__actions" {...R(0.7)}>
          <a href="#kontakt" className="btn btn--primary">Darmowa wycena</a>
          <a href="#oferta" className="btn btn--outline">Zobacz ofertę</a>
        </div>

        <div className="hero__cards">
          {HERO_CARDS.map((c, i) => (
            <article className={`hero-card hero-card--${c.tone}`} key={c.title} {...R(0.85 + i * 0.14)}>
              <span className="eyebrow">{c.eyebrow}</span>
              <h2>{c.title}</h2>
              <p>{c.desc}</p>
              <div className="hero-card__art" aria-hidden="true">
                <span className="hero-card__rect" />
                <span className="hero-card__tri" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── About ───────── */

function About() {
  return (
    <section className="section section--paper" id="o-mnie">
      <div className="container split">
        <div>
          <span className="eyebrow" {...R(0)}>O mnie</span>
          <h2 className="h2" {...R(0.05)}>Pomagam firmom zaistnieć i być znalezionym w internecie</h2>
          <p className="lead" {...R(0.1)}>
            Tworzę strony, które nie tylko dobrze wyglądają, ale przede wszystkim realizują cele
            biznesowe. Do tego dokładam widoczność — SEO oraz płatne kampanie w Google i social mediach.
          </p>
          <p className="lead" {...R(0.15)}>
            Bezpośredni kontakt, jasna komunikacja i terminowa realizacja to fundamenty mojej pracy.
            Wiesz zawsze, na jakim etapie jest Twój projekt.
          </p>
          <dl className="attrs">
            <div {...R(0.1)}><dt>Zakres</dt><dd>Strony, sklepy, SEO, Google Ads i kampanie reklamowe</dd></div>
            <div {...R(0.18)}><dt>Podejście</dt><dd>Projekt dopasowany do celów biznesowych, nie odwrotnie</dd></div>
            <div {...R(0.26)}><dt>Narzędzia</dt><dd>React, WordPress, HTML/CSS, Google Ads, Analytics, Search Console</dd></div>
            <div {...R(0.34)}><dt>Współpraca</dt><dd>Jeden kontakt, pełna przejrzystość, brak pośredników</dd></div>
          </dl>
        </div>
        <figure className="portrait" {...R(0.1, 'right')}>
          <Blob tone="lavender" variant={1} className="portrait__blob portrait__blob--a" />
          <Blob tone="terracotta" variant={2} className="portrait__blob portrait__blob--b" />
          <img src={photo} alt="Sebastian Michałek — twórca stron i specjalista od reklamy" />
          <figcaption>Sebastian Michałek</figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ───────── Services ───────── */

function Services({ onPick }) {
  return (
    <section className="section" id="oferta">
      <div className="container">
        <div className="head">
          <span className="eyebrow" {...R(0)}>Oferta</span>
          <h2 className="h2" {...R(0.05)}>Wszystko, czego potrzebujesz, żeby zdobywać klientów online</h2>
          <p className="lead" {...R(0.1)}>Od strony i sklepu po widoczność w Google i płatne kampanie — w jednym miejscu.</p>
        </div>
        <div className="services">
          {SERVICES.map((s, i) => (
            <article className={`service service--${s.tone}${s.wide ? ' service--wide' : ''}`} key={s.n} {...R((i % 3) * 0.1)}>
              <span className="service__num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul>
                {s.items.map(i => <li key={i}>{i}</li>)}
              </ul>
              <a href="#kontakt" className="link" onClick={() => onPick(s.title)}>
                Zapytaj o wycenę <Arrow />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── Flow (dark plum surface) ───────── */

function Flow() {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="flow" {...R(0, 'scale')}>
          <Blob tone="terracotta" variant={3} className="flow__blob" style={{ '--dur': '12s' }} />
          <div className="flow__text">
            <span className="eyebrow eyebrow--light" {...R(0.15)}>Całość</span>
            <h2 {...R(0.2)}>Strona, SEO i reklamy działają najlepiej razem</h2>
            <p {...R(0.28)}>
              Sama strona nie przyciągnie klientów, a reklama bez dobrej strony tylko pali budżet.
              Dlatego łączę te elementy w jeden spójny system i pilnuję wyników na każdym etapie.
            </p>
            <a href="#kontakt" className="btn btn--outline-light" {...R(0.36)}>Omów swój projekt <Arrow /></a>
          </div>
          <div className="diagram" {...R(0.25, 'right')}>
            <ol>
              {FLOW.map((f, i) => (
                <li key={f.title} {...R(0.4 + i * 0.12)}>
                  <span className="diagram__idx">{i + 1}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── Process ───────── */

function Process() {
  return (
    <section className="section section--paper" id="proces">
      <div className="container">
        <div className="head">
          <span className="eyebrow" {...R(0)}>Jak pracuję</span>
          <h2 className="h2" {...R(0.05)}>Prosty i przejrzysty proces</h2>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="step" key={s.n} {...R(i * 0.09)}>
              <span className="step__num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────── Portfolio ───────── */

// Przykładowe realizacje — podmień na własne projekty.
// kind: 'site' | 'shop' | 'ads' (rodzaj makiety, gdy brak zdjęcia)
// image: opcjonalna ścieżka do zrzutu ekranu (np. import z src/img) — zastępuje makietę
// url: opcjonalny link do działającego projektu
const PROJECTS = [
  {
    tone: 'terracotta', kind: 'site', category: 'Strona firmowa', title: 'Gabinet stomatologiczny',
    desc: 'Profesjonalna strona dla lokalnej praktyki. Cel: więcej rejestracji online od nowych pacjentów.',
    tags: ['Projekt graficzny', 'Wersja mobilna', 'SEO lokalne'], url: '', image: '',
  },
  {
    tone: 'sky', kind: 'shop', category: 'Sklep internetowy', title: 'Pracownia ceramiki',
    desc: 'Sklep dla rękodzielniczki z płatnościami online, galerią produktów i konfiguracją wysyłki.',
    tags: ['E-commerce', 'Płatności', 'Analityka'], url: '', image: '',
  },
  {
    tone: 'lavender', kind: 'ads', category: 'SEO i Google Ads', title: 'Biuro rachunkowe',
    desc: 'Odświeżona strona wraz z kampanią w Google i pozycjonowaniem — z myślą o stałym napływie zapytań.',
    tags: ['Google Ads', 'SEO', 'Śledzenie konwersji'], url: '', image: '',
  },
]

function Mock({ kind }) {
  if (kind === 'shop') {
    return (
      <div className="mock mock--shop">
        <div className="mock__bar"><i /><i /><i /></div>
        <div className="mock__grid">
          {[0, 1, 2, 3, 4, 5].map(n => <span key={n} />)}
        </div>
      </div>
    )
  }
  if (kind === 'ads') {
    return (
      <div className="mock mock--ads">
        <div className="mock__bar"><i /><i /><i /></div>
        <div className="mock__chart">
          {[28, 40, 36, 58, 74, 92].map((h, n) => <span key={n} style={{ height: `${h}%` }} />)}
        </div>
      </div>
    )
  }
  return (
    <div className="mock mock--site">
      <div className="mock__bar"><i /><i /><i /></div>
      <div className="mock__hero" />
      <div className="mock__lines"><span /><span /><span /></div>
    </div>
  )
}

function Portfolio() {
  return (
    <section className="section" id="realizacje">
      <div className="container">
        <div className="head">
          <span className="eyebrow" {...R(0)}>Realizacje</span>
          <h2 className="h2" {...R(0.05)}>Wybrane projekty</h2>
          <p className="lead" {...R(0.1)}>
            Strony, sklepy i kampanie, które powstały z myślą o konkretnych celach biznesowych.
          </p>
        </div>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <article className="project" key={p.title} {...R(i * 0.12)}>
              <div className={`project__preview project__preview--${p.tone}`}>
                {p.image
                  ? <img src={p.image} alt={`Projekt: ${p.title}`} loading="lazy" />
                  : <Mock kind={p.kind} />}
              </div>
              <div className="project__body">
                <span className="badge">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="project__tags">
                  {p.tags.map(t => <li key={t}>{t}</li>)}
                </ul>
                {p.url && (
                  <a href={p.url} className="link" target="_blank" rel="noopener noreferrer">
                    Zobacz projekt <Arrow />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="projects__cta" {...R(0.1)}>
          <a href="#kontakt" className="btn btn--primary">Omów swój projekt <Arrow /></a>
        </div>
      </div>
    </section>
  )
}

/* ───────── Pricing ───────── */

const PACKAGES = [
  {
    tone: 'terracotta', name: 'Strona firmowa', from: true, price: '799', unit: '',
    desc: 'Kompletna strona dla firmy, która chce wyglądać profesjonalnie i być łatwa do znalezienia.',
    items: [
      'Do 5 podstron (np. strona główna, o firmie, oferta, kontakt)',
      'Indywidualny projekt graficzny',
      'Wersja mobilna (responsywna)',
      'Formularz kontaktowy',
      'Podstawowa optymalizacja SEO',
      'Integracja z mapą i Google Analytics',
    ],
  },
  {
    tone: 'cream', name: 'Landing page', from: false, price: '499', unit: '',
    desc: 'Jedna skupiona strona stworzona pod konkretny cel — zapytania, zapisy albo kampanię reklamową.',
    items: [
      'Jedna strona sprzedażowa',
      'Projekt pod jeden cel i wyraźne wezwanie do działania',
      'Wersja mobilna (responsywna)',
      'Formularz kontaktowy',
      'Szybkie ładowanie',
      'Przygotowanie pod kampanię Google Ads lub Meta',
    ],
  },
  {
    tone: 'sky', name: 'Sklep internetowy', from: true, price: '1899', unit: '',
    desc: 'Sklep gotowy do sprzedaży — od projektu i płatności po wysyłkę i panel do zarządzania produktami.',
    items: [
      'Sklep internetowy gotowy do sprzedaży',
      'Indywidualny projekt graficzny',
      'Wersja mobilna (responsywna)',
      'Płatności online',
      'Konfiguracja wysyłki i dostaw',
      'Panel zarządzania produktami i zamówieniami',
      'Podstawowa optymalizacja SEO i analityka sprzedaży',
    ],
  },
  {
    tone: 'lavender', wide: true, name: 'SEO i Google Ads', from: false, price: '399', unit: '/ miesiąc',
    note: 'obsługa + budżet reklamowy płatny osobno',
    desc: 'Pozycjonowanie i kampanie Google Ads prowadzone przez jedną osobę — z jasnym raportem wyników.',
    items: [
      'Audyt i dobór słów kluczowych',
      'Konfiguracja i prowadzenie kampanii Google Ads',
      'Optymalizacja SEO strony',
      'Śledzenie konwersji',
      'Regularne raporty z wyników',
      'Budżet reklamowy ustalany wspólnie i opłacany osobno',
    ],
  },
  {
    tone: 'mist', wide: true, name: 'Opieka, domena i hosting', from: false, price: '79', unit: '/ miesiąc',
    desc: 'Wszystko, co potrzebne, żeby strona działała bez Twojej troski — od wdrożenia po bieżącą opiekę.',
    items: [
      'Wdrożenie i publikacja strony',
      'Domena',
      'Hosting',
      'Aktualizacje i kopie zapasowe',
      'Monitoring dostępności',
      'Wsparcie techniczne',
    ],
  },
]

function Pricing({ onPick }) {
  return (
    <section className="section section--paper" id="cennik">
      <div className="container">
        <div className="head">
          <span className="eyebrow" {...R(0)}>Cennik</span>
          <h2 className="h2" {...R(0.05)}>Proste pakiety na dobry start</h2>
          <p className="lead" {...R(0.1)}>
            Wybierz gotowy pakiet albo poproś o wycenę indywidualną — przy większych projektach
            i kampaniach dopasuję zakres do Twoich celów.
          </p>
        </div>
        <div className="packages">
          {PACKAGES.map((p, i) => (
            <article className={`package package--${p.tone}${p.wide ? ' package--wide' : ''}`} key={p.name} {...R((i % 3) * 0.12)}>
              <h3 className="package__name">{p.name}</h3>
              <p className="package__price">
                {p.from && <span className="package__from">od</span>}
                {p.price} zł
                {p.unit && <span className="package__unit">{p.unit}</span>}
              </p>
              {p.note && <p className="package__note">{p.note}</p>}
              <p className="package__desc">{p.desc}</p>
              <ul>
                {p.items.map(item => <li key={item}>{item}</li>)}
              </ul>
              <a href="#kontakt" className="btn btn--primary btn--block" onClick={() => onPick(p.name)}>
                Wybieram ten pakiet
              </a>
            </article>
          ))}
        </div>
        <p className="packages__note" {...R(0.1)}>
          Ostateczna cena zależy od zakresu projektu — każda wycena jest bezpłatna.
        </p>
      </div>
    </section>
  )
}

/* ───────── Why ───────── */

function Why() {
  return (
    <section className="section">
      <div className="container split split--center">
        <div>
          <span className="eyebrow" {...R(0)}>Dlaczego warto</span>
          <h2 className="h2" {...R(0.05)}>Strona i reklama to inwestycja, nie koszt</h2>
          <p className="lead" {...R(0.1)}>
            Dobrze zrobiona strona pracuje na Twój biznes przez lata. Dobrze poprowadzona kampania
            sprawia, że ktoś ją w ogóle zobaczy.
          </p>
          <ul className="checks">
            {WHY_ITEMS.map((item, i) => <li key={item} {...R(0.12 + i * 0.07)}>{item}</li>)}
          </ul>
        </div>
        <blockquote className="statement" {...R(0.15, 'right')}>
          Strona, której nikt nie widzi, nie sprzedaje.
          <br />
          Reklama, która prowadzi donikąd, tylko kosztuje.
          <footer>Dlatego robię jedno i drugie.</footer>
        </blockquote>
      </div>
    </section>
  )
}

/* ───────── FAQ ───────── */

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section className="section section--paper" id="faq">
      <div className="container split split--faq">
        <div className="faq__intro">
          <span className="eyebrow" {...R(0)}>FAQ</span>
          <h2 className="h2" {...R(0.05)}>Często zadawane pytania</h2>
          <p className="lead" {...R(0.1)}>Nie znalazłeś odpowiedzi? Napisz do mnie, chętnie odpowiem na każde pytanie.</p>
        </div>
        <div className="faq">
          {FAQS.map((f, i) => (
            <div className={`faq__item${openIdx === i ? ' open' : ''}`} key={f.q} {...R(i * 0.06)}>
              <h3>
                <button
                  className="faq__q"
                  aria-expanded={openIdx === i}
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  {f.q}
                  <span className="faq__icon" aria-hidden="true">+</span>
                </button>
              </h3>
              <div className="faq__a"><div>{f.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── Contact ───────── */

function Contact({ interest, setInterest }) {
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
          <h2 className="h2" {...R(0.05)}>Masz pomysł na stronę, sklep lub kampanię? Porozmawiajmy.</h2>
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

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__statement" {...R(0)}>
          Strony, sklepy, widoczność w Google i reklamy — wszystko, żeby klienci znaleźli Ciebie.
        </p>
        <div className="footer__bar" {...R(0.15)}>
          <span className="footer__logo">Sebastian Michałek</span>
          <ul>
            <li><a href="#o-mnie">O mnie</a></li>
            <li><a href="#oferta">Oferta</a></li>
            <li><a href="#proces">Jak pracuję</a></li>
            <li><a href="#realizacje">Realizacje</a></li>
            <li><a href="#cennik">Cennik</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#kontakt">Kontakt</a></li>
          </ul>
          <span className="footer__copy">© {year} Wszelkie prawa zastrzeżone</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [interest, setInterest] = useState([])
  const pick = title => setInterest(list => (list.includes(title) ? list : [...list, title]))
  useScrollEffects()

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services onPick={pick} />
        <Flow />
        <Process />
        <Portfolio />
        <Pricing onPick={pick} />
        <Why />
        <FAQ />
        <Contact interest={interest} setInterest={setInterest} />
      </main>
      <Footer />
    </>
  )
}
