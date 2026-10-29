export const SERVICES = [
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

export const PACKAGES = [
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
