import { useEffect, useState } from "react";
import { CATEGORY_LABELS, LEGAL, money, type Product } from "../data/products";
import { useShop } from "../state/shop";
import { DropIcon, FlaskIcon, MinusIcon, MoonIcon, PlusIcon, ShieldIcon, StarIcon, XIcon } from "./icons";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useShop();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleAdd = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`Detalles de ${product.name}`}>
      <button
        className="absolute inset-0 animate-fade cursor-default bg-moss-950/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Cerrar detalles del producto"
      />
      <div className="animate-panel-in scroll-slim relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-xl border border-moss-600 bg-moss-850 shadow-[0_40px_90px_-30px_rgba(43,50,42,0.6)] sm:rounded-xl">
        <button
          onClick={onClose}
          className="btn-press absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-moss-600 bg-moss-900/90 text-cream-200 hover:border-cream-300/50 hover:text-cream-100"
          aria-label="Cerrar"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-white sm:h-full">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-full border border-moss-600 bg-moss-900/90 px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-leaf-300 uppercase">
                {product.badge.label}
              </span>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <p className="font-mono text-[10px] tracking-[0.24em] text-leaf-400 uppercase">
              {CATEGORY_LABELS[product.category]} · {product.content}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-cream-100 sm:text-4xl">
              {product.name}
            </h2>

            <div className="mt-2.5 flex items-center gap-2">
              <span className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5" filled={i <= Math.round(product.rating)} />
                ))}
              </span>
              <span className="font-mono text-[11px] text-cream-300">
                {product.rating.toFixed(1)} · {product.reviews} reseñas
              </span>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-cream-200">{product.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
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

            <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-moss-700 py-5">
              {product.specs.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-[9px] tracking-[0.22em] text-cream-300 uppercase">{s.label}</dt>
                  <dd className="mt-1 text-[13px] leading-snug font-semibold text-cream-100">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-cream-300 uppercase">
              <span>{product.kind}</span>
              <span>
                {product.thc}
                {product.stock <= 9 && <span className="text-clay-400"> · quedan {product.stock}</span>}
              </span>
            </div>

            <div className="mt-5 flex items-stretch gap-3">
              <div className="flex items-center rounded-md border border-moss-600 bg-moss-900">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="btn-press p-3 text-cream-200 hover:text-cream-100 disabled:opacity-30"
                  aria-label="Disminuir cantidad"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-mono text-sm font-bold text-cream-100" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(12, q + 1))}
                  disabled={qty >= 12}
                  className="btn-press p-3 text-cream-200 hover:text-cream-100 disabled:opacity-30"
                  aria-label="Aumentar cantidad"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="btn-press flex flex-1 items-center justify-center gap-2 rounded-md bg-amber-500 px-5 text-sm font-bold text-moss-950 hover:bg-amber-400"
              >
                Agregar a la bolsa · {money(product.price * qty)}
              </button>
            </div>
            <p className="mt-2 font-mono text-[10px] tracking-[0.08em] text-cream-300">
              Despacho en 24 h · El envío se paga contraentrega a la transportadora
            </p>

            <div className="mt-6 rounded-md border border-dashed border-moss-600 bg-moss-900/60 p-4">
              <p className="font-mono text-[10px] tracking-[0.22em] text-leaf-400 uppercase">Guía de uso</p>
              <div className="mt-3 space-y-2.5">
                {[
                  { icon: DropIcon, label: "Aplicación", value: product.use.aplicacion },
                  { icon: FlaskIcon, label: "Dosis sugerida", value: product.use.dosis },
                  { icon: MoonIcon, label: "Momento", value: product.use.momento },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber-400" />
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.18em] text-cream-300 uppercase">{label}</p>
                      <p className="text-[13px] leading-snug text-cream-100">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-cream-300">
              <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" />
              {LEGAL.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
