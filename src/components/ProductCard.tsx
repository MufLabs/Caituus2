import { CATEGORY_LABELS, money, type Product } from "../data/products";
import { useShop } from "../state/shop";
import { HeartIcon, PlusIcon, StarIcon } from "./icons";

const BADGE_TONES: Record<string, string> = {
  leaf: "border-leaf-500/60 bg-leaf-500/15 text-leaf-300",
  amber: "border-amber-500/60 bg-amber-500/15 text-amber-300",
  sky: "border-sky-500/60 bg-sky-500/15 text-sky-400",
  clay: "border-clay-500/60 bg-clay-500/15 text-clay-300",
};

interface ProductCardProps {
  product: Product;
  onOpen: (p: Product) => void;
  index: number;
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  const { addToCart, favorites, toggleFavorite } = useShop();
  const fav = favorites.includes(product.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-moss-700 bg-moss-850 transition-all duration-300 hover:-translate-y-1 hover:border-leaf-500/70 hover:shadow-[0_24px_48px_-24px_rgba(43,50,42,0.4)]">
      <div className="relative cursor-pointer overflow-hidden" onClick={() => onOpen(product)}>
        <div className="aspect-[4/5] overflow-hidden bg-white">
          <img
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-moss-950/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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
              ? "border-clay-500/70 bg-clay-500/20 text-clay-400"
              : "border-moss-600 bg-moss-900/80 text-cream-200 hover:border-clay-500/70 hover:text-clay-400"
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
          <p className="font-mono text-[10px] tracking-[0.22em] text-leaf-400 uppercase">
            {CATEGORY_LABELS[product.category]} · {product.content}
          </p>
          <span className="flex items-center gap-1 font-mono text-[11px] text-cream-300">
            <StarIcon className="h-3 w-3 text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-1.5 font-display text-[1.45rem] leading-snug font-semibold text-cream-100 transition-colors group-hover:text-leaf-300">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[13px] text-cream-300 italic">{product.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.notes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-moss-600 bg-moss-900 px-2.5 py-1 text-[11px] font-medium text-cream-200"
            >
              {note}
            </span>
          ))}
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
            <p className="font-mono text-[10px] tracking-[0.14em] text-cream-300 uppercase">
              {product.kind}
              {product.stock <= 9 && (
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
