/** Konfigurácia Tailwindu – nahrádza pôvodný `tailwind.config` z CDN verzie. */
module.exports = {
    darkMode: 'class',
    content: [
        './*.html',
        './clanky/*.html',
        './assets/*.js',
        './clanky/*.js'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
            },
            colors: {
                brand: {
                    red: '#E60000',
                    redDark: '#C80000',
                    redDeep: '#AA0000',
                    ink: '#111111',
                    body: '#333333',
                    muted: '#54595F',
                    tint: '#FFF5F5'
                }
            },
            // ===== Pohyb – spoločné hodnoty (motion tokens) =====
            // Rovnaké hodnoty sú ako CSS premenné (--duration-*, --ease-*)
            // v assets/site.css. Pri zmene upravte obe miesta.
            transitionDuration: {
                stagger: '40ms',      // odstup medzi položkami v rade
                micro: '80ms',        // krátke oneskorenie, úsek zatrasenia
                quick: '150ms',       // zatvorenie, výmena textu
                fast: '250ms',        // otvorenie, hover, akordeón
                medium: '350ms',      // zatvorenie panelu
                slow: '400ms',        // otvorenie panelu, zjavenie obsahu
                'very-slow': '500ms'  // dôrazné momenty (úspech, úvodné zjavenie)
            },
            transitionTimingFunction: {
                'smooth-out': 'cubic-bezier(0.22, 1, 0.36, 1)',  // predvolené plynulé dobiehanie
                bounce: 'cubic-bezier(0.34, 1.36, 0.64, 1)'      // jemný odraz pri zjavení
            },
            transitionProperty: {
                lift: 'transform, box-shadow, border-color'      // nadvihnutie karty
            }
        }
    },
    // Triedy, ktoré sa pridávajú až JavaScriptom – Tailwind ich musí vygenerovať
    // aj keď ich v HTML nenájde.
    safelist: [
        'bg-white/95', 'dark:bg-[#0f0f0f]/95', 'backdrop-blur', 'shadow-md',
        'bg-transparent', 'py-2', 'py-4', 'flex', 'hidden',
        'bg-green-100', 'dark:bg-green-950/50', 'text-green-700', 'dark:text-green-400',
        'bg-[#FFF5F5]', 'dark:bg-[#E60000]/10', 'text-[#AA0000]', 'dark:text-[#FF4D4D]',
        'mt-4', 'mt-5', 'text-center', 'text-sm', 'font-semibold', 'rounded-xl', 'px-4', 'py-3'
    ]
};
