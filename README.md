# Główna strona witryny www.juniordevops.xyz
Jest to strona profilowa do oferty tworzenia stron, głównie jest pierwszym projektem powstałym na serwerze typowo na VPS, została zdockerowana oraz wrzucona do CI/CD w ramach nauki i pomocy AI. 

# Pierwszy projekt z CI/CD, aby zrozumieć koncept


## Podstrony usługowe i SEO
Podstrony (`/strony-internetowe-poznan/` itd.) są zdefiniowane w `src/pages.js` — to jedyne miejsce, które trzeba edytować, żeby dodać lub zmienić podstronę.
`npm run build` buduje aplikację, a `scripts/prerender.mjs` zapisuje dla każdej podstrony gotowy HTML (title, canonical, dane strukturalne) oraz generuje `sitemap.xml`.
