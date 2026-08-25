import { useState, type FormEvent } from "react";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "../data/products";
import { useShop } from "../state/shop";
import { ArrowRightIcon, CupIcon } from "./icons";

interface FooterProps {
  onOpenProduct: (p: Product) => void;
  onCategory: (c: Category | "all") => void;
}

export default function Footer({ onOpenProduct, onCategory }: FooterProps) {
  const { pushToast } = useShop();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setEmail("");
    pushToast({ title: "You're on the list", sub: "First pour's on us — welcome to the roastery.", kind: "success" });
  };

  const jumpCategory = (c: Category | "all") => {
    onCategory(c);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="visit" className="scroll-mt-20 border-t border-bark-700/70 bg-bark-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-ember-600/50 bg-bark-800 text-ember-400">
                <CupIcon className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-semibold text-sand-100">Emberfield</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-latte-400">
              A small roastery on the east bank. Six coffees a week, twelve kilos at a time,
              and a standing table for anyone who wants to watch the drum turn.
            </p>
            <div className="mt-6 space-y-1 font-mono text-[11px] tracking-[0.12em] text-latte-500 uppercase">
              <p>415 Roastery Lane · Portland, OR</p>
              <p>Tue – Sat · 07:00 – 15:00</p>
              <p className="text-ember-400">Cupping every Saturday · 10:00 · free</p>
            </div>

            <form onSubmit={subscribe} className="mt-7 max-w-sm" noValidate>
              <label htmlFor="newsletter" className="font-mono text-[10px] tracking-[0.22em] text-latte-500 uppercase">
                The Monday roast letter
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className={`field flex-1 ${error ? "field-invalid" : ""}`}
                />
                <button
                  type="submit"
                  className="btn-press flex items-center gap-1.5 rounded-md bg-ember-500 px-4 text-sm font-bold text-bark-950 hover:bg-ember-400"
                >
                  Join <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
              {error && <p className="mt-1.5 text-xs font-medium text-clay-400">{error}</p>}
            </form>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-latte-500 uppercase">On the board</h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onOpenProduct(p)}
                    className="group flex items-baseline gap-2 text-left text-sm text-latte-300 transition-colors hover:text-ember-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-bark-500 transition-colors group-hover:bg-ember-400" />
                    <span className="font-medium">{p.name}</span>
                    <span className="font-mono text-[10px] text-latte-600">{p.origin}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-latte-500 uppercase">Browse</h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => jumpCategory(c.id)}
                    className="text-sm text-latte-300 transition-colors hover:text-ember-300"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="#craft" className="text-sm text-latte-300 transition-colors hover:text-ember-300">
                  The craft
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-latte-500 uppercase">Good to know</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-latte-300">
              <li>Free shipping over $45</li>
              <li>Ships within 48h of roast</li>
              <li>Compostable bags</li>
              <li>30-day taste guarantee</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-bark-700/70 pt-6 font-mono text-[10px] tracking-[0.16em] text-latte-600 uppercase sm:flex-row sm:items-center">
          <span>© 2026 Emberfield Roasters</span>
          <span className="text-latte-500">Demo storefront — no real orders are placed</span>
          <span>Roasted with a 1962 Probat UG-15</span>
        </div>
      </div>
    </footer>
  );
}
