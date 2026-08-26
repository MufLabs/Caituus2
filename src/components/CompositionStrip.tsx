import Reveal from "./Reveal";
import { DropIcon, FlaskIcon, LeafIcon, SparkIcon } from "./icons";

const BLOCKS = [
  {
    icon: FlaskIcon,
    title: "Más de 80 cannabinoides",
    copy: "Además del CBD, nuestros productos contienen CBN (Cannabinol), CBC (Cannabichromene), CBG (Cannabigerol) y otros, que juegan un papel muy importante en el sistema inmune y el funcionamiento del sistema nervioso central.",
    chips: ["CBD", "CBN", "CBC", "CBG"],
  },
  {
    icon: SparkIcon,
    title: "Flavonoides",
    copy: "Fitonutrientes presentes en la planta como las Cannaflavinas A, B y C, el β-sitosterol, la Vitexina y la Apigenina, que sirven como mensajeros de las células con sus propios beneficios promotores de la salud.",
    chips: ["Cannaflavinas", "Vitexina", "Apigenina"],
  },
  {
    icon: LeafIcon,
    title: "Terpenos",
    copy: "También contienen terpenos — Pineno, Cariofileno, Mirceno y Linalol — que se unen a receptores en el cuerpo humano logrando una variedad de beneficios para la salud.",
    chips: ["Pineno", "Cariofileno", "Mirceno", "Linalol"],
  },
  {
    icon: DropIcon,
    title: "Omega 3, 6 y 9",
    copy: "Nuestro Aceite Esencial CBD contiene Omega 3, 6 y 9: ácidos grasos esenciales que el cuerpo necesita pero no produce. Y cero químicos.",
    chips: ["Omega 3", "Omega 6", "Omega 9"],
  },
];

export default function CompositionStrip() {
  return (
    <section className="relative border-y border-moss-700/70 bg-moss-850/60">
      <LeafIcon className="pointer-events-none absolute top-1/2 -right-10 h-52 w-52 -translate-y-1/2 rotate-[18deg] text-moss-800" strokeWidth={1} />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.28em] text-amber-400 uppercase">La fórmula completa</p>
              <h2 className="mt-2 max-w-2xl font-display text-4xl leading-[1.02] font-medium text-cream-100 sm:text-5xl">
                Todo lo que tienen <em className="text-leaf-300">nuestros productos.</em>
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[11px] leading-relaxed tracking-[0.12em] text-cream-300 uppercase">
              Ácidos grasos esenciales… <span className="text-amber-300">¡y cero químicos!</span>
            </p>
          </div>
        </Reveal>

        <ol className="mt-10 divide-y divide-moss-700 border-y border-moss-700">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <li className="group grid gap-4 py-7 transition-colors hover:bg-moss-800/60 sm:grid-cols-[90px_56px_1.2fr_auto] sm:items-start sm:gap-6 sm:px-4">
                <span className="font-display text-5xl leading-none text-moss-600 italic transition-colors duration-300 group-hover:text-amber-400 sm:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-md border border-moss-600 bg-moss-900 text-amber-400 transition-colors group-hover:border-amber-500/60">
                  <b.icon className="h-5.5 w-5.5" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-cream-100">{b.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-cream-300">{b.copy}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:max-w-[220px] sm:justify-end">
                  {b.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-moss-600 bg-moss-900 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-leaf-300 uppercase transition-colors group-hover:border-leaf-500/50"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
