import { useState } from 'react'
import './App.css'
import photo from './img/IMG_1995 (1).webp'
import imgSmaki from './img/projekt-pracownia-smakow.jpg'
import imgMeble from './img/projekt-sebik-meble.jpg'
import imgTebby from './img/projekt-tebby.jpg'
import { R, useScrollEffects } from './motion.js'
import { SERVICES, PACKAGES } from './data.js'
import { Blob, Arrow, Nav, Contact, Footer } from './ui.jsx'
import { SERVICE_PAGES, pageUrl } from './pages.js'


/* ───────── Motion helpers ───────── */

function Words({ text }) {
  return text.split(' ').map((w, i, arr) => (
    <span key={i}>
      <span className="word" style={{ '--i': i }}>{w}</span>
      {i < arr.length - 1 ? ' ' : ''}
    </span>
  ))
}

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
    q: 'Czy pracujesz tylko z firmami z Poznania?',
    a: 'Najchętniej współpracuję z firmami z Poznania i okolic — możemy spotkać się osobiście. Realizuję też projekty zdalnie dla klientów z całej Polski, a SEO lokalne ustawiam pod miasto i region, w którym działasz.',
  },
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
    q: 'Czy zamiast płacić, nie lepiej zrobić stronę internetową za darmo?',
    a: 'Darmowy kreator bywa dobry na próbę, ale sama strona to tylko czubek góry lodowej. Żeby przynosiła klientów, potrzebuje jeszcze treści, SEO, własnej domeny, szybkiego działania i pomiaru wyników — a to w darmowym planie zwykle jest ograniczone albo płatne osobno. Dlatego liczy się cały pakiet, nie sama strona.',
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

/* ───────── Hero ───────── */

function Hero() {
  return (
    <section className="hero">
      <Blob tone="terracotta" variant={0} className="hero__blob hero__blob--tl" style={{ '--k': 0.18, '--dur': '11s' }} />
      <Blob tone="lavender" variant={1} className="hero__blob hero__blob--tr" style={{ '--k': 0.1, '--dur': '13s' }} />
      <Blob tone="sky" variant={2} className="hero__blob hero__blob--bl" style={{ '--k': -0.12, '--dur': '10s' }} />
      <Blob tone="cream" variant={3} className="hero__blob hero__blob--br" style={{ '--k': -0.2, '--dur': '14s' }} />

      <div className="container hero__inner">
        <p className="eyebrow" {...R(0)}>Poznań · Strony · Sklepy · SEO · Google Ads</p>
        <h1><Words text="Strony internetowe, sklepy i SEO w Poznaniu, które przynoszą klientów" /></h1>
        <p className="hero__sub" {...R(0.55)}>
          Buduję strony i sklepy internetowe dla firm z Poznania i okolic, a potem sprawiam,
          że ktoś na nie trafia — dzięki pozycjonowaniu SEO, Google Ads i kampaniom reklamowym.
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
          <h2 className="h2" {...R(0.05)}>Pomagam firmom z Poznania zaistnieć i być znalezionym w internecie</h2>
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
          <img src={photo} alt="Sebastian Michałek — twórca stron internetowych i specjalista SEO z Poznania" />
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
          <h2 className="h2" {...R(0.05)}>Strony, sklepy i pozycjonowanie w Poznaniu — wszystko, by zdobywać klientów online</h2>
          <p className="lead" {...R(0.1)}>Od strony i sklepu internetowego po widoczność w Google i płatne kampanie — w jednym miejscu.</p>
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
              {SERVICE_PAGES.filter(p => p.service === s.title).map(p => (
                <a key={p.slug} href={pageUrl(p)} className="link service__more">
                  {p.navLabel} <Arrow />
                </a>
              ))}
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

// image: zrzut ekranu z src/img (gdy brak — pokazuje się makieta z kodu, wybierana polem kind: 'site' | 'shop' | 'ads')
// url: link do działającego projektu (przycisk „Zobacz projekt")
const PROJECTS = [
  {
    tone: 'terracotta', category: 'Strona firmowa', title: 'Pracownia Wielu Smaków',
    desc: 'Strona pracowni tortów i cateringu w Lesznie: oferta, galeria realizacji, przebieg zamówienia i formularz wyceny.',
    tags: ['Galeria realizacji', 'Formularz wyceny', 'Wersja mobilna'],
    url: 'https://pracowniasmakowvercel.vercel.app', image: imgSmaki,
  },
  {
    tone: 'sky', category: 'Strona sklepu', title: 'Sebik — meble skandynawskie',
    desc: 'Strona sklepu z meblami: kategorie, bestsellery, inspiracje z prawdziwych aranżacji i formularz kontaktowy.',
    tags: ['Katalog produktów', 'Inspiracje', 'Formularz kontaktowy'],
    url: 'https://meble-lac.vercel.app', image: imgMeble,
  },
  {
    tone: 'lavender', category: 'Aplikacja internetowa', title: 'Tebby — mapa nauki',
    desc: 'Aplikacja dla klas informatycznych: mapa tematów, testy, praktyka i panel — z postępem nauki aktualizowanym na żywo.',
    tags: ['Aplikacja webowa', 'Postęp na żywo', 'Ciemny motyw'],
    url: 'https://tebbypoznan.vercel.app/roadmap', image: imgTebby,
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
            Strony i aplikacje internetowe, które powstały z myślą o konkretnych celach.
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
