import { useEffect, useState } from "react";

const assets = "/assets";
const imgHeroImg = `${assets}/3cf62.png`;
const imgCardImage = `${assets}/e3d57.png`;
const imgCardImage1 = `${assets}/75d6d.png`;
const imgCardImage2 = `${assets}/9b6d2.png`;
const imgCardImage3 = `${assets}/bc3e5.png`;
const imgCardImage4 = `${assets}/ac5cb.png`;
const imgCardImage5 = `${assets}/6e5f7.png`;
const imgSun = `${assets}/c6aab.svg`;
const imgMoon = `${assets}/be77b.svg`;
const imgSearch = `${assets}/cfc2c.svg`;
const imgArrowRight = `${assets}/b259d.svg`;
const imgMapPin = `${assets}/37ba1.svg`;
const imgInfo = `${assets}/50318.svg`;

const decades = [
  { slug: "1910-1930", label: "1910 — 1930", title: "Timber, temples & a changing capital", subtitle: "The last great monastery complexes and the first decades of a newly independent Mongolia.", context: "At the beginning of the century, built space in Urga was shaped by Buddhist monasteries, timber construction and the portable logic of the ger. Political change after 1911 brought a new name and a new civic future, but sacred architecture remained a defining part of the cityscape.", detail: "Look for layered roofs, painted timber and enclosed courtyards: structures made for ceremony as much as for the severe continental climate.", tag: "SACRED FABRIC / EARLY URBAN FORM", url: "https://en.wikipedia.org/wiki/Architecture_of_Mongolia#Early_20th_century" },
  { slug: "1930-1950", label: "1930 — 1950", title: "A city remade by revolution", subtitle: "From monastic center to socialist capital: rupture, planning and new public institutions.", context: "The 1930s and 1940s brought profound change to the built landscape. Monastic sites were lost or repurposed, while new administrative, educational and civic buildings began to give Ulaanbaatar a different urban structure.", detail: "This interval is as much a record of absence as construction. Surviving plans and photographs help trace what changed before the larger postwar building programs began.", tag: "CIVIC TRANSITION / LOST FABRIC", url: "https://en.wikipedia.org/wiki/Ulaanbaatar#Soviet_era" },
  { slug: "1950-1970", label: "1950 — 1970", title: "The monumental socialist city", subtitle: "Formal squares, axial planning and the architecture of a new civic identity.", context: "Postwar development reshaped central Ulaanbaatar with larger public buildings and a more formal urban plan. Classical composition and monumental scale became visible expressions of state institutions.", detail: "The Government Palace facade offers an entry point into the era's emphasis on symmetry, public space and durable masonry-like massing.", tag: "STATE BUILDINGS / CIVIC AXES", url: "https://en.wikipedia.org/wiki/Socialist_realism_in_architecture" },
  { slug: "1970-1990", label: "1970 — 1990", title: "Concrete becomes a language", subtitle: "Cultural institutions, bold volumes and the rise of Mongolian socialist modernism.", context: "During the later socialist decades, architects worked with large concrete forms while drawing on local ornament and symbolism. Public buildings became experiments in how modern construction could carry a specifically Mongolian identity.", detail: "Across the archive, compare sculptural massing with decorative relief and the way these buildings address the street and civic square.", tag: "SOCIALIST MODERNISM / CULTURAL LIFE", url: "https://en.wikipedia.org/wiki/Soviet_architecture#Late_Soviet_modernism" },
  { slug: "1990-2010", label: "1990 — 2010", title: "New markets, new skyline", subtitle: "A changing economy and the first wave of reflective glass in the capital.", context: "After the democratic transition of 1990, private development began to transform central Ulaanbaatar. New commercial towers introduced a very different scale and material palette alongside the inherited socialist city.", detail: "The Blue Sky Tower marks this shift: its curved glass silhouette stands in sharp contrast to the heavy civic buildings around it.", tag: "TRANSITION / VERTICAL CITY", url: "https://en.wikipedia.org/wiki/Ulaanbaatar#Post-1990" },
  { slug: "2010-2020", label: "2010 — 2020", title: "Preservation in a growing city", subtitle: "New urban pressures meet the difficult work of caring for older structures.", context: "The city's rapid growth continued through the 2010s. Alongside new construction, preservation and restoration brought renewed attention to historic religious buildings and the materials that keep them standing.", detail: "The archive's restoration record for the Megjid Janraisig Temple offers a lens on conservation: maintaining historic form while addressing the demands of a changing city.", tag: "CONSERVATION / CONTEMPORARY CITY", url: "https://en.wikipedia.org/wiki/Ulaanbaatar#21st_century" },
];

