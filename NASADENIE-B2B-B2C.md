# Nasadenie: rozdelenie webu na B2B a B2C

Toto je **kompletný web**, nie len zmenené súbory. Obsah priečinka nahradí obsah repozitára.

---

## 1. Postup nahratia

**Najprv záloha.** Na GitHube otvor `index.html` → **Download raw file** → ulož si ho bokom. Keby sa čokoľvek pokazilo, vrátiš pôvodný stav za pár sekúnd.

1. Rozbaľ tento balík.
2. `github.com/airasto/RastoAI` → **Add file** → **Upload files**.
3. Presuň myšou **celý obsah** rozbaleného priečinka do okna prehliadača, aj s podpriečinkami. GitHub štruktúru zachová.
4. Popis commitu, napríklad `Rozdelenie webu na B2B a B2C + Tailwind build`.
5. **Commit changes.**

Netlify si zmenu všimne a spustí build. Tentoraz to potrvá **1–2 minúty** namiesto pár sekúnd, lebo pribudol krok generovania CSS. Priebeh sleduj v Netlify → **Deploys**.

> Súbory, ktoré sa nezmenili (obrázky, PDF, logá), GitHub rozpozná ako identické a v commite sa neobjavia.

---

## 2. Čo treba doplniť

V súbore **`assets/site.js`** ostáva doplniť už len jedna hodnota:

```js
CALENDLY_URL: ""              // odkaz na rezervačný kalendár – DOPLNIŤ
GA_ID: "G-W1G5H18FQN"         // ✅ hotové
```

### 2.1 Google Analytics ✅ hotové

Measurement ID `G-W1G5H18FQN` je už vložené v `assets/site.js`. Netreba robiť nič.

Otestované: pred udelením súhlasu sa na Google neposiela **žiadna** požiadavka. Po kliknutí na „Prijať všetky" v cookie lište sa načíta `googletagmanager.com/gtag/js?id=G-W1G5H18FQN` a spustí sa meranie s anonymizovanou IP adresou. Je to v súlade s GDPR.

Po nasadení sa choď pozrieť do Google Analytics → **Reports → Realtime** — mal by si tam sám seba vidieť do pár sekúnd.

### 2.2 Calendly (5 minút)

1. Účet na `calendly.com`, free plán stačí.
2. Vytvor **jeden** typ udalosti (viac free plán nedovolí):
   - Názov: `Nezáväzný úvodný hovor`
   - Dĺžka: 15 minút, zadarmo
   - Prepoj Google Calendar, nech to nekoliduje s inými stretnutiami.
3. Skopíruj verejný odkaz, napr. `https://calendly.com/rasto-kozlik/uvodny-hovor`.
4. Vlož do `CALENDLY_URL`.

Kým je pole prázdne, tlačidlá „Rezervovať" odscrollujú na kontaktný formulár.

### 2.3 EmailJS — rozšírenie šablóny (2 minúty)

Formulár na stránke pre jednotlivcov posiela cez existujúcu šablónu `notify_lead`. Tá zatiaľ pozná len e-mail a dátum, takže odpovede z formulára by ti nedorazili.

EmailJS → **Email Templates** → `notify_lead` → prepíš obsah na:

```
Nový dopyt z webu:

Meno:      {{user_name}}
E-mail:    {{user_email}}
Formát:    {{format}}
Nástroje:  {{tools}}

Čo chce riešiť:
{{message}}

---
Dátum: {{date}}
Stránka: {{page_url}}
```

Šablóna zostane funkčná aj pre formulár na prompty — tam sa nové premenné nevyplnia a riadky ostanú prázdne.

---

## 3. Čo sa zmenilo

### Štruktúra

| Súbor | Stav |
|---|---|
| `index.html` | prepísaný — skrátená homepage s rozcestníkom |
| `pre-firmy.html` | nový — B2B vetva |
| `pre-jednotlivcov.html` | nový — B2C vetva, 1:1 konzultácie |
| `assets/site.css` | nový — spoločné štýly |
| `assets/site.js` | nový — spoločné skripty + Google Analytics |
| `assets/tailwind.css` | nový — vygenerovaný CSS (viď nižšie) |
| `clanky/*.html` | upravené odkazy v menu + build zmena |
| `ochrana-sukromia.html` | build zmena |
| `sitemap.xml` | +2 URL |
| `tailwind.config.js`, `package.json`, `netlify.toml`, `src/` | nové — build |
| `RKfoto.png` | odstránený (1,1 MB, nikde sa nepoužíval) |

### Tailwind: koniec CDN

Web už nenačítava `cdn.tailwindcss.com` — ~120 kB JavaScriptu, ktorý CSS generoval až v prehliadači a spôsoboval bliknutie neštýlovanej stránky.

Namiesto toho **Netlify pri každom commite vygeneruje `assets/tailwind.css`** z tried, ktoré na webe reálne používaš. Výsledok má **31 kB** a je to obyčajný CSS súbor.

Riadi to `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "."
```

Overené porovnaním pixel po pixeli: články aj stránka ochrany súkromia vyzerajú po zmene **úplne identicky** — 0 rozdielnych pixelov.

**Čo to znamená pre teba:** ak budeš upravovať HTML priamo na GitHube a pridáš novú Tailwind triedu, Netlify si CSS pregeneruje sám. Nemusíš robiť nič.

**Ak by build zlyhal**, Netlify nasadenie zastaví a na doméne zostane predchádzajúca funkčná verzia. `assets/tailwind.css` je navyše v repozitári, takže existuje aj bez buildu.

### Fonty

Odstránený **JetBrains Mono**. Bol definovaný pre `<code>`, `<pre>` a `.prompt`, ale žiadny taký element na webe neexistuje — sťahoval sa zbytočne.

### Obsah

- **Sekcia 1:1 za 250 €/h je z firemnej ponuky odstránená úplne**, vrátane structured data pre Google.
- **Cenník pre jednotlivcov:** 39 € (30 min) · 69 € (60 min) · 99 € (90 min) · 179 € (balík 3×) · od 290 € (premium).
- **Celý web vyká**, vrátane hlavného nadpisu na homepage — pôvodne tam bolo „čo s ňou dokážeš ty".
- **Sekcia s logami klientov je znovu zapnutá.** V pôvodnom `index.html` bola zakomentovaná s poznámkou, že obrázky chýbajú — v repozitári však už všetkých 13 súborov je.
- **Referencie sú len na stránke pre firmy**, keďže všetky štyri sú od firemných účastníkov.

---

## 4. Po nasadení skontroluj

- [ ] Netlify → Deploys → build prešiel zeleno
- [ ] Homepage → rozcestník vedie na obe podstránky
- [ ] `rastoai.sk/pre-firmy` a `rastoai.sk/pre-jednotlivcov` sa načítajú a sú naštýlované
- [ ] Jeden článok sa načíta a je naštýlovaný — kontrola, že build pokryl aj `clanky/`
- [ ] Tmavý režim a mobilné menu
- [ ] Formulár na 1:1 konzultáciu — odošli testovací dopyt
- [ ] Cookie lišta → „Prijať všetky" → v Google Analytics **Reports → Realtime** sa objavíš
- [ ] Google Search Console → znova odošli `sitemap.xml`

---

## 5. Poznámka

`HANDBOOK.md` a `NASADENIE.md` v repozitári sú **neaktuálne** — popisujú stav pred rozdelením webu a spomínajú GitHub Pages, hoci web beží na Netlify. Nechal som ich nedotknuté, ale neriaď sa nimi.
