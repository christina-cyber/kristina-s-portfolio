import { useEffect, useRef, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

interface Project {
  name: string;
  year: string;
  category: string;
  description: string;
  stack: string[];
  status: "Live" | "In Progress" | "Archived";
  liveUrl?: string;
  githubUrl?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════════════════

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useTypewriter(texts: string[], speed = 100) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < text.length) {
            setCurrentText(text.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((currentIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts, speed]);

  return currentText;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED PARTICLES
// ═══════════════════════════════════════════════════════════════════════════════

function GoldenParticles({ count = 30 }: { count?: number }) {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 15,
      opacity: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 30,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: `-${p.size * 2}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "var(--fossil-gold)",
            opacity: p.opacity,
            animation: `particleFloat ${p.speed}s linear infinite`,
            animationDelay: `${-Math.random() * p.speed}s`,
            ["--drift" as any]: `${p.drift}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
          }
          90% {
            opacity: var(--opacity);
          }
          100% {
            transform: translateY(-100vh) translateX(var(--drift));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SVG COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function SlytherineSnake({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 380 C60 340 40 300 60 260 C80 220 120 220 140 180 C160 140 150 100 120 70 C90 40 50 40 40 20"
        stroke="var(--slytherin-green)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        style={{ animation: "snakeWave 4s ease-in-out infinite" }}
      />
      <ellipse cx="38" cy="16" rx="10" ry="7" fill="var(--slytherin-green)" />
      <circle cx="34" cy="13" r="2" fill="var(--fossil-gold)" />
      <circle cx="42" cy="13" r="2" fill="var(--fossil-gold)" />
      <path d="M33 20 L38 26 L43 20" stroke="var(--fossil-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <style>{`
        @keyframes snakeWave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
      `}</style>
    </svg>
  );
}

function SlytherineCreest({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <polygon points="16,2 30,8 30,24 16,30 2,24 2,8" fill="var(--slytherin-green)" stroke="var(--fossil-gold)" strokeWidth="1.5" />
      <path d="M16 8 C12 12 10 16 12 20 C14 24 18 24 20 20 C22 16 20 12 16 8Z" fill="var(--fossil-gold)" opacity="0.8" />
      <circle cx="16" cy="16" r="2" fill="var(--great-hall-midnight)" />
      <path d="M13 11 L10 14" stroke="var(--fossil-gold)" strokeWidth="1" strokeLinecap="round" />
      <path d="M19 11 L22 14" stroke="var(--fossil-gold)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function CatSilhouette() {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path
        d="M15 60 L10 40 L15 30 L20 25 L25 30 L30 25 L40 20 L50 25 L55 30 L60 25 L65 30 L70 40 L65 60 L60 70 L50 75 L40 75 L30 70 L20 65 Z"
        fill="var(--ancient-brass)"
        opacity="0.6"
      />
      {!blink && (
        <>
          <circle cx="35" cy="45" r="3" fill="var(--fossil-gold)" />
          <circle cx="55" cy="45" r="3" fill="var(--fossil-gold)" />
        </>
      )}
      {blink && (
        <>
          <line x1="32" y1="45" x2="38" y2="45" stroke="var(--fossil-gold)" strokeWidth="2" />
          <line x1="52" y1="45" x2="58" y2="45" stroke="var(--fossil-gold)" strokeWidth="2" />
        </>
      )}
      <path d="M15 15 L20 5 L25 15" stroke="var(--ancient-brass)" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M65 15 L60 5 L55 15" stroke="var(--ancient-brass)" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#lore" },
    { label: "Arsenal", href: "#arsenal" },
    { label: "Collection", href: "#collection" },
    { label: "Excavation Log", href: "#excavations" },
    { label: "Field Notes", href: "#fieldnotes" },
    { label: "Owl Post", href: "#contact" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(13, 13, 13, 0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SlytherineCreest size={28} />
            <span className="text-lg" style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}>
              Krishtina Khaiwada
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-[15px] relative group"
                style={{ color: "var(--old-vellum)" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                  style={{ background: "var(--lumos-green)" }}
                />
              </a>
            ))}
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="w-6 h-0.5" style={{ background: "var(--fossil-gold)" }} />
            <span className="w-6 h-0.5" style={{ background: "var(--fossil-gold)" }} />
            <span className="w-6 h-0.5" style={{ background: "var(--fossil-gold)" }} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          style={{ background: "var(--aged-parchment-dark)" }}
        >
          <button
            className="absolute top-8 right-8 text-4xl"
            style={{ color: "var(--fossil-gold)" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-2xl"
                style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  const terminalText = useTypewriter([
    "$ whoami\n> developer. slytherin. cat person.",
    "$ skills --list\n> [loading ancient knowledge...]",
  ], 80);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--great-hall-midnight)" }}
    >
      <GoldenParticles count={30} />

      <div className="absolute inset-0 opacity-10">
        <SlytherineSnake className="absolute right-[10%] top-[15%] w-48 h-96 opacity-40" />
      </div>

      <div className="absolute bottom-8 right-8 opacity-40">
        <CatSilhouette />
      </div>

      <div className="relative z-10 text-center px-8 max-w-4xl">
        <h1
          className="text-6xl md:text-[80px] mb-6 animate-fadeIn"
          style={{
            fontFamily: "Cinzel",
            fontWeight: 500,
            color: "var(--parchment-cream)",
          }}
        >
          I create, therefore I am.
        </h1>

        <p
          className="text-xl md:text-[20px] mb-12"
          style={{ color: "var(--old-vellum)" }}
        >
          Krishtina Khaiwada | Web Developer | UI/UX Designer | Cat Lover
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#excavations"
            className="px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--slytherin-green)",
              color: "var(--parchment-cream)",
              fontFamily: "Cinzel",
            }}
          >
            View Excavations
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: "var(--fossil-gold)",
              color: "var(--fossil-gold)",
              fontFamily: "Cinzel",
            }}
          >
            Send Owl
          </a>
        </div>

        <div
          className="max-w-2xl mx-auto p-6 rounded-lg font-mono text-sm text-left"
          style={{
            background: "var(--ravenclaw-midnight)",
            color: "var(--lumos-green)",
          }}
        >
          <div className="whitespace-pre-wrap">
            {terminalText}
            <span className="animate-pulse">_</span>
          </div>
        </div>

        <div className="mt-16 animate-bounce">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 10 L20 30 M20 30 L15 25 M20 30 L25 25" stroke="var(--fossil-gold)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT / THE LORE
// ═══════════════════════════════════════════════════════════════════════════════

function LoreSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="lore"
      ref={ref}
      className="py-24 px-8"
      style={{ background: "var(--aged-parchment-dark)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-[40%_60%] gap-12 items-center">
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div
              className="relative p-2 rounded-lg"
              style={{ border: "4px solid var(--dungeon-wall)" }}
            >
              <div
                className="w-full aspect-square rounded-lg flex items-center justify-center text-6xl"
                style={{ background: "var(--candlelit-stone)" }}
              >
                🧙‍♂️
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <h2
              className="text-4xl mb-6"
              style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}
            >
              The Lore
            </h2>

            <div className="space-y-4 text-[16px] leading-[1.7]" style={{ color: "var(--old-vellum)" }}>
              <p>
               Welcome to my digital grimoire, a place where code meets curiosity and every project is a new spell waiting to be cast. I'm Krishtina, a full stack developer with a penchant for the mystical and the historical. My journey into the world of programming began as a quest for knowledge, driven by an insatiable curiosity about how things work and a desire to create magic through code.
              </p>
             
              <p>
                This portfolio is my cabinet of curiosities, a collection of projects, interests, and skills accumulated
                over years of exploration. Each section reveals a different facet of who I am, both as a developer and
                as a perpetually curious human.
              </p>
              <p>
                Oh, and I'm a devoted cat person. If you're here to talk tech, history, or felines, you're in the right place.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// THE ARSENAL (Skills)
// ═══════════════════════════════════════════════════════════════════════════════

function ArsenalSection() {
  const { ref, inView } = useInView();

  const skillIcons: Record<string, JSX.Element> = {
    Python: (
      <svg
        viewBox="0 0 64 64"
        className="inline-block w-8 h-8"
        aria-hidden="true"
      >
        <path
          d="M34 10h-6a10 10 0 0 0-10 10v7h18a8 8 0 0 1 8 8v9h6a10 10 0 0 0 10-10V26a16 16 0 0 0-16-16Z"
          fill="var(--enchanted-blue)"
        />
        <circle cx="30" cy="17" r="2" fill="var(--parchment-cream)" />
        <path
          d="M30 54h6a10 10 0 0 0 10-10v-7H28a8 8 0 0 1-8-8v-9h-6a10 10 0 0 0-10 10v8a16 16 0 0 0 16 16Z"
          fill="var(--fossil-gold)"
        />
        <circle cx="34" cy="47" r="2" fill="var(--great-hall-midnight)" />
      </svg>
    ),
    JavaScript: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <rect x="8" y="8" width="48" height="48" rx="8" fill="var(--fossil-gold)" />
        <text x="32" y="40" textAnchor="middle" fontSize="20" fontFamily="Cinzel" fill="var(--great-hall-midnight)">
          JS
        </text>
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <rect x="8" y="8" width="48" height="48" rx="8" fill="var(--enchanted-blue)" />
        <text x="32" y="40" textAnchor="middle" fontSize="20" fontFamily="Cinzel" fill="var(--parchment-cream)">
          TS
        </text>
      </svg>
    ),
    "HTML/CSS": (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <path d="M12 10h40l-4 38-16 6-16-6-4-38Z" fill="var(--ancient-brass)" />
        <path d="M32 18v30l12-4 3-26H32Z" fill="var(--fossil-gold)" />
        <path d="M20 22h12v6H26l1 6h5v6H22l-2-18Z" fill="var(--great-hall-midnight)" />
        <path d="M44 22H32v6h11l-1 12-10 4v-6l6-2 1-4H32v-6h12l1-6Z" fill="var(--great-hall-midnight)" />
      </svg>
    ),
    SQL: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <ellipse cx="32" cy="16" rx="18" ry="6" fill="var(--fossil-gold)" />
        <path d="M14 16v22c0 3 8 6 18 6s18-3 18-6V16" fill="var(--ancient-brass)" />
        <ellipse cx="32" cy="38" rx="18" ry="6" fill="var(--fossil-gold)" />
      </svg>
    ),
    React: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <circle cx="32" cy="32" r="4" fill="var(--parchment-cream)" />
        <ellipse cx="32" cy="32" rx="22" ry="10" stroke="var(--enchanted-blue)" strokeWidth="3" fill="none" />
        <ellipse cx="32" cy="32" rx="10" ry="22" stroke="var(--enchanted-blue)" strokeWidth="3" fill="none" />
        <ellipse cx="32" cy="32" rx="18" ry="8" stroke="var(--enchanted-blue)" strokeWidth="3" fill="none" transform="rotate(60 32 32)" />
      </svg>
    ),
    "Node.js": (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <polygon points="32,6 56,20 56,44 32,58 8,44 8,20" fill="var(--slytherin-green)" />
        <text x="32" y="38" textAnchor="middle" fontSize="16" fontFamily="Cinzel" fill="var(--parchment-cream)">
          NODE
        </text>
      </svg>
    ),
    "Next.js": (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <circle cx="32" cy="32" r="22" fill="var(--great-hall-midnight)" stroke="var(--parchment-cream)" strokeWidth="2" />
        <text x="32" y="38" textAnchor="middle" fontSize="16" fontFamily="Cinzel" fill="var(--parchment-cream)">
          NEXT
        </text>
      </svg>
    ),
    Express: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <rect x="10" y="12" width="44" height="40" rx="10" fill="var(--ravenclaw-midnight)" />
        <text x="32" y="38" textAnchor="middle" fontSize="16" fontFamily="Cinzel" fill="var(--parchment-cream)">
          EX
        </text>
      </svg>
    ),
    Django: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <rect x="10" y="8" width="44" height="48" rx="6" fill="var(--slytherin-green)" />
        <text x="32" y="40" textAnchor="middle" fontSize="18" fontFamily="Cinzel" fill="var(--parchment-cream)">
          DJ
        </text>
      </svg>
    ),
    Git: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <polygon points="32,8 56,32 32,56 8,32" fill="var(--ancient-brass)" />
        <circle cx="28" cy="28" r="3" fill="var(--great-hall-midnight)" />
        <circle cx="36" cy="36" r="3" fill="var(--great-hall-midnight)" />
        <path d="M28 28 L36 36" stroke="var(--great-hall-midnight)" strokeWidth="2" />
      </svg>
    ),
    Docker: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <rect x="12" y="26" width="8" height="8" fill="var(--enchanted-blue)" />
        <rect x="22" y="26" width="8" height="8" fill="var(--enchanted-blue)" />
        <rect x="32" y="26" width="8" height="8" fill="var(--enchanted-blue)" />
        <rect x="22" y="16" width="8" height="8" fill="var(--enchanted-blue)" />
        <rect x="32" y="16" width="8" height="8" fill="var(--enchanted-blue)" />
        <rect x="42" y="26" width="8" height="8" fill="var(--enchanted-blue)" />
        <path d="M10 38h38c0 6-6 12-18 12H20C12 50 10 44 10 38Z" fill="var(--ancient-brass)" />
      </svg>
    ),
    Figma: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <circle cx="24" cy="18" r="8" fill="var(--fossil-gold)" />
        <circle cx="40" cy="18" r="8" fill="var(--divination-purple)" />
        <circle cx="24" cy="34" r="8" fill="var(--enchanted-blue)" />
        <circle cx="40" cy="34" r="8" fill="var(--ancient-brass)" />
        <circle cx="24" cy="50" r="8" fill="var(--slytherin-green)" />
      </svg>
    ),
    AWS: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <path d="M20 38a8 8 0 0 1 6-14 10 10 0 0 1 19 4 7 7 0 0 1 1 14H20Z" fill="var(--fossil-gold)" />
        <path d="M18 48c8 4 20 4 28 0" stroke="var(--ancient-brass)" strokeWidth="2" fill="none" />
      </svg>
    ),
    "VS Code": (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <path d="M48 10 26 24 14 16 8 22 18 32 8 42 14 48 26 40 48 54Z" fill="var(--enchanted-blue)" />
        <polygon points="48,10 56,14 56,50 48,54" fill="var(--ravenclaw-midnight)" />
      </svg>
    ),
    PostgreSQL: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <path d="M32 10c10 0 18 6 18 14 0 7-6 12-10 12v8c0 5-4 10-8 10s-8-5-8-10v-8c-4 0-10-5-10-12 0-8 8-14 18-14Z" fill="var(--enchanted-blue)" />
        <circle cx="26" cy="24" r="2" fill="var(--parchment-cream)" />
        <circle cx="38" cy="24" r="2" fill="var(--parchment-cream)" />
      </svg>
    ),
    MongoDB: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <path d="M32 8c8 10 10 22 6 34-2 6-4 10-6 14-2-4-4-8-6-14-4-12-2-24 6-34Z" fill="var(--slytherin-green)" />
        <path d="M32 16v40" stroke="var(--ancient-brass)" strokeWidth="2" />
      </svg>
    ),
    Redis: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <polygon points="12,20 32,12 52,20 32,28" fill="var(--restricted-red)" />
        <polygon points="12,32 32,24 52,32 32,40" fill="var(--ancient-brass)" />
        <polygon points="12,44 32,36 52,44 32,52" fill="var(--fossil-gold)" />
      </svg>
    ),
    SQLite: (
      <svg viewBox="0 0 64 64" className="inline-block w-8 h-8" aria-hidden="true">
        <ellipse cx="32" cy="18" rx="16" ry="6" fill="var(--ravenclaw-midnight)" />
        <path d="M16 18v22c0 3 7 6 16 6s16-3 16-6V18" fill="var(--enchanted-blue)" />
        <ellipse cx="32" cy="40" rx="16" ry="6" fill="var(--ravenclaw-midnight)" />
      </svg>
    ),
  };

  const skills = {
    "Spellwork (Languages)": ["Python", "JavaScript", "TypeScript", "HTML/CSS", "SQL"],
    "Ancient Tomes (Frameworks)": ["React", "Node.js", "Next.js", "Express", "Django"],
    "Relics (Tools)": ["Git", "Docker", "Figma", "AWS", "VS Code"],
    "Scrolls (Databases)": ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
  };

  return (
    <section
      id="arsenal"
      ref={ref}
      className="py-24 px-8"
      style={{ background: "var(--great-hall-midnight)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="text-4xl text-center mb-16"
          style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}
        >
          The Arsenal
        </h2>

        <div className="space-y-12">
          {Object.entries(skills).map(([category, items], catIdx) => (
            <div key={category}>
              <h3
                className="text-2xl mb-6 text-center"
                style={{ fontFamily: "Cinzel", color: "var(--fossil-gold)" }}
              >
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {items.map((skill, idx) => (
                  <div
                    key={skill}
                    className={`skill-brick p-6 rounded-lg text-center transition-all duration-300 hover:scale-105 cursor-pointer ${
                      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      background: "var(--candlelit-stone)",
                      border: "2px solid var(--dungeon-wall)",
                      transitionDelay: `${catIdx * 100 + idx * 50}ms`,
                    }}
                  >
                    <div
                      className="text-3xl mb-3"
                      style={{ color: "var(--ancient-brass)" }}
                    >
                      {skillIcons[skill] ?? "⚒️"}
                    </div>
                    <div
                      className="text-xs uppercase tracking-wider"
                      style={{ fontFamily: "Cinzel", color: "var(--faded-ink)" }}
                    >
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-brick:hover {
          border-color: var(--fossil-gold);
          box-shadow: 0 0 20px rgba(200, 168, 75, 0.3);
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// THE COLLECTION (Interests)
// ═══════════════════════════════════════════════════════════════════════════════

function CollectionSection() {
  const { ref, inView } = useInView();

  const interests = [
    {
      icon: "🏺",
      title: "Archaeology",
      note: "Fascinated by the layers of time and what they reveal about human history.",
    },
    {
      icon: "📖",
      title: "History",
      note: "Ancient civilizations, medieval manuscripts, and everything in between.",
    },
    {
      icon: "🦖",
      title: "Dinosaurs",
      note: "From Triceratops to T-Rex—the original rulers of the Earth.",
    },
    {
      icon: "⚡",
      title: "Harry Potter",
      note: "Proud Slytherin. Ambition, cunning, and a love for the wizarding world.",
    },
    {
      icon: "🐈",
      title: "Cats",
      note: "Independent, curious, mysterious—what's not to love?",
    },
  ];

  return (
    <section
      id="collection"
      ref={ref}
      className="py-24 px-8"
      style={{ background: "var(--aged-parchment-dark)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="text-4xl text-center mb-16"
          style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}
        >
          The Collection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interests.map((interest, idx) => (
            <div
              key={interest.title}
              className={`group collection-card p-8 rounded-lg transition-all duration-500 cursor-pointer ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                background: "var(--candlelit-stone)",
                border: "2px solid var(--dungeon-wall)",
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              <div className="text-center">
                <div
                  className="text-6xl mb-4"
                  style={{ color: "var(--ancient-brass)" }}
                >
                  {interest.icon}
                </div>
                <h3
                  className="text-xl mb-4"
                  style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}
                >
                  {interest.title}
                </h3>
                <p
                  className="text-sm italic opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "var(--old-vellum)" }}
                >
                  {interest.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .collection-card:hover {
          transform: translateY(-8px);
          border-color: var(--fossil-gold);
          box-shadow: 0 8px 32px rgba(200, 168, 75, 0.3);
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXCAVATION LOG (Projects)
// ═══════════════════════════════════════════════════════════════════════════════

function ExcavationLog() {
  const { ref, inView } = useInView();

  const projects: Project[] = [
    {
      name: "Farm to Consumer B2C E-Commerce App",
      year: "2025",
      category: "Web App",
      description: "A full-stack B2C e-commerce platform connecting farmers directly with consumers, enabling fresh produce discovery, seamless ordering, and direct farm-to-table purchasing.",
      stack: ["React", "TypeScript", "Node.js", "Express"],
      status: "Live",
      liveUrl: "https://farm-to-concumer-b2c-ecommerce-app.vercel.app",
      githubUrl: "https://github.com/christina-cyber/farm-to-concumer-b2c-ecommerce-app",
    },
    {
      name: "Old Developer Portfolio",
      year: "2025",
      category: "Website",
      description: "A personal portfolio website showcasing projects, skills, and experience — built with Next.js and TypeScript, featuring a clean and responsive design.",
      stack: ["Next.js", "TypeScript", "CSS"],
      status: "Live",
      liveUrl: "https://portfolio-red-five-89.vercel.app",
      githubUrl: "https://github.com/christina-cyber/portfolio",
    },
    {
      name: "Nepali Calendar App",
      year: "2025",
      category: "Mobile App",
      description: "A Bikram Sambat (BS) calendar app for mobile featuring AD/BS date conversion, Nepali month navigation, and local holidays — bridging the traditional Nepali calendar with modern mobile experiences.",
      stack: ["React Native", "TypeScript"],
      status: "In Progress",
      liveUrl: "#",
      githubUrl: "https://github.com/christina-cyber",
    },
  ];

  const getStatusStyle = (status: Project["status"]) => {
    switch (status) {
      case "Live":
        return { bg: "var(--fossil-gold)", text: "var(--great-hall-midnight)" };
      case "In Progress":
        return { bg: "var(--enchanted-blue)", text: "var(--parchment-cream)" };
      case "Archived":
        return { bg: "var(--restricted-red)", text: "var(--old-vellum)" };
    }
  };

  return (
    <section
      id="excavations"
      ref={ref}
      className="py-24 px-8 relative overflow-hidden"
      style={{ background: "var(--great-hall-midnight)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="text-4xl text-center mb-16"
          style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}
        >
          Excavation Log
        </h2>

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div
              key={project.name}
              className={`project-card p-8 rounded-xl transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{
                background: "var(--candlelit-stone)",
                border: "2px solid var(--dungeon-wall)",
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3
                      className="text-2xl"
                      style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}
                    >
                      {project.name}
                    </h3>
                    <span
                      className="px-3 py-1 rounded text-xs"
                      style={{
                        background: "var(--ancient-brass)",
                        color: "var(--great-hall-midnight)",
                        fontFamily: "Cinzel",
                      }}
                    >
                      {project.year}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        background: "var(--ravenclaw-midnight)",
                        color: "var(--enchanted-blue)",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--old-vellum)" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: "var(--slytherin-green)",
                          color: "var(--parchment-cream)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="text-sm hover:underline"
                        style={{ color: "var(--fossil-gold)" }}
                      >
                        🏺 Live Site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="text-sm hover:underline"
                        style={{ color: "var(--enchanted-blue)" }}
                      >
                        📜 GitHub
                      </a>
                    )}
                  </div>
                </div>

                <div
                  className="status-seal flex items-center justify-center w-24 h-24 rounded-full text-center text-xs animate-stamp"
                  style={{
                    background: getStatusStyle(project.status).bg,
                    color: getStatusStyle(project.status).text,
                    fontFamily: "Cinzel",
                    fontWeight: 600,
                  }}
                >
                  {project.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes stamp {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-stamp {
          animation: stamp 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FIELD NOTES
// ═══════════════════════════════════════════════════════════════════════════════

function FieldNotesSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="fieldnotes"
      ref={ref}
      className="py-24 px-8"
      style={{ background: "var(--candlelit-stone)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="text-4xl text-center mb-16"
          style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}
        >
          Field Notes
        </h2>

        <div className="min-h-[120px]" aria-hidden={!inView} />
      </div>

      <style>{`
        .field-note:hover {
          border-color: var(--fossil-gold);
          box-shadow: 0 4px 16px rgba(200, 168, 75, 0.2);
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OWL POST (Contact)
// ═══════════════════════════════════════════════════════════════════════════════

function OwlPostSection() {
  const { ref, inView } = useInView();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const apiBase = import.meta.env.VITE_API_BASE_URL ?? "";

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setSubmitError("");

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");
      const payload = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const message =
          isJson && payload && typeof payload === "object" && "error" in payload
            ? String(payload.error)
            : "Failed to send email.";
        setSubmitStatus("error");
        setSubmitError(message);
        return;
      }

      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Contact form failed:", error);
      setSubmitStatus("error");
      setSubmitError("Failed to send email.");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-8 relative"
      style={{ background: "var(--aged-parchment-dark)" }}
    >
      <GoldenParticles count={15} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className={`mb-8 p-4 rounded-lg text-center transition-all duration-700 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            background: "var(--fossil-gold)",
            color: "var(--great-hall-midnight)",
          }}
        >
          <span style={{ fontFamily: "Cinzel", fontWeight: 600 }}>
            📌 Open to new expeditions
          </span>
        </div>

        <div
          className={`p-12 rounded-lg transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{
            background: "var(--candlelit-stone)",
            border: "2px solid var(--dungeon-wall)",
          }}
        >
          <h2
            className="text-4xl text-center mb-8"
            style={{ fontFamily: "Cinzel", color: "var(--parchment-cream)" }}
          >
            Owl Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-transparent border-b-2 pb-2 outline-none transition-colors duration-300 focus:border-[var(--fossil-gold)]"
                style={{
                  borderColor: "var(--dungeon-wall)",
                  color: "var(--parchment-cream)",
                }}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="your.owl@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-transparent border-b-2 pb-2 outline-none transition-colors duration-300 focus:border-[var(--fossil-gold)]"
                style={{
                  borderColor: "var(--dungeon-wall)",
                  color: "var(--parchment-cream)",
                }}
              />
            </div>
            <div>
              <textarea
                placeholder="Your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full bg-transparent border-2 p-4 rounded-lg outline-none transition-colors duration-300 focus:border-[var(--fossil-gold)]"
                style={{
                  borderColor: "var(--dungeon-wall)",
                  color: "var(--parchment-cream)",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={submitStatus === "sending"}
              className="w-full py-3 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--slytherin-green)",
                color: "var(--parchment-cream)",
                fontFamily: "Cinzel",
              }}
            >
              {submitStatus === "sending" ? "🦉 Sending..." : "🦉 Send Owl"}
            </button>
            {submitStatus === "success" && (
              <div
                className="text-sm text-center"
                style={{ color: "var(--fossil-gold)", fontFamily: "Cinzel" }}
              >
                Owl dispatched! Check your inbox.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-sm text-center" style={{ color: "#f87171" }}>
                {submitError}
              </div>
            )}
          </form>
        </div>

        <div className="mt-12 text-center opacity-40">
          <CatSilhouette />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer
      className="py-12 px-8"
      style={{ background: "var(--great-hall-midnight)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-8">
          <svg width="100%" height="4" viewBox="0 0 1440 4" preserveAspectRatio="none">
            <path
              d="M0 2 Q360 0 720 2 T1440 2"
              stroke="var(--slytherin-green)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition-transform" style={{ color: "var(--ancient-brass)" }}>
              ᚷ
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition-transform" style={{ color: "var(--ancient-brass)" }}>
              ᛚ
            </a>
            <a href="mailto:hello@example.com" className="text-2xl hover:scale-110 transition-transform" style={{ color: "var(--ancient-brass)" }}>
              ᛗ
            </a>
          </div>

          <div
            className="text-xs text-center"
            style={{ fontFamily: "Cinzel", color: "var(--faded-ink)" }}
          >
            Crafted in the dungeons — © 2024
          </div>

          <div className="text-2xl" style={{ color: "var(--fossil-gold)" }}>
            🐾
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <LoreSection />
      <ArsenalSection />
      <CollectionSection />
      <ExcavationLog />
      <FieldNotesSection />
      <OwlPostSection />
      <Footer />
    </div>
  );
}
