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
    copy: "Nuestros productos también contienen terpenos, incluyendo Pineno, Cariofileno, Mirceno y Linalol, que se unen a receptores en el cuerpo humano logrando una variedad de beneficios para la salud.",
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
    <section className="border-b border-moss-700/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl font-display text-4xl leading-[1.02] font-medium text-cream-100 sm:text-5xl">
              Todo lo que tienen <em className="text-leaf-400">nuestros productos.</em>
            </h2>
            <p className="font-mono text-[11px] tracking-[0.2em] text-amber-400 uppercase">
              Ácidos grasos esenciales · y cero químicos !!
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-moss-700 bg-moss-700 sm:grid-cols-2 lg:grid-cols-4">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.title} delay={i * 80} className="h-full">
              <article className="group flex h-full flex-col bg-moss-850 p-6 transition-colors hover:bg-moss-800">
                <span className="grid h-11 w-11 place-items-center rounded-md border border-moss-600 bg-moss-900 text-amber-400 transition-colors group-hover:border-amber-500/60">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[1.4rem] leading-snug font-semibold text-cream-100">
                  {b.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-cream-300">{b.copy}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {b.chips.map((c) => (
                    <span key={c} className="rounded-full border border-moss-600 bg-moss-900 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-leaf-300 uppercase">
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <blockquote className="relative mt-12 overflow-hidden rounded-lg border border-moss-700 bg-moss-900 px-7 py-10 text-center sm:px-14">
            <LeafIcon className="pointer-events-none absolute -top-8 -left-8 h-40 w-40 rotate-[-20deg] text-moss-800" strokeWidth={1} />
            <LeafIcon className="pointer-events-none absolute -right-8 -bottom-10 h-44 w-44 rotate-[160deg] text-moss-800" strokeWidth={1} />
            <p className="font-mono text-[11px] tracking-[0.28em] text-amber-400 uppercase">Nuestra promesa</p>
            <p className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-snug font-medium text-cream-100 sm:text-4xl">
              “Siéntete mejor, <em className="text-amber-300">sin estar ‘high’</em>.”
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-cream-200">
              Para sentirte mejor, tener una vida activa y normal, necesitas que tu mente se sienta
              clara, despejada y activa. Por eso nuestros productos{" "}
              <strong className="text-cream-100">no son medicamentos</strong> ni te causarán ningún
              efecto que altere tu realidad o nuble tu mente; no te generarán dependencia ni
              adicción — pero sí te dejarán una sensación de bienestar y mejoría en tu cuerpo que
              hace tiempo no tenías.
            </p>
            <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
              THC inferior al 0.2% · seguro, potente y eficaz
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
