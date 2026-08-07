# HANDBOOK – ako spojazdniť web

Čo je v zložke:

| Súbor | Účel |
|---|---|
| `index.html` | Hlavná stránka (statické HTML, SEO-ready) |
| `ochrana-sukromia.html` | GDPR + cookies stránka |
| `downloads/` | 4 PDF sady promptov (posielajú sa za e-mail) |
| `sitemap.xml`, `robots.txt` | SEO súbory |
| `HANDBOOK.md` | Tento návod |

**Chýba:** `RKfoto.png` – skopíruj svoju fotku do tejto zložky (rovnaký názov), inak sa v hero sekcii nezobrazí.

**Logá klientov:** kód odkazuje na súbory v koreňovom priečinku repa presne podľa názvov v GitHube: `Logo klienta 1.png`, `Logo klienta 2.jpg` (s medzerou pred číslom) a `Logo klienta3.png` až `Logo klienta13.png` (bez medzery; 4 a 6 sú .jpg). Pri lokálnom testovaní ich skopíruj aj do tejto zložky vedľa index.html. Ak súbor premenuješ v repe, uprav rovnaký názov aj v index.html (sekcia marquee – logá sú tam 2× kvôli slučke).

---

## KROK 1: Lokálne otestovanie (2 min)

Otvor `index.html` v prehliadači (dvojklik). Všetko okrem odosielania e-mailov funguje hneď. Formulár začne fungovať po kroku 2.

---

## KROK 2: EmailJS – odosielanie promptov (15 min, free)

Free plán: **200 e-mailov/mesiac**. Každé vyplnenie formulára = 2 e-maily (záujemcovi + tebe), čiže ~100 leadov mesačne zadarmo.

