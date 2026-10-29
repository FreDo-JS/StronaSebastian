import { PACKAGES } from './data.js'

export const SITE_URL = 'https://www.juniordevops.xyz'

const price = name => PACKAGES.find(p => p.name === name).price

// Każda podstrona usługowa ma własny adres, title, H1 i treść — pod jedną frazę lokalną.
// `service` musi odpowiadać tytułowi z SERVICES (wstępnie zaznacza go w formularzu).
// `packages` to nazwy pakietów z PACKAGES pokazywane w bloku z cenami.
export const SERVICE_PAGES = [
  {
    slug: 'strony-internetowe-poznan',
    service: 'Strony internetowe',
    packages: ['Strona firmowa', 'Landing page', 'Opieka, domena i hosting'],
    navLabel: 'Strony internetowe Poznań',
    metaTitle: `Strony internetowe Poznań od ${price('Strona firmowa')} zł | Sebastian Michałek`,
    metaDescription: `Projektuję i wykonuję strony internetowe dla firm z Poznania: wersja mobilna, podstawowe SEO, formularz kontaktowy. Strona firmowa od ${price('Strona firmowa')} zł.`,
    eyebrow: 'Strony internetowe · Poznań',
    h1: 'Strony internetowe Poznań — projekt i wykonanie strony firmowej',
    lead: 'Tworzę strony internetowe dla firm z Poznania i okolic. Taka strona ma dobrze wyglądać na telefonie, szybko się ładować i prowadzić odwiedzającego prosto do kontaktu z Tobą — a przy tym być gotowa na to, żeby znaleźć ją w Google.',
    included: [
      { t: 'Indywidualny projekt graficzny', d: 'Układ i kolory dopasowane do Twojej marki, a nie gotowy szablon z setkami kopii w sieci.' },
      { t: 'Wersja mobilna', d: 'Większość odwiedzin firm lokalnych pochodzi z telefonów, dlatego każdą stronę projektuję najpierw pod mały ekran.' },
      { t: 'Szybkie ładowanie', d: 'Zoptymalizowane obrazy i lekki kod. Wolna strona traci klientów i gorzej wypada w wynikach wyszukiwania.' },
      { t: 'Podstawowe SEO', d: 'Poprawne nagłówki, tytuły i opisy, mapa strony, plik robots.txt oraz dane strukturalne firmy.' },
      { t: 'Formularz kontaktowy i mapa', d: 'Klient może napisać, zadzwonić albo sprawdzić dojazd — bez szukania danych po całej stronie.' },
      { t: 'Analityka', d: 'Podłączam Google Analytics i Search Console, żeby było widać, skąd przychodzą odwiedzający i na co klikają.' },
    ],
    sections: [
      {
        h2: 'Strona dla firmy z Poznania — co powinna zawierać',
        p: [
          'Lokalny klient wpisuje w Google frazy w rodzaju „usługa + Poznań” albo „firma w pobliżu”. Strona, która ma na nie odpowiadać, musi jasno mówić, czym się zajmujesz, gdzie działasz i jak się z Tobą skontaktować. Dlatego już na etapie projektu ustalamy strukturę: strona główna, oferta, o firmie i kontakt, a przy większej ofercie osobne podstrony dla poszczególnych usług.',
          'Dobrze zrobiona strona wizytówka to dziś podstawa zaufania. Zanim ktoś zadzwoni, sprawdza, jak wyglądasz w internecie — czytelna oferta, aktualne dane i realne zdjęcia robią większą różnicę niż efektowne animacje.',
        ],
      },
      {
        h2: 'Strona zbudowana tak, żeby Google ją rozumiał',
        p: [
          'SEO zaczyna się od budowy strony, a nie od późniejszych poprawek. Pilnuję jednego nagłówka H1 na stronie, sensownej hierarchii nagłówków, opisów obrazków, przyjaznych adresów URL, kanonicznych adresów i mapy strony przekazanej do Google Search Console.',
          'Jeśli chcesz konkurować o frazy lokalne, strona od początku dostaje dane firmy w formacie zrozumiałym dla wyszukiwarek oraz miejsce na treści opisujące usługi i obszar działania. Dalsze pozycjonowanie możesz dołożyć później — fundamenty będą już gotowe.',
        ],
      },
    ],
    steps: [
      { t: 'Rozmowa i zakres', d: 'Ustalamy cel strony, grupę klientów i liczbę podstron. Dostajesz konkretną wycenę i termin.' },
      { t: 'Projekt', d: 'Przygotowuję układ i wygląd strony. Wprowadzamy poprawki, zanim zacznie się programowanie.' },
      { t: 'Wykonanie i treści', d: 'Buduję stronę, wdrażam teksty i zdjęcia oraz konfiguruję formularz, mapę i analitykę.' },
      { t: 'Uruchomienie', d: 'Testuję na różnych urządzeniach, publikuję stronę i zgłaszam ją do Google.' },
    ],
    faqs: [
      {
        q: 'Ile kosztuje strona internetowa w Poznaniu?',
        a: `Strona firmowa do 5 podstron kosztuje od ${price('Strona firmowa')} zł, a pojedynczy landing page od ${price('Landing page')} zł. Ostateczną cenę podaję po rozmowie o zakresie — wycena jest bezpłatna.`,
      },
      {
        q: 'Ile trwa zrobienie strony?',
        a: 'Prosta strona wizytówka powstaje zwykle w 1–2 tygodnie, pod warunkiem że mamy gotowe teksty i zdjęcia. Większe projekty mogą zająć kilka tygodni — harmonogram podaję przed startem prac.',
      },
      {
        q: 'Czy strona będzie widoczna w Google?',
        a: 'Każda strona dostaje podstawową optymalizację SEO, dzięki czemu Google może ją poprawnie zindeksować. Wysokie pozycje na konkurencyjne frazy wymagają jednak dodatkowej pracy nad treścią i widocznością — opisuję ją na stronie o pozycjonowaniu.',
      },
      {
        q: 'Czy sam zmienię treść na stronie?',
        a: 'Tak. Jeśli zależy Ci na samodzielnej edycji tekstów i zdjęć, przygotowuję stronę z prostym systemem zarządzania treścią, który nie wymaga znajomości programowania.',
      },
      {
        q: 'Czy strona internetowa za darmo to dobry pomysł dla firmy?',
        a: `Strona internetowa za darmo, np. z kreatora, może wystarczyć do przetestowania pomysłu, ale firmie rzadko wystarcza. Darmowe plany często oznaczają adres w cudzej domenie, reklamy kreatora i ograniczone możliwości SEO, a za własną domenę i hosting i tak trzeba zapłacić. Przede wszystkim sama strona to tylko czubek góry lodowej. Pod powierzchnią są treści odpowiadające na pytania klientów, pozycjonowanie, wizytówka Google, szybkość i analityka. Strona, której nikt nie znajdzie, nie przynosi klientów, nawet jeśli nic za nią nie zapłaciłeś. Dlatego zaczynam od Twojego celu i dobieram do niego stronę — firmowa zaczyna się od ${price('Strona firmowa')} zł.`,
      },
    ],
  },
  {
    slug: 'sklepy-internetowe-poznan',
    service: 'Sklepy internetowe',
    packages: ['Sklep internetowy', 'Opieka, domena i hosting'],
    navLabel: 'Sklepy internetowe Poznań',
    metaTitle: `Sklepy internetowe Poznań od ${price('Sklep internetowy')} zł | Sebastian Michałek`,
    metaDescription: `Tworzę sklepy internetowe w Poznaniu: płatności online, wysyłka, panel produktów i SEO. Sklep gotowy do sprzedaży od ${price('Sklep internetowy')} zł. Bezpłatna wycena.`,
    eyebrow: 'Sklepy internetowe · Poznań',
    h1: 'Sklepy internetowe Poznań — wykonanie sklepu online gotowego do sprzedaży',
    lead: 'Buduję sklepy internetowe dla firm z Poznania i okolic: od projektu i płatności po wysyłkę oraz panel, w którym samodzielnie dodasz produkty i obsłużysz zamówienia. Sklep ma sprzedawać — dlatego dbam o prosty zakup i widoczność w Google.',
    included: [
      { t: 'Płatności online', d: 'Podłączam popularne metody płatności, w tym szybkie przelewy i BLIK, żeby klient mógł zapłacić bez zbędnych kroków.' },
      { t: 'Wysyłka i dostawy', d: 'Konfiguruję sposoby dostawy, koszty przesyłek i odbiór osobisty — także dla klientów z Poznania.' },
      { t: 'Panel produktów i zamówień', d: 'Dodajesz produkty, zmieniasz ceny i obsługujesz zamówienia we własnym panelu, bez pomocy programisty.' },
      { t: 'Projekt i wersja mobilna', d: 'Indywidualny wygląd sklepu oraz wygodne zakupy na telefonie, z którego dziś robi je większość klientów.' },
      { t: 'SEO kategorii i produktów', d: 'Czytelne adresy, tytuły i opisy stron kategorii oraz produktów, a także dane strukturalne produktów.' },
      { t: 'Analityka sprzedaży', d: 'Raporty pokazujące, co się sprzedaje, skąd przychodzą klienci i na którym etapie rezygnują z zakupu.' },
    ],
    sections: [
      {
        h2: 'Sklep internetowy, który ułatwia zakup',
        p: [
          'Największym wrogiem sprzedaży online jest utrudniony zakup. Dlatego upraszczam ścieżkę: od karty produktu, przez koszyk, do płatności. Im mniej pól i decyzji, tym więcej dokończonych zamówień.',
          'Sklep przygotowuję z miejscem na wymagane zapisy, takie jak regulamin i polityka prywatności. Same treści prawne warto skonsultować z prawnikiem — pomagam je poprawnie wdrożyć i umieścić w sklepie.',
        ],
      },
      {
        h2: 'Sklep widoczny w Google i gotowy na reklamę',
        p: [
          'Sklep bez ruchu nie sprzedaje. Od początku buduję strukturę kategorii i adresów pod wyszukiwarki, a opisy produktów przygotowujemy tak, żeby odpowiadały na pytania klientów — nie tylko powtarzały opis dostawcy.',
          'Gotowy sklep możesz od razu połączyć z kampaniami Google Ads, w tym reklamami produktowymi Shopping, oraz z reklamami w mediach społecznościowych. Konfiguruję śledzenie konwersji, żeby od pierwszego dnia było widać, które reklamy przynoszą zamówienia.',
        ],
      },
    ],
    steps: [
      { t: 'Analiza i zakres', d: 'Ustalamy asortyment, sposób dostawy, metody płatności i funkcje, których potrzebujesz na start.' },
      { t: 'Projekt sklepu', d: 'Przygotowuję wygląd strony głównej, kategorii, karty produktu i koszyka.' },
      { t: 'Wdrożenie', d: 'Buduję sklep, podłączam płatności i wysyłkę, dodaję pierwsze produkty i szkolę Cię z obsługi panelu.' },
      { t: 'Start sprzedaży', d: 'Testuję cały proces zakupu, uruchamiam sklep i wspólnie planujemy pierwsze działania promocyjne.' },
    ],
    faqs: [
      {
        q: 'Ile kosztuje sklep internetowy?',
        a: `Sklep gotowy do sprzedaży kosztuje od ${price('Sklep internetowy')} zł. Cena zależy od liczby produktów, integracji i funkcji, dlatego przed startem przygotowuję bezpłatną, konkretną wycenę.`,
      },
      {
        q: 'Czy sam dodam produkty do sklepu?',
        a: 'Tak. W panelu dodasz produkty, zmienisz ceny i stany magazynowe oraz obsłużysz zamówienia. Pokazuję, jak to robić, a przy większej liczbie produktów mogę pomóc w pierwszym imporcie.',
      },
      {
        q: 'Jakie płatności i formy dostawy obsłuży sklep?',
        a: 'Najczęściej wdrażam szybkie przelewy, BLIK i płatności kartą, a także kurierów, paczkomaty oraz odbiór osobisty. Zestaw dobieramy do Twojej branży i klientów.',
      },
      {
        q: 'Czy pomożesz z promocją sklepu?',
        a: 'Tak. Mogę poprowadzić pozycjonowanie sklepu w Google, kampanie Google Ads (w tym Shopping) i reklamy w mediach społecznościowych, a wyniki raportuję na bieżąco.',
      },
    ],
  },
  {
    slug: 'pozycjonowanie-seo-poznan',
    service: 'SEO',
    packages: ['SEO i Google Ads'],
    navLabel: 'Pozycjonowanie SEO Poznań',
    metaTitle: 'Pozycjonowanie stron Poznań — SEO | Sebastian Michałek',
    metaDescription: `Pozycjonowanie stron i SEO lokalne w Poznaniu: audyt, dobór słów kluczowych, optymalizacja treści i wizytówka Google. Obsługa od ${price('SEO i Google Ads')} zł miesięcznie.`,
    eyebrow: 'SEO · Poznań',
    h1: 'Pozycjonowanie stron Poznań — SEO, dzięki któremu klienci Cię znajdą',
    lead: 'Pomagam firmom z Poznania i okolic pojawiać się w Google na frazy, które wpisują ich klienci. Zaczynam od technicznych fundamentów i treści, a potem krok po kroku buduję widoczność — bez płacenia za każde kliknięcie.',
    included: [
      { t: 'Audyt techniczny', d: 'Sprawdzam indeksację, szybkość, strukturę strony, błędy i duplikaty, które blokują pozycje.' },
      { t: 'Dobór słów kluczowych', d: 'Wybieram frazy, które realnie przynoszą zapytania, z uwzględnieniem lokalizacji i konkurencji.' },
      { t: 'Optymalizacja treści', d: 'Poprawiam tytuły, nagłówki i opisy oraz wskazuję, jakich stron i tekstów brakuje na witrynie.' },
      { t: 'SEO lokalne', d: 'Konfiguruję i porządkuję wizytówkę Google, dane firmy oraz spójność nazwy, adresu i telefonu w sieci.' },
      { t: 'Linkowanie wewnętrzne', d: 'Układam powiązania między podstronami, żeby wzmacniać najważniejsze usługi.' },
      { t: 'Raporty z wyników', d: 'Regularnie pokazuję pozycje, kliknięcia i zapytania z Google Search Console oraz kolejne kroki.' },
    ],
    sections: [
      {
        h2: 'Jak działa pozycjonowanie lokalne w Poznaniu',
        p: [
          'Gdy ktoś szuka usługi w swoim mieście, Google pokazuje zwykle mapę z wizytówkami firm oraz zwykłe wyniki wyszukiwania. Aby pojawiać się w obu miejscach, firma potrzebuje dobrze opisanej strony oraz uporządkowanej wizytówki Google z aktualnymi danymi.',
          'W praktyce łączę oba obszary: zajmuję się treścią i strukturą strony oraz tym, jak Twoja firma wygląda w mapach. Dzięki temu wzmacniasz widoczność na frazy lokalne, takie jak „usługa + Poznań”, a nie tylko na ogólne hasła, na których konkuruje cała Polska.',
        ],
      },
      {
        h2: 'Uczciwe podejście do SEO',
        p: [
          'SEO to proces długoterminowy. Pierwsze efekty widać zwykle po kilku miesiącach, a tempo zależy od konkurencji i kondycji strony. Nikt uczciwy nie może zagwarantować konkretnego miejsca w Google, dlatego nie składam takich obietnic.',
          'Zamiast tego pokazuję, co robię i co przynosi efekty: które frazy rosną, ile osób klika w Twoją stronę i ile z nich pisze lub dzwoni. Decyzje o dalszych krokach opieramy na danych z Search Console i Analytics.',
        ],
      },
    ],
    steps: [
      { t: 'Audyt i analiza', d: 'Sprawdzam stan strony, konkurencję w Poznaniu i potencjał fraz.' },
      { t: 'Plan działań', d: 'Ustalam priorytety: poprawki techniczne, nowe podstrony i treści, wizytówka Google.' },
      { t: 'Wdrożenie', d: 'Wprowadzam zmiany na stronie i w wizytówce oraz przygotowuję treści pod wybrane frazy.' },
      { t: 'Pomiar i rozwój', d: 'Co miesiąc raportuję wyniki i dopasowuję kolejne działania do tego, co działa.' },
    ],
    faqs: [
      {
        q: 'Po jakim czasie widać efekty pozycjonowania?',
        a: 'Zwykle po kilku miesiącach. Pierwsze zmiany w widoczności często pojawiają się szybciej, ale stabilne pozycje na konkurencyjne frazy wymagają regularnej pracy.',
      },
      {
        q: 'Czy gwarantujesz pierwsze miejsce w Google?',
        a: 'Nie, i uważaj na każdego, kto to obiecuje. Wyniki zależą od algorytmu, konkurencji i jakości strony. Gwarantuję przejrzystość: wiesz, co robię i jakie przynosi efekty.',
      },
      {
        q: 'Ile kosztuje pozycjonowanie?',
        a: `Obsługa SEO wraz z Google Ads zaczyna się od ${price('SEO i Google Ads')} zł miesięcznie. Zakres i cenę dopasowuję do wielkości strony oraz celu, a wycena jest bezpłatna.`,
      },
      {
        q: 'Czy potrzebuję nowej strony, żeby się pozycjonować?',
        a: 'Nie zawsze. Najpierw robię audyt obecnej strony i wskazuję, co można poprawić. Jeśli stara witryna blokuje wyniki, doradzę jej przebudowę — ale tylko wtedy, gdy ma to sens.',
      },
    ],
  },
  {
    slug: 'google-ads-poznan',
    service: 'Google Ads',
    packages: ['SEO i Google Ads'],
    navLabel: 'Google Ads Poznań',
    metaTitle: 'Google Ads Poznań — kampanie reklamowe | Sebastian Michałek',
    metaDescription: `Prowadzę kampanie Google Ads dla firm z Poznania: reklamy w wyszukiwarce, Shopping, remarketing i śledzenie konwersji. Obsługa od ${price('SEO i Google Ads')} zł miesięcznie.`,
    eyebrow: 'Google Ads · Poznań',
    h1: 'Google Ads Poznań — kampanie, które przyprowadzają zapytania',
    lead: 'Konfiguruję i prowadzę kampanie Google Ads dla firm z Poznania i okolic. Docierasz do osób, które właśnie szukają Twojej usługi lub produktu, a budżet reklamowy zawsze rozliczamy jawnie i osobno od mojej pracy.',
    included: [
      { t: 'Kampanie w wyszukiwarce', d: 'Reklamy pokazujące się osobom wpisującym Twoje frazy, także z ograniczeniem do Poznania i okolic.' },
      { t: 'Reklamy produktowe Shopping', d: 'Dla sklepów internetowych: produkty ze zdjęciem i ceną bezpośrednio w wynikach wyszukiwania.' },
      { t: 'Remarketing', d: 'Przypominam o ofercie osobom, które odwiedziły Twoją stronę, ale jeszcze nie skontaktowały się z Tobą.' },
      { t: 'Śledzenie konwersji', d: 'Mierzę telefony, formularze i zamówienia, żeby wiedzieć, które reklamy się opłacają.' },
      { t: 'Reklamy i rozszerzenia', d: 'Piszę teksty reklam, dodaję rozszerzenia z telefonem i lokalizacją oraz testuję warianty.' },
      { t: 'Raporty i optymalizacja', d: 'Regularnie sprawdzam wyniki, wyłączam to, co nie działa, i przesuwam budżet tam, gdzie są zapytania.' },
    ],
    sections: [
      {
        h2: 'Reklama, która trafia do klientów z Poznania',
        p: [
          'W Google Ads płacisz za kliknięcie, więc najważniejsze jest, kto klika. Dlatego kampanię zaczynam od doboru fraz o jasnej intencji zakupowej oraz od wykluczeń, które odcinają przypadkowy ruch. Dodatkowo ograniczam zasięg do obszaru, na którym naprawdę działasz.',
          'Reklama działa tylko tak dobrze, jak strona, na którą prowadzi. Jeśli trzeba, wskażę poprawki na stronie lub przygotuję osobny landing page pod konkretną kampanię.',
        ],
      },
      {
        h2: 'Przejrzyste rozliczenie i pełna kontrola budżetu',
        p: [
          'Budżet reklamowy ustalamy wspólnie przed startem i płacisz go bezpośrednio Google. Moja obsługa jest rozliczana osobno, więc zawsze widzisz, na co idą pieniądze, a kontem reklamowym zarządzasz Ty — jest Twoje.',
          'Raporty pokazują liczbę kliknięć, koszt zapytania i zrealizowane konwersje. Gdy kampania nie przynosi efektów, mówię o tym wprost i proponuję zmianę zamiast spalania budżetu.',
        ],
      },
    ],
    steps: [
      { t: 'Cele i analiza', d: 'Ustalamy, co ma dać kampania: telefony, formularze czy sprzedaż, oraz jaki budżet ma sens.' },
      { t: 'Konfiguracja', d: 'Zakładam kampanie, wybieram frazy i lokalizacje, piszę reklamy i ustawiam śledzenie konwersji.' },
      { t: 'Uruchomienie', d: 'Włączam reklamy, pilnuję pierwszych dni i szybko poprawiam to, co wymaga korekty.' },
      { t: 'Optymalizacja', d: 'Co miesiąc analizuję wyniki, testuję nowe reklamy i przesuwam budżet na najlepsze kampanie.' },
    ],
    faqs: [
      {
        q: 'Ile wynosi budżet na Google Ads?',
        a: 'Zależy od branży, konkurencji i celu. Budżet ustalamy wspólnie przed kampanią i płacisz go bezpośrednio Google, a moja obsługa jest rozliczana osobno.',
      },
      {
        q: 'Jak szybko pojawią się zapytania?',
        a: 'Reklamy zaczynają działać zaraz po akceptacji przez Google, więc pierwsze kliknięcia pojawiają się w ciągu dni. Pełną skuteczność kampanii oceniamy zwykle po kilku tygodniach zbierania danych.',
      },
      {
        q: 'Ile kosztuje prowadzenie kampanii?',
        a: `Obsługa kampanii Google Ads wraz z SEO zaczyna się od ${price('SEO i Google Ads')} zł miesięcznie, bez budżetu reklamowego. Dokładną stawkę ustalam po rozmowie o zakresie.`,
      },
      {
        q: 'Czym Google Ads różni się od SEO?',
        a: 'Google Ads daje ruch od razu, ale płacisz za każde kliknięcie. SEO buduje bezpłatną widoczność dłużej. Najczęściej najlepiej działa połączenie obu, a proporcje dobieram do Twojego budżetu.',
      },
    ],
  },
  {
    slug: 'kampanie-reklamowe-poznan',
    service: 'Kampanie reklamowe',
    packages: [],
    navLabel: 'Reklama na Facebooku i Instagramie Poznań',
    metaTitle: 'Reklama Facebook i Instagram Poznań | Sebastian Michałek',
    metaDescription: 'Prowadzę kampanie reklamowe na Facebooku i Instagramie dla firm z Poznania: strategia, kreacje, testy A/B i raporty. Dopasowane do celu i budżetu. Bezpłatna wycena.',
    eyebrow: 'Kampanie reklamowe · Poznań',
    h1: 'Reklama na Facebooku i Instagramie Poznań — kampanie dopasowane do celu',
    lead: 'Planuję i prowadzę kampanie w mediach społecznościowych dla firm z Poznania i okolic. Docieram do ludzi z Twojego obszaru, którzy mogą potrzebować Twojej oferty, a wyniki pokazuję w czytelnych raportach.',
    included: [
      { t: 'Strategia kampanii', d: 'Ustalamy cel, grupę odbiorców i budżet, zanim powstanie pierwsza reklama.' },
      { t: 'Facebook i Instagram', d: 'Reklamy w postach, relacjach i Reels kierowane na wybranych odbiorców z Poznania i okolic.' },
      { t: 'Kreacje reklamowe', d: 'Pomagam przygotować grafiki i teksty, które przyciągają uwagę i zachęcają do działania.' },
      { t: 'Testy A/B', d: 'Sprawdzam różne warianty reklam i odbiorców, żeby zostawić te, które dają najlepsze wyniki.' },
      { t: 'Remarketing', d: 'Wracam do osób, które odwiedziły stronę lub zareagowały na reklamę, ale jeszcze nie skontaktowały się z Tobą.' },
      { t: 'Raporty i optymalizacja', d: 'Regularne zestawienia kosztów, zasięgu i zapytań oraz poprawki prowadzonych kampanii.' },
    ],
    sections: [
      {
        h2: 'Kiedy warto reklamować się w mediach społecznościowych',
        p: [
          'Reklama na Facebooku i Instagramie działa inaczej niż w Google. Nie trafia do osób, które aktywnie szukają usługi, lecz pokazuje ofertę tym, którzy mogą być nią zainteresowani. To dobre narzędzie do budowania rozpoznawalności, promowania nowości, wydarzeń i ofert sezonowych oraz do pozyskiwania zapytań w branżach wizualnych.',
          'Dla wielu firm najlepiej sprawdza się połączenie obu kanałów: Google Ads przechwytuje popyt, który już istnieje, a social media pomagają go wywołać i przypominać o Tobie.',
        ],
      },
      {
        h2: 'Kampania z jasnym celem i mierzalnym efektem',
        p: [
          'Każda kampania zaczyna się od pytania, co ma przynieść: wiadomości, telefony, wizyty na stronie czy sprzedaż. Od tego zależą format reklam, kierowanie i sposób mierzenia efektów.',
          'Budżet reklamowy ustalamy wspólnie i rozliczamy osobno od mojej pracy. W raportach widzisz koszt zasięgu i zapytań, a decyzje o zmianach opieram na danych, nie na przeczuciu.',
        ],
      },
    ],
    steps: [
      { t: 'Rozmowa i cel', d: 'Ustalamy, kogo i po co chcemy zdobyć oraz jaki budżet ma sens.' },
      { t: 'Strategia i kreacje', d: 'Planuję kampanię, wybieram odbiorców i przygotowujemy reklamy.' },
      { t: 'Start i testy', d: 'Uruchamiam kampanię, porównuję warianty reklam i odbiorców.' },
      { t: 'Optymalizacja i raport', d: 'Wyłączam słabsze reklamy, wzmacniam te najlepsze i raportuję wyniki.' },
    ],
    faqs: [
      {
        q: 'Ile kosztuje kampania na Facebooku i Instagramie?',
        a: 'Koszt składa się z budżetu reklamowego płaconego platformie oraz mojej obsługi. Oba elementy ustalam z Tobą indywidualnie, zależnie od celu i zakresu, a wycena jest bezpłatna.',
      },
      {
        q: 'Czy muszę mieć profil firmowy w mediach społecznościowych?',
        a: 'Tak, reklamy prowadzimy z profilu firmy na Facebooku, który jest podstawą konta reklamowego. Jeśli go jeszcze nie masz, pomogę go założyć i skonfigurować.',
      },
      {
        q: 'Czy przygotujesz grafiki do reklam?',
        a: 'Pomagam w kreacjach: proponuję układ, teksty i format reklam. Jeśli potrzebujesz bardziej rozbudowanych materiałów graficznych, ustalamy to osobno przed startem.',
      },
      {
        q: 'Czy lepsze są reklamy w Google czy w social mediach?',
        a: 'To zależy od tego, jak klienci szukają Twojej usługi. Gdy aktywnie wyszukują ją w Google, zaczynam od Google Ads. Gdy trzeba pokazać ofertę, najlepsze są social media. Często łączę oba kanały.',
      },
    ],
  },
]

export const normalizePath = path => {
  const clean = (path || '/').split(/[?#]/)[0].replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

export const pageUrl = page => `/${page.slug}/`

export const findPage = path => {
  const p = normalizePath(path)
  return SERVICE_PAGES.find(page => p === `/${page.slug}`)
}

// Dane strukturalne dla podstrony: usługa, ścieżka okruszkowa i FAQ.
export function jsonLdFor(page) {
  const url = `${SITE_URL}${pageUrl(page)}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.h1,
      serviceType: page.service,
      description: page.metaDescription,
      url,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: { '@type': 'City', name: 'Poznań' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.navLabel, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
}