const cards = [
  {
    img: imgCardImage,
    ref: "REC-1972-UB",
    year: "1976",
    title: "Ulaanbaatar Wedding Palace",
    location: "Sukhbaatar District, UB",
    desc: "A crowning jewel of Mongolian socialist modernism, featuring heavy monumental concrete walls layered with meticulous geometric fretwork reliefs reminiscent of local nomadic knot patterns.",
    alt: "Ulaanbaatar Wedding Palace exterior",
  },
  {
    img: imgCardImage1,
    ref: "REC-1913-GH",
    year: "1913",
    title: "Choijin Lama Temple Complex",
    location: "Chingeltei District, UB",
    desc: "Constructed primarily of rich weathered pine wood and traditional clay tiles, this historic monastery stands as a pristine showcase of late-Qing dynasty architectural synthesis in the steppes.",
    alt: "Choijin Lama Temple Complex",
  },
  {
    img: imgCardImage2,
    ref: "REC-1981-CT",
    year: "1981",
    title: "State Drama Theatre",
    location: "Sukhbaatar District, UB",
    desc: "An expressive Neo-Classical structure painted in a deep mineral pink-coral, featuring massive Corinthian columns offset by highly experimental geometric spatial layouts.",
    alt: "State Drama Theatre facade",
  },
  {
    img: imgCardImage3,
    ref: "REC-2014-NMD",
    year: "2014",
    title: "Megjid Janraisig Temple Restorations",
    location: "Gandantegchinlen Monastery, UB",
    desc: "Modern timber reinforcements layered with complex structural copper sleeves, designed to secure the massive historical indoor Avalokiteśvara statue against changing humidity.",
    alt: "Megjid Janraisig Temple restoration work",
  },
  {
    img: imgCardImage4,
    ref: "REC-1954-PRL",
    year: "1954",
    title: "Government Palace Facade",
    location: "Sukhbaatar Square, UB",
    desc: "An imposing administrative block utilizing heavy structural columns and strict axial symmetry, representing the monumental socialist classicism phase of Mongolian urban planning.",
    alt: "Government Palace facade Ulaanbaatar",
  },
  {
    img: imgCardImage5,
    ref: "REC-2005-SKY",
    year: "2009",
    title: "The Blue Sky Tower",
    location: "Central Downtown, UB",
    desc: "A soaring sail-shaped skyscraper clad in deep blue reflective glass, marking Mongolia's sudden transition to hyper-contemporary glass-and-steel visual language.",
    alt: "Blue Sky Tower Ulaanbaatar skyline",
  },
];

