
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AboutArcGallery from "./components/AboutArcGallery";
import ArcGallery, { type ArcGalleryItem } from "./components/ArcGallery";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import LanguageModal from "./components/LanguageModal";
import LanguageSwitcher from "./components/LanguageSwitcher";
import LiteYouTube from "./components/LiteYouTube";
import { buildWhatsAppUrl, trackMetaEvent, trackWhatsAppLead } from "./utils/metaPixel";

const heroImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";

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

const craftImages = ["/person-rm.webp", "/dpk-2.webp", "/rapi-hingga-terpasang.webp"];

const designWorkItems: ArcGalleryItem[] = [
  { id: "di-1", image: "/di-1.webp", alt: "Desain interior Ruang Madina 01" },
  { id: "fk-1", image: "/fk-1.webp", alt: "Desain furnitur kustom Ruang Madina 01" },
  { id: "fk-2", image: "/fk-2.webp", alt: "Desain furnitur kustom Ruang Madina 02" },
  { id: "di-2", image: "/di-2.webp", alt: "Desain interior Ruang Madina 02" },
  { id: "fk-3", image: "/fk-3.webp", alt: "Desain furnitur kustom Ruang Madina 03" },
  { id: "fk-4", image: "/fk-4.webp", alt: "Desain furnitur kustom Ruang Madina 04" },
  { id: "di-3", image: "/di-3.webp", alt: "Desain interior Ruang Madina 03" },
  { id: "fk-5", image: "/fk-5.webp", alt: "Desain furnitur kustom Ruang Madina 05" },
  { id: "fk-6", image: "/fk-6.webp", alt: "Desain furnitur kustom Ruang Madina 06" },
  { id: "fk-7", image: "/fk-7.webp", alt: "Desain furnitur kustom Ruang Madina 07" },
];

const serviceImages = ["/4.webp", "/1.webp", "/2.webp"];

const testimonialVideoIds = [
  "EUW6GfB0i0E",
  "2kITp9tJSZg",
  "BFrOG7luKBE",
  "7YxHoKJ72XQ",
];

