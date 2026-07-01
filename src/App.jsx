// import { useForm,ValidationError } from '@formspree/react'

import { useState, useEffect } from 'react'
import './App.css'

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { label: 'O mnie', href: '#o-mnie' },
    { label: 'Oferta', href: '#oferta' },
    { label: 'Kontakt', href: '#kontakt' },
  ]

  const close = () => setOpen(false)


  return (
   
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#" className="nav__logo">Sebastian Michałek - twórca stron</a>

          {/* Desktop links */}
          <ul className="nav__links nav__links--desktop">
            {links.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
            <li>
              <a href="#kontakt" className="nav__cta">Bezpłatna wycena</a>
            </li>
        
          </ul>

          {/* Burger */}
          <button
            className="nav__burger"
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            onClick={() => setOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
        <div className={`nav__overlay${open ? ' nav__overlay--open' : ''}`} aria-hidden={!open} {...(!open && { inert: '' })}>
        <div className="nav__overlay-header">
          <span className="nav__overlay-logo">Sebastian Michałek</span>
          <button className="nav__overlay-close" onClick={close} aria-label="Zamknij menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <nav className="nav__overlay-nav">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="nav__overlay-link"
              onClick={close}
              style={{ animationDelay: open ? `${i * 0.06}s` : '0s' }}
            >
              <span className="nav__overlay-num">0{i + 1}</span>
              {l.label}
            </a>
         
          ))}
        </nav>
        <div className="nav__overlay-footer">
          <a href="#kontakt" className="btn-primary" onClick={close}
            style={{ width: '100%', justifyContent: 'center' }}>
            Bezpłatna wycena
          </a>
        </div>
      </div>
   
    </>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow animate-in">Tworzenie stron internetowych</p>
        <h1 className="hero__title animate-in animate-in-delay-1">
          Tworzę strony, które<br />
          <em>pomagają firmom</em><br />
          zdobywać klientów
        </h1>
        <p className="hero__sub animate-in animate-in-delay-2">
          Projektuję szybkie, estetyczne i dopasowane strony internetowe
          dla małych firm oraz przedsiębiorców.
        </p>
        <div className="hero__actions animate-in animate-in-delay-3">
          <a href="#kontakt" className="btn-primary">Darmowa wycena</a>
          {/* <a href="#realizacje" className="btn-ghost">Zobacz realizacje</a> */}
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__card">
          <div className="hero__card-bar">
            <div className="hero__card-dot" />
            <div className="hero__card-dot" />
            <div className="hero__card-dot" />
            <div className="hero__card-url" />
          </div>
          <div className="hero__card-body">
            <div className="hero__mock-img" />
            <div className="hero__mock-title" />
            <div className="hero__mock-line" />
            <div className="hero__mock-line" />
            <div className="hero__mock-line" />
            <div className="hero__mock-line" />
            <div className="hero__mock-btn" />
          </div>
        </div>
        <div className="hero__float hero__float--1">Czas ładowania: 0.8s</div>
        <div className="hero__float hero__float--2">
          <div className="hero__float-dot" />
          Strona jest aktywna
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="o-mnie">
      <div className="container">
        <div className="about__inner">
          <div className="about__text">
            <span className="label">O mnie</span>
            <h2>Pomagam firmom zaistnieć<br />w internecie</h2>
            <p>
              Tworzę strony, które nie tylko dobrze wyglądają, ale przede wszystkim
              realizują cele biznesowe moich klientów. Każdy projekt traktuję
              indywidualnie — nie ma tutaj szablonów ani skrótów.
            </p>
            <p>
              Bezpośredni kontakt, jasna komunikacja i terminowa realizacja
              to fundamenty mojej pracy. Wiesz zawsze, na jakim etapie jest Twój projekt.
            </p>
            <div className="about__attrs">
              <div className="about__attr">
                <h4>Doświadczenie</h4>
                <p>Kilka lat tworzenia stron dla firm z różnych branż</p>
              </div>
              <div className="about__attr">
                <h4>Podejście</h4>
                <p>Projekt dopasowany do celów biznesowych, nie odwrotnie</p>
              </div>
              <div className="about__attr">
                <h4>Technologie</h4>
                <p>React, WordPress, HTML/CSS, optymalizacja SEO</p>
              </div>
              <div className="about__attr">
                <h4>Współpraca</h4>
                <p>Jeden kontakt, pełna przejrzystość, brak pośredników</p>
              </div>
            </div>
          </div>
          <div className="about__visual">
            <div className="about__photo">
              <div className="about__photo-inner">
                <span className="about__photo-caption">Sebastian Michałek — twórca stron</span>
              </div>
              {/* <div className="about__stat"> */}
                {/* <strong>40+</strong> */}
                {/* <span>projektów</span> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const SERVICES = [
  {
    n: '01', title: 'Strona wizytówka',
    desc: 'Profesjonalna prezentacja Twojej firmy w sieci. Szybka, czytelna i dostosowana do urządzeń mobilnych.',
    items: ['Projekt graficzny', 'Formularz kontaktowy', 'Wersja mobilna', 'Optymalizacja SEO'],
  },
  {
    n: '02', title: 'Strona firmowa',
    desc: 'Rozbudowana strona dla firm, które chcą wyróżnić się na tle konkurencji i pozyskiwać klientów online.',
    items: ['Sekcje usług i blog', 'System zarządzania treścią', 'Integracje zewnętrzne', 'Wielojęzyczność'],
  },
  {
    n: '03', title: 'Sklep internetowy',
    desc: 'Kompletne rozwiązanie e-commerce — od konfiguracji płatności po przygotowanie pod dalszy rozwój.',
    items: ['Obsługa płatności', 'Zarządzanie produktami', 'Konfiguracja wysyłki', 'Analityka sprzedaży'],
  },
  {
    n: '04', title: 'Modernizacja strony',
    desc: 'Odświeżenie wyglądu i technologii istniejącej strony — bez utraty dotychczasowych treści.',
    items: ['Poprawa wyglądu', 'Optymalizacja prędkości', 'Responsywność', 'Migracja treści'],
  },
  {
    n: '05', title: 'Opieka i utrzymanie',
    desc: 'Regularne aktualizacje, kopie zapasowe i pomoc techniczna, żebyś mógł skupić się na biznesie.',
    items: ['Aktualizacje systemu', 'Bezpieczeństwo', 'Monitoring dostępności', 'Wsparcie techniczne'],
  },
]

function Services() {
  return (
    <section className="services" id="oferta">
      <div className="container">
        <div className="services__header">
          <span className="label">Oferta</span>
          <h2>Co mogę dla Ciebie zrobić</h2>
          <p>Kompleksowe usługi webowe dla małych firm i przedsiębiorców.</p>
        </div>
        <div className="services__grid">
          {SERVICES.map(s => (
            <div className="service-card" key={s.n}>
              <div className="service-card__num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-card__list">
                {s.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  { n: '1', title: 'Rozmowa i analiza', desc: 'Poznajemy Twój biznes i ustalamy cele projektu.' },
  { n: '2', title: 'Projekt wyglądu', desc: 'Tworzę makiety i projekt graficzny do akceptacji.' },
  { n: '3', title: 'Kodowanie', desc: 'Wdrożenie projektu z dbałością o każdy detal.' },
  { n: '4', title: 'Testy i publikacja', desc: 'Sprawdzam działanie na wszystkich urządzeniach.' },
  { n: '5', title: 'Dalsze wsparcie', desc: 'Jestem do dyspozycji po uruchomieniu strony.' },
]

function Process() {
  return (
    <section className="process">
      <div className="container">
        <div className="process__header">
          <span className="label">Jak pracuję</span>
          <h2>Prosty i przejrzysty proces</h2>
        </div>
        <div className="process__steps">
          {STEPS.map(s => (
            <div className="process__step" key={s.n}>
              <div className="process__step-num">{s.n}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const WHY_ITEMS = [
  'Indywidualne podejście do każdego projektu',
  'Bezpośredni kontakt — bez pośredników',
  'Strony zoptymalizowane pod urządzenia mobilne',
  'Skupienie na efektach biznesowych',
  'Terminowa realizacja i jasna komunikacja',
  'Nowoczesny design budujący zaufanie',
]

function Why() {
  return (
    <section className="why">
      <div className="container">
        <div className="why__inner">
          <div className="why__text">
            <span className="label">Dlaczego warto</span>
            <h2>Strona to inwestycja,<br />nie koszt</h2>
            <p>
              Dobrze zrobiona strona pracuje na Twój biznes przez lata.
              Przyciąga klientów, buduje zaufanie i wyróżnia Cię na tle konkurencji.
            </p>
            <ul className="why__list">
              {WHY_ITEMS.map(item => (
                <li className="why__item" key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="why__visual">
            <div className="why__stat">
              <strong>94%</strong>
              <p>pierwsze wrażenie o firmie kształtuje się na podstawie strony internetowej</p>
            </div>
            <div className="why__stat">
              <strong>3 sek</strong>
              <p>tyle czasu ma strona, żeby zatrzymać odwiedzającego — szybkość ma znaczenie</p>
            </div>
            <div className="why__stat">
              <strong>70%</strong>
              <p>użytkowników ocenia wiarygodność firmy na podstawie jej strony internetowej</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PROJECTS = [
  {
    tag: 'Strona firmowa', title: 'Gabinet stomatologiczny',
    desc: 'Profesjonalna strona dla lokalnej praktyki. Cel: zwiększenie liczby rejestracji online.',
    chips: ['Design', 'SEO'],
    gradient: 'linear-gradient(135deg, #e8e4dc 0%, #cfc8bc 100%)',
  },
  {
    tag: 'Sklep online', title: 'Pracownia ceramiki',
    desc: 'Sklep internetowy dla rękodzielniczki z integracją płatności i galerią produktów.',
    chips: ['E-commerce', 'Płatności'],
    gradient: 'linear-gradient(135deg, #dce4e0 0%, #bccfc6 100%)',
  },
  {
    tag: 'Modernizacja', title: 'Biuro rachunkowe',
    desc: 'Przebudowa starej strony z lat 2010 — nowy wygląd, szybkość i optymalizacja mobilna.',
    chips: ['Redesign', 'Optymalizacja'],
    gradient: 'linear-gradient(135deg, #e4dce4 0%, #cbbccf 100%)',
  },
]

function Portfolio() {
  return (
    <section className="portfolio" id="realizacje">
      <div className="container">
        <div className="portfolio__header">
          <div>
            <span className="label">Realizacje</span>
            <h2>Wybrane projekty</h2>
          </div>
          <a href="#kontakt" className="btn-ghost">Omów swój projekt</a>
        </div>
        <div className="portfolio__grid">
          {PROJECTS.map(p => (
            <div className="project-card" key={p.title}>
              <div className="project-card__img">
                <div className="project-card__img-inner" style={{ background: p.gradient }}>
                  <div className="project-card__mock">
                    <div className="project-card__mock-bar">
                      <div className="project-card__mock-dot" />
                      <div className="project-card__mock-dot" />
                      <div className="project-card__mock-dot" />
                    </div>
                    <div className="project-card__mock-lines">
                      <div className="project-card__mock-line" />
                      <div className="project-card__mock-line" />
                      <div className="project-card__mock-line" />
                      <div className="project-card__mock-line" />
                    </div>
                  </div>
                </div>
                <div className="project-card__tag">{p.tag}</div>
              </div>
              <div className="project-card__body">
                <div className="project-card__meta">
                  {p.chips.map(c => <span className="project-card__chip" key={c}>{c}</span>)}
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TESTIMONIALS = [
  {
    quote: 'Profesjonalna współpraca, szybka realizacja i świetny efekt końcowy. Strona zaczęła przyciągać klientów już w pierwszym tygodniu po uruchomieniu.',
    name: 'Marta K.', role: 'Właścicielka gabinetu kosmetycznego', initial: 'M',
  },
  {
    quote: 'Byłam sceptyczna co do inwestycji w stronę, ale po tygodniu od uruchomienia dostałam pierwsze zapytania przez formularz. Polecam z całego serca.',
    name: 'Anna W.', role: 'Architekt wnętrz', initial: 'A',
  },
  {
    quote: 'Jasna komunikacja, dotrzymane terminy i strona, która naprawdę działa. Moje biuro rachunkowe zyskało kilku nowych klientów dzięki wyszukiwarce.',
    name: 'Tomasz R.', role: 'Właściciel biura rachunkowego', initial: 'T',
  },
]

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <span className="label">Opinie</span>
          <h2>Co mówią klienci</h2>
        </div>
        <div className="testimonials__grid">
          {TESTIMONIALS.map(t => (
            <div className="testimonial-card" key={t.name}>
              <blockquote>"{t.quote}"</blockquote>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.initial}</div>
                <div className="testimonial-card__info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  {
    q: 'Ile kosztuje stworzenie strony internetowej?',
    a: 'Cena zależy od zakresu projektu i potrzebnych funkcji. Strona wizytówka zaczyna się od kilkuset złotych, rozbudowane sklepy to większy budżet. Każda wycena jest bezpłatna i przygotowana indywidualnie.',
  },
  {
    q: 'Ile trwa wykonanie strony?',
    a: 'Standardowa strona wizytówka powstaje w ciągu 1–2 tygodni. Bardziej rozbudowane projekty mogą zająć 3–6 tygodni. Zawsze podaję konkretny harmonogram przed rozpoczęciem współpracy.',
  },
  {
    q: 'Czy pomagasz z domeną i hostingiem?',
    a: 'Tak, przeprowadzam przez cały proces — od wyboru i rejestracji domeny, przez konfigurację hostingu, po uruchomienie strony. Możesz liczyć na pełne wsparcie.',
  },
  {
    q: 'Czy mogę później samodzielnie edytować stronę?',
    a: 'Oczywiście. Przygotowuję stronę z systemem zarządzania treścią (CMS), który umożliwia samodzielną edycję tekstów, zdjęć i wpisów bez znajomości programowania.',
  },
  {
    q: 'Czy strona będzie widoczna w Google?',
    a: 'Tak, każdą stronę optymalizuję pod podstawowe wymagania SEO: szybkość, struktura nagłówków, meta tagi, mapa strony. Pozycjonowanie to proces długoterminowy, ale zaczynamy od solidnych fundamentów.',
  },
]

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section className="faq">
      <div className="container">
        <div className="faq__inner">
          <div className="faq__left">
            <span className="label">FAQ</span>
            <h2>Często zadawane pytania</h2>
            <p>Nie znalazłeś odpowiedzi? Napisz do mnie, chętnie odpowiem na każde pytanie.</p>
          </div>
          <div className="faq__list">
            {FAQS.map((f, i) => (
              <div className={`faq__item${openIdx === i ? ' open' : ''}`} key={i}>
                <button
                  className="faq__question"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  {f.q}
                  <span className="faq__icon">+</span>
                </button>
                <div className="faq__answer">
                  <div className="faq__answer-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setSent(true)
      } else {
        setError(data.error || 'Coś poszło nie tak. Spróbuj ponownie.')
      }
    } catch {
      setError('Brak połączenia z serwerem. Spróbuj ponownie.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact" id="kontakt">
      <div className="container">
        <div className="contact__inner">
          <div className="contact__left">
            <span className="label">Kontakt</span>
            <h2>Masz pomysł na stronę? Porozmawiajmy.</h2>
            <p>
              Opisz mi swój projekt, a ja odezwę się w ciągu 24 godzin z bezpłatną wyceną
              i odpowiedziami na Twoje pytania.
            </p>
            <div className="contact__info">
              <div className="contact__info-row">
                <span>E-mail</span>
                <a href="mailto:sebastian20020505@gmail.com">sebastian20020505@gmail.com</a>
              </div>
              <div className="contact__info-row">
                <span>Telefon</span>
                <a href="tel:+48797052895">+48 797 052 895</a>
              </div>
              <div className="contact__info-row">
                <span>Dostępność</span>
                <span>Pon–Pt, 9:00–17:00</span>
              </div>
            </div>
          </div>
          <div className="contact__form">
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <p style={{ fontFamily: 'var(--f-serif)', fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--ink)' }}>
                  Wiadomość wysłana
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)' }}>
                  Odezwę się w ciągu 24 godzin. Dziękuję za kontakt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form__row">
                  <div className="form__field">
                    <label htmlFor="name">Imię i nazwisko</label>
                    <input id="name" name="name" type="text" placeholder="Jan Kowalski"
                      value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form__field">
                    <label htmlFor="company">Firma (opcjonalnie)</label>
                    <input id="company" name="company" type="text" placeholder="Nazwa firmy"
                      value={form.company} onChange={handleChange} />
                  </div>
                </div>
                <div className="form__row">
                  <div className="form__field">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="email" placeholder="jan@example.pl"
                      value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="form__field">
                    <label htmlFor="phone">Telefon (opcjonalnie)</label>
                    <input id="phone" name="phone" type="tel" placeholder="+48 000 000 000"
                      value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="form__field">
                  <label htmlFor="message">Opis projektu</label>
                  <textarea id="message" name="message" rows="5"
                    placeholder="Opisz, czego potrzebujesz. Rodzaj strony, branża, termin, budżet..."
                    value={form.message} onChange={handleChange} required />
                </div>
                {error && (
                  <p style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: '#c0392b' }}>{error}</p>
                )}
                <button type="submit" className="form__submit" disabled={sending}>
                  {sending ? 'Wysyłanie…' : 'Poproś o bezpłatną wycenę'}
                </button>
                <p className="form__note">
                  Odpowiadam w ciągu 24 godzin. Żadnego spamu, żadnych zobowiązań.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
// function Contact() {
//   const [sent, setSent] = useState(false)
//   const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
//   const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
//   const handleSubmit = e => { e.preventDefault(); setSent(true) }
//   const [formik, setFormik] = useForm("xlgywarw")
//   if(formik.succeeded)
//   {
//     return <p>Wiadomość wysłana</p>
//   }
//   return (
//     <section className="contact" id="kontakt">
//       <div className="container">
//         <div className="contact__inner">
//           <div className="contact__left">
//             <span className="label">Kontakt</span>
//             <h2>Masz pomysł na stronę? Porozmawiajmy.</h2>
//             <p>
//               Opisz mi swój projekt, a ja odezwę się w ciągu 24 godzin z bezpłatną wyceną
//               i odpowiedziami na Twoje pytania.
//             </p>
//             <div className="contact__info">
//               <div className="contact__info-row">
//                 <span>E-mail</span>
//                 <a href="mailto:sebastian20020505@gmail.com">sebastian20020505@gmail.com</a>
//               </div>
//               <div className="contact__info-row">
//                 <span>Telefon</span>
//                 <a href="tel:+48797052895">+48 797 052 895</a>
//               </div>
//               <div className="contact__info-row">
//                 <span>Dostępność</span>
//                 <span>Pon–Pt, 9:00–17:00</span>
//               </div>
//             </div>
//           </div>
//           <div className="contact__form">
            
//             {/* {sent ? (
//               <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
//                 <p style={{ fontFamily: 'var(--f-serif)', fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--ink)' }}>
//                   Wiadomość wysłana
//                 </p>
//                 <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)' }}>
//                   Odezwę się w ciągu 24 godzin. Dziękuję za kontakt.
//                 </p>
//               </div>
//             ) : (
             
//             )}
//           </div> */}
//            <form onSubmit={handleSubmit} method='POST' action={'https://formspree.io/f/xlgywarw'}>
//                 <div className="form__row">
//                   {/* <div className="form__field">
//                     <label htmlFor="name">Imię i nazwisko</label>
//                     <input id="name" name="name" type="text" placeholder="Jan Kowalski"
//                     required />
                  
