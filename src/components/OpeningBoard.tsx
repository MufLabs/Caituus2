import { useState } from "react";
import { BRAND_ASSET_URL } from "../data/products";
import Reveal from "./Reveal";
import { ArrowRightIcon, FlaskIcon, LeafIcon, PawIcon, StarIcon } from "./icons";

const CHIPS = [
  { icon: FlaskIcon, label: "Lab-tested", cls: "text-leaf-300 border-leaf-600/60", pos: "-left-4 top-14 sm:-left-12", delay: "0s" },
  { icon: LeafIcon, label: "100% orgánico", cls: "text-amber-300 border-amber-600/60", pos: "-right-3 top-40 sm:-right-12", delay: "1.3s" },
  { icon: PawIcon, label: "Pet friendly", cls: "text-cream-200 border-cream-300/30", pos: "-left-3 bottom-24 sm:-left-14", delay: "2.4s" },
];

function RotatingStamp() {
  return (
    <div className="absolute -top-8 -right-2 z-10 h-28 w-28 sm:-right-8 sm:h-32 sm:w-32" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-slowspin">
        <defs>
          <path id="stamp-circle" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#142116" stroke="#33503A" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="#47694F" strokeWidth="1" strokeDasharray="3 4" />
        <text fill="#E8B960" fontSize="10.2" fontFamily="Space Mono, monospace" letterSpacing="2.4">
          <textPath href="#stamp-circle">HEMP ORGÁNICO · HECHO EN BOGOTÁ · THC &lt; 0.3% ·</textPath>
        </text>
      </svg>
      <LeafIcon className="absolute top-1/2 left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-leaf-400" />
    </div>
  );
}

export default function OpeningBoard() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-[-8%] h-[560px] w-[560px] rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(157,190,131,0.13), transparent 64%)" }}
      />
      <LeafIcon className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rotate-[-24deg] text-moss-800/60" strokeWidth={1} />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-leaf-400" />
              Productos esenciales de cannabis · Bogotá
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[2.7rem] leading-[0.98] text-cream-100 sm:text-6xl xl:text-[5.2rem]">
              For your skin.
              <br />
              <span className="text-leaf-300">For your health.</span>
              <br />
              <em className="text-amber-400">(and your pets too!)</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-300/90">
              Que personas y animales estén sanos y se alivien con productos orgánicos de hemp y
              cannabis — esa es la promesa de Caituus. Extractos de espectro completo, verificados
              en laboratorio y formulados en Colombia.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#tienda"
                className="btn-press group flex items-center gap-2.5 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-moss-950 shadow-[0_10px_30px_-10px_rgba(219,165,69,0.55)] hover:bg-amber-400"
              >
                Ver la tienda
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#metodo"
                className="btn-press rounded-full border border-moss-600 px-6 py-3.5 text-sm font-semibold text-cream-200 hover:border-leaf-500 hover:bg-moss-800"
              >
                Conoce el método
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-moss-500">
              <span className="tracking-[0.14em] text-cream-300/80 uppercase">THC &lt; 0.3%</span>
              <span className="hidden h-3 w-px bg-moss-600 sm:block" />
              <span className="tracking-[0.14em] uppercase">6 fórmulas · 3 líneas</span>
              <span className="hidden h-3 w-px bg-moss-600 sm:block" />
              <span className="flex items-center gap-1.5 tracking-[0.14em] uppercase">
                <StarIcon className="h-3.5 w-3.5 text-amber-400" /> 4.8 · 3.400+ pedidos
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
                  className={`absolute ${c.pos} z-10 hidden animate-float items-center gap-2 rounded-full border bg-moss-850/90 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase sm:flex`}
                  style={{ animationDelay: c.delay }}
                >
                  <c.icon className={`h-3.5 w-3.5 ${c.cls.split(" ")[0]}`} />
                  <span className={c.cls.split(" ")[0]}>{c.label}</span>
                </span>
              ))}
              <RotatingStamp />
              <div className="arch-frame overflow-hidden border border-moss-600/70 bg-gradient-to-b from-moss-800 to-moss-850 p-3 shadow-[0_36px_70px_-30px_rgba(11,19,12,0.95)]">
                {imgOk ? (
                  <img
                    src={BRAND_ASSET_URL}
                    alt="Línea de productos esenciales de cannabis Caituus"
                    className="arch-frame h-[420px] w-full object-cover sm:h-[500px]"
                    onError={() => setImgOk(false)}
                  />
                ) : (
                  <div className="arch-frame grid h-[420px] w-full place-items-center bg-moss-800 sm:h-[500px]">
                    <div className="text-center">
                      <LeafIcon className="mx-auto h-16 w-16 animate-sway text-leaf-500" strokeWidth={1.2} />
                      <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-leaf-500 uppercase">
                        Cannabis esencial
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-4 text-center font-mono text-[10px] tracking-[0.22em] text-moss-500 uppercase">
                Espectro completo · Extracción CO₂ · Sin aditivos
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
