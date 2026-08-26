import { LEGAL, SECTION_IMAGES } from "../data/products";
import Reveal from "./Reveal";
import {
  ArrowRightIcon,
  BankIcon,
  CheckIcon,
  FlaskIcon,
  LeafIcon,
  MoonIcon,
  PawIcon,
  ShieldIcon,
  TruckIcon,
  WalletIcon,
  WhatsAppIcon,
} from "./icons";

const STEPS = [
  { title: "Elige tu producto", copy: "Aceites de 25, 50 y 100 ml, extractos y la línea mascotas.", icon: LeafIcon },
  { title: "Paga desde tu celular", copy: "Nequi, Daviplata o Breve (Bre-B) — tú eliges.", icon: WalletIcon },
  { title: "Despacho en 24 h", copy: "Llevamos tu pedido a la transportadora al día siguiente.", icon: TruckIcon },
  { title: "Recibe y paga el envío", copy: "El envío se paga contraentrega. Guía por WhatsApp o correo.", icon: WhatsAppIcon },
];

interface InfoSectionsProps {
  onBrowseMascotas: () => void;
}

export default function InfoSections({ onBrowseMascotas }: InfoSectionsProps) {
  return (
    <>
      {/* ---------------- INFORMACIÓN ---------------- */}
      <section id="informacion" className="scroll-mt-24 border-y border-moss-700/70 bg-moss-850/80">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">Información</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.03] font-medium text-cream-100 sm:text-5xl">
                ¿Qué es el CBD
                <br />
                <em className="text-leaf-400">y por qué funciona?</em>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200">
                El cannabidiol (CBD) es uno de los más de 100 cannabinoides de la planta de cannabis.
                A diferencia del THC, <strong className="text-cream-100">no produce efectos psicoactivos</strong>:
                acompaña tu bienestar sin alterar tu mente.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-8 space-y-5">
                {[
                  {
                    icon: FlaskIcon,
                    title: "Tu cuerpo ya lo conoce",
                    copy: "El sistema endocannabinoide regula sueño, ánimo, dolor e inflamación. El CBD interactúa con sus receptores para ayudar a recuperar el equilibrio.",
                  },
                  {
                    icon: ShieldIcon,
                    title: "Verificado en laboratorio",
                    copy: "Cada lote se analiza en laboratorio independiente: pureza, potencia y ausencia de metales pesados. El certificado viaja con tu pedido, con código QR.",
                  },
                  {
                    icon: LeafIcon,
                    title: "Origen orgánico colombiano",
                    copy: "Hemp cultivado sin pesticidas y extraído con CO₂ supercrítico: sin solventes residuales, sin aditivos, sin atajos.",
                  },
                ].map((b) => (
                  <li key={b.title} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-moss-600 bg-moss-900 text-amber-400">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-cream-100">{b.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-cream-300">{b.copy}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 rounded-lg border border-moss-700 bg-moss-900/70 p-5">
                <p className="font-mono text-[10px] tracking-[0.24em] text-leaf-400 uppercase">Cumplimiento legal</p>
                <p className="mt-2 flex items-start gap-2.5 text-[13px] leading-relaxed text-cream-200">
                  <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" />
                  {LEGAL.laws} Los extractos con THC se venden únicamente a mayores de 18 años.
                </p>
                <p className="mt-3 border-t border-dashed border-moss-700 pt-3 text-[11px] leading-relaxed text-cream-300 italic">
                  {LEGAL.disclaimer}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="grid gap-5 sm:grid-cols-2">
                <figure className="overflow-hidden rounded-lg border border-moss-700 bg-moss-900 sm:col-span-2">
                  <img
                    src={SECTION_IMAGES.lab}
                    alt="Tubos de ensayo de laboratorio: análisis de cada lote Caituus"
                    className="h-64 w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-72"
                    loading="lazy"
                  />
                  <figcaption className="px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
                    Análisis de potencia y pureza — certificado por lote
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-lg border border-moss-700 bg-moss-900">
                  <img
                    src={SECTION_IMAGES.blackBottle}
                    alt="Frasco ámbar de aceite esencial de CBD Caituus"
                    className="h-64 w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <figcaption className="px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
                    Frasco ámbar: protege el extracto de la luz
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-lg border border-moss-700 bg-moss-900">
                  <img
                    src={SECTION_IMAGES.sativaIndica}
                    alt="Hojas de cannabis Sativa e Indica"
                    className="h-64 w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <figcaption className="px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
                    Sativa para el día · Indica para la noche
                  </figcaption>
                </figure>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="relative mt-5 overflow-hidden rounded-lg border border-moss-700">
                <img
                  src={SECTION_IMAGES.boxesDark}
                  alt="Cajas de la línea de aceites de CBD Caituus sobre fondo oscuro"
                  className="h-56 w-full object-cover sm:h-64"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-moss-950/85 via-moss-950/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-9">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-amber-300 uppercase">La línea completa</p>
                  <p className="mt-2 max-w-sm font-display text-2xl leading-snug text-moss-900 sm:text-3xl" style={{ color: "#f8f6ec" }}>
                    25, 50 y 100 ml para ti;
                    <em className="text-amber-300"> 50 ml para ellos.</em>
                  </p>
                  <a href="#productos" className="mt-4 flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-amber-300 uppercase hover:text-amber-400">
                    Ir a la tienda <ArrowRightIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- MASCOTAS ---------------- */}
      <section id="mascotas" className="scroll-mt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-20">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <div className="grid grid-cols-3 gap-3">
                <img src={SECTION_IMAGES.cat4} alt="Gata disfrutando su aceite CBD" className="h-32 w-full rounded-lg border border-moss-700 object-cover transition-transform duration-500 hover:-translate-y-1 sm:h-40" loading="lazy" />
                <img src={SECTION_IMAGES.dosingCat} alt="Dosis de CBD para gatos sobre la comida" className="h-32 w-full rounded-lg border border-moss-700 object-cover transition-transform duration-500 hover:-translate-y-1 sm:h-40" loading="lazy" />
                <img src={SECTION_IMAGES.cat6} alt="Gato sano y tranquilo con CBD" className="h-32 w-full rounded-lg border border-moss-700 object-cover transition-transform duration-500 hover:-translate-y-1 sm:h-40" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <figure className="mt-3 flex items-center gap-4 overflow-hidden rounded-lg border border-moss-700 bg-moss-850">
                <img src={SECTION_IMAGES.cat5} alt="Gata Caituus" className="h-24 w-28 shrink-0 object-cover" loading="lazy" />
                <blockquote className="pr-5 text-sm text-cream-200 italic">
                  “Desde que usa el aceite, Misha duerme toda la noche y ya no le teme a las tormentas.”
                  <span className="mt-1 block font-mono text-[10px] tracking-[0.16em] text-cream-300 not-italic uppercase">
                    Carolina · Bogotá · Gata de 9 años
                  </span>
                </blockquote>
              </figure>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.28em] text-amber-400 uppercase">
                <PawIcon className="h-4 w-4" /> Línea mascotas
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[1.03] font-medium text-cream-100 sm:text-5xl">
                Porque ellos
                <br />
                <em className="text-amber-400">también sienten.</em>
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-cream-200">
                Perros y gatos tienen su propio sistema endocannabinoide. Nuestro aceite para
                mascotas — con <strong className="text-cream-100">0% THC</strong> — acompaña la
                ansiedad por ruidos, viajes o separación, el descanso profundo y la movilidad de los
                peludos senior.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-7 space-y-3">
                {[
                  "Calma ante pólvora, tormentas y visitas al veterinario",
                  "Dosis sencilla: 1 gota por cada 5 kg de peso, 1–2 veces al día",
                  "Jeringa dosificadora + guía por especie y tamaño",
                  "Análisis de laboratorio por lote, igual que nuestra línea humana",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-cream-200">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-500/20 text-leaf-300">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={onBrowseMascotas}
                  className="btn-press group flex items-center gap-2.5 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-moss-950 hover:bg-amber-400"
                >
                  Ver aceite para mascotas
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-cream-300 uppercase">
                  <MoonIcon className="h-4 w-4 text-leaf-400" /> También mejora su descanso
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- CÓMO COMPRAR ---------------- */}
      <section id="como-comprar" className="scroll-mt-24 border-t border-moss-700/70 bg-moss-850/80">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">Cómo comprar</p>
                <h2 className="mt-2 font-display text-3xl font-medium text-cream-100 sm:text-4xl">
                  Cuatro pasos <em className="text-leaf-400">y tu pedido va en camino.</em>
                </h2>
              </div>
              <p className="flex max-w-xs items-center gap-2 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-cream-300 uppercase">
                <BankIcon className="h-4 w-4 shrink-0 text-amber-400" />
                Pagos: Nequi · Daviplata · Breve (Bre-B)
              </p>
            </div>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <li className="relative h-full rounded-lg border border-moss-700 bg-moss-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-leaf-500/70">
                  <span className="absolute top-5 right-5 font-mono text-[11px] font-bold text-moss-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-moss-600 bg-moss-850 text-amber-400">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-cream-100">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream-300">{s.copy}</p>
                  {i < STEPS.length - 1 && (
                    <ArrowRightIcon className="absolute top-1/2 -right-4 hidden h-4 w-4 -translate-y-1/2 text-moss-500 lg:block" />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