function EraPage({ era }: { era: (typeof decades)[number] }) {
  const index = decades.indexOf(era);
  const [start, end] = era.slug.split("-").map(Number);
  const records = cards.filter((card) => Number(card.year) >= start && Number(card.year) < end);
  const featuredImage = records[0]?.img;

  return (
    <main id="era-content">
      <div className="px-5 sm:px-10 lg:px-20 pt-8 lg:pt-12">
        <a href="/#timeline" className="inline-flex items-center gap-2 font-mono text-[12px] t-accent hover:opacity-70 transition-opacity">← BACK TO THE TIMELINE</a>
      </div>

      <section className="px-5 sm:px-10 lg:px-20 pt-12 lg:pt-20 pb-14 lg:pb-24 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-10 lg:gap-16 items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] t-accent uppercase tracking-wider">
            <span>ERA DOSSIER / 0{index + 1}</span><span className="t-ink-muted">—</span><span>{era.label}</span>
          </div>
          <h1 className="font-['Fraunces'] font-bold t-ink leading-[1.04] mt-7 max-w-3xl" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontSize: "clamp(38px, 5.5vw, 82px)" }}>{era.title}</h1>
          <p className="font-['Manrope'] t-ink-muted leading-[1.65] mt-7 max-w-xl" style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}>{era.subtitle}</p>
          <div className="mt-10 pt-5 border-t t-border flex items-center justify-between max-w-xl font-mono text-[11px] t-ink-muted uppercase tracking-wide">
            <span>Mongolian Architectural Archives</span><span>{era.label}</span>
          </div>
        </div>
        {featuredImage ? (
          <figure className="m-0 min-w-0">
            <div className="t-card border rounded-2xl overflow-hidden aspect-[4/3]"><img src={featuredImage} alt={records[0].alt} className="w-full h-full object-cover" /></div>
            <figcaption className="font-mono text-[11px] t-ink-muted mt-3 flex justify-between gap-3"><span>FROM THE ARCHIVE / {records[0].ref}</span><span>{records[0].year}</span></figcaption>
          </figure>
        ) : (
          <div className="t-editorial border rounded-2xl aspect-[4/3] flex flex-col justify-between p-7 sm:p-10" aria-label="Archive period index">
            <span className="font-mono text-[12px] t-accent tracking-widest">MAA / PERIOD INDEX</span>
            <span className="font-['Fraunces'] t-ink leading-none" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontSize: "clamp(60px, 10vw, 150px)" }}>30—50</span>
            <span className="border-t t-border pt-4 font-mono text-[12px] t-ink-muted">DOCUMENTING A CITY IN TRANSITION</span>
          </div>
        )}
      </section>

      <section className="t-editorial border-y px-5 sm:px-10 lg:px-20 py-14 lg:py-20 grid lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] gap-8 lg:gap-20">
        <div><span className="font-mono text-[12px] t-accent uppercase tracking-wider">01 / Historical context</span><h2 className="font-['Fraunces'] t-ink leading-tight mt-5" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontSize: "clamp(28px, 3.5vw, 44px)" }}>Reading the built landscape</h2></div>
        <div className="flex flex-col gap-6 justify-center"><p className="font-['Manrope'] t-ink leading-[1.8] text-[16px]">{era.context}</p><p className="font-['Manrope'] t-ink-muted leading-[1.8] text-[15px]">{era.detail}</p></div>
      </section>

      <section className="px-5 sm:px-10 lg:px-20 py-14 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 border-b t-border pb-6">
          <div><span className="font-mono t-accent text-[12px] tracking-wider">02 / PERIOD REGISTER</span><h2 className="font-['Fraunces'] t-ink mt-3" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontSize: "clamp(28px, 3.5vw, 40px)" }}>Buildings & traces</h2></div>
          <span className="font-mono t-ink-muted text-[12px]">{era.tag}</span>
        </div>
        {records.length ? (
          <div className="grid md:grid-cols-2 gap-6">
            {records.map((record) => (
              <article key={record.ref} className="t-card border rounded-2xl overflow-hidden grid sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:grid-cols-1 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
                <img src={record.img} alt={record.alt} loading="lazy" className="w-full h-full min-h-56 max-h-80 object-cover" />
                <div className="p-6 sm:p-8 flex flex-col justify-between gap-8"><div><div className="flex justify-between gap-3 font-mono text-[11px] t-accent"><span>{record.ref}</span><span>{record.year}</span></div><h3 className="font-['Fraunces'] t-ink text-[24px] leading-tight mt-5" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>{record.title}</h3><p className="font-['Manrope'] t-ink-muted text-[14px] leading-[1.7] mt-4">{record.desc}</p></div><span className="font-mono t-ink-muted text-[11px] uppercase">{record.location}</span></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="t-card border rounded-2xl p-8 sm:p-12 max-w-3xl"><span className="font-mono t-accent text-[12px]">REGISTER NOTE / {era.label}</span><h3 className="font-['Fraunces'] t-ink text-[26px] mt-5" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>An interval of change and loss</h3><p className="font-['Manrope'] t-ink-muted text-[15px] leading-[1.7] mt-4">No building in the current featured register is dated to this interval. The period dossier remains open as historic plans, photographs and verified records are added.</p><a href="/#inquire" className="inline-block mt-7 font-mono t-accent text-[12px] underline underline-offset-4">CONTRIBUTE A RECORD ↗</a></div>
        )}
      </section>

      <section className="px-5 sm:px-10 lg:px-20 pb-16 lg:pb-24">
        <div className="bg-[#1d1f20] rounded-2xl p-7 sm:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"><div className="max-w-xl"><span className="font-mono text-[#d68c45] text-[12px] tracking-wider">FURTHER READING</span><h2 className="font-['Fraunces'] text-[#faf9f6] text-[28px] sm:text-[34px] mt-3" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>Continue the inquiry</h2><p className="font-['Manrope'] text-[#e5e1da] text-[14px] leading-[1.7] mt-3">Explore the wider historical context, or move through the architectural timeline.</p></div><a href={era.url} target="_blank" rel="noopener noreferrer" className="inline-flex self-start md:self-auto shrink-0 rounded-lg border border-[#e5e1da] text-[#faf9f6] px-5 py-3 font-['Manrope'] text-[13px] hover:opacity-70 transition-opacity">External period reference ↗</a></div>
        <nav aria-label="Other eras" className="flex flex-wrap gap-3 mt-8">{decades.map((other) => <a key={other.slug} href={`/eras/${other.slug}`} aria-current={other === era ? "page" : undefined} className={`t-pill border rounded-full px-4 py-3 font-mono text-[12px] hover:opacity-70 transition-opacity ${other === era ? "t-pill-active" : ""}`}>{other.label}</a>)}</nav>
      </section>
    </main>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const era = decades.find((decade) => window.location.pathname === `/eras/${decade.slug}`);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = era ? `${era.label} | Mongolian Architectural Archives` : "Mongolian Architectural Archives";
  }, [era]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className={`min-h-screen w-full overflow-x-hidden t-bg${darkMode ? " dark" : ""}`}>

      {/* NAV */}
      <header className="t-nav border-b sticky top-0 z-50">
        <nav className="flex items-center justify-between px-5 sm:px-10 lg:px-20 py-5">
          {/* Logo */}
          <a href="/" className="flex gap-3 items-center shrink-0">
            <div className="bg-[#1d1f20] flex items-center justify-center rounded-[6px] size-8 shrink-0">
              <span className="font-['Fraunces'] font-bold text-[#efece6] text-[18px] leading-none" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>M</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-['Fraunces'] font-bold t-ink text-[16px] leading-none" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>MONGOLIAN</span>
              <span className="font-mono font-normal t-accent text-[9px] leading-none">ARCHITECTURAL ARCHIVES</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex gap-10 font-['Manrope'] font-medium t-ink-muted text-[14px]">
            {["Collections", "History Map", "Timeline", "Research Note", "Inquire"].map(l => (
              <a key={l} href={`/#${l.toLowerCase().replace(" ", "-")}`}
                className="t-ink-muted hover:opacity-80 transition-opacity">{l}</a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex gap-4 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="t-theme-switch border flex gap-1 items-center p-1 rounded-full"
              aria-label="Toggle theme"
            >
              <div className={`flex items-center p-1.5 rounded-full transition-colors ${!darkMode ? "t-theme-btn-active" : ""}`}>
                <img src={imgSun} alt="Light mode" className="size-3.5" />
              </div>
              <div className={`flex items-center p-1.5 rounded-full transition-colors ${darkMode ? "t-theme-btn-active" : ""}`}>
                <img src={imgMoon} alt="Dark mode" className="size-3.5" />
              </div>
            </button>

            {searchOpen ? (
              <div className="t-search-pill border flex gap-2 items-center px-4 py-2.5 rounded-full">
                <img src={imgSearch} alt="" className="size-3.5 shrink-0" />
                <input
                  autoFocus
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  onKeyDown={e => e.key === "Escape" && setSearchOpen(false)}
                  className="bg-transparent font-['Manrope'] t-ink text-[12px] outline-none w-32 placeholder-[#66635f]"
                  placeholder="Search archives..."
                />
                <button onClick={() => setSearchOpen(false)} className="t-ink-muted text-xs ml-1" aria-label="Close search">✕</button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="t-search-pill border flex gap-2 items-center px-4 py-2.5 rounded-full hover:opacity-80 transition-opacity"
              >
                <img src={imgSearch} alt="" className="size-3.5" />
                <span className="font-['Manrope'] font-normal t-ink-muted text-[12px]">Search archives...</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-md hover:opacity-70 transition-opacity"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-[var(--color-ink)] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[var(--color-ink)] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[var(--color-ink)] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="px-5 pb-5 flex flex-col gap-4 border-t t-border">
            <div className="flex flex-col gap-3 pt-4">
              {["Collections", "History Map", "Timeline", "Research Note", "Inquire"].map(l => (
                <a key={l} href={`/#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setMenuOpen(false)}
                  className="font-['Manrope'] font-medium t-ink-muted text-[15px] hover:opacity-80 transition-opacity py-1">
                  {l}
                </a>
              ))}
            </div>
            <div className="flex gap-3 items-center pt-2 border-t t-border">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="t-theme-switch border flex gap-1 items-center p-1 rounded-full shrink-0"
                aria-label="Toggle theme"
              >
                <div className={`flex items-center p-1.5 rounded-full ${!darkMode ? "t-theme-btn-active" : ""}`}>
                  <img src={imgSun} alt="Light mode" className="size-3.5" />
                </div>
                <div className={`flex items-center p-1.5 rounded-full ${darkMode ? "t-theme-btn-active" : ""}`}>
                  <img src={imgMoon} alt="Dark mode" className="size-3.5" />
                </div>
              </button>
              <div className="t-search-pill border flex gap-2 items-center px-3 py-2 rounded-full flex-1">
                <img src={imgSearch} alt="" className="size-3.5 shrink-0" />
                <input
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  className="bg-transparent font-['Manrope'] t-ink text-[12px] outline-none w-full placeholder-[#66635f]"
                  placeholder="Search archives..."
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {era ? <EraPage era={era} /> : <main>
        {/* HERO */}
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center px-5 sm:px-10 lg:px-20 py-12 lg:py-20">
          <div className="flex flex-col gap-6 lg:gap-7 flex-1 min-w-0">
            <div className="flex gap-2 items-center flex-wrap">
              <span className="font-mono font-semibold t-accent text-[12px]">COLL. 1910 — 2020</span>
              <div className="bg-[var(--color-border)] rounded-sm size-1 shrink-0" />
              <span className="font-mono font-normal t-ink-muted text-[12px]">48.86° N, 106.91° E</span>
            </div>
            <h1
              className="font-['Fraunces'] font-bold t-ink leading-[1.05]"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontSize: "clamp(32px, 5vw, 56px)" }}
            >
              Preserving the nomadic, socialist &amp; modern plaster of Mongolia
            </h1>
            <p className="font-['Manrope'] font-normal t-ink-muted text-[15px] lg:text-[16px] leading-[1.6] max-w-2xl">
              A comprehensive physical and digital catalog tracing Mongolia's built transformation—from the wooden monasteries and traditional round gers of the early 20th century to Soviet-era concrete masterworks and the raw, rapid glass towers of modern Ulaanbaatar.
            </p>
            <div className="flex gap-4 items-start flex-wrap">
              <button className="bg-[var(--color-ink)] flex gap-2 items-center px-6 py-3.5 rounded-lg hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-[#c57b57]">
                <span className="font-['Manrope'] font-semibold text-[var(--color-bg)] text-[14px]">Explore the Registers</span>
                <img src={imgArrowRight} alt="" className="size-3.5" />
              </button>
              <button className="t-card border px-6 py-3.5 rounded-lg hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-[#c57b57]">
                <span className="font-['Manrope'] font-semibold t-ink text-[14px]">Scholarly Index</span>
              </button>
            </div>
          </div>
          <div className="t-card border rounded-2xl overflow-hidden shrink-0 w-full lg:w-[580px] h-[280px] sm:h-[360px] lg:h-[460px]">
            <img
              src={imgHeroImg}
              alt="Soviet-era architectural building in Ulaanbaatar, Mongolia"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ARCHITECTURAL METAMORPHOSIS */}
        <section id="collections" className="px-5 sm:px-10 lg:px-20 pt-8 pb-6">
          <div className="t-editorial border-t border-b flex flex-col lg:flex-row gap-10 lg:gap-20 px-6 sm:px-10 lg:px-20 py-12 lg:py-16">
            <div className="flex flex-col gap-5 flex-1 min-w-0">
              <span className="font-mono font-semibold t-accent text-[12px] uppercase">A Century of Plaster and Sky</span>
              <h2
                className="font-['Fraunces'] font-semibold t-ink leading-tight"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontSize: "clamp(24px, 3.5vw, 32px)" }}
              >
                The Architectural Metamorphosis
              </h2>
              <p className="font-['Manrope'] font-normal t-ink-muted text-[15px] leading-[1.6]">
                Mongolian architecture represents a singular collision of climatic survival and political gravity. From the wooden structural integrity of the Gandantegchinlen Monastery surviving revolutions, through the heavy pre-cast concrete block districts designed for severe -40°C winters, to contemporary developments, this archive provides an unvarnished technical look at the structural decisions made in our shifting capital.
              </p>
            </div>
            <div className="t-trivia flex flex-col gap-5 p-7 rounded-2xl shrink-0 w-full lg:w-[420px]">
              <span className="font-mono font-semibold t-accent2 text-[12px]">ARCHIVE TRIVIA</span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-['Fraunces'] font-semibold t-ink text-[18px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
                  The Portable Foundation
                </h3>
                <p className="font-['Manrope'] font-normal t-ink-muted text-[13px] leading-[1.5]">
                  Early 20th-century temples like the Megjid Janraisig were technically framed with modular timber, taking structural cues from the physics of nomadic gers.
                </p>
              </div>
              <hr className="border-[var(--color-border)]" />
              <div className="flex flex-col gap-1.5">
                <h3 className="font-['Fraunces'] font-semibold t-ink text-[18px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
                  The 1970s Modernism Surge
                </h3>
                <p className="font-['Manrope'] font-normal t-ink-muted text-[13px] leading-[1.5]">
                  Over 65% of downtown Ulaanbaatar's civic monuments utilize heavy mineral concrete mixed with local volcanic basalt aggregates to withstand seismic shifts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DECADES OF TRANSFORMATION */}
        <section id="timeline" className="flex flex-col gap-6 px-5 sm:px-10 lg:px-20 pt-10 pb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="font-mono font-semibold t-accent text-[12px]">FILTER CATALOGUE</span>
              <h2
                className="font-['Fraunces'] font-semibold t-ink"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontSize: "clamp(26px, 4vw, 36px)" }}
              >
                Decades of Transformation
              </h2>
            </div>
            <span className="font-mono font-normal t-ink-muted text-[12px]">Select an era to explore its buildings and history</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {decades.map((d) => (
              <div key={d.label} className="flex items-center gap-1.5">
                <a href={`/eras/${d.slug}`} className="t-pill flex items-center justify-center px-[18px] py-3 rounded-full border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] font-mono text-[13px]">{d.label}</a>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Learn about ${d.label} Mongolian architecture`}
                  className="t-ink-muted hover:t-accent transition-opacity hover:opacity-70 text-[11px] font-mono underline underline-offset-2 decoration-dotted"
                  aria-label={`External resource: ${d.label} architecture`}
                >
                  ↗
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHIVE CARD GRID */}
        <section className="px-5 sm:px-10 lg:px-20 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <article
                key={card.ref}
                className="t-card border rounded-2xl p-6 flex flex-col gap-4 shadow-[0px_6px_9px_rgba(29,31,32,0.04)] hover:shadow-[0px_12px_24px_rgba(29,31,32,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="t-card-img rounded-xl overflow-hidden h-[220px] shrink-0">
                  <img
                    src={card.img}
                    alt={card.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between font-mono font-medium text-[11px]">
                  <span className="t-accent">{card.ref}</span>
                  <span className="t-ink-muted">{card.year}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-['Fraunces'] font-semibold t-ink text-[22px] leading-tight" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
                    {card.title}
                  </h3>
                  <div className="flex gap-1 items-center">
                    <img src={imgMapPin} alt="" className="size-3 shrink-0" />
                    <span className="font-['Manrope'] font-normal t-ink-muted text-[12px]">{card.location}</span>
                  </div>
                </div>
                <p className="font-['Manrope'] font-normal t-ink-muted text-[13px] leading-[1.5] overflow-hidden text-ellipsis" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                  {card.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* SCHOLARLY NOTE */}
        <section id="research-note" className="px-5 sm:px-10 lg:px-20 py-12">
          <div className="bg-[#1d1f20] rounded-2xl p-8 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <img src={imgInfo} alt="" className="size-3.5 shrink-0" />
              <span className="font-mono font-semibold text-[#d68c45] text-[12px] uppercase">Archival Note &amp; Methodology</span>
            </div>
            <p className="font-['Fraunces'] font-semibold text-[#faf9f6] text-[20px] leading-tight" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
              "Continuous verification ensures historic integrity."
            </p>
            <p className="font-['Manrope'] font-normal text-[#e5e1da] text-[14px] leading-[1.6]">
              Please note that dates, architect assignments, and restoration histories within these registers represent continuous, ongoing scholarly research. We rely strictly on verified state blueprints, regional structural surveys, and primary socialist-era documents. If you have verified physical blueprints or structural notes, please use our dispatch form below.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="inquire" className="flex flex-col lg:flex-row gap-10 lg:gap-16 px-5 sm:px-10 lg:px-20 py-12 lg:py-20">
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            <span className="font-mono font-semibold t-accent text-[12px] uppercase">DISPATCH DESK</span>
            <h2
              className="font-['Fraunces'] font-bold t-ink leading-tight"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              Contribute blue prints or register adjustments
            </h2>
            <p className="font-['Manrope'] font-normal t-ink-muted text-[15px] leading-[1.6]">
              We welcome submissions of historical photography, structural blueprints, and documented restoration notes from past centuries. Help us bridge the gaps in our cultural heritage index.
            </p>
            {submitted && (
              <div className="bg-[#ebf3ec] border border-[#3b6e53] flex gap-3.5 items-center p-5 rounded-xl">
                <div className="bg-[#3b6e53] rounded-[5px] size-2.5 shrink-0" />
                <div className="flex flex-col gap-0.5 text-[#3b6e53]">
                  <p className="font-['Manrope'] font-bold text-[14px]">Submission Received Successfully</p>
                  <p className="font-['Manrope'] font-normal text-[12px]">Thank you. Our editorial scholars will verify your blueprint data.</p>
                </div>
              </div>
            )}
          </div>
          <div className="t-form-card border rounded-2xl p-8 flex flex-col gap-6 w-full lg:w-[520px] shrink-0">
            <h3 className="font-['Fraunces'] font-semibold t-ink text-[24px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
              Inquiry Registration
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-['Manrope'] font-semibold t-ink-muted text-[12px]">Full Scholar Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Tsolmon Batbayar"
                  className="t-input font-['Manrope'] text-[14px] placeholder-[#66635f] p-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--color-accent)] w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-['Manrope'] font-semibold t-ink-muted text-[12px]">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="t.batbayar@academy.mn"
                  className="t-input font-['Manrope'] text-[14px] placeholder-[#66635f] p-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--color-accent)] w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-['Manrope'] font-semibold t-ink-muted text-[12px]">Blueprint details or structural notes</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Sending digital scan of original 1974 blueprint revisions for the Sukhbaatar administrative halls..."
                  rows={4}
                  className="t-input font-['Manrope'] text-[14px] placeholder-[#66635f] p-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--color-accent)] w-full resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[var(--color-ink)] flex items-center justify-center px-6 py-3.5 rounded-lg hover:opacity-80 transition-opacity w-full focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] mt-2"
              >
                <span className="font-['Manrope'] font-semibold text-[var(--color-bg)] text-[14px]">Submit to Register</span>
              </button>
            </form>
          </div>
        </section>
      </main>}

      {/* FOOTER */}
      <footer className="t-footer flex flex-col gap-12 px-5 sm:px-10 lg:px-20 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:justify-between">
          <div className="flex flex-col gap-3 max-w-sm">
            <p className="font-['Fraunces'] font-bold text-[#efece6] text-[20px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
              Mongolian Architectural Archives
            </p>
            <p className="font-['Manrope'] font-normal t-footer-text text-[13px] leading-[1.5]">
              Dedicated to documenting and indexing the physical blueprints, seismic histories, and ornamental concrete heritages of the Mongolian plateau.
            </p>
          </div>
          <div className="flex gap-16 flex-wrap">
            <div className="flex flex-col gap-3">
              <span className="font-mono font-semibold text-[#c57b57] text-[11px] uppercase">REGISTERS</span>
              {["Soviet Modernism", "Buddhist Traditional", "Qing Synthesis", "Nomadic Gers"].map(l => (
                <a key={l} href="#" className="font-['Manrope'] font-normal t-footer-text text-[13px] hover:text-white transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono font-semibold text-[#c57b57] text-[11px] uppercase">ACADEMY</span>
              {["Library blue prints", "Scholarly dispatch", "Seismic research"].map(l => (
                <a key={l} href="#" className="font-['Manrope'] font-normal t-footer-text text-[13px] hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-[#2f3234]" />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center sm:justify-between font-mono font-normal t-footer-text text-[11px]">
          <span>© 2026 MONGOLIAN ARCHITECTURAL ARCHIVES INC.</span>
          <span>COORDINATES: 48.861° N, 106.918° E</span>
        </div>
      </footer>
    </div>
  );
}