//                   </div> */}
//                   {/* <div className="form__field">
//                     <label htmlFor="company">Firma (opcjonalnie)</label>
//                     <input id="company" name="company" type="text" placeholder="Nazwa firmy"
//                       value={form.company} onChange={handleChange} />
//                   </div> */}
//                 </div>
//                 <div className="form__row">
//                   <div className="form__field">
//                     <label htmlFor="email">E-mail</label>
//                     <input id="email" name="email" type="email" placeholder="jan@example.pl" required
//                       />
//                       <ValidationError prefix='Email' field='email' errors={formik.errors} />
//                   </div>
//                   {/* <div className="form__field">
//                     <label htmlFor="phone">Telefon (opcjonalnie)</label>
//                     <input id="phone" name="phone" type="tel" placeholder="+48 000 000 000"
//                     />
//                   </div> */}
//                 </div>
//                 <div className="form__field">
//                   <label htmlFor="message">Opis projektu</label>
//                   <textarea id="message" name="message" rows="5"
//                     placeholder="Opisz, czego potrzebujesz. Rodzaj strony, branża, termin, budżet..."
//                     value={form.message} onChange={handleChange} required />
//                                           <ValidationError prefix='Message' field='message' errors={formik.errors} />

//                 </div>
//                 <button type="submit" className="form__submit" disabled={formik.submitting}>
//                   Poproś o bezpłatną wycenę
//                 </button>
//                 <p className="form__note">
//                   Odpowiadam w ciągu 24 godzin. Żadnego spamu, żadnych zobowiązań.
//                 </p>
//               </form>

//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <span className="footer__logo">Sebastian Michałek</span>
          <ul className="footer__links">
            <li><a href="#o-mnie">O mnie</a></li>
            <li><a href="#oferta">Oferta</a></li>
            {/* <li><a href="#realizacje">Realizacje</a></li> */}
            <li><a href="#kontakt">Kontakt</a></li>
          </ul>
          <span className="footer__copy">© {year} Wszelkie prawa zastrzeżone</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Why />
        {/* <Portfolio /> */}
        {/* <Testimonials /> */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}