### 2.1 Účet a služba
1. Registruj sa na [emailjs.com](https://www.emailjs.com) (Sign Up Free).
2. **Email Services → Add New Service → Gmail** (alebo Outlook) → prihlás účet, z ktorého sa majú e-maily posielať → ulož.
3. Zapíš si **Service ID** (napr. `service_abc123`).

### 2.2 Šablóna 1 – auto-odpoveď záujemcovi
**Email Templates → Create New Template**, nazvi `autoreply_prompty`.

- **To Email:** `{{user_email}}`
- **From Name:** `Rasťo Kozlík`
- **Subject:** `Vaše AI prompty na stiahnutie 🎁`
- **Content:**

```
Dobrý deň,

ďakujem za záujem o AI Prompt Knižnicu. Tu sú všetky 4 sady:

📥 15 AI promptov pre HR: {{link_hr}}
📥 15 AI promptov pre Sales: {{link_sales}}
📥 15 AI promptov pre manažérov: {{link_manazeri}}
📥 AI štartovací balík: {{link_startovaci}}

Tip na začiatok: otvorte štartovací balík a vyskúšajte prompt č. 19
„Prompt na zlepšenie promptu" – zmení spôsob, akým s AI pracujete.

Ak budete chcieť posunúť AI vo vašej firme ďalej, ozvite sa mi.

Pekný deň,
Rasťo Kozlík
AI Konzultant | linkedin.com/in/rastislavkozlik
```

Zapíš si **Template ID**.

### 2.3 Šablóna 2 – notifikácia tebe
Druhá šablóna, nazvi `notify_lead`.

- **To Email:** `{{to_email}}`
- **Subject:** `🔥 Nový lead z webu: {{user_email}}`
- **Content:**

```
Nový záujemca o prompty:

E-mail: {{user_email}}
Dátum: {{date}}
Stránka: {{page_url}}
```

Zapíš si **Template ID**.

### 2.4 Public Key a prepojenie
1. **Account → General → Public Key** – skopíruj.
2. Otvor `index.html`, nájdi blok `CONFIG` (cca riadok s `⚙️ KONFIGURÁCIA`) a vyplň:

```js
EMAILJS_PUBLIC_KEY: "tvoj_public_key",
EMAILJS_SERVICE_ID: "service_abc123",
EMAILJS_TEMPLATE_AUTOREPLY: "template_xxx",   // autoreply_prompty
EMAILJS_TEMPLATE_NOTIFY: "template_yyy",      // notify_lead
```

3. Odporúčanie: v EmailJS **Account → Security** zapni *Allow only from specific domains* a pridaj svoju doménu (ochrana pred zneužitím kľúča).

---

## KROK 3: Doména (po nasadení)

Vo všetkých súboroch nahraď `VASA-DOMENA.sk` skutočnou doménou (Ctrl+H):

- `index.html` – canonical, og:url, og:image, twitter:image, JSON-LD, `CONFIG.DOWNLOAD_BASE`
- `sitemap.xml` – obe URL
- `robots.txt` – riadok Sitemap

`DOWNLOAD_BASE` musí byť **absolútna URL** (odkazy idú do e-mailu), napr.:
`DOWNLOAD_BASE: "https://tvojadomena.sk/downloads"`

---

## KROK 4: Cookies – hotové, netreba nič

Cookie lišta (vanilla-cookieconsent, free/MIT) sa zobrazí automaticky pri prvej návšteve. Kategórie: nevyhnutné (vždy zapnuté) + analytické (len so súhlasom). Texty sú v slovenčine v `index.html` v bloku `CookieConsent.run`.

**Doplň v `ochrana-sukromia.html`:** fakturačné údaje (IČO, sídlo) – miesta sú označené `⚠️`.

---

## KROK 5: Google Analytics (voliteľné, free)

1. Vytvor property na [analytics.google.com](https://analytics.google.com) → získaš Measurement ID (`G-XXXXXXX`).
2. V `index.html` nájdi `onConsent` a nahraď komentár týmto:

```js
onConsent: ({ cookie }) => {
    if (cookie.categories.includes('analytics')) {
        const s = document.createElement('script');
        s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
        s.async = true;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXX');
    }
}
```

GA sa tak spustí **len so súhlasom** – v súlade s GDPR.

---

## KROK 6: Nasadenie (ďalší krok – GitHub Pages)

Až budeš pripravený: celú zložku nahráš do GitHub repozitára → Settings → Pages → deploy z main branch. Web pobeží zadarmo na `https://uzivatel.github.io/repo/`, neskôr sa dá pripojiť vlastná doména. Toto spravíme spolu v ďalšom kroku.

Po nasadení ešte:
1. [Google Search Console](https://search.google.com/search-console) → pridaj doménu → odošli `sitemap.xml`. Zrýchli indexáciu.
2. Otestuj formulár naostro (vlastný e-mail).
3. Skontroluj náhľad zdieľania na [opengraph.xyz](https://www.opengraph.xyz).

---

## Čo sa oproti pôvodnej verzii zmenilo

1. **SEO:** pôvodný web bol React renderovaný v prehliadači – Google videl prázdnu stránku. Teraz je obsah statické HTML + meta tagy, OG, JSON-LD (osoba aj služby s cenami), sitemap, robots.txt. Rýchlejšie načítanie (vypadol React, ReactDOM a Babel – ~1,5 MB).
2. **Zber kontaktov:** nová sekcia „AI Prompt Knižnica" so 4 PDF sadami za e-mail (EmailJS auto-odpoveď + notifikácia tebe). GDPR checkbox so súhlasom.
3. **Cookies + GDPR:** cookie lišta a stránka ochrany súkromia.
4. **Drobnosti:** alt texty, lazy loading pripravený, odkaz „Prompty zadarmo" v menu aj v hero CTA.

## Sekcia Články (e-mail gate)

V zložke `clanky/` sú 4 články + spoločný skript `clanky/gate.js`:

| Súbor | Téma |
|---|---|
| `microsoft-copilot-v-praci.html` | Copilot vo Worde, Exceli, Outlooku, Teams |
| `chatgpt-novinky-jun-2026.html` | ChatGPT novinky – písanie, e-maily, grafy |
| `gemini-flash-zadarmo.html` | Gemini 3.5 Flash zadarmo – rýchly štart |
| `google-io-2026.html` | Google I/O 2026 z pohľadu firiem |
| `ai-pre-male-firmy.html` | AI pre malé firmy – kde začať |
| `claude-opus-48-agenti.html` | Claude Opus 4.8 a AI agenti |
| `ako-zacat-s-ai.html` | Sprievodca AI pre úplných začiatočníkov |
| `notebooklm-novinky-2026.html` | NotebookLM – 5 noviniek 2026 |

**Ako to funguje:** prvá obrazovka článku je viditeľná, zvyšok je rozmazaný. Po zadaní e-mailu (+ GDPR súhlas) sa článok odomkne a do tvojej schránky príde notifikácia (rovnaká EmailJS šablóna `notify_lead` ako pri promptoch). Odomknutie sa uloží do localStorage – platí pre všetky články naraz.

**Konfigurácia:** otvor `clanky/gate.js` a vyplň rovnaké EmailJS hodnoty ako v `index.html` (PUBLIC_KEY, SERVICE_ID, TEMPLATE_NOTIFY). Kým nie sú vyplnené, formulár článok odomkne aj bez odoslania e-mailu (na lokálne testovanie), len sa nezaznamená lead.

**Po nasadení:** nahraď `VASA-DOMENA.sk` aj v `clanky/*.html` (canonical + og:url) – Ctrl+H rovnako ako pri index.html. Nové URL sú už pridané v `sitemap.xml`.

**Poznámka k obsahu:** články sú originálne texty písané pre tento web (témy inšpirované aktuálnymi AI novinkami). Nie sú prevzaté z iných webov – kópie cudzích článkov by boli problém autorsky aj pre SEO (duplicitný obsah).

## Limity a upozornenia

- **Leady chodia len e-mailom** – odporúčam si ich ukladať do tabuľky (Excel/Sheets). Pri väčšom objeme zvážiť MailerLite (free do 1 000 kontaktov, má automatizácie aj double opt-in).
- PDF v `downloads/` sú verejne dostupné každému, kto pozná URL (robots.txt ich blokuje pre vyhľadávače, ale nie je to tvrdá ochrana). Pre začiatok OK.
- EmailJS free = 200 mailov/mes. Pri prekročení sa formulár nepokazí, len e-maily neodídu – sleduj dashboard.
