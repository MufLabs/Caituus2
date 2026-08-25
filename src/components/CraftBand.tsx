import { ROAST_LOG } from "../data/products";
import Reveal from "./Reveal";
import { FlameIcon, LeafIcon, MountainIcon, TruckIcon } from "./icons";

const PRACTICES = [
  {
    icon: FlameIcon,
    title: "Roasted every Monday",
    copy: "Twelve-kilo batches on a 1962 Probat, profiled by hand each season.",
  },
  {
    icon: TruckIcon,
    title: "Shipped within 48 hours",
    copy: "Sealed with a one-way valve the same day it drops off the drum.",
  },
  {
    icon: LeafIcon,
    title: "12 partner farms",
    copy: "Direct trade, multi-year contracts, prices set at the farm gate.",
  },
  {
    icon: MountainIcon,
    title: "Every lot cupped twice",
    copy: "Nothing boards the roast list below an 86 SCA score.",
  },
];

export default function CraftBand() {
  return (
    <section id="craft" className="border-y border-bark-700/70 bg-bark-850/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-20">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.28em] text-ember-400 uppercase">The craft</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-semibold text-sand-100 sm:text-5xl">
              From cherry to cup
              <br />
              <span className="font-light text-ember-300 italic">in nineteen days.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-latte-300">
              Green coffee rests two weeks after landing, then meets the drum. We log every charge,
              every crack, every degree — and the last three roasts are always an open book.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 overflow-hidden rounded-lg border border-bark-700">
              <div className="flex items-center justify-between border-b border-bark-700 bg-bark-900/60 px-5 py-3">
                <span className="font-mono text-[10px] tracking-[0.24em] text-latte-500 uppercase">
                  Roast log — last three batches
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-sage-400 uppercase">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-sage-400" /> Live from the roastery
                </span>
              </div>
              <ul>
                {ROAST_LOG.map((r, i) => (
                  <li
                    key={r.batch}
                    className={`grid grid-cols-[70px_1fr] items-center gap-3 px-5 py-3.5 transition-colors hover:bg-bark-800/70 sm:grid-cols-[80px_1.2fr_1fr_1fr] ${
                      i > 0 ? "border-t border-dashed border-bark-700" : ""
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-ember-400">{r.batch}</span>
                    <span className="truncate text-sm font-semibold text-sand-100">{r.coffee}</span>
                    <span className="col-span-2 font-mono text-[11px] text-latte-400 sm:col-span-1 sm:col-start-3">
                      {r.charge} → {r.drop}
                    </span>
                    <span className="col-start-2 font-mono text-[11px] text-latte-500 sm:col-start-4">
                      {r.dev}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <ul className="divide-y divide-bark-700 border-y border-bark-700">
            {PRACTICES.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <li className="group flex gap-5 py-6 first:pt-0 last:pb-0 lg:first:pt-2">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-bark-600 bg-bark-800 text-ember-400 transition-colors group-hover:border-ember-600/60 group-hover:text-ember-300">
                    <p.icon className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-sand-100">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-latte-400">{p.copy}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
