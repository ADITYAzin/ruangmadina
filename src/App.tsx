import { useState } from "react";

const heroImage =
  "https://images.unsplash.com/photo-1760067538612-c0ecd3bc3d3a?auto=format&fit=crop&w=2000&q=88";

const projects = [
  {
    title: "Dapur yang mengalir",
    category: "Kitchen set",
    place: "Sidoarjo",
    image:
      "https://images.unsplash.com/photo-1771888703722-ee7ad9143a67?auto=format&fit=crop&w=1100&q=85",
    className: "project-wide",
  },
  {
    title: "Ruang pulang yang tenang",
    category: "Living area",
    place: "Surabaya",
    image:
      "https://images.unsplash.com/photo-1760067538299-3f58e7a99fc5?auto=format&fit=crop&w=900&q=85",
    className: "project-tall",
  },
  {
    title: "Penyimpanan tanpa sesak",
    category: "Built-in wardrobe",
    place: "Jawa Timur",
    image:
      "https://images.unsplash.com/photo-1752407828514-660d6945d392?auto=format&fit=crop&w=900&q=85",
    className: "",
  },
];

const steps = [
  ["01", "Harga kitchen set bisa dihitung sendiri", "Kirim foto ruang, ukuran kasar, dan kebiasaan keluarga Anda."],
  ["02", "Desain dulu, baru produksi", "Klien melihat desain sebelum produksi dimulai."],
  ["03", "Diukur dua kali", "Penawaran awal dari ukuran dan foto kiriman klien, lalu tim mengukur langsung sebelum produksi."],
  ["04", "Waktu tertulis sebagai batas paling lama","Desain sekitar 7 hari kerja; pengerjaan satu ruangan 30 hari kerja setelah desain disetujui."],
  ["05", "Harga sudah termasuk pemasangan", "Yang dihitung terpisah disebut di depan (top table, backsplash, lampu, pengiriman)."],
  ["06", "Satu tim dengan Madina Build", "Interior bisa dirancang bersama arsitektur, sehingga tidak bongkar ulang."],
];

const principles = [
  {
    icon: "path",
    title: "Taharah (kebersihan)",
    text: "Area wudhu dan wastafel yang praktis, dapur mudah dibersihkan, penyimpanan tertutup",
  },
  {
    icon: "layers",
    title: "Mahram dan privasi",
    text: "Batas area tamu dan ruang keluarga, pemisahan kamar anak laki-laki dan perempuan",
  },
  {
    icon: "screen",
    title: "Memudahkan ibadah",
    text: "Sudut salat sesuai arah kiblat, penyimpanan sajadah dan mukena",
  },
  {
    icon: "drop",
    title: "Material yang baik",
    text: "Material aman dan tahan lama, spesifikasi tertulis sejak awal",
  },
  {
    icon: "sun",
    title: "Tawazun (seimbang)",
    text: "Fungsional dulu, tidak berlebihan, sesuai kebutuhan dan anggaran",
  },
];

