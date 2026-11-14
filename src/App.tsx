import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageModal from "./components/LanguageModal";
import LanguageSwitcher from "./components/LanguageSwitcher";

const heroImage =
  "https://images.unsplash.com/photo-1760067538612-c0ecd3bc3d3a?auto=format&fit=crop&w=2000&q=88";

const projectMetadata = [
  {
    image:
      "https://images.unsplash.com/photo-1771888703722-ee7ad9143a67?auto=format&fit=crop&w=1100&q=85",
    className: "project-wide",
  },
  {
    image:
      "https://images.unsplash.com/photo-1760067538299-3f58e7a99fc5?auto=format&fit=crop&w=900&q=85",
    className: "project-tall",
  },
  {
    image:
      "https://images.unsplash.com/photo-1752407828514-660d6945d392?auto=format&fit=crop&w=900&q=85",
    className: "",
  },
];

interface ServiceItem {
  number: string;
  title: string;
  basis: string;
  basisNote: string;
  tiers?: { name: string; price: string }[];
  customPrices?: [
    { title: string; price: string; unit: string },
    { title: string; desc: string },
  ];
  designPrices?: {
    rooms: { label: string; price: string }[];
    areaPackages: string[];
    areaDesc: string;
  };
  exampleLabel: string;
  exampleText: string;
  scope: string;
  cta: string;
  waQuery: string;
}

interface ProjectItem {
  title: string;
  category: string;
  place: string;
}

interface StepItem {
  number: string;
  title: string;
  text: string;
}

interface PrincipleItem {
  icon: string;
  title: string;
  text: string;
}

function ArchLogo({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#top" aria-label="Ruang Madina">
      <svg viewBox="0 0 42 46" aria-hidden="true">
        <path d="M5 42V21C5 11.6 12.2 4 21 4s16 7.6 16 17v21" />
        <path d="M15 42V16h7.2c6.1 0 9.8 2.9 9.8 8 0 4-2.7 6.7-7.1 7.5L34 42" />
      </svg>
      <span>
        <strong>RUANG</strong>
        <em>Madina</em>
      </span>
    </a>
  );
}

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg className={down ? "arrow down" : "arrow"} viewBox="0 0 24 24" aria-hidden="true">
      <path d={down ? "M12 4v15M6 13l6 6 6-6" : "M5 12h14M13 6l6 6-6 6"} />
    </svg>
  );
}

function PrincipleIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    path: (
      <>
        <path d="M8 29c7-1 9-6 9-13 0-5 5-8 11-7" />
        <path d="M18 31c7-5 11-10 12-18" />
      </>
    ),
    layers: (
      <>
        <path d="m5 13 15-8 15 8-15 8-15-8Z" />
        <path d="m7 20 13 7 13-7M7 27l13 7 13-7" />
      </>
    ),
    screen: (
      <>
        <path d="M8 35V5h21v30M13 11h11M13 17h11M13 23h11" />
        <path d="M29 10h5v25" />
      </>
    ),
    drop: (
      <>
        <path d="M20 5S10 17 10 24a10 10 0 0 0 20 0C30 17 20 5 20 5Z" />
        <path d="M17 29c-2-1-3-3-3-5" />
      </>
    ),
    sun: (
      <>
        <circle cx="20" cy="20" r="7" />
        <path d="M20 3v5M20 32v5M3 20h5M32 20h5M8 8l4 4M28 28l4 4M32 8l-4 4M12 28l-4 4" />
      </>
    ),
  };
  return (
    <svg className="principle-icon" viewBox="0 0 40 40" aria-hidden="true">
      {paths[type] || paths.path}
    </svg>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [length, setLength] = useState(4);

  const waBaseUrl = "https://wa.me/628113330232";
  const defaultWaQuery = t("calculator.waQueryDefault");
  const mainWhatsappUrl = `${waBaseUrl}?text=${encodeURIComponent(defaultWaQuery)}`;

  const dynamicWaQuery = length
    ? t("calculator.waQueryWithLength", { length })
    : defaultWaQuery;
  const calculatorWhatsappUrl = `${waBaseUrl}?text=${encodeURIComponent(dynamicWaQuery)}`;

  const closeMenu = () => setMenuOpen(false);

  const rawProjects = t("projects.items", { returnObjects: true });
  const projectList: ProjectItem[] = Array.isArray(rawProjects) ? (rawProjects as ProjectItem[]) : [];

  const rawSteps = t("process.steps", { returnObjects: true });
  const stepsList: StepItem[] = Array.isArray(rawSteps) ? (rawSteps as StepItem[]) : [];

  const rawPrinciples = t("principles.items", { returnObjects: true });
  const principlesList: PrincipleItem[] = Array.isArray(rawPrinciples)
    ? (rawPrinciples as PrincipleItem[])
    : [];

  const rawServices = t("services.items", { returnObjects: true });
  const servicesList: ServiceItem[] = Array.isArray(rawServices) ? (rawServices as ServiceItem[]) : [];

  return (
    <main id="top">
      {/* First-visit IP Geolocation Language Popup Modal */}
      <LanguageModal />

      <header className="nav-wrap">
        <nav className="nav shell" aria-label="Navigasi utama">
          <ArchLogo />
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#karya" onClick={closeMenu}>
              {t("nav.works")}
            </a>
            <a href="#cara-kerja" onClick={closeMenu}>
              {t("nav.process")}
            </a>
            <a href="#layanan" onClick={closeMenu}>
              {t("nav.services")}
            </a>
            <a href="#tentang" onClick={closeMenu}>
              {t("nav.about")}
            </a>
            <div className="nav-desktop-lang">
              <LanguageSwitcher />
            </div>
            <a
              className="nav-cta"
              href={mainWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              {t("nav.consultation")} <Arrow />
            </a>
          </div>
          <div className="nav-mobile-right">
            <div className="nav-mobile-lang">
              <LanguageSwitcher />
            </div>
            <button
              className={`menu-button ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t("nav.openMenu")}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <section className="hero">
        <img
          src={heroImage}
          alt="Interior ruang keluarga hangat dengan material kayu dan cahaya alami"
        />
        <div className="hero-overlay" />
        <div className="hero-content shell">
          <p className="eyebrow light">{t("hero.eyebrow")}</p>
          <h1>{t("hero.title")}</h1>
          <p className="hero-copy">{t("hero.copy")}</p>
          <a className="primary-button" href={mainWhatsappUrl} target="_blank" rel="noreferrer">
            {t("hero.cta")} <Arrow />
          </a>
        </div>
        <a className="scroll-hint" href="#trust">
          <span>{t("hero.scrollHint")}</span>
          <Arrow down />
        </a>
      </section>

      <section className="trust-bar" id="trust">
        <div className="shell trust-grid">
          <div className="trust-parent">
            <span className="mini-arch">R</span>
            <p>
              {t("trust.partOf")} <strong>Madina Build</strong>
              <br />
              <small>{t("trust.company")}</small>
            </p>
          </div>
          <div className="trust-divider" />
          <div>
            <b>{t("trust.locationTitle")}</b>
            <span>{t("trust.locationSub")}</span>
          </div>
          <div>
            <b>{t("trust.processTitle")}</b>
            <span>{t("trust.processSub")}</span>
          </div>
          <div>
            <b>{t("trust.customTitle")}</b>
            <span>{t("trust.customSub")}</span>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="karya">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">{t("projects.eyebrow")}</p>
              <h2>
                {t("projects.title")}
                <br />
                <i>{t("projects.titleEmphasis")}</i>
              </h2>
            </div>
            <p>{t("projects.desc")}</p>
          </div>
          <div className="project-grid">
            {projectList.map((project, idx) => {
              const meta = projectMetadata[idx] || projectMetadata[0];
              const projectWa = `${waBaseUrl}?text=${encodeURIComponent(
                t("projects.askProject", { title: project.title })
              )}`;
              return (
                <article className={`project-card ${meta.className}`} key={project.title}>
                  <img src={meta.image} alt={project.title} />
                  <div className="project-shade" />
                  <div className="project-meta">
                    <span>
                      {project.category} · {project.place}
                    </span>
                    <h3>{project.title}</h3>
                    <a
                      href={projectWa}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("projects.askProject", { title: project.title })}
                    >
                      <Arrow />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="photo-note">{t("projects.photoNote")}</p>
        </div>
      </section>

      <section className="section process-section" id="cara-kerja">
        <div className="shell">
          <div className="process-intro">
            <p className="eyebrow">{t("process.eyebrow")}</p>
            <h2>
              {t("process.title")}
              <br />
              <i>{t("process.titleEmphasis")}</i>
            </h2>
            <p>{t("process.desc")}</p>
          </div>
          <div className="steps-grid">
            {stepsList.map((step) => (
              <article className="step-card" key={step.number}>
                <span>{step.number}</span>
                <div className="step-line" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section principles-section">
        <div className="shell">
          <div className="principles-top">
            <p className="eyebrow light">{t("principles.eyebrow")}</p>
            <p className="principles-kicker">{t("principles.kicker")}</p>
            <h2>
              {t("principles.title")}
              <br />
              {t("principles.titleLine2")}
              <br />
              {t("principles.titleLine3")}{" "}
              <i>{t("principles.titleEmphasis")}</i>
            </h2>
          </div>
          <div className="principles-list">
            {principlesList.map((principle, index) => (
              <article key={principle.title}>
                <span>0{index + 1}</span>
                <PrincipleIcon type={principle.icon} />
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-section" id="layanan">
        <div className="shell">
          <div className="section-heading centered">
            <p className="eyebrow">{t("services.eyebrow")}</p>
            <h2>
              {t("services.title")}
              <br />
              <i>{t("services.titleEmphasis")}</i>
            </h2>
            <p>{t("services.desc")}</p>
          </div>
          <div className="service-grid">
            {servicesList.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <div className="service-badge">
                    <span className="service-number">{service.number}</span>
                    <span className="service-tag">{t("services.serviceTag")}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <div className="service-basis-wrap">
                    <strong className="service-basis">{service.basis}</strong>
                    <span className="service-basis-note">{service.basisNote}</span>
                  </div>
                </div>

                <div className="service-card-body">
                  {service.tiers && (
                    <div className="service-price-list">
                      {service.tiers.map((tier) => (
                        <div className="price-row" key={tier.name}>
                          <span className="price-name">{tier.name}</span>
                          <span className="price-dots" />
                          <span className="price-val">{tier.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.customPrices && (
                    <div className="service-custom-pricing">
                      <div className="custom-price-featured">
                        <span className="custom-item-name">{service.customPrices[0].title}</span>
                        <div className="custom-price-highlight">
                          <span className="price-val">{service.customPrices[0].price}</span>
                          <span className="custom-unit">/ {service.customPrices[0].unit}</span>
                        </div>
                      </div>
                      <div className="custom-other-box">
                        <span className="custom-item-name">{service.customPrices[1].title}</span>
                        <p className="custom-desc">{service.customPrices[1].desc}</p>
                      </div>
                    </div>
                  )}

                  {service.designPrices && (
                    <div className="service-design-pricing">
                      <div className="design-subgroup">
                        <span className="design-label">{t("services.byRoom")}</span>
                        <div className="design-rows">
                          {service.designPrices.rooms.map((room) => (
                            <div className="price-row" key={room.label}>
                              <span className="price-name">{room.label}</span>
                              <span className="price-dots" />
                              <span className="price-val">{room.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="design-subgroup">
                        <span className="design-label">{t("services.byArea")}</span>
                        <div className="design-tags">
                          {service.designPrices.areaPackages.map((pkg) => (
                            <span key={pkg} className="design-tag">
                              {pkg}
                            </span>
                          ))}
                        </div>
                        <span className="design-subnote">{service.designPrices.areaDesc}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="service-card-bottom">
                  <div className="service-note-box">
                    <p className="note-example">
                      <b>{service.exampleLabel}:</b> {service.exampleText}
                    </p>
                    <p className="note-scope">{service.scope}</p>
                  </div>
                  <a
                    className="service-card-action"
                    href={`${waBaseUrl}?text=${encodeURIComponent(service.waQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{service.cta}</span>
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="calculator">
            <div className="calculator-copy">
              <p className="eyebrow light">{t("calculator.eyebrow")}</p>
              <h3>
                {t("calculator.heading")}
                <br />
                <i>{length} {t("calculator.unit")}</i>
              </h3>
              <p>{t("calculator.desc")}</p>
            </div>
            <div className="calculator-control">
              <div className="range-labels">
                <span>2 m</span>
                <strong>{length} m</strong>
                <span>8 m</span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                step="0.5"
                value={length}
                onChange={(event) => setLength(Number(event.target.value))}
                aria-label={t("calculator.ariaLabel")}
              />
              <a className="light-button" href={calculatorWhatsappUrl} target="_blank" rel="noreferrer">
                {t("calculator.cta")} <Arrow />
              </a>
            </div>
          </div>
          <p className="estimate-note">{t("calculator.note")}</p>
        </div>
      </section>

      <section className="section about-section" id="tentang">
        <div className="shell about-grid">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1765371514331-9d4e3228eed9?auto=format&fit=crop&w=1100&q=85"
              alt="Detail kabinet kayu yang hangat dan presisi"
            />
            <span>
              {t("about.badge1")}
              <br />
              {t("about.badge2")}
            </span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">{t("about.eyebrow")}</p>
            <h2>
              {t("about.title")}
              <br />
              <i>{t("about.titleEmphasis")}</i>
            </h2>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <a href="https://Madinabuild.com" target="_blank" rel="noreferrer">
              {t("about.cta")} <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="closing-pattern" />
        <div className="shell closing-content">
          <p className="eyebrow light">{t("closing.eyebrow")}</p>
          <h2>
            {t("closing.title")}
            <br />
            {t("closing.titleLine2")}{" "}
            <i>{t("closing.titleEmphasis")}</i>
          </h2>
          <p>{t("closing.desc")}</p>
          <a className="primary-button" href={mainWhatsappUrl} target="_blank" rel="noreferrer">
            {t("closing.cta")} <Arrow />
          </a>
          <small>{t("closing.note")}</small>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <ArchLogo light />
            <p>{t("footer.tagline")}</p>
          </div>
          <div>
            <p className="footer-label">{t("footer.explore")}</p>
            <a href="#karya">{t("nav.works")}</a>
            <a href="#cara-kerja">{t("nav.process")}</a>
            <a href="#layanan">{t("nav.services")}</a>
            <a href="#tentang">{t("nav.about")}</a>
          </div>
          <div>
            <p className="footer-label">{t("footer.contact")}</p>
            <a href={mainWhatsappUrl} target="_blank" rel="noreferrer">
              {t("footer.whatsappLabel")}
            </a>
            <span>{t("footer.city")}</span>
            <span>{t("footer.workingHours")}</span>
          </div>
          <div>
            <p className="footer-label">{t("footer.connect")}</p>
            <a href="https://Madinabuild.com" target="_blank" rel="noreferrer">
              Madinabuild.com
            </a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
          <span>{t("footer.brandLocation")}</span>
          <a href="#top">{t("footer.backToTop")}</a>
        </div>
      </footer>
    </main>
  );
}
