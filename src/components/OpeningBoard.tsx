import { formatDay, mostRecentMonday } from "../data/products";
import Reveal from "./Reveal";
import { ArrowRightIcon, StarIcon } from "./icons";

function SteamCup() {
  return (
    <svg viewBox="0 0 220 200" className="mx-auto w-full max-w-[280px]" aria-hidden="true">
      {/* steam */}
      <g stroke="#CBB593" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M92 78 C 86 66, 98 60, 92 46 C 88 36, 96 30, 93 22" className="animate-steam" style={{ animationDelay: "0s" }} />
        <path d="M112 82 C 106 68, 120 62, 113 46 C 109 35, 118 28, 114 18" className="animate-steam" style={{ animationDelay: "1.1s" }} />
        <path d="M132 78 C 127 67, 138 61, 132 48 C 128 39, 136 32, 133 25" className="animate-steam" style={{ animationDelay: "2.2s" }} />
      </g>
      {/* saucer */}
      <ellipse cx="110" cy="172" rx="66" ry="12" fill="#231910" />
      <ellipse cx="110" cy="169" rx="56" ry="9" fill="#2E2115" />
      {/* handle */}
      <path
        d="M156 112 h 14 a 18 18 0 0 1 0 36 h -16"
        fill="none"
        stroke="#CBB593"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* cup body */}
      <path
        d="M62 100 h96 v22 a44 44 0 0 1 -88 0 a40 40 0 0 1 -8 -22 Z"
        fill="#3D2D1C"
        stroke="#CBB593"
        strokeWidth="3"
      />
      <ellipse cx="110" cy="100" rx="48" ry="11" fill="#55402A" stroke="#CBB593" strokeWidth="3" />
      <ellipse cx="110" cy="100" rx="38" ry="7.5" fill="#1C140C" />
      <ellipse cx="104" cy="99" rx="20" ry="3.6" fill="#2E2115" />
    </svg>
  );
}

function RotatingStamp() {
  return (
    <div className="absolute -top-9 -right-4 h-28 w-28 sm:-right-9 sm:h-32 sm:w-32" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-slowspin">
        <defs>
          <path id="stamp-circle" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#1C140C" stroke="#3D2D1C" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="#55402A" strokeWidth="1" strokeDasharray="3 4" />
        <text fill="#DEA04C" fontSize="10.5" fontFamily="Space Mono, monospace" letterSpacing="2.6">
          <textPath href="#stamp-circle">SMALL BATCH · ROASTED WEEKLY · SHIPPED FRESH ·</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" className="absolute top-1/2 left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-ember-400" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M7.2 4.6c4.4-2.6 9.6-1 11.8 3s.4 9.4-4 12-9.6 1-11.8-3-.4-9.4 4-12Z" />
        <path d="M8.4 5.4c2.4 1.8 2 4.6 3.9 6.8s4.8 2.6 5.2 5.8" />
      </svg>
    </div>
  );
}

const FLOATING_NOTES = [
  { label: "Bergamot", cls: "text-sage-400 border-sage-600/60", pos: "-left-5 top-10 sm:-left-12", delay: "0s" },
  { label: "Blackcurrant", cls: "text-berry-400 border-berry-500/60", pos: "-right-3 bottom-32 sm:-right-10", delay: "1.4s" },
  { label: "Panela", cls: "text-ember-400 border-ember-600/60", pos: "-left-4 bottom-14 sm:-left-14", delay: "2.6s" },
];

export default function OpeningBoard() {
  const monday = mostRecentMonday();

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-[-10%] h-[520px] w-[520px] rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(222,160,76,0.12), transparent 65%)" }}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.28em] text-ember-400 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ember-400" />
              Roast board · week of {formatDay(monday)}
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[2.65rem] leading-[1.02] font-semibold tracking-tight text-sand-100 sm:text-6xl xl:text-7xl">
              Six coffees,
              <br />
              <span className="font-light text-ember-300 italic">roasted Monday,</span>
              <br />
              at their peak now.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-latte-300">
              We roast small — twelve kilos at a time — and ship within 48 hours, so every bag
              lands somewhere between day three and day ten. That window is the whole point.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#shop"
                className="btn-press group flex items-center gap-2.5 rounded-full bg-ember-500 px-6 py-3.5 text-sm font-bold text-bark-950 shadow-[0_10px_30px_-10px_rgba(222,160,76,0.5)] hover:bg-ember-400"
              >
                Browse the board
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#craft"
                className="btn-press rounded-full border border-bark-600 px-6 py-3.5 text-sm font-semibold text-sand-200 hover:border-latte-500 hover:bg-bark-800"
              >
                Read the roast log
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-latte-500">
              <span className="tracking-[0.14em] uppercase">06 coffees · 04 origins</span>
              <span className="hidden h-3 w-px bg-bark-600 sm:block" />
              <span className="tracking-[0.14em] uppercase">Batches № 214–219</span>
              <span className="hidden h-3 w-px bg-bark-600 sm:block" />
              <span className="flex items-center gap-1.5 tracking-[0.14em] uppercase">
                <StarIcon className="h-3.5 w-3.5 text-ember-400" /> 4.8 · 1,485 reviews
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="relative">
              {FLOATING_NOTES.map((n) => (
                <span
                  key={n.label}
                  className={`absolute ${n.pos} z-10 hidden animate-float rounded-full border bg-bark-850/90 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase sm:inline-block`}
                  style={{ animationDelay: n.delay }}
                >
                  <span className={n.cls}>{n.label}</span>
                </span>
              ))}
              <RotatingStamp />
              <div className="rounded-xl border border-bark-600/70 bg-gradient-to-b from-bark-800 to-bark-850 p-7 pt-9 shadow-[0_30px_60px_-30px_rgba(16,10,6,0.9)] sm:p-9">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.24em] text-latte-500 uppercase">
                  <span>Cup № 219-A</span>
                  <span className="text-sage-400">Peak window</span>
                </div>
                <div className="mt-4">
                  <SteamCup />
                </div>
                <div className="mt-5">
                  <div className="flex justify-between font-mono text-[9px] tracking-[0.22em] text-latte-500 uppercase">
                    <span>Light</span>
                    <span>This week&apos;s span</span>
                    <span>Dark</span>
                  </div>
                  <div className="relative mt-2 h-2.5 rounded-full bg-gradient-to-r from-sand-300 via-ember-500 via-45% to-bark-950 ring-1 ring-bark-600">
                    <span
                      className="absolute top-1/2 h-4.5 w-4.5 -translate-y-1/2 rounded-full border-2 border-sand-100 bg-ember-500 shadow-[0_0_12px_rgba(222,160,76,0.7)]"
                      style={{ left: "calc(30% - 9px)" }}
                      title="This week: light to medium-dark"
                    />
                    <span
                      className="absolute top-1/2 h-4.5 w-4.5 -translate-y-1/2 rounded-full border-2 border-sand-100 bg-copper-500 shadow-[0_0_12px_rgba(182,102,51,0.7)]"
                      style={{ left: "calc(68% - 9px)" }}
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-dashed border-bark-600 pt-5 font-mono text-[11px] tracking-[0.12em] uppercase">
                  <div>
                    <p className="text-latte-500">Drop date</p>
                    <p className="mt-1 text-sand-200">Mon {formatDay(monday)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-latte-500">Best by</p>
                    <p className="mt-1 text-sand-200">Day 3 – 21</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
