import {
  CATEGORY_LABELS,
  INTENSITY_LEVELS,
  intensityOf,
  money,
  type Product,
} from "../data/products";
import { useShop } from "../state/shop";
import { HeartIcon, PlusIcon, StarIcon } from "./icons";

const BADGE_TONES: Record<string, string> = {
  leaf: "border-leaf-600/60 bg-leaf-500/15 text-leaf-300",
  amber: "border-amber-600/60 bg-amber-500/15 text-amber-300",
  sky: "border-sky-500/60 bg-sky-500/15 text-sky-400",
  clay: "border-clay-500/60 bg-clay-500/15 text-clay-300",
};

export function IntensityMeter({ mg, showLabel = true }: { mg: number; showLabel?: boolean }) {
  const level = intensityOf(mg);
  const meta = INTENSITY_LEVELS.find((l) => l.id === level)!;
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1" aria-label={`Intensidad ${level} de 3`}>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-[7px] w-[7px] rounded-full transition-colors ${
              i <= level ? "bg-amber-500" : "bg-moss-600"
            }`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="font-mono text-[10px] tracking-[0.16em] text-moss-500 uppercase">
          {meta.label} · {mg} mg
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
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-moss-700 bg-moss-800 transition-all duration-300 hover:-translate-y-1 hover:border-moss-500 hover:shadow-[0_24px_48px_-24px_rgba(11,19,12,0.95)]">
      <div className="relative cursor-pointer overflow-hidden" onClick={() => onOpen(product)}>
        <div className="aspect-[4/5] overflow-hidden bg-moss-850">
          <img
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-moss-950/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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
          aria-label={fav ? `Quitar ${product.name} de guardados` : `Guardar ${product.name}`}
          aria-pressed={fav}
          className={`btn-press absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full border backdrop-blur-[2px] ${
            fav
              ? "border-clay-500/70 bg-clay-500/25 text-clay-300"
              : "border-moss-600 bg-moss-900/60 text-cream-300 hover:border-clay-500/70 hover:text-clay-300"
          }`}
        >
          <span key={String(fav)} className="animate-pop">
            <HeartIcon className="h-4 w-4" filled={fav} />
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, 1);
          }}
          className="btn-press absolute inset-x-3 bottom-3 hidden translate-y-[130%] items-center justify-center gap-2 rounded-md bg-amber-500 py-2.5 text-sm font-bold text-moss-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-amber-400 md:flex"
        >
          <PlusIcon className="h-4 w-4" /> Agregar · {money(product.price)}
        </button>
      </div>

      <div className="flex flex-1 cursor-pointer flex-col p-5" onClick={() => onOpen(product)}>
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.22em] text-leaf-500 uppercase">
            {CATEGORY_LABELS[product.category]} · {product.size}
          </p>
          <span className="flex items-center gap-1 font-mono text-[11px] text-cream-300/70">
            <StarIcon className="h-3 w-3 text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-1.5 font-display text-[1.5rem] leading-snug text-cream-100 transition-colors group-hover:text-leaf-300">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[13px] text-cream-300/70 italic">{product.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.notes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-moss-600 bg-moss-850 px-2.5 py-1 text-[11px] font-medium text-cream-300/85"
            >
              {note}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <IntensityMeter mg={product.mg} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-moss-700 pt-4">
          <div>
            <p className="text-lg font-bold text-cream-100">
              {money(product.price)}
              {product.compareAt && (
                <span className="ml-2 font-mono text-xs font-normal text-moss-500 line-through">
                  {money(product.compareAt)}
                </span>
              )}
            </p>
            <p className="font-mono text-[10px] tracking-[0.14em] text-moss-500 uppercase">
              {product.mg} mg CBD
              {product.stock <= 8 && (
                <span className="ml-2 text-clay-400">· quedan {product.stock}</span>
              )}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            aria-label={`Agregar ${product.name} a la bolsa`}
            className="btn-press grid h-10 w-10 place-items-center rounded-full border border-moss-600 text-amber-400 transition-colors hover:border-amber-500 hover:bg-amber-500 hover:text-moss-950 md:hidden"
          >
            <PlusIcon className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
