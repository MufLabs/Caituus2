import { useShop } from "../state/shop";
import { BagIcon, BeanIcon, CupIcon } from "./icons";

const TICKER_ITEMS = [
  "Roasted every Monday",
  "Free shipping over $45",
  "Direct trade · 12 partner farms",
  "Shipped within 48 hours of roast",
  "Compostable bags, carbon-neutral post",
  "4.8 ★ from 1,485 bag reviews",
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="marquee overflow-hidden border-b border-bark-700/70 bg-bark-850">
      <div className="marquee-track flex w-max items-center animate-marquee py-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 pr-3 font-mono text-[11px] tracking-[0.18em] text-latte-400 uppercase whitespace-nowrap"
          >
            <span className="text-ember-500">{item}</span>
            <BeanIcon className="h-3 w-3 text-bark-500" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const { count, setCartOpen } = useShop();

  return (
    <>
      <Ticker />
      <header className="sticky top-0 z-40 border-b border-bark-700/70 bg-bark-900/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-ember-600/50 bg-bark-800 text-ember-400 transition-colors group-hover:border-ember-400 group-hover:text-ember-300">
              <CupIcon className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold tracking-tight text-sand-100">
                Emberfield
              </span>
              <span className="block font-mono text-[9px] tracking-[0.34em] text-latte-500 uppercase">
                Roasters · Est. 2017
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {[
              { label: "Roast board", href: "#shop" },
              { label: "Craft", href: "#craft" },
              { label: "Visit", href: "#visit" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-mono text-xs tracking-[0.2em] text-latte-400 uppercase transition-colors hover:text-ember-300"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ember-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-bark-600 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-sage-400 uppercase lg:flex">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-sage-400" />
              Drum fires Mon 06:00
            </span>
            <button
              onClick={() => setCartOpen(true)}
              className="btn-press relative flex items-center gap-2 rounded-full border border-bark-600 bg-bark-800 px-4 py-2.5 text-sm font-semibold text-sand-100 hover:border-ember-500/70 hover:bg-bark-700"
              aria-label={`Open bag, ${count} items`}
            >
              <BagIcon className="h-4.5 w-4.5 text-ember-400" />
              <span className="hidden sm:inline">Bag</span>
              {count > 0 && (
                <span
                  key={count}
                  className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-ember-500 px-1 font-mono text-[10px] font-bold text-bark-950"
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
