import { SECTION_IMAGES } from "../data/products";
import Reveal from "./Reveal";
import { ArrowRightIcon, FlaskIcon, LeafIcon, PawIcon, StarIcon, TruckIcon } from "./icons";

const CHIPS = [
  { icon: FlaskIcon, label: "Certificado por lote", cls: "text-leaf-300", pos: "-left-4 top-14 sm:-left-14", delay: "0s" },
  { icon: LeafIcon, label: "100% orgánico", cls: "text-amber-300", pos: "-right-3 top-44 sm:-right-12", delay: "1.3s" },
  { icon: PawIcon, label: "Y tus mascotas", cls: "text-cream-200", pos: "-left-3 bottom-24 sm:-left-16", delay: "2.4s" },
];

function RotatingStamp() {
  return (
    <div className="absolute -top-8 -right-2 z-10 h-28 w-28 sm:-right-8 sm:h-32 sm:w-32" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-slowspin">
        <defs>
          <path id="stamp-circle" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#f8f6ec" stroke="#c0b99e" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="#8d8670" strokeWidth="1" strokeDasharray="3 4" />
        <text fill="#a9701f" fontSize="10.2" fontFamily="Space Mono, monospace" letterSpacing="2.4">
          <textPath href="#stamp-circle">HEMP ORGÁNICO · HECHO EN BOGOTÁ · THC &lt; 0.3% ·</textPath>
        </text>
      </svg>
      <LeafIcon className="absolute top-1/2 left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-leaf-400" />
    </div>
  );
}

export default function OpeningBoard() {
  return (
    <section id="inicio" className="relative scroll-mt-24 overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-[-8%] h-[560px] w-[560px] rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(93,148,99,0.14), transparent 64%)" }}
      />
      <LeafIcon className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rotate-[-24deg] text-moss-700/60" strokeWidth={1} />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-leaf-400" />
              Bogotá, Colombia · Hemp & Cannabis orgánico
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[2.7rem] leading-[0.99] font-medium text-cream-100 sm:text-6xl xl:text-[5rem]">
              Productos esenciales
              <br />
              <span className="text-leaf-400 italic">de cannabis</span> para tu piel,
              <br />
              tu salud… <em className="text-amber-400">y tus mascotas.</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-200">
              Que personas y animales estén sanos y se alivien con productos orgánicos de Hemp y
              Cannabis. Esa es la promesa de Caituus: extractos verificados en laboratorio,
              formulados en Colombia y enviados a todo el país.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#productos"
                className="btn-press group flex items-center gap-2.5 rounded-full bg-leaf-600 px-6 py-3.5 text-sm font-bold text-moss-900 shadow-[0_10px_30px_-12px_rgba(55,86,60,0.6)] hover:bg-leaf-500"
              >
                Ver productos
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#informacion"
                className="btn-press rounded-full border border-moss-600 px-6 py-3.5 text-sm font-semibold text-cream-200 hover:border-leaf-500 hover:bg-moss-850"
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
                <StarIcon className="h-3.5 w-3.5 text-amber-400" /> 4.8 · +2.700 clientes
              </span>
              <span className="hidden h-3 w-px bg-moss-600 sm:block" />
              <span className="flex items-center gap-1.5 tracking-[0.14em] uppercase">
                <TruckIcon className="h-4 w-4 text-leaf-400" /> Envío contraentrega
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
                  className={`absolute ${c.pos} z-10 hidden animate-float items-center gap-2 rounded-full border border-moss-600 bg-moss-850/95 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase shadow-sm sm:flex`}
                  style={{ animationDelay: c.delay }}
                >
                  <c.icon className={`h-3.5 w-3.5 ${c.cls}`} />
                  <span className="text-cream-200">{c.label}</span>
                </span>
              ))}
              <RotatingStamp />
              <div className="arch-frame overflow-hidden border border-moss-600 bg-gradient-to-b from-moss-850 to-moss-800 p-3 shadow-[0_36px_70px_-32px_rgba(43,50,42,0.5)]">
                <img
                  src={SECTION_IMAGES.lineup}
                  alt="Línea completa de productos Caituus: aceites de CBD 25, 50 y 100 ml, línea mascotas y extractos"
                  className="arch-frame h-[420px] w-full bg-white object-contain sm:h-[500px]"
                />
              </div>
              <p className="mt-4 text-center font-mono text-[10px] tracking-[0.22em] text-cream-300 uppercase">
                Aceites 25 · 50 · 100 ml — mascotas — extractos Indica & Sativa
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
