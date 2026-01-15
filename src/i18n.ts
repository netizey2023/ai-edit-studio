import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    // load translation using http -> see /public/locales
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        lng: 'en', // Force English as default
        fallbackLng: 'en',
        debug: true, // Set to false in production

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        // We will use standard language codes: 'en', 'pt-BR', 'es'
        supportedLngs: ['en', 'pt-BR', 'es'],

        // Path to load resources relative to public folder (or source if configured differently, but backend typically looks in public)
        // Vite serves public folder at root in dev. 
        // We will place json files in public/locales for i18next-http-backend to work naturally without custom import logic
        backend: {
            loadPath: '/locales/{{lng}}.json',
        }
    });

export default i18n;
