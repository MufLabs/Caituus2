import { useEffect, useState } from "react";
import {
  GRINDS,
  ROAST_LABELS,
  grindLabel,
  money,
  type Grind,
  type Product,
} from "../data/products";
import { useShop } from "../state/shop";
import { RoastMeter } from "./ProductCard";
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ScaleIcon,
  StarIcon,
  ThermoIcon,
  TimerIcon,
  XIcon,
} from "./icons";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useShop();
  const [grind, setGrind] = useState<Grind>("whole");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleAdd = () => {
    addToCart(product, grind, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <button
        className="absolute inset-0 animate-fade cursor-default bg-bark-950/75 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close product details"
      />
      <div className="animate-panel-in scroll-slim relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-xl border border-bark-600/70 bg-bark-850 shadow-[0_40px_90px_-30px_rgba(16,10,6,1)] sm:rounded-xl">
        <button
          onClick={onClose}
          className="btn-press absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-bark-600 bg-bark-900/80 text-latte-300 hover:border-latte-500 hover:text-sand-100"
          aria-label="Close"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-bark-800 sm:h-full">
              <img
                src={product.image}
                alt={`${product.name} coffee bag`}
                className="h-full w-full object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-full border border-bark-600 bg-bark-900/80 px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-ember-300 uppercase">
                {product.badge.label}
              </span>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <p className="font-mono text-[10px] tracking-[0.24em] text-latte-500 uppercase">
              {product.origin} · {product.region}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sand-100 sm:text-4xl">
              {product.name}
            </h2>

            <div className="mt-2.5 flex items-center gap-2">
              <span className="flex text-ember-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5" filled={i <= Math.round(product.rating)} />
                ))}
              </span>
              <span className="font-mono text-[11px] text-latte-400">
                {product.rating.toFixed(1)} · {product.reviews} reviews
              </span>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-latte-300">{product.description}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={{ borderColor: `${product.accent}66`, color: product.accent, background: `${product.accent}14` }}
                >
                  {note}
                </span>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-bark-700 py-5">
              {[
                ["Process", product.process],
                ["Varietal", product.varietal],
                ["Altitude", product.altitude],
                ["Producer", product.producer],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[9px] tracking-[0.22em] text-latte-500 uppercase">{k}</dt>
                  <dd className="mt-1 text-[13px] leading-snug font-medium text-sand-200">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex items-center justify-between">
              <RoastMeter roast={product.roast} />
              <span className="font-mono text-[10px] tracking-[0.14em] text-latte-500 uppercase">
                {product.weight} g bag
                {product.stock <= 8 && <span className="text-clay-400"> · {product.stock} left</span>}
              </span>
            </div>

            <fieldset className="mt-5">
              <legend className="font-mono text-[10px] tracking-[0.22em] text-latte-500 uppercase">Grind</legend>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {GRINDS.map((g) => {
                  const active = grind === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setGrind(g.id)}
                      aria-pressed={active}
                      className={`btn-press rounded-md border px-2 py-2.5 text-left ${
                        active
                          ? "border-ember-500 bg-bark-700"
                          : "border-bark-600 bg-bark-800 hover:border-latte-500"
                      }`}
                    >
                      <span className={`flex items-center gap-1.5 text-[13px] font-bold ${active ? "text-ember-300" : "text-sand-200"}`}>
                        {active && <CheckIcon className="h-3.5 w-3.5" />}
                        {g.label}
                      </span>
                      <span className="mt-0.5 block font-mono text-[9px] tracking-[0.08em] text-latte-500 uppercase">
                        {g.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-5 flex items-stretch gap-3">
              <div className="flex items-center rounded-md border border-bark-600 bg-bark-800">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="btn-press p-3 text-latte-300 hover:text-sand-100 disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-mono text-sm font-bold text-sand-100" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(12, q + 1))}
                  disabled={qty >= 12}
                  className="btn-press p-3 text-latte-300 hover:text-sand-100 disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="btn-press flex flex-1 items-center justify-center gap-2 rounded-md bg-ember-500 px-5 text-sm font-bold text-bark-950 hover:bg-ember-400"
              >
                Add to bag · {money(product.price * qty)}
              </button>
            </div>
            <p className="mt-2 font-mono text-[10px] tracking-[0.08em] text-latte-600">
              {grindLabel(grind)} grind · ships within 48h of roast
            </p>

            <div className="mt-6 rounded-md border border-dashed border-bark-600 bg-bark-900/50 p-4">
              <p className="font-mono text-[10px] tracking-[0.22em] text-ember-400 uppercase">
                Brew it like we do — {product.brew.method}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { icon: ScaleIcon, label: "Ratio", value: product.brew.ratio },
                  { icon: ThermoIcon, label: "Water", value: product.brew.temp },
                  { icon: TimerIcon, label: "Time", value: product.brew.time },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon className="h-4.5 w-4.5 shrink-0 text-latte-400" />
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.18em] text-latte-500 uppercase">{label}</p>
                      <p className="text-[13px] font-bold text-sand-100">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-latte-600 uppercase">
              Roast profile — {ROAST_LABELS[product.roast]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
