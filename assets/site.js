/* ============================================================
   Rasťo AI – spoločný skript pre všetky stránky
   Načítava sa na: index.html, pre-firmy.html, pre-jednotlivcov.html
   ------------------------------------------------------------
   Každý blok je chránený kontrolou existencie prvku, takže ten
   istý súbor môže bežať na stránke, kde daná sekcia nie je.
   ============================================================ */

/* ============================================================
   KONFIGURÁCIA
   ============================================================ */
const CONFIG = {
    EMAILJS_PUBLIC_KEY: "eNtSPPDobXrfI3feo",          // EmailJS → Account → Public Key
    EMAILJS_SERVICE_ID: "service_ceutwej",            // EmailJS → Email Services
    EMAILJS_TEMPLATE_AUTOREPLY: "template_uuk1dsg",   // šablóna pre záujemcu (s odkazmi na PDF)
    EMAILJS_TEMPLATE_NOTIFY: "template_zeubrt4",      // notifikácia pre teba
    DOWNLOAD_BASE: "https://rastoai.sk/downloads",
    NOTIFY_EMAIL: "rasto.kozlik.ai@gmail.com",

    // ⚠️ DOPLNIŤ: odkaz na Calendly (napr. "https://calendly.com/rasto-kozlik/uvodny-hovor").
    // Kým je prázdny, tlačidlo „Rezervovať termín" plynulo odscrolluje na formulár.
    CALENDLY_URL: "",

    // Google Analytics Measurement ID (property rastoai.sk).
    // Meranie sa spúšťa až po súhlase s analytickými cookies.
    GA_ID: "G-W1G5H18FQN"
};

/* ============================================================
   Google Analytics – spúšťa sa VÝHRADNE so súhlasom návštevníka
   (volá sa z onConsent v cookie lište nižšie)
   ============================================================ */
function loadGA() {
    if (!CONFIG.GA_ID) return;                 // nie je vyplnené ID
    if (window.__gaLoaded) return;             // už beží
    window.__gaLoaded = true;

    const s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA_ID;
    s.async = true;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', CONFIG.GA_ID, { anonymize_ip: true });
}

/* ============================================================
   Presmerovanie starých kotiev
   Odkazy typu rastoai.sk/#ai-trener (LinkedIn príspevky, záložky)
   musia po rozdelení webu skončiť na správnej podstránke.
   Fragment sa na server neposiela, preto to rieši až prehliadač.
   ============================================================ */
(function () {
    const map = {
        '#ai-trener':   './pre-firmy.html#ai-trener',
        '#workshopy':   './pre-firmy.html#workshopy',
        '#prinos':      './pre-firmy.html#prinos',
        '#referencie':  './pre-firmy.html#referencie',
        '#konzultacie': './pre-jednotlivcov.html#cennik'
    };
    const path = window.location.pathname;
    const isHome = path === '/' || path.endsWith('/index.html');
    if (!isHome) return;
    const target = map[window.location.hash];
    if (target) window.location.replace(target);
})();

/* ============================================================
   Scroll-reveal sekcií
   ============================================================ */
(function () {
    if (!('IntersectionObserver' in window)) return;
    const els = document.querySelectorAll('section > div, header.relative > div');
    if (!els.length) return;
    els.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
})();

/* ============================================================
   Navigácia: scroll efekt
   ============================================================ */
(function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const onScroll = () => {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('bg-white/95', scrolled);
        navbar.classList.toggle('dark:bg-[#0f0f0f]/95', scrolled);
        navbar.classList.toggle('backdrop-blur', scrolled);
        navbar.classList.toggle('shadow-md', scrolled);
        navbar.classList.toggle('py-2', scrolled);
        navbar.classList.toggle('bg-transparent', !scrolled);
        navbar.classList.toggle('py-4', !scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

/* ============================================================
   Mobilné menu
   ============================================================ */
(function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');
    if (!menuToggle || !mobileMenu || !iconOpen || !iconClose) return;

    menuToggle.addEventListener('click', () => {
        const closed = mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex', !closed);
        iconOpen.classList.toggle('hidden', !closed);
        iconClose.classList.toggle('hidden', closed);
        menuToggle.setAttribute('aria-expanded', String(!closed));
    });
    document.querySelectorAll('.m-link').forEach(a => a.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
    }));
})();