const services = [
  {
    number: "01",
    title: "Kitchen set",
    basis: "Per meter lari (m')",
    basisNote: "Kabinet atas dan bawah dihitung terpisah",
    tiers: [
      { name: "Esensial", price: "Rp2,5 jt / m'" },
      { name: "Premium", price: "Rp3,0 jt / m'" },
      { name: "Signature", price: "Rp3,7 jt / m'" },
      { name: "Duco Minimalis", price: "Rp4,4 jt / m'" },
      { name: "Duco Classic", price: "Rp5,4 jt / m'" },
    ],
    example: {
      label: "Contoh hitungan",
      text: "Dapur dinding 4 m = 8 m lari (4 m bawah + 4 m atas) = Rp20 jt (Esensial).",
    },
    scope: "Termasuk kabinet dan pemasangan. Top table, backsplash, dan sink terpisah.",
    cta: "Konsultasi kitchen set",
    waQuery: "Halo Ruang Madina, saya ingin berkonsultasi tentang kitchen set.",
  },
  {
    number: "02",
    title: "Furniture custom",
    basis: "Per m² bidang muka / dimensi",
    basisNote: "Menyesuaikan ukuran dan denah ruang",
    customPrices: [
      {
        title: "Lemari pakaian built-in",
        price: "Mulai Rp3,0 jt / m²",
        unit: "bidang muka (tampak depan)",
      },
      {
        title: "Unit custom lainnya",
        desc: "Backdrop TV, credenza, meja kerja, dan partisi dihitung berdasarkan dimensi fisik unit.",
      },
    ],
    example: {
      label: "Dasar hitung",
      text: "Bidang muka dihitung dari tinggi × lebar tampak depan lemari.",
    },
    scope: "Biaya sudah termasuk perakitan dan pemasangan built-in di lokasi.",
    cta: "Konsultasi furniture custom",
    waQuery: "Halo Ruang Madina, saya ingin berkonsultasi tentang furniture custom.",
  },
  {
    number: "03",
    title: "Paket interior (desain)",
    basis: "Per ruangan atau luas total",
    basisNote: "Tahap perencanaan pra-produksi",
    designPrices: {
      rooms: [
        { label: "1 Ruangan", price: "Rp3,0 jt" },
        { label: "2 Ruangan", price: "Rp5,0 jt" },
      ],
      areaPackages: ["Rp10 jt", "Rp13 jt", "Rp20 jt", "Rp25 jt"],
      areaDesc: "Disesuaikan dengan luasan total bangunan.",
    },
    example: {
      label: "Output kerja",
      text: "Gambar 3D visual, denah tata ruang, gambar kerja teknis, dan RAB.",
    },
    scope: "Perencanaan desain dapat dilakukan mandiri sebelum masuk tahap produksi fisik.",
    cta: "Konsultasi paket desain",
    waQuery: "Halo Ruang Madina, saya ingin berkonsultasi tentang paket desain interior.",
  },
];

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
      {paths[type]}
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [length, setLength] = useState(4);
  const waText = encodeURIComponent(
    `Halo Ruang Madina, saya ingin berkonsultasi tentang interior rumah${length ? ` dengan perkiraan panjang kabinet ${length} meter` : ""}.`,
  );
  const whatsappUrl = `https://wa.me/628113330232?text=${waText}`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top">
      <header className="nav-wrap">
        <nav className="nav shell" aria-label="Navigasi utama">
          <ArchLogo />
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#karya" onClick={closeMenu}>
              Karya
            </a>
            <a href="#cara-kerja" onClick={closeMenu}>
              Cara kerja
            </a>
            <a href="#layanan" onClick={closeMenu}>
              Layanan
            </a>
            <a href="#tentang" onClick={closeMenu}>
              Tentang kami
            </a>
            <a
              className="nav-cta"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Konsultasi <Arrow />
            </a>
          </div>
          <button
            className={`menu-button ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Buka menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      <section className="hero">
        <img
          src={heroImage}
          alt="Interior ruang keluarga hangat dengan material kayu dan cahaya alami"
        />
        <div className="hero-overlay" />
        <div className="hero-content shell">
          <p className="eyebrow light">INTERIOR & FURNITURE CUSTOM · SIDOARJO</p>
          <h1>
            Ruang Madina
          </h1>
          <p className="hero-copy">
            Kami merancang interior yang rapi, fungsional, dan nyaman—dibuat khusus mengikuti cara
            keluarga Anda hidup.
          </p>
          <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            Konsultasi Disini <Arrow />
          </a>
        </div>
        <a className="scroll-hint" href="#trust">
          <span>JELAJAHI</span>
          <Arrow down />
        </a>
      </section>

      <section className="trust-bar" id="trust">
        <div className="shell trust-grid">
          <div className="trust-parent">
            <span className="mini-arch">R</span>
            <p>
              Bagian dari <strong>Madina Build</strong>
              <br />
              <small>PT Madina Build International</small>
            </p>
          </div>
          <div className="trust-divider" />
          <div>
            <b>Berbasis di Sidoarjo</b>
            <span>Melayani Surabaya & sekitarnya</span>
          </div>
          <div>
            <b>Desain hingga instalasi</b>
            <span>Satu tim, proses lebih terarah</span>
          </div>
          <div>
            <b>Dibuat khusus</b>
            <span>Sesuai ruang dan kebutuhan Anda</span>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="karya">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">HASIL PENGERJAAN</p>
              <h2>
                Detail yang hadir
                <br />
                untuk <i>dipakai.</i>
              </h2>
            </div>
            <p>
              Bukan sekadar indah di foto. Setiap sudut dirancang untuk menjawab kebutuhan nyata,
              dari pagi yang sibuk hingga waktu berkumpul.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.className}`} key={project.title}>
                <img src={project.image} alt={project.title} />
                <div className="project-shade" />
                <div className="project-meta">
                  <span>
                    {project.category} · {project.place}
                  </span>
                  <h3>{project.title}</h3>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Tanyakan ${project.title}`}
                  >
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="photo-note">
            Foto inspirasi mewakili arah dan karakter pengerjaan. Dokumentasi proyek ditampilkan
            dengan menjaga privasi klien.
          </p>
        </div>
      </section>

      <section className="section process-section" id="cara-kerja">
        <div className="shell">
          <div className="process-intro">
            <p className="eyebrow">CARA KERJA</p>
            <h2>
              Jelas sejak awal,
              <br />
              <i>tenang sampai akhir.</i>
            </h2>
            <p>
              Enam langkah sederhana untuk menjaga anggaran, ukuran, dan waktu pengerjaan tetap
              terarah.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map(([number, title, text]) => (
              <article className="step-card" key={number}>
                <span>{number}</span>
                <div className="step-line" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section principles-section">
        <div className="shell">
          <div className="principles-top">
            <p className="eyebrow light">PRINSIP DESAIN</p>
            <p className="principles-kicker">Ruang yang baik bukan hanya tentang tampilan.</p>
            <h2>
              Ia menenangkan rutinitas,
              <br />
              menjaga privasi, dan memberi
              <br />
              tempat untuk <i>hal yang berarti.</i>
            </h2>
          </div>
          <div className="principles-list">
            {principles.map((principle, index) => (
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
            <p className="eyebrow">LAYANAN & ESTIMASI</p>
            <h2>
              Mulai dari satu ruang,
              <br />
              tumbuh bersama <i>rumah Anda.</i>
            </h2>
            <p>Kami membantu Anda memahami lingkup dan komponen biaya sebelum memulai.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <div className="service-badge">
                    <span className="service-number">{service.number}</span>
                    <span className="service-tag">Layanan</span>
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
                        <span className="design-label">Berdasarkan Ruangan</span>
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
                        <span className="design-label">Berdasarkan Luas Bangunan</span>
                        <div className="design-tags">
                          {service.designPrices.areaPackages.map((pkg) => (
                            <span key={pkg} className="design-tag">{pkg}</span>
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
                      <b>{service.example.label}:</b> {service.example.text}
                    </p>
                    <p className="note-scope">{service.scope}</p>
                  </div>
                  <a
                    className="service-card-action"
                    href={`https://wa.me/628113330232?text=${encodeURIComponent(service.waQuery)}`}
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
              <p className="eyebrow light">SIMULASI AWAL KITCHEN SET</p>
              <h3>
                Punya dinding dapur sekitar
                <br />
                <i>{length} meter?</i>
              </h3>
              <p>
                Geser untuk memberi kami gambaran awal. Estimasi final mengikuti hasil ukur,
                konfigurasi, dan detail desain.
              </p>
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
                aria-label="Perkiraan panjang kabinet"
              />
              <a className="light-button" href={whatsappUrl} target="_blank" rel="noreferrer">
                Minta estimasi terperinci <Arrow />
              </a>
            </div>
          </div>
          <p className="estimate-note">
            Nilai akhir tidak ditentukan hanya dari panjang kabinet. Tim kami akan menjelaskan
            seluruh komponen secara transparan setelah memahami kebutuhan Anda.
          </p>
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
              DIRANCANG DENGAN NIAT
              <br />
              DIBUAT DENGAN TELITI
            </span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">TENTANG Ruang Madina</p>
            <h2>
              Bukan mengisi ruang.
              <br />
              <i>Memahami kehidupan.</i>
            </h2>
            <p>
              Ruang Madina adalah layanan interior dan furniture custom dari Madina Build. Kami
              percaya rumah yang nyaman berawal dari mendengarkan: bagaimana Anda bergerak,
              menyimpan, berkumpul, dan beristirahat.
            </p>
            <p>
              Dari sana, kami menerjemahkannya menjadi ruang yang terasa tenang, personal, dan
              relevan untuk waktu yang panjang.
            </p>
            <a href="https://Madinabuild.com" target="_blank" rel="noreferrer">
              Kenali Madina Build <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="closing-pattern" />
        <div className="shell closing-content">
          <p className="eyebrow light">MULAI DARI SINI</p>
          <h2>
            Ruang yang Anda bayangkan,
            <br />
            bisa dimulai dari <i>satu percakapan.</i>
          </h2>
          <p>
            Kirim foto dan ukuran kasar ruang Anda. Tim kami akan membantu memetakan langkah
            berikutnya.
          </p>
          <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            Ceritakan ruang Anda <Arrow />
          </a>
          <small>Tidak perlu gambar teknis untuk memulai.</small>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <ArchLogo light />
            <p>Interior yang lebih rapi, fungsional, dan terasa dekat dengan cara Anda hidup.</p>
          </div>
          <div>
            <p className="footer-label">JELAJAHI</p>
            <a href="#karya">Karya</a>
            <a href="#cara-kerja">Cara kerja</a>
            <a href="#layanan">Layanan</a>
            <a href="#tentang">Tentang kami</a>
          </div>
          <div>
            <p className="footer-label">HUBUNGI</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp resmi
            </a>
            <span>Sidoarjo, Jawa Timur</span>
            <span>Senin—Sabtu, 09.00—17.00</span>
          </div>
          <div>
            <p className="footer-label">TERHUBUNG</p>
            <a href="https://Madinabuild.com" target="_blank" rel="noreferrer">
              Madinabuild.com
            </a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} PT Madina Build International</span>
          <span>Ruang Madina · Sidoarjo</span>
          <a href="#top">Kembali ke atas ↑</a>
        </div>
      </footer>
    </main>
  );
}
