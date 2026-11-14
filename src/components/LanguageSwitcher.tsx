import { useTranslation } from "react-i18next";

const LANG_KEY = "ruangmadina_lang";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "id").startsWith("en") ? "en" : "id";

  const setLanguage = (lang: "id" | "en") => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);
  };

  return (
    <div className="nav-lang-switcher" aria-label="Language selector">
      <button
        type="button"
        className={`lang-btn ${currentLang === "id" ? "active" : ""}`}
        onClick={() => setLanguage("id")}
        aria-pressed={currentLang === "id"}
      >
        ID
      </button>
      <span className="lang-divider">/</span>
      <button
        type="button"
        className={`lang-btn ${currentLang === "en" ? "active" : ""}`}
        onClick={() => setLanguage("en")}
        aria-pressed={currentLang === "en"}
      >
        EN
      </button>
    </div>
  );
}
