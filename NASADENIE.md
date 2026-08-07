# RastoAI web — brandová verzia (Kit 1, červený)

Kópia pôvodného webu s doplnenou brand identitou. Obsah, texty, štruktúra a funkcionalita zostali nezmenené.

---

## Čo sa zmenilo

| Oblasť | Zmena |
|---|---|
| **Logo** | Značka RK (`znacka_RK_svetla.svg` / `znacka_RK.svg`) v navigácii na hlavnej stránke aj vo všetkých článkoch. Automatické prepínanie svetlý/tmavý režim. |
| **Favicon** | `favicon_RK_cervena.svg` + PNG fallback + apple-touch-icon na všetkých stránkach. |
| **Typografia** | Inter (300–800) + JetBrains Mono z Google Fonts. Nastavené globálne aj v `tailwind.config`. |
| **Motív siete** | `siet_cervena.svg` v hero sekcii pri 8 % krytí (10 % v tmavom režime) + rohový akcent pri 18 %. |
| **OG obrázok** | Nový `assets/og-image.png` (1200×630) s logom a motívom siete pre LinkedIn/FB náhľady. |
| **Farby** | Tailwind `red-*` triedy nahradené presnými brand hodnotami (`#E60000`, `#C80000`, `#AA0000`, `#FFF5F5`). |
| **Gradienty** | Odstránené (Kit 1 používa plné farby) — okrem jedného neutrálneho dekoratívneho. |
| **LinkedIn tlačidlo** | `#0077b5` → brandová červená `#E60000`. |
| **Logá klientov** | Sekcia `#klienti` zakomentovaná (obrázky chýbali). |

Zelená farba potvrdzovacích hlášok vo formulári zostala — je to funkčný stavový signál, brand manuál ju nedefinuje.

---

## Čo musíš doplniť pred nasadením

### 1. Chýbajúce obrázky

Do koreňa priečinka nahraj:

- `RKfoto.png` — tvoja fotka do hero sekcie (odkazovaná v `index.html`)

### 2. Obnovenie sekcie s logami klientov (voliteľné)

Do koreňa nahraj tieto súbory a v `index.html` odstráň komentárové značky okolo sekcie `<!-- ===== Logá klientov (marquee) — DOČASNE SKRYTÉ ===== -->`:

```
Logo klienta 1.png    Logo klienta 2.jpg    Logo klienta3.png
Logo klienta4.jpg     Logo klienta5.png     Logo klienta6.jpg
Logo klienta7.png     Logo klienta8.png     Logo klienta9.png
Logo klienta10.png    Logo klienta11.png    Logo klienta12.png
Logo klienta13.png
```

### 3. Doména

Nahraď `VASA-DOMENA.sk` skutočnou doménou v:

- `index.html` — canonical, og:url, og:image, twitter:image, structured data, `CONFIG.DOWNLOAD_BASE`
- `clanky/*.html` — canonical, og:url
- `sitemap.xml`

```bash
grep -rl "VASA-DOMENA.sk" . | xargs sed -i 's/VASA-DOMENA\.sk/rastoai.sk/g'
```

### 4. EmailJS

V `index.html` v bloku `CONFIG` vyplň kľúče podľa `HANDBOOK.md` a `EmailJS.txt`.

---

## Nasadenie

Statický web bez build kroku — nahraj celý obsah priečinka na hosting (FTP, Netlify, Vercel, GitHub Pages).

Priečinok `assets/` musí ísť so zvyškom, inak sa nezobrazí logo, favicon ani OG obrázok.

---

## Štruktúra

```
RastoAI-web-brand/
├── index.html
├── ochrana-sukromia.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── og-image.png          ← nový, 1200×630
│   └── logo/                 ← brand assety z BrandBook/Logo_RK
├── clanky/                   (8 článkov + gate.js)
└── downloads/                (4 PDF)
```

---

## Poznámka k výkonu

Google Fonts pridáva ~50 kB. Ak chceš rýchlejšie načítanie, stiahni Inter a JetBrains Mono lokálne do `assets/fonts/` a nahraď `<link>` za `@font-face` s `font-display: swap`.
