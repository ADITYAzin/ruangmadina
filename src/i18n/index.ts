import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import idTranslations from "./locales/id.json";
import enTranslations from "./locales/en.json";

const savedLang = typeof window !== "undefined" ? localStorage.getItem("ruangMADINA_lang") : null;

i18n.use(initReactI18next).init({
  resources: {
    id: { translation: idTranslations },
    en: { translation: enTranslations },
  },
  lng: savedLang || "id",
  fallbackLng: "id",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
