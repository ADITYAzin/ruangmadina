import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { detectUserGeolocation } from "../utils/geolocation";

const STORAGE_KEY = "ruangMADINA_lang_confirmed";
const LANG_KEY = "ruangMADINA_lang";

export default function LanguageModal() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"id" | "en">("id");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const isConfirmed = localStorage.getItem(STORAGE_KEY);
    if (isConfirmed) {
      return;
    }

    // Run IP Geolocation detection
    let isMounted = true;
    detectUserGeolocation().then((res) => {
      if (!isMounted) return;
      setSelectedLang(res.lang);
      i18n.changeLanguage(res.lang);
      setIsOpen(true);
    });

    return () => {
      isMounted = false;
    };
  }, [i18n]);

  const handleConfirm = () => {
    setIsClosing(true);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem(LANG_KEY, selectedLang);
    localStorage.setItem(STORAGE_KEY, "true");

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 280);
  };

  const handleLanguageChange = (lang: "id" | "en") => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`lang-modal-backdrop ${isClosing ? "fade-out" : "fade-in"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
    >
      <div className={`lang-modal-card ${isClosing ? "scale-out" : "scale-in"}`}>
        <div className="lang-modal-header">
          <div className="lang-modal-icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="lang-modal-globe">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <h2 id="lang-modal-title" className="lang-modal-title">
            {t("modal.title")}
          </h2>
          <p className="lang-modal-subtitle">
            {t("modal.subtitle")}
          </p>
        </div>

        <div className="lang-modal-field">
          <label htmlFor="lang-select" className="lang-modal-label">
            {t("modal.selectLabel")}
          </label>
          <div className="lang-select-wrapper">
            <select
              id="lang-select"
              value={selectedLang}
              onChange={(e) => handleLanguageChange(e.target.value as "id" | "en")}
              className="lang-select-input"
            >
              <option value="id">🇮🇩 {t("modal.idOption")}</option>
              <option value="en">🇬🇧 {t("modal.enOption")}</option>
            </select>
            <div className="lang-select-chevron" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="lang-modal-btn"
        >
          <span>{t("modal.chooseBtn")}</span>
          <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
