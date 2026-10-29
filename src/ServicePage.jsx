import { useState } from 'react'
import './ServicePage.css'
import { R, useScrollEffects } from './motion.js'
import { PACKAGES } from './data.js'
import { SERVICE_PAGES, pageUrl } from './pages.js'
import { Blob, Arrow, Nav, Contact, Footer } from './ui.jsx'

export default function ServicePage({ page }) {
  const [interest, setInterest] = useState([page.service])
  useScrollEffects()

  const packages = page.packages.map(name => PACKAGES.find(p => p.name === name))
  const others = SERVICE_PAGES.filter(p => p.slug !== page.slug)
  const pick = title => setInterest(list => (list.includes(title) ? list : [...list, title]))

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <Nav base="/" />
      <main>
        <section className="hero page-hero">
          <Blob tone="terracotta" variant={0} className="hero__blob hero__blob--tl" style={{ '--k': 0.18, '--dur': '11s' }} />
          <Blob tone="lavender" variant={1} className="hero__blob hero__blob--tr" style={{ '--k': 0.1, '--dur': '13s' }} />
          <Blob tone="sky" variant={2} className="page-hero__blob" style={{ '--k': -0.12, '--dur': '10s' }} />

          <div className="container hero__inner">
            <nav className="breadcrumb" aria-label="Ścieżka nawigacji">
              <ol>
                <li><a href="/">Strona główna</a></li>
                <li aria-current="page">{page.navLabel}</li>
              </ol>
            </nav>
            <p className="eyebrow" {...R(0)}>{page.eyebrow}</p>
            <h1>{page.h1}</h1>
            <p className="hero__sub" {...R(0.2)}>{page.lead}</p>
            <div className="hero__actions" {...R(0.3)}>
              <a href="#kontakt" className="btn btn--primary">Bezpłatna wycena</a>
              <a href="/#cennik" className="btn btn--outline">Zobacz cennik</a>
            </div>
          </div>
        </section>

        <section className="section section--paper">
          <div className="container">
            <div className="head">
              <span className="eyebrow" {...R(0)}>Zakres</span>
              <h2 className="h2" {...R(0.05)}>Co obejmuje usługa</h2>
            </div>
            <ul className="included">
              {page.included.map((item, i) => (
                <li className="included__item" key={item.t} {...R((i % 3) * 0.08)}>
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {page.sections.map((s, i) => (
          <section className="section" key={s.h2}>
            <div className="container split">
              <h2 className="h2" {...R(0, i % 2 ? 'right' : 'left')}>{s.h2}</h2>
              <div className="prose" {...R(0.1)}>
                {s.p.map(text => <p key={text}>{text}</p>)}
              </div>
            </div>
          </section>
        ))}

        <section className="section section--paper">
          <div className="container">
            <div className="head">
              <span className="eyebrow" {...R(0)}>Jak pracuję</span>
              <h2 className="h2" {...R(0.05)}>Przebieg współpracy krok po kroku</h2>
            </div>
            <ol className="steps">
              {page.steps.map((s, i) => (
                <li className="step" key={s.t} {...R(i * 0.09)}>
                  <span className="step__num">{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="head">
              <span className="eyebrow" {...R(0)}>Cena</span>
              <h2 className="h2" {...R(0.05)}>Ile to kosztuje</h2>
              <p className="lead" {...R(0.1)}>
                {packages.length
                  ? 'Ceny wyjściowe poniżej. Dokładną kwotę podaję po rozmowie o zakresie — wycena jest bezpłatna.'
                  : 'Cena zależy od celu, czasu trwania kampanii i zakresu pracy, dlatego przygotowuję wycenę indywidualną. Jest bezpłatna i niezobowiązująca.'}
              </p>
            </div>
            {packages.length > 0 && (
              <div className="price-grid">
                {packages.map((p, i) => (
                  <article className={`package package--${p.tone}`} key={p.name} {...R(i * 0.1)}>
                    <h3 className="package__name">{p.name}</h3>
                    <p className="package__price">
                      {p.from && <span className="package__from">od</span>}
                      {p.price} zł
                      {p.unit && <span className="package__unit">{p.unit}</span>}
                    </p>
                    {p.note && <p className="package__note">{p.note}</p>}
                    <p className="package__desc">{p.desc}</p>
                    <a href="#kontakt" className="btn btn--primary btn--block" onClick={() => pick(p.name)}>
                      Wybieram ten pakiet
                    </a>
                  </article>
                ))}
              </div>
            )}
            <p className="price-note" {...R(0.1)}>
              <a href="/#cennik" className="link">Pełny cennik i zakres pakietów <Arrow /></a>
            </p>
          </div>
        </section>

        <section className="section section--paper">
          <div className="container split split--faq">
            <div className="faq__intro">
              <span className="eyebrow" {...R(0)}>FAQ</span>
              <h2 className="h2" {...R(0.05)}>Najczęstsze pytania</h2>
              <p className="lead" {...R(0.1)}>Masz inne pytanie? Napisz do mnie, chętnie odpowiem.</p>
            </div>
            <div className="page-faq">
              {page.faqs.map((f, i) => (
                <details className="page-faq__item" key={f.q} {...R(i * 0.06)}>
                  <summary>
                    <h3>{f.q}</h3>
                    <span className="faq__icon" aria-hidden="true">+</span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container">
            <div className="head">
              <span className="eyebrow" {...R(0)}>Zobacz też</span>
              <h2 className="h2" {...R(0.05)}>Inne usługi w Poznaniu</h2>
            </div>
            <ul className="related">
              {others.map((p, i) => (
                <li key={p.slug} {...R(i * 0.07)}>
                  <a href={pageUrl(p)}>
                    <strong>{p.navLabel}</strong>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Contact interest={interest} setInterest={setInterest} />
      </main>
      <Footer base="/" />
    </>
  )
}