interface TestimonialItem {
  label: string;
  title: string;
}

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
    <svg
      className={down ? "arrow down" : "arrow"}
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
        {/* Shield with certified check / material grain - symbol of verified high quality & durable material */}
        <path d="M20 4s11 3 11 13c0 9-7 16-11 19C16 33 9 26 9 17c0-10 11-13 11-13Z" />
        <path d="m15 19 3.5 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
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
  const [navScrolled, setNavScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeNav, setActiveNav] = useState("sektor");
  const [length, setLength] = useState("");
  const [upperArea, setUpperArea] = useState("");
  const [customUnitCount, setCustomUnitCount] = useState("");
  const [designScopes, setDesignScopes] = useState<string[]>(["room"]);
  const [designRoomCount, setDesignRoomCount] = useState("");
  const [designBuildingCount, setDesignBuildingCount] = useState("");
  const [activeServiceTab, setActiveServiceTab] = useState<"services" | "calculator">("services");
  const [estSpace, setEstSpace] = useState<string>("residential");
  const [estNeed, setEstNeed] = useState<string>("kitchen");
  const [estKitchenConfig, setEstKitchenConfig] = useState<string>("both");
  const [estScaleIdx, setEstScaleIdx] = useState<number>(0);
  const [requestSurveyDirect, setRequestSurveyDirect] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [totalTestimonialStops, setTotalTestimonialStops] = useState(
    Math.max(1, testimonialVideoIds.length - 1),
  );
  const parallaxYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateStops = () => {
      const visibleCards = window.innerWidth > 980 ? 2 : 1;
      const stops = Math.max(1, testimonialVideoIds.length - visibleCards + 1);
      setTotalTestimonialStops(stops);
      setActiveTestimonial((prev) => Math.min(prev, stops - 1));
    };

    updateStops();
    window.addEventListener("resize", updateStops);
    return () => window.removeEventListener("resize", updateStops);
  }, []);

  useEffect(() => {
    const sectionIds = ["tentang", "sektor", "desain-pengerjaan", "karya", "dibalik-pengerjaan", "cara-kerja", "testimoni", "layanan"];
    let rafId = 0;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      targetScrollYRef.current = currentScroll;
      setNavScrolled(currentScroll > 24);

      const heroEl = document.getElementById("hero") || (document.querySelector(".hero") as HTMLElement | null);
      const heroThreshold = heroEl ? Math.max(heroEl.offsetHeight - 150, 300) : 400;
      setPastHero(currentScroll >= heroThreshold);

      const probe = currentScroll + 180;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) {
          current = id;
        }
      }
      setActiveNav(current);
    };

    const updateParallax = () => {
      const target = targetScrollYRef.current;
      // Smooth interpolation for parallax values (lerp factor 0.1)
      const diff = target - parallaxYRef.current;
      if (Math.abs(diff) > 0.05) {
        parallaxYRef.current += diff * 0.1;
      } else {
        parallaxYRef.current = target;
      }

      const pY = parallaxYRef.current;
      if (heroMediaRef.current) {
        const mediaOffset = Math.min(pY * 0.38, 320);
        heroMediaRef.current.style.transform = `translate3d(0, ${mediaOffset.toFixed(2)}px, 0) scale(1.08)`;
      }

      if (heroContentRef.current) {
        const contentOffset = Math.min(pY * 0.16, 130);
        const opacity = Math.max(0, 1 - pY / 620);
        heroContentRef.current.style.transform = `translate3d(0, ${contentOffset.toFixed(2)}px, 0)`;
        heroContentRef.current.style.opacity = opacity.toFixed(3);
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const scrollTestimonialTo = (index: number) => {
    const track = testimonialTrackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(totalTestimonialStops - 1, index));
    const card = track.children[clamped] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
      setActiveTestimonial(clamped);
    }
  };

  const handleTestimonialScroll = () => {
    const track = testimonialTrackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    const maxStop = totalTestimonialStops - 1;
    let closestIdx = 0;
    let minDiff = Infinity;
    for (let i = 0; i <= maxStop && i < children.length; i++) {
      const diff = Math.abs(children[i].offsetLeft - track.scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    setActiveTestimonial(closestIdx);
  };

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

  const rawDesignScopes = t("estimator.designScopes", { returnObjects: true });
  const designScopeOptions: OptionItem[] = Array.isArray(rawDesignScopes)
    ? (rawDesignScopes as OptionItem[])
    : [];

  const toggleDesignScope = (scopeId: string) => {
    setDesignScopes((prev) => {
      if (prev.includes(scopeId)) {
        return prev.length > 1 ? prev.filter((item) => item !== scopeId) : prev;
      }
      return [...prev, scopeId];
    });
  };

  const selectedSpaceLabel =
    estSpaces.find((item) => item.id === estSpace)?.label || estSpaces[0]?.label || "Residential";
  const selectedNeedLabel =
    estNeeds.find((item) => item.id === estNeed)?.label || estNeeds[0]?.label || "Kitchen Set";
  const selectedKitchenConfigLabel =
    estKitchenConfigs.find((item) => item.id === estKitchenConfig)?.label || "";

  let selectedScaleLabel = "";
  const lowerVal = length.trim();
  const upperVal = upperArea.trim();
  const notFilled = t("estimator.notFilled");

  if (requestSurveyDirect) {
    selectedScaleLabel = t("estimator.requestSurveyOption");
  } else if (estNeed === "kitchen") {
    if (estKitchenConfig === "lower") {
      selectedScaleLabel = lowerVal
        ? `${lowerVal} ${t("estimator.kitchenLowerUnit")} (${selectedKitchenConfigLabel})`
        : `${selectedKitchenConfigLabel} (${notFilled})`;
    } else if (estKitchenConfig === "upper") {
      selectedScaleLabel = upperVal
        ? `${upperVal} ${t("estimator.kitchenUpperUnit")} (${selectedKitchenConfigLabel})`
        : `${selectedKitchenConfigLabel} (${notFilled})`;
    } else {
      selectedScaleLabel =
        lowerVal || upperVal
          ? `${t("estimator.kitchenBothScale", {
            lower: lowerVal || notFilled,
            upper: upperVal || notFilled,
          })} (${selectedKitchenConfigLabel})`
          : `${selectedKitchenConfigLabel} (${notFilled})`;
    }
  } else if (estNeed === "furniture") {
    selectedScaleLabel = customUnitCount.trim()
      ? `${customUnitCount.trim()} Unit`
      : unitOptions[estScaleIdx] || unitOptions[0] || "";
  } else {
    const parts: string[] = [];
    if (designScopes.includes("room")) {
      const roomQty = designRoomCount.trim();
      parts.push(
        roomQty
          ? `${roomQty} ${t("estimator.designRoomUnit")}`
          : `${t("estimator.designRoomUnit")} (${notFilled})`,
      );
    }
    if (designScopes.includes("building")) {
      const buildingQty = designBuildingCount.trim();
      parts.push(
        buildingQty
          ? `${buildingQty} ${t("estimator.designBuildingUnit")}`
          : `${t("estimator.designBuildingUnit")} (${notFilled})`,
      );
    }
    selectedScaleLabel = parts.join(" & ");
  }

  const estimatorWaQuery = t("estimator.waMessage", {
    space: selectedSpaceLabel,
    need: selectedNeedLabel,
    scale: selectedScaleLabel,
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

  const rawTestimonials = t("testimonials.items", { returnObjects: true });
  const testimonialsList: TestimonialItem[] = Array.isArray(rawTestimonials)
    ? (rawTestimonials as TestimonialItem[])
    : [];

  return (
    <main id="top">
      {/* First-visit IP Geolocation Language Popup Modal */}
      <LanguageModal />

      <header className={`nav-wrap ${navScrolled || menuOpen ? "is-scrolled" : ""}`}>
        <nav className="nav shell" aria-label="Navigasi utama">
          <ArchLogo light={!navScrolled && !menuOpen} />
          <div id="primary-nav" className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <div className="nav-pill-dock">
              <a
                href="#tentang"
                className={activeNav === "tentang" ? "is-active" : ""}
                onClick={() => {
                  setActiveNav("tentang");
                  closeMenu();
                }}
              >
                {t("nav.about")}
              </a>
              <a
                href="#sektor"
                className={activeNav === "sektor" ? "is-active" : ""}
                onClick={() => {
                  setActiveNav("sektor");
                  closeMenu();
                }}
              >
                {t("nav.sectors")}
              </a>
              <a
                href="#karya"
                className={activeNav === "karya" ? "is-active" : ""}
                onClick={() => {
                  setActiveNav("karya");
                  closeMenu();
                }}
              >
                {t("nav.works")}
              </a>
              <a
                href="#cara-kerja"
                className={activeNav === "cara-kerja" ? "is-active" : ""}
                onClick={() => {
                  setActiveNav("cara-kerja");
                  closeMenu();
                }}
              >
                {t("nav.process")}
              </a>
              <a
                href="#testimoni"
                className={activeNav === "testimoni" ? "is-active" : ""}
                onClick={() => {
                  setActiveNav("testimoni");
                  closeMenu();
                }}
              >
                {t("nav.testimonials")}
              </a>
              <a
                href="#layanan"
                className={activeNav === "layanan" ? "is-active" : ""}
                onClick={() => {
                  setActiveNav("layanan");
                  closeMenu();
                }}
              >
                {t("nav.services")}
              </a>
            </div>
            <div className="nav-right-group">
              <div className="nav-desktop-lang">
                <LanguageSwitcher />
              </div>
              <a
                className="nav-cta-split"
                href={mainWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  closeMenu();
                  trackWhatsAppLead({ source: "nav_cta" });
                }}
              >
                <span className="nav-cta-pill">{t("nav.consultation")}</span>
              </a>
            </div>
          </div>
          <div className="nav-mobile-right">
            <div className="nav-mobile-lang">
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              className={`menu-button ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t("nav.openMenu")}
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <section id="hero" className="hero">
        <div
          ref={heroMediaRef}
          className="hero-media-wrap"
        >
          <img
            src={heroImage}
            alt="Interior ruang keluarga hangat dengan material kayu dan cahaya alami"
            width={1920}
            height={1072}
            fetchPriority="high"
          />
        </div>
        <div className="hero-overlay" />
        <div
          ref={heroContentRef}
          className="hero-content shell"
        >
          <h1>
            {t("hero.titleLine1")}
            <br />
            <i>{t("hero.titleLine2")}</i>
          </h1>
          <p className="hero-copy">{t("hero.copy")}</p>
          <div className="hero-actions">
            <a
              className="primary-button"
              href={mainWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppLead({ source: "hero_cta" })}
            >
              <span>{t("hero.cta")}</span>
              <Arrow />
            </a>
            <a
              className="hero-secondary-button"
              href="#tentang"
              aria-label={t("hero.secondaryCta")}
              title={t("hero.secondaryCta")}
            >
              <Arrow down />
            </a>
          </div>
        </div>
      </section>

      <section className="section about-section" id="tentang">
        <div className="shell about-content">
          <div className="about-copy">
            <h2>{t("about.headline")}</h2>
            <p className="about-editorial-lead">{t("about.fullDesc")}</p>
            <a href="https://madinabuild.com" target="_blank" rel="noreferrer">
              {t("about.cta")} <Arrow />
            </a>
          </div>
        </div>
        <AboutArcGallery />
      </section>

      <section className="section sectors-section" id="sektor">
        <div className="shell">
          <div className="section-heading centered">
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

      <section className="section design-work-section" id="desain-pengerjaan">
        <div className="shell">
          <div className="section-heading centered">
            <h2>{t("designWork.title")}</h2>
            <p>{t("designWork.desc")}</p>
          </div>
        </div>
        <ArcGallery items={designWorkItems} ariaLabel={t("designWork.galleryLabel")} />
      </section>

      <section className="section projects-section" id="karya">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
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
        </div>
      </section>

      <section className="section craft-section" id="dibalik-pengerjaan">
        <div className="shell">
          <div className="craft-header">
            <h2>
              {t("craft.title")}
            </h2>
            <p>{t("craft.desc")}</p>
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
            <h2>{t("principles.title")}</h2>
            <p>{t("principles.desc")}</p>
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

      <section className="section testimonials-section" id="testimoni">
        <div className="shell">
          <div className="testimonials-head">
            <div>
              <h2>
                {t("testimonials.title")}
                <br />
                <i>{t("testimonials.titleEmphasis")}</i>
              </h2>
              <p>{t("testimonials.desc")}</p>
            </div>

            <div className="testimonials-controls">
              <span className="testimonials-counter">
                0{activeTestimonial + 1} / 0{totalTestimonialStops}
              </span>
              <div className="testimonials-nav">
                <button
                  type="button"
                  className="slider-btn"
                  onClick={() => scrollTestimonialTo(activeTestimonial - 1)}
                  disabled={activeTestimonial === 0}
                  aria-label="Previous testimonial"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="slider-btn"
                  onClick={() => scrollTestimonialTo(activeTestimonial + 1)}
                  disabled={activeTestimonial >= totalTestimonialStops - 1}
                  aria-label="Next testimonial"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className="testimonials-track"
            ref={testimonialTrackRef}
            onScroll={handleTestimonialScroll}
          >
            {testimonialVideoIds.map((videoId, idx) => {
              const item = testimonialsList[idx];
              const title = item?.title || `Testimoni ${idx + 1}`;
              return (
                <article className="testimonial-card" key={videoId}>
                  <LiteYouTube
                    videoId={videoId}
                    title={title}
                    playLabel={t("testimonials.playLabel")}
                  />
                  <div className="testimonial-meta">
                    <span>{item?.label || `0${idx + 1}`}</span>
                    <h3>{title}</h3>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="testimonials-dots" aria-label="Slide indicators">
            {Array.from({ length: totalTestimonialStops }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`slider-dot ${activeTestimonial === idx ? "active" : ""}`}
                onClick={() => scrollTestimonialTo(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section services-section" id="layanan">
        <div className="shell">
          <div className="section-heading centered">
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
                {servicesList.map((service, idx) => (
                  <a
                    className="service-card"
                    key={service.number}
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
                    <img
                      src={serviceImages[idx] || serviceImages[0]}
                      alt={service.title}
                      loading="lazy"
                    />
                    <div className="service-shade" />
                    <div className="service-meta">
                      <h3>{service.title}</h3>
                      <span className="service-cta">
                        {service.cta} <Arrow />
                      </span>
                    </div>
                  </a>
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
                {Array.isArray(t("estimator.benefits", { returnObjects: true })) && (
                  <ul className="estimator-benefits">
                    {(t("estimator.benefits", { returnObjects: true }) as string[]).map((benefit, i) => (
                      <li key={i}>
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                          <path d="m5 8 2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
                    <div className="estimator-design-row">
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
                      <div className="estimator-design-inputs">
                        {(estKitchenConfig === "lower" || estKitchenConfig === "both") && (
                          <input
                            type="number"
                            min="0.5"
                            max="99"
                            step="0.5"
                            inputMode="decimal"
                            className={`estimator-pill-input ${length.trim() ? "active" : ""}`}
                            placeholder={t("estimator.kitchenLowerPlaceholder")}
                            value={length}
                            onChange={(event) => setLength(event.target.value)}
                            aria-label={t("estimator.kitchenLowerLabel")}
                          />
                        )}
                        {(estKitchenConfig === "upper" || estKitchenConfig === "both") && (
                          <input
                            type="number"
                            min="0.5"
                            max="99"
                            step="0.5"
                            inputMode="decimal"
                            className={`estimator-pill-input ${upperArea.trim() ? "active" : ""}`}
                            placeholder={t("estimator.kitchenUpperPlaceholder")}
                            value={upperArea}
                            onChange={(event) => setUpperArea(event.target.value)}
                            aria-label={t("estimator.kitchenUpperLabel")}
                          />
                        )}
                        <button
                          type="button"
                          className={`estimator-pill estimator-pill-survey ${requestSurveyDirect ? "active" : ""}`}
                          onClick={() => setRequestSurveyDirect(!requestSurveyDirect)}
                        >
                          {t("estimator.requestSurveyOption")}
                        </button>
                      </div>
                    </div>
                  ) : estNeed === "furniture" ? (
                    <div className="estimator-pills">
                      {unitOptions.map((opt, idx) => (
                        <button
                          key={opt}
                          type="button"
                          className={`estimator-pill ${!customUnitCount.trim() && estScaleIdx === idx ? "active" : ""}`}
                          onClick={() => {
                            setCustomUnitCount("");
                            setEstScaleIdx(idx);
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                      <input
                        type="number"
                        min="1"
                        max="99"
                        inputMode="numeric"
                        className={`estimator-pill-input ${customUnitCount.trim() ? "active" : ""}`}
                        placeholder={t("estimator.unitCustomPlaceholder")}
                        value={customUnitCount}
                        onChange={(event) => setCustomUnitCount(event.target.value)}
                        aria-label={t("estimator.unitCustomPlaceholder")}
                      />
                      <button
                        type="button"
                        className={`estimator-pill estimator-pill-survey ${requestSurveyDirect ? "active" : ""}`}
                        onClick={() => setRequestSurveyDirect(!requestSurveyDirect)}
                      >
                        {t("estimator.requestSurveyOption")}
                      </button>
                    </div>
                  ) : (
                    <div className="estimator-design-row">
                      <div className="estimator-pills">
                        {designScopeOptions.map((scope) => {
                          const isSelected = designScopes.includes(scope.id);
                          return (
                            <button
                              key={scope.id}
                              type="button"
                              aria-pressed={isSelected}
                              className={`estimator-pill ${isSelected ? "active" : ""}`}
                              onClick={() => toggleDesignScope(scope.id)}
                            >
                              {scope.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="estimator-design-inputs">
                        {designScopes.includes("room") && (
                          <input
                            type="number"
                            min="1"
                            max="99"
                            inputMode="numeric"
                            className={`estimator-pill-input ${designRoomCount.trim() ? "active" : ""}`}
                            placeholder={t("estimator.designRoomPlaceholder")}
                            value={designRoomCount}
                            onChange={(event) => setDesignRoomCount(event.target.value)}
                            aria-label={t("estimator.designRoomPlaceholder")}
                          />
                        )}
                        {designScopes.includes("building") && (
                          <input
                            type="number"
                            min="1"
                            max="99"
                            inputMode="numeric"
                            className={`estimator-pill-input ${designBuildingCount.trim() ? "active" : ""}`}
                            placeholder={t("estimator.designBuildingPlaceholder")}
                            value={designBuildingCount}
                            onChange={(event) => setDesignBuildingCount(event.target.value)}
                            aria-label={t("estimator.designBuildingPlaceholder")}
                          />
                        )}
                        <button
                          type="button"
                          className={`estimator-pill estimator-pill-survey ${requestSurveyDirect ? "active" : ""}`}
                          onClick={() => setRequestSurveyDirect(!requestSurveyDirect)}
                        >
                          {t("estimator.requestSurveyOption")}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="estimator-action-row">
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
                          detail: `${estNeed} | ${selectedScaleLabel}`,
                        })
                      }
                    >
                      <span>{t("estimator.cta")}</span>
                      <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="closing">
        <div className="closing-pattern" />
        <div className="shell closing-content">
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
            <a href="#tentang">{t("nav.about")}</a>
            <a href="#sektor">{t("nav.sectors")}</a>
            <a href="#karya">{t("nav.works")}</a>
            <a href="#cara-kerja">{t("nav.process")}</a>
            <a href="#layanan">{t("nav.services")}</a>
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

      <FloatingWhatsApp
        onOpenCalculator={handleOpenCalculatorFromWa}
        isVisible={pastHero}
      />
    </main>
  );
}
