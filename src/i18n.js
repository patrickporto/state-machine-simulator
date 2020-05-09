import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LANGUAGES } from "./settings";

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: "en-US",
        debug: true,
        ns: ["translations"],
        defaultNS: "translations",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: LANGUAGES.reduce((current, lang) => {
            return {
                ...current,
                [lang]: require(`../i18n/${lang}.js`).default,
            };
        }, {}),
        react: {
            wait: true,
        },
    });

export default i18n;