/* ============================================================
   Tmavý režim
   ============================================================ */
(function () {
    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        try { localStorage.setItem('rk-theme', isDark ? 'dark' : 'light'); } catch (e) {}
    }
    ['theme-toggle', 'theme-toggle-m'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', toggleTheme);
    });
})();

/* ============================================================
   3D kocka referencií (len na stránke, kde je)
   ============================================================ */
(function () {
    const cube = document.getElementById('cube');
    const scene = document.getElementById('cube-scene');
    if (!cube || !scene) return;

    let rotation = 0, timer = null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rotate = () => { rotation -= 90; cube.style.transform = `translateZ(-160px) rotateX(${rotation}deg)`; };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => { if (reduced) return; stop(); timer = setInterval(rotate, 5000); };

    scene.addEventListener('mouseenter', () => { stop(); rotate(); });
    scene.addEventListener('mouseleave', start);
    start();
})();

/* ============================================================
   Flip karty
   ============================================================ */
document.querySelectorAll('.flip-card').forEach(card =>
    card.addEventListener('click', () => card.classList.toggle('is-flipped'))
);

/* ============================================================
   Rok v pätičke
   ============================================================ */
(function () {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
})();

/* ============================================================
   Tlačidlá „Rezervovať termín" → Calendly alebo formulár
   ============================================================ */
(function () {
    const btns = document.querySelectorAll('[data-booking]');
    if (!btns.length) return;
    btns.forEach(btn => {
        if (CONFIG.CALENDLY_URL) {
            btn.setAttribute('href', CONFIG.CALENDLY_URL);
            btn.setAttribute('target', '_blank');
            btn.setAttribute('rel', 'noreferrer');
        } else {
            btn.setAttribute('href', '#dopyt');
        }
    });
})();

/* ============================================================
   EmailJS
   ============================================================ */
(function () {
    if (typeof emailjs === 'undefined') return;
    emailjs.init({ publicKey: CONFIG.EMAILJS_PUBLIC_KEY });

    /* ---------- Formulár: AI Prompt Knižnica ---------- */
    const form = document.getElementById('prompt-form');
    const statusEl = document.getElementById('form-status');

    if (form && statusEl) {
        const showStatus = (msg, ok) => {
            statusEl.textContent = msg;
            statusEl.className = 'mt-5 text-center text-sm font-semibold rounded-xl px-4 py-3 ' +
                (ok ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400'
                    : 'bg-[#FFF5F5] dark:bg-[#E60000]/10 text-[#AA0000] dark:text-[#FF4D4D]');
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('lead-email').value.trim();
            const consent = document.getElementById('lead-consent').checked;

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { showStatus('Zadajte platnú e-mailovú adresu.', false); return; }
            if (!consent) { showStatus('Pre zaslanie promptov je potrebný súhlas so spracovaním e-mailu.', false); return; }

            const btn = document.getElementById('lead-submit');
            btn.disabled = true;
            showStatus('Odosielam…', true);

            const params = {
                user_email: email,
                to_email: CONFIG.NOTIFY_EMAIL,
                link_hr: CONFIG.DOWNLOAD_BASE + '/ai-prompty-hr.pdf',
                link_sales: CONFIG.DOWNLOAD_BASE + '/ai-prompty-sales.pdf',
                link_manazeri: CONFIG.DOWNLOAD_BASE + '/ai-prompty-manazeri.pdf',
                link_startovaci: CONFIG.DOWNLOAD_BASE + '/ai-startovaci-balik.pdf',
                page_url: window.location.href,
                date: new Date().toLocaleString('sk-SK')
            };

            try {
                await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_AUTOREPLY, params);
                await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_NOTIFY, params);
                form.classList.add('hidden');
                document.getElementById('form-success').classList.remove('hidden');
            } catch (err) {
                console.error('EmailJS error:', err);
                showStatus('Niečo sa pokazilo. Skúste to znova, alebo mi napíšte na ' + CONFIG.NOTIFY_EMAIL, false);
                btn.disabled = false;
            }
        });
    }

    /* ---------- Formulár: dopyt na 1:1 konzultáciu ---------- */
    const kForm = document.getElementById('konzultacia-form');
    const kStatus = document.getElementById('konzultacia-status');

    if (kForm && kStatus) {
        const showK = (msg, ok) => {
            kStatus.textContent = msg;
            kStatus.className = 'mt-5 text-center text-sm font-semibold rounded-xl px-4 py-3 ' +
                (ok ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400'
                    : 'bg-[#FFF5F5] dark:bg-[#E60000]/10 text-[#AA0000] dark:text-[#FF4D4D]');
        };

        kForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('k-meno').value.trim();
            const email = document.getElementById('k-email').value.trim();
            const problem = document.getElementById('k-problem').value.trim();
            const tools = document.getElementById('k-nastroje').value;
            const format = document.getElementById('k-format').value;
            const consent = document.getElementById('k-consent').checked;

            if (name.length < 2) { showK('Vyplňte prosím svoje meno.', false); return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { showK('Zadajte platnú e-mailovú adresu.', false); return; }
            if (problem.length < 10) { showK('Napíšte prosím aspoň jednu vetu o tom, čo chcete riešiť.', false); return; }
            if (!consent) { showK('Bez súhlasu so spracovaním údajov vám nemôžem odpovedať.', false); return; }

            const btn = document.getElementById('k-submit');
            btn.disabled = true;
            showK('Odosielam…', true);

            const params = {
                to_email: CONFIG.NOTIFY_EMAIL,
                user_email: email,
                user_name: name,
                message: problem,
                tools: tools,
                format: format,
                page_url: window.location.href,
                date: new Date().toLocaleString('sk-SK')
            };

            try {
                await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_NOTIFY, params);
                kForm.classList.add('hidden');
                document.getElementById('konzultacia-success').classList.remove('hidden');
            } catch (err) {
                console.error('EmailJS error:', err);
                showK('Niečo sa pokazilo. Skúste to znova, alebo mi napíšte priamo na ' + CONFIG.NOTIFY_EMAIL, false);
                btn.disabled = false;
            }
        });
    }
})();

