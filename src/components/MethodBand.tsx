import { LEGAL, PRODUCTS, TESTIMONIALS, money } from "../data/products";
import { useShop } from "../state/shop";
import Reveal from "./Reveal";
import {
  ArrowRightIcon,
  DropIcon,
  FlaskIcon,
  LeafIcon,
  PawIcon,
  ShieldIcon,
  SparkIcon,
  StarIcon,
  TruckIcon,
  WhatsAppIcon,
} from "./icons";

const PILLARS = [
  {
    icon: SparkIcon,
    num: "01",
    title: "Piel",
    copy: "El sistema endocannabinoide también vive en tu piel. Nuestros tópicos y el sérum facial combinan CBD con árnica, rosa mosqueta y vitamina E para calmar, hidratar y recuperar.",
    productId: "crema-recovery",
    cta: "Ver línea Piel",
  },
  {
    icon: DropIcon,
    num: "02",
    title: "Salud",
    copy: "Extractos de espectro completo en aceite MCT orgánico, con certificado de análisis por lote. Empieza con 10%, sube a 25% cuando tu cuerpo te lo pida. Sin prisa, sin aditivos.",
    productId: "aceite-full-10",
    cta: "Ver línea Salud",
  },
  {
    icon: PawIcon,
    num: "03",
    title: "Mascotas",
    copy: "Perros y gatos también tienen receptores cannabinoides. Pet Calm, con sabor salmón y 0% THC, acompaña la ansiedad por ruidos, viajes y separación — y las articulaciones de los senior.",
    productId: "pet-calm",
    cta: "Ver línea Mascotas",
  },
];

const STEPS = [
  { title: "Elige tu fórmula", copy: "Seis productos, tres líneas, una misma promesa orgánica.", icon: LeafIcon },
  { title: "Paga como quieras", copy: "Nequi, Daviplata, PSE, tarjeta o contraentrega en Bogotá.", icon: ShieldIcon },
  { title: "Te escribimos", copy: "Confirmamos por WhatsApp con el certificado de tu lote.", icon: WhatsAppIcon },
  { title: "Recibe en casa", copy: "24–72 h en Bogotá · 2–4 días al resto del país.", icon: TruckIcon },
];

export default function MethodBand() {
  const { pushToast } = useShop();

  const jumpToProduct = (id: string) => {
    const p = PRODUCTS.find((x) => x.id === id);
    if (p) pushToast({ title: p.name, sub: `Búscalo en la tienda · ${money(p.price)}` });
    document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="metodo" className="scroll-mt-24 border-y border-moss-700/70 bg-moss-850/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">El método Caituus</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.03] text-cream-100 sm:text-5xl">
                De la planta
                <br />
                <em className="text-amber-400">a tu puerta,</em>
                <br />
                sin atajos.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-300/85">
                Cultivo orgánico, extracción CO₂ supercrítica y verificación en laboratorio
                independiente. Tres líneas pensadas para que personas y animales estén sanos y se
                alivien.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 rounded-lg border border-moss-700 bg-moss-900/60 p-5">
                <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-leaf-400 uppercase">
                  <FlaskIcon className="h-4 w-4" /> Laboratorio y cumplimiento
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Certificado de análisis por lote, con QR en el empaque",
                    "Extracción CO₂ supercrítico, sin solventes residuales",
                    "THC < 0.3% en humanos · 0% en la línea mascotas",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-cream-300/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-start gap-2.5 border-t border-dashed border-moss-700 pt-4 text-xs leading-relaxed text-moss-500">
                  <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  {LEGAL.laws}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-moss-700 border-y border-moss-700">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <li className="group grid gap-5 py-8 sm:grid-cols-[64px_1fr_auto] sm:items-start lg:py-9">
                    <span className="font-display text-3xl text-moss-600 transition-colors group-hover:text-amber-500 italic">
                      {p.num}
                    </span>
                    <div>
                      <h3 className="flex items-center gap-3 font-display text-2xl text-cream-100 sm:text-3xl">
                        <p.icon className="h-6 w-6 text-leaf-400" />
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-cream-300/80">{p.copy}</p>
                      <button
                        onClick={() => jumpToProduct(p.productId)}
                        className="btn-press group/cta mt-3 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-amber-400 uppercase hover:text-amber-300"
                      >
                        {p.cta}
                        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-1" />
                      </button>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <div className="mt-10">
                <h3 className="font-mono text-[11px] tracking-[0.28em] text-cream-300/60 uppercase">
                  Lo que dicen en casa
                </h3>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {TESTIMONIALS.map((t, i) => (
                    <figure
                      key={t.name}
                      className={`flex flex-col rounded-lg border border-moss-700 bg-moss-900/60 p-5 transition-colors hover:border-moss-500 ${
                        i === 1 ? "md:-translate-y-2" : ""
                      }`}
                    >
                      <span className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <StarIcon key={s} className="h-3 w-3" />
                        ))}
                      </span>
                      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-cream-200 italic">
                        “{t.quote}”
                      </blockquote>
                      <figcaption className="mt-4 border-t border-dashed border-moss-700 pt-3">
                        <p className="text-[13px] font-bold text-cream-100">
                          {t.name} · {t.city}
                        </p>
                        <p className="font-mono text-[10px] tracking-[0.12em] text-moss-500 uppercase">
                          {t.product}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div id="como-comprar" className="scroll-mt-24 border-t border-moss-700/70 bg-moss-900/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">Cómo comprar</p>
                <h2 className="mt-2 font-display text-3xl text-cream-100 sm:text-4xl">
                  Cuatro pasos y listo <em className="text-amber-400">— así de simple.</em>
                </h2>
              </div>
              <p className="max-w-xs font-mono text-[11px] leading-relaxed tracking-[0.06em] text-moss-500 uppercase">
                Pago 100% colombiano: Nequi, Daviplata, PSE, tarjeta o contraentrega
              </p>
            </div>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <li className="relative h-full rounded-lg border border-moss-700 bg-moss-850 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-leaf-600/70">
                  <span className="absolute top-5 right-5 font-mono text-[11px] font-bold text-moss-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-moss-600 bg-moss-800 text-amber-400">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl text-cream-100">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream-300/75">{s.copy}</p>
                  {i < STEPS.length - 1 && (
                    <ArrowRightIcon className="absolute top-1/2 -right-4 hidden h-4 w-4 -translate-y-1/2 text-moss-600 lg:block" />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
