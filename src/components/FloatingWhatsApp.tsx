import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface WaCategory {
  id: string;
  label: string;
}

interface WaTopic {
  id: string;
  title: string;
  desc: string;
  waTemplate: string;
}

interface FloatingWhatsAppProps {
  onOpenCalculator?: (categoryId: string) => void;
}

const WA_BASE_URL = "https://wa.me/628113330232";

export default function FloatingWhatsApp({ onOpenCalculator }: FloatingWhatsAppProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<string>("residential");
  const containerRef = useRef<HTMLDivElement>(null);

  const rawCategories = t("floatingWa.categories", { returnObjects: true });
  const categories: WaCategory[] = Array.isArray(rawCategories)
    ? (rawCategories as WaCategory[])
    : [];

  const rawTopics = t("floatingWa.topics", { returnObjects: true });
  const topics: WaTopic[] = Array.isArray(rawTopics) ? (rawTopics as WaTopic[]) : [];

  const activeCategory =
    categories.find((c) => c.id === selectedCatId) ||
    categories[0] || { id: "residential", label: "Residential" };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const buildWaUrl = (template: string) => {
    const message = template.replace("{{category}}", activeCategory.label);
    return `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;
  };

  const directWaUrl = buildWaUrl(t("floatingWa.directQuery"));

  return (
    <div className={`fwa-root ${isOpen ? "is-open" : ""}`} ref={containerRef}>
      <div
        className={`fwa-panel ${isOpen ? "is-visible" : ""}`}
        role="dialog"
        aria-label={t("floatingWa.eyebrow")}
        aria-hidden={!isOpen}
      >
        <div className="fwa-header">
          <div className="fwa-header-top">
            <span className="fwa-eyebrow">
              <span className="fwa-status-dot" aria-hidden="true" />
              {t("floatingWa.eyebrow")}
            </span>
            <button
              type="button"
              className="fwa-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label={t("floatingWa.ariaClose")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h3 className="fwa-title">{t("floatingWa.title")}</h3>
        </div>

        <div className="fwa-body">
          <div className="fwa-step-group">
            <span className="fwa-step-label">{t("floatingWa.categoryLabel")}</span>
            <div className="fwa-cat-pills" role="tablist" aria-label={t("floatingWa.categoryLabel")}>
              {categories.map((cat) => {
                const isActive = cat.id === activeCategory.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`fwa-cat-pill ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedCatId(cat.id)}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="fwa-step-group">
            <span className="fwa-step-label">{t("floatingWa.topicLabel")}</span>
            <div className="fwa-topic-list">
              {topics.map((topic) => {
                if (topic.id === "estimate" && onOpenCalculator) {
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      className="fwa-topic-item"
                      onClick={() => {
                        setIsOpen(false);
                        onOpenCalculator(activeCategory.id);
                      }}
                    >
                      <div className="fwa-topic-copy">
                        <div className="fwa-topic-head">
                          <strong>{topic.title}</strong>
                        </div>
                        <p>{topic.desc}</p>
                      </div>
                      <svg className="fwa-topic-arrow" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  );
                }

                return (
                  <a
                    key={topic.id}
                    href={buildWaUrl(topic.waTemplate)}
                    target="_blank"
                    rel="noreferrer"
                    className="fwa-topic-item"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="fwa-topic-copy">
                      <div className="fwa-topic-head">
                        <strong>{topic.title}</strong>
                      </div>
                      <p>{topic.desc}</p>
                    </div>
                    <svg className="fwa-topic-arrow" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="fwa-footer">
          <a
            href={directWaUrl}
            target="_blank"
            rel="noreferrer"
            className="fwa-direct-link"
            onClick={() => setIsOpen(false)}
          >
            <span>{t("floatingWa.directCta")}</span>
            <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>

      <button
        type="button"
        className={`fwa-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? t("floatingWa.ariaClose") : t("floatingWa.ariaOpen")}
        aria-expanded={isOpen}
      >
        <span className="fwa-trigger-icon" aria-hidden="true">
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="fwa-icon-close">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="fwa-icon-wa">
              <path
                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.78 14.07c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.97-.31-1.66-.61-2.92-1.26-4.83-4.21-4.97-4.4-.15-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.58.82 2.01.89 2.16.07.15.12.32.02.51-.1.19-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.15.49.22.56.34.07.12.07.7-.17 1.38Z"
                fill="currentColor"
              />
            </svg>
          )}
        </span>
        <span className="fwa-trigger-text">{t("floatingWa.triggerLabel")}</span>
        <span className="fwa-trigger-dot" aria-hidden="true" />
      </button>
    </div>
  );
}