/* ============================================================
   Cookie lišta (vanilla-cookieconsent)
   ============================================================ */
window.addEventListener('load', () => {
    if (!window.CookieConsent) return;
    CookieConsent.run({
        guiOptions: {
            consentModal: { layout: 'box', position: 'bottom left' },
            preferencesModal: { layout: 'box' }
        },
        categories: {
            necessary: { enabled: true, readOnly: true },
            analytics: {
                autoClear: { cookies: [{ name: /^_ga/ }, { name: '_gid' }] }
            }
        },
        language: {
            default: 'sk',
            translations: {
                sk: {
                    consentModal: {
                        title: 'Cookies na tomto webe',
                        description: 'Používam len nevyhnutné cookies na fungovanie stránky. Analytické cookies (návštevnosť) sa spustia iba s vaším súhlasom.',
                        acceptAllBtn: 'Prijať všetky',
                        acceptNecessaryBtn: 'Len nevyhnutné',
                        showPreferencesBtn: 'Nastavenia'
                    },
                    preferencesModal: {
                        title: 'Nastavenia cookies',
                        acceptAllBtn: 'Prijať všetky',
                        acceptNecessaryBtn: 'Len nevyhnutné',
                        savePreferencesBtn: 'Uložiť nastavenia',
                        sections: [
                            { title: 'Nevyhnutné cookies', description: 'Potrebné na základné fungovanie webu (napr. zapamätanie tmavého režimu a tohto nastavenia cookies). Nedajú sa vypnúť.', linkedCategory: 'necessary' },
                            { title: 'Analytické cookies', description: 'Pomáhajú pochopiť, ako návštevníci web používajú (napr. Google Analytics). Spustia sa len s vaším súhlasom.', linkedCategory: 'analytics' },
                            { title: 'Viac informácií', description: 'Podrobnosti nájdete na stránke <a href="./ochrana-sukromia.html" class="cc__link">Ochrana súkromia</a>.' }
                        ]
                    }
                }
            }
        },
        onConsent: ({ cookie }) => {
            if (cookie.categories.includes('analytics')) loadGA();
        },
        onChange: ({ cookie }) => {
            if (cookie.categories.includes('analytics')) loadGA();
        }
    });
});
