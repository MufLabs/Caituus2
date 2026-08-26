import { SECTION_FALLBACKS, SECTION_IMAGES } from "../data/products";
import Reveal from "./Reveal";
import SafeImg from "./SafeImg";
import { ArrowRightIcon, FlaskIcon, LeafIcon, PawIcon, StarIcon, TruckIcon } from "./icons";

const CHIPS = [
  { icon: FlaskIcon, label: "Espectro completo", cls: "text-leaf-300 border-leaf-500/60", pos: "-left-4 top-16 sm:-left-14", delay: "0s" },
  { icon: LeafIcon, label: "100% natural", cls: "text-amber-300 border-amber-500/60", pos: "-right-3 top-48 sm:-right-12", delay: "1.3s" },
  { icon: PawIcon, label: "Y tus mascotas", cls: "text-cream-200 border-cream-300/30", pos: "-left-3 bottom-28 sm:-left-16", delay: "2.4s" },
];

const TERPENES = ["Pineno", "Mirceno", "Cariofileno", "Linalol"];

function RotatingStamp() {
  return (
    <div className="absolute -top-8 -right-2 z-10 h-28 w-28 sm:-right-8 sm:h-32 sm:w-32" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-slowspin">
        <defs>
          <path id="stamp-circle" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#131a12" stroke="#35472f" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="#52684a" strokeWidth="1" strokeDasharray="3 4" />
        <text fill="#e8bb62" fontSize="10.2" fontFamily="Space Mono, monospace" letterSpacing="2.4">
          <textPath href="#stamp-circle">CANNABIS MEDICINAL · HECHO EN BOGOTÁ · DESDE 2021 ·</textPath>
        </text>
      </svg>
      <LeafIcon className="absolute top-1/2 left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-leaf-400" />
    </div>
  );
}

function SpectrumBar() {
  return (
    <div className="mt-6 border-t border-dashed border-moss-700 pt-5">
      <div className="flex justify-between font-mono text-[9px] tracking-[0.22em] text-moss-500 uppercase">
        <span>CBD</span>
        <span>Perfil de cannabinoides</span>
        <span>THC</span>
      </div>
      <div className="relative mt-2 h-2.5 rounded-full bg-gradient-to-r from-leaf-500 via-leaf-700 to-amber-600 ring-1 ring-moss-600">
        <span
          className="absolute top-1/2 h-4.5 w-4.5 -translate-y-1/2 rounded-full border-2 border-cream-100 bg-leaf-400 shadow-[0_0_14px_rgba(156,193,132,0.8)]"
          style={{ left: "calc(14% - 9px)" }}
          title="CBD — cannabinoide predominante"
        />
        <span
          className="absolute top-1/2 h-4.5 w-4.5 -translate-y-1/2 rounded-full border-2 border-cream-100 bg-amber-400 shadow-[0_0_14px_rgba(232,187,98,0.8)]"
          style={{ left: "calc(78% - 9px)" }}
          title="THC en concentración muy baja"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {TERPENES.map((t) => (
          <span key={t} className="rounded-full border border-moss-600 bg-moss-850 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-leaf-300 uppercase">
            {t}
          </span>
        ))}
        <span className="ml-auto font-mono text-[9px] tracking-[0.16em] text-moss-500 uppercase">
          CBG · CBN · CBC · Omega 3·6·9
        </span>
      </div>
    </div>
  );
}

export default function OpeningBoard() {
  return (
    <section id="inicio" className="relative scroll-mt-24 overflow-hidden">
      {/* Fondo fotográfico del sitio original, velado */}
      <SafeImg
        src={SECTION_IMAGES.heroBg}
        alt=""
        hideOnFail
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.13]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-moss-900/70 via-moss-900/40 to-moss-900" />
      <div
        className="pointer-events-none absolute top-0 right-[-8%] h-[560px] w-[560px] rounded-full opacity-80"
        style={{ background: "radial-gradient(circle, rgba(223,169,75,0.14), transparent 64%)" }}
      />
      <LeafIcon className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rotate-[-24deg] text-moss-700/50" strokeWidth={0.9} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-leaf-400" />
              Medicinal cannabis · Bogotá, Colombia
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[2.7rem] leading-[0.99] font-medium text-cream-100 sm:text-6xl xl:text-[5rem]">
              Productos esenciales
              <br />
              de cannabis para
              <br />
              <span className="text-leaf-300 italic">toda tu familia</span>…
              <br />
              <em className="text-amber-400">y tus mascotas.</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-200">
              Que personas y animales estén sanos y se alivien con productos orgánicos de Hemp y
              Cannabis. Preparados con aceite de oliva extra virgen y las mejores cepas:{" "}
              <strong className="font-semibold text-cream-100">siéntete mejor, sin estar “high”.</strong>
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#productos"
                className="btn-press group flex items-center gap-2.5 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-moss-950 shadow-[0_12px_32px_-12px_rgba(223,169,75,0.55)] hover:bg-amber-400"
              >
                Ver productos
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#informacion"
                className="btn-press rounded-full border border-moss-600 px-6 py-3.5 text-sm font-semibold text-cream-200 hover:border-leaf-500 hover:bg-moss-850 hover:text-cream-100"
              >
                Conoce el CBD
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-cream-300">
              <span className="tracking-[0.14em] uppercase">6 productos · 3 líneas</span>
              <span className="hidden h-3 w-px bg-moss-600 sm:block" />
              <span className="flex items-center gap-1.5 tracking-[0.14em] uppercase">
                <StarIcon className="h-3.5 w-3.5 text-amber-400" /> 4.8 · +2.700 familias
              </span>
              <span className="hidden h-3 w-px bg-moss-600 sm:block" />
              <span className="flex items-center gap-1.5 tracking-[0.14em] uppercase">
                <TruckIcon className="h-4 w-4 text-leaf-400" /> Envíos a toda Colombia
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {CHIPS.map((c) => (
                <span
                  key={c.label}
                  className={`absolute ${c.pos} z-10 hidden animate-float items-center gap-2 rounded-full border bg-moss-850/95 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase shadow-[0_10px_24px_-12px_rgba(9,13,8,0.9)] backdrop-blur-sm sm:flex`}
                  style={{ animationDelay: c.delay }}
                >
                  <c.icon className={`h-3.5 w-3.5 ${c.cls.split(" ")[0]}`} />
                  <span className="text-cream-200">{c.label}</span>
                </span>
              ))}
              <RotatingStamp />
              <div className="arch-frame overflow-hidden border border-moss-600/80 bg-gradient-to-b from-moss-800 to-moss-850 p-3 shadow-[0_44px_80px_-36px_rgba(9,13,8,0.95)]">
                <SafeImg
                  src={SECTION_IMAGES.lineup}
                  fallback={SECTION_FALLBACKS.lineup}
                  alt="Línea completa de productos Caituus: aceites de CBD 25, 50 y 100 ml, línea mascotas y extractos"
                  className="photo-plate arch-frame h-[420px] w-full object-contain sm:h-[500px]"
                  loading="eager"
                />
              </div>
              <div className="mx-auto mt-5 max-w-sm rounded-lg border border-moss-700 bg-moss-850/90 px-5 py-4 shadow-[0_20px_40px_-24px_rgba(9,13,8,0.9)] backdrop-blur-sm">
                <SpectrumBar />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
