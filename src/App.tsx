import { useState } from "react";
import { useTranslation } from "react-i18next";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import LanguageModal from "./components/LanguageModal";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { buildWhatsAppUrl, trackMetaEvent, trackWhatsAppLead } from "./utils/metaPixel";

const heroImage = "/livingroom.webp";

const projectMetadata = [
  {
    image: "/4.webp",
    className: "project-wide",
  },
  {
    image: "/3.webp",
    className: "project-tall",
  },
  {
    image: "/1.webp",
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

interface SectorItem {
  id: string;
  tag?: string;
  title: string;
  desc: string;
  tags?: string[];
  image: string;
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

interface CraftCardItem {
  tag: string;
  title: string;
}

const craftImages = ["/person-rm.webp", "/dpk-2.webp", "/2.webp"];

function ArchLogo({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#top" aria-label="RUANG MADINA">
      <img
        className="brand-logo"
        src="/logo.webp"
        alt="RUANG MADINA"
        width={30}
        height={36}
      />
      <span>
        <strong>RUANG</strong>
        <em>MADINA</em>
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

interface OptionItem {
  id: string;
  label: string;
}

export default function App() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [length, setLength] = useState(4);
  const [activeServiceTab, setActiveServiceTab] = useState<"services" | "calculator">("services");
  const [estSpace, setEstSpace] = useState<string>("residential");
  const [estNeed, setEstNeed] = useState<string>("kitchen");
  const [estKitchenConfig, setEstKitchenConfig] = useState<string>("both");
  const [estScaleIdx, setEstScaleIdx] = useState<number>(0);
  const [estTierIdx, setEstTierIdx] = useState<number>(0);

  const waBaseUrl = "https://wa.me/628113330232";
  const defaultWaQuery = t("calculator.waQueryDefault");
  const mainWhatsappUrl = buildWhatsAppUrl(waBaseUrl, defaultWaQuery);

  const closeMenu = () => setMenuOpen(false);

  const rawSpaces = t("estimator.spaces", { returnObjects: true });
  const estSpaces: OptionItem[] = Array.isArray(rawSpaces) ? (rawSpaces as OptionItem[]) : [];

  const rawNeeds = t("estimator.needs", { returnObjects: true });
  const estNeeds: OptionItem[] = Array.isArray(rawNeeds) ? (rawNeeds as OptionItem[]) : [];

  const rawKitchenConfigs = t("estimator.kitchenConfig", { returnObjects: true });
  const estKitchenConfigs: OptionItem[] = Array.isArray(rawKitchenConfigs)
    ? (rawKitchenConfigs as OptionItem[])
    : [];

  const rawUnitOptions = t("estimator.unitOptions", { returnObjects: true });
  const unitOptions: string[] = Array.isArray(rawUnitOptions) ? (rawUnitOptions as string[]) : [];

  const rawRoomOptions = t("estimator.roomOptions", { returnObjects: true });
  const roomOptions: string[] = Array.isArray(rawRoomOptions) ? (rawRoomOptions as string[]) : [];

  const rawTiers = t("estimator.tiers", { returnObjects: true });
  const tierOptions: string[] = Array.isArray(rawTiers) ? (rawTiers as string[]) : [];

  const selectedSpaceLabel =
    estSpaces.find((item) => item.id === estSpace)?.label || estSpaces[0]?.label || "Residential";
  const selectedNeedLabel =
    estNeeds.find((item) => item.id === estNeed)?.label || estNeeds[0]?.label || "Kitchen Set";
  const selectedKitchenConfigLabel =
    estKitchenConfigs.find((item) => item.id === estKitchenConfig)?.label || "";

  let selectedScaleLabel = "";
  if (estNeed === "kitchen") {
    selectedScaleLabel = `${length} m (${selectedKitchenConfigLabel})`;
  } else if (estNeed === "furniture") {
    selectedScaleLabel = unitOptions[estScaleIdx] || unitOptions[0] || "";
  } else {
    selectedScaleLabel = roomOptions[estScaleIdx] || roomOptions[0] || "";
  }

  const selectedTierLabel = tierOptions[estTierIdx] || tierOptions[0] || "";

  const estimatorWaQuery = t("estimator.waMessage", {
    space: selectedSpaceLabel,
    need: selectedNeedLabel,
    scale: selectedScaleLabel,
    tier: selectedTierLabel,
  });
  const estimatorWhatsappUrl = buildWhatsAppUrl(waBaseUrl, estimatorWaQuery);

  const openCalculatorTab = () => {
    setActiveServiceTab("calculator");
    trackMetaEvent("ViewContent", { content_name: "estimator_calculator" });
  };

  const handleOpenCalculatorFromWa = (categoryId: string) => {
    if (estSpaces.some((item) => item.id === categoryId)) {
      setEstSpace(categoryId);
    }
    openCalculatorTab();
    document.getElementById("layanan")?.scrollIntoView({ behavior: "smooth" });
  };

  const rawProjects = t("projects.items", { returnObjects: true });
  const projectList: ProjectItem[] = Array.isArray(rawProjects) ? (rawProjects as ProjectItem[]) : [];

  const rawSteps = t("process.steps", { returnObjects: true });
  const stepsList: StepItem[] = Array.isArray(rawSteps) ? (rawSteps as StepItem[]) : [];

  const rawPrinciples = t("principles.items", { returnObjects: true });
  const principlesList: PrincipleItem[] = Array.isArray(rawPrinciples)
    ? (rawPrinciples as PrincipleItem[])
    : [];

  const rawSectors = t("sectors.items", { returnObjects: true });
  const sectorsList: SectorItem[] = Array.isArray(rawSectors)
    ? (rawSectors as SectorItem[])
    : [];

  const rawServices = t("services.items", { returnObjects: true });
  const servicesList: ServiceItem[] = Array.isArray(rawServices) ? (rawServices as ServiceItem[]) : [];

  const rawCraftCards = t("craft.cards", { returnObjects: true });
  const craftCardsList: CraftCardItem[] = Array.isArray(rawCraftCards)
    ? (rawCraftCards as CraftCardItem[])
    : [];

  return (
    <main id="top">
      {/* First-visit IP Geolocation Language Popup Modal */}
      <LanguageModal />

      <header className="nav-wrap">
        <nav className="nav shell" aria-label="Navigasi utama">
          <ArchLogo />
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#sektor" onClick={closeMenu}>
              {t("nav.sectors")}
            </a>
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
              onClick={() => {
                closeMenu();
                trackWhatsAppLead({ source: "nav_cta" });
              }}
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
          fetchPriority="high"
        />
        <div className="hero-overlay" />
        <div className="hero-content shell">
          <p className="eyebrow light">{t("hero.eyebrow")}</p>
          <h1>{t("hero.title")}</h1>
          <p className="hero-copy">{t("hero.copy")}</p>
          <a
            className="primary-button"
            href={mainWhatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWhatsAppLead({ source: "hero_cta" })}
          >
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
            <img
              className="trust-parent-logo"
              src="/madina-build-logo.webp"
              alt="Madina Build"
              width={96}
              height={96}
            />
            <p>
              {t("trust.partOf")} <strong>Madina Build</strong>
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

      <section className="section sectors-section" id="sektor">
        <div className="shell">
          <div className="section-heading centered">
            <p className="eyebrow">{t("sectors.eyebrow")}</p>
            <h2>
              {t("sectors.title")}
              <br />
              <i>{t("sectors.titleEmphasis")}</i>
            </h2>
            <p>{t("sectors.desc")}</p>
          </div>
          <div className="sectors-grid">
            {sectorsList.map((sector) => (
              <article className="sector-card" key={sector.id}>
                <img src={sector.image} alt={sector.title} loading="lazy" />
                <div className="sector-shade" />
                <div className="sector-meta">
                  <h3>{sector.title}</h3>
                  <a
                    className="sector-action"
                    href={buildWhatsAppUrl(waBaseUrl, sector.waQuery)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackWhatsAppLead({
                        source: `sector_${sector.id}`,
                        category: sector.id,
                      })
                    }
                  >
                    <span>{sector.cta}</span>
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
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
              return (
                <article className={`project-card ${meta.className}`} key={project.title}>
                  <img src={meta.image} alt={project.title} />
                  <div className="project-shade" />
                  <div className="project-meta">
                    <span>
                      {project.category}
                    </span>
                    <h3>{project.title}</h3>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="photo-note">{t("projects.photoNote")}</p>
        </div>
      </section>

      <section className="section craft-section" id="dibalik-pengerjaan">
        <div className="shell">
          <div className="craft-header">
            <p className="eyebrow">{t("craft.eyebrow")}</p>
            <h2>
              {t("craft.title")} <i>{t("craft.titleEmphasis")}</i>
            </h2>
          </div>

          <div className="craft-grid">
            {craftCardsList.map((card, idx) => (
              <article className="craft-card" key={card.title}>
                <img
                  src={craftImages[idx] || craftImages[0]}
                  alt={card.title}
                  loading="lazy"
                />
                <div className="craft-shade" />
                <div className="craft-meta">
                  <span>{card.tag}</span>
                  <h3>{card.title}</h3>
                </div>
              </article>
            ))}
          </div>
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

          <div className="services-tabs" role="tablist" aria-label={t("services.eyebrow")}>
            <button
              type="button"
              role="tab"
              aria-selected={activeServiceTab === "services"}
              className={`services-tab ${activeServiceTab === "services" ? "active" : ""}`}
              onClick={() => setActiveServiceTab("services")}
            >
              {t("estimator.tabServices")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeServiceTab === "calculator"}
              className={`services-tab ${activeServiceTab === "calculator" ? "active" : ""}`}
              onClick={openCalculatorTab}
            >
              {t("estimator.tabCalculator")}
            </button>
          </div>

          {activeServiceTab === "services" ? (
            <>
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
                        href={buildWhatsAppUrl(waBaseUrl, service.waQuery)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          trackWhatsAppLead({
                            source: `service_${service.number}`,
                            category: service.title,
                          })
                        }
                      >
                        <span>{service.cta}</span>
                        <Arrow />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              <div className="services-bridge">
                <span>{t("estimator.bridgeText")}</span>
                <button
                  type="button"
                  className="services-bridge-btn"
                  onClick={openCalculatorTab}
                >
                  <span>{t("estimator.bridgeCta")}</span>
                  <Arrow />
                </button>
              </div>
            </>
          ) : (
            <div className="estimator-card">
              <div className="estimator-info">
                <h3>{t("estimator.title")}</h3>
                <p>{t("estimator.subtitle")}</p>
                <a
                  className="primary-button estimator-cta"
                  href={estimatorWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackWhatsAppLead({
                      source: "estimator_calculator",
                      category: estSpace,
                      intentTier: "high",
                      detail: `${estNeed} | ${selectedScaleLabel} | ${selectedTierLabel}`,
                    })
                  }
                >
                  <span>{t("estimator.cta")}</span>
                  <Arrow />
                </a>
              </div>

              <div className="estimator-controls">
                <div className="estimator-group">
                  <span className="estimator-label">{t("estimator.spaceLabel")}</span>
                  <div className="estimator-pills">
                    {estSpaces.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`estimator-pill ${estSpace === item.id ? "active" : ""}`}
                        onClick={() => setEstSpace(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="estimator-group">
                  <span className="estimator-label">{t("estimator.needLabel")}</span>
                  <div className="estimator-pills">
                    {estNeeds.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`estimator-pill ${estNeed === item.id ? "active" : ""}`}
                        onClick={() => {
                          setEstNeed(item.id);
                          setEstScaleIdx(0);
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="estimator-group">
                  <span className="estimator-label">{t("estimator.scaleLabel")}</span>
                  {estNeed === "kitchen" ? (
                    <div className="estimator-kitchen-scale">
                      <div className="estimator-slider-row">
                        <input
                          type="range"
                          min="2"
                          max="8"
                          step="0.5"
                          value={length}
                          onChange={(event) => setLength(Number(event.target.value))}
                          aria-label={t("calculator.ariaLabel")}
                        />
                        <strong className="estimator-length-val">{length} m</strong>
                      </div>
                      <div className="estimator-pills">
                        {estKitchenConfigs.map((cfg) => (
                          <button
                            key={cfg.id}
                            type="button"
                            className={`estimator-pill ${estKitchenConfig === cfg.id ? "active" : ""}`}
                            onClick={() => setEstKitchenConfig(cfg.id)}
                          >
                            {cfg.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="estimator-pills">
                      {(estNeed === "furniture" ? unitOptions : roomOptions).map((opt, idx) => (
                        <button
                          key={opt}
                          type="button"
                          className={`estimator-pill ${estScaleIdx === idx ? "active" : ""}`}
                          onClick={() => setEstScaleIdx(idx)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="estimator-group">
                  <span className="estimator-label">{t("estimator.tierLabel")}</span>
                  <div className="estimator-pills">
                    {tierOptions.map((tier, idx) => (
                      <button
                        key={tier}
                        type="button"
                        className={`estimator-pill ${estTierIdx === idx ? "active" : ""}`}
                        onClick={() => setEstTierIdx(idx)}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section about-section" id="tentang">
        <div className="shell about-grid">
          <div className="about-image">
            <img
              src="/person-rm.webp"
              alt="Detail kabinet kayu yang hangat dan presisi"
              loading="lazy"
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
            <a href="https://madinabuild.com" target="_blank" rel="noreferrer">
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
          <a
            className="primary-button"
            href={mainWhatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWhatsAppLead({ source: "closing_cta" })}
          >
            {t("closing.cta")} <Arrow />
          </a>
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
            <a href="#sektor">{t("nav.sectors")}</a>
            <a href="#karya">{t("nav.works")}</a>
            <a href="#cara-kerja">{t("nav.process")}</a>
            <a href="#layanan">{t("nav.services")}</a>
            <a href="#tentang">{t("nav.about")}</a>
          </div>
          <div>
            <p className="footer-label">{t("footer.contact")}</p>
            <a
              href={mainWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppLead({ source: "footer_wa" })}
            >
              {t("footer.whatsappLabel")}
            </a>
            <span>{t("footer.city")}</span>
            <span>{t("footer.workingHours")}</span>
          </div>
          <div>
            <p className="footer-label">{t("footer.connect")}</p>
            <a href="https://madinabuild.com" target="_blank" rel="noreferrer">
              madinabuild.com
            </a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
          <span>{t("footer.brandLocation")}</span>
          <a href="#top">{t("footer.backToTop")}</a>
        </div>
      </footer>

      <FloatingWhatsApp onOpenCalculator={handleOpenCalculatorFromWa} />
    </main>
  );
}
