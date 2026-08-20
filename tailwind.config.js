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
