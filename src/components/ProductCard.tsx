import { ROAST_LABELS, money, type Product } from "../data/products";
import { useShop } from "../state/shop";
import { HeartIcon, PlusIcon, StarIcon } from "./icons";

const BADGE_TONES: Record<string, string> = {
  sage: "border-sage-600/60 bg-sage-500/15 text-sage-300",
  ember: "border-ember-600/60 bg-ember-500/15 text-ember-300",
  berry: "border-berry-500/60 bg-berry-500/15 text-berry-400",
  copper: "border-copper-600/60 bg-copper-500/15 text-copper-400",
};

export function RoastMeter({ roast, showLabel = true }: { roast: number; showLabel?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1" aria-label={`Roast level ${roast} of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-[7px] w-[7px] rounded-full transition-colors ${
              i <= roast ? "bg-ember-500" : "bg-bark-600"
            }`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="font-mono text-[10px] tracking-[0.16em] text-latte-500 uppercase">
          {ROAST_LABELS[roast]}
        </span>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onOpen: (p: Product) => void;
  index: number;
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  const { addToCart, favorites, toggleFavorite } = useShop();
  const fav = favorites.includes(product.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-bark-700 bg-bark-800 transition-all duration-300 hover:-translate-y-1 hover:border-latte-600/60 hover:shadow-[0_24px_48px_-24px_rgba(16,10,6,0.95)]">
      <div className="relative cursor-pointer overflow-hidden" onClick={() => onOpen(product)}>
        <div className="aspect-[4/5] overflow-hidden bg-bark-850">
          <img
            src={product.image}
            alt={`${product.name} — ${product.origin} coffee bag`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bark-950/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 rounded-full border px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase backdrop-blur-[2px] ${BADGE_TONES[product.badge.tone]}`}
          >
            {product.badge.label}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={fav ? `Remove ${product.name} from saved` : `Save ${product.name}`}
          aria-pressed={fav}
          className={`btn-press absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full border backdrop-blur-[2px] ${
            fav
              ? "border-berry-500/70 bg-berry-500/25 text-berry-400"
              : "border-bark-600 bg-bark-900/60 text-latte-300 hover:border-berry-500/70 hover:text-berry-400"
          }`}
        >
          <span key={String(fav)} className="animate-pop">
            <HeartIcon className="h-4 w-4" filled={fav} />
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, "whole", 1);
          }}
          className="btn-press absolute inset-x-3 bottom-3 hidden translate-y-[130%] items-center justify-center gap-2 rounded-md bg-ember-500 py-2.5 text-sm font-bold text-bark-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ember-400 md:flex"
        >
          <PlusIcon className="h-4 w-4" /> Quick add · {money(product.price)}
        </button>
      </div>

      <div className="flex flex-1 cursor-pointer flex-col p-5" onClick={() => onOpen(product)}>
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.22em] text-latte-500 uppercase">
            {product.origin}
          </p>
          <span className="flex items-center gap-1 font-mono text-[11px] text-latte-400">
            <StarIcon className="h-3 w-3 text-ember-400" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-1.5 font-display text-[1.4rem] leading-snug font-semibold text-sand-100 transition-colors group-hover:text-ember-300">
          {product.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.notes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-bark-600 bg-bark-850 px-2.5 py-1 text-[11px] font-medium text-latte-300"
            >
              {note}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <RoastMeter roast={product.roast} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-bark-700 pt-4">
          <div>
            <p className="text-lg font-bold text-sand-100">{money(product.price)}</p>
            <p className="font-mono text-[10px] tracking-[0.14em] text-latte-500 uppercase">
              {product.weight} g
              {product.stock <= 8 && (
                <span className="ml-2 text-clay-400">· only {product.stock} left</span>
              )}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, "whole", 1);
            }}
            aria-label={`Add ${product.name} to bag`}
            className="btn-press grid h-10 w-10 place-items-center rounded-full border border-bark-600 text-ember-400 transition-colors hover:border-ember-500 hover:bg-ember-500 hover:text-bark-950 md:hidden"
          >
            <PlusIcon className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
