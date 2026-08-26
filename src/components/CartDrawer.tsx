import { useEffect } from "react";
import { FREE_SHIPPING_AT, PRODUCTS, money } from "../data/products";
import { useShop } from "../state/shop";
import {
  ArrowRightIcon,
  CheckIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  TruckIcon,
  XIcon,
} from "./icons";

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { cartOpen, setCartOpen, lines, setQty, removeLine, count, subtotal, shipping, total } =
    useShop();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  const remaining = FREE_SHIPPING_AT - subtotal;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  const browse = () => {
    setCartOpen(false);
    document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Bolsa de compras">
      <button
        className="absolute inset-0 animate-fade cursor-default bg-moss-950/80 backdrop-blur-[2px]"
        onClick={() => setCartOpen(false)}
        aria-label="Cerrar bolsa"
      />
      <aside className="animate-drawer-in absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-moss-600/70 bg-moss-850 shadow-[-30px_0_70px_-30px_rgba(11,19,12,0.9)]">
        <header className="flex items-center justify-between border-b border-moss-700 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl text-cream-100">Tu bolsa</h2>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-moss-500 uppercase">
              {count} {count === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="btn-press grid h-9 w-9 place-items-center rounded-full border border-moss-600 text-cream-300 hover:border-cream-300/40 hover:text-cream-100"
            aria-label="Cerrar bolsa"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </header>

        {lines.length > 0 && (
          <div className="border-b border-moss-700 px-6 py-4">
            {remaining > 0 ? (
              <p className="flex items-center gap-2 text-[13px] font-medium text-cream-300/85">
                <TruckIcon className="h-4 w-4 shrink-0 text-amber-400" />
                <span>
                  Te faltan <strong className="text-amber-300">{money(remaining)}</strong> para envío
                  gratis
                </span>
              </p>
            ) : (
              <p className="flex items-center gap-2 text-[13px] font-semibold text-leaf-300">
                <CheckIcon className="h-4 w-4 shrink-0" /> ¡Envío gratis desbloqueado!
              </p>
            )}
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-moss-700">
              <div
                className={`h-full rounded-full transition-all duration-500 ${remaining > 0 ? "bg-gradient-to-r from-amber-600 to-amber-400" : "bg-leaf-500"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="scroll-slim flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-moss-600 text-moss-500">
                <LeafIcon className="h-9 w-9" />
              </span>
              <h3 className="mt-5 font-display text-2xl text-cream-100">Tu bolsa está vacía</h3>
              <p className="mt-2 max-w-[250px] text-sm text-cream-300/70">
                Seis fórmulas de cannabis esencial te esperan en la tienda.
              </p>
              <button
                onClick={browse}
                className="btn-press mt-6 flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-moss-950 hover:bg-amber-400"
              >
                Ver la tienda <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map((line) => {
                const product = PRODUCTS.find((p) => p.id === line.productId);
                if (!product) return null;
                return (
                  <li key={line.productId} className="flex gap-4 border-b border-moss-700/70 pb-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-20 shrink-0 rounded-md border border-moss-700 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-[17px] leading-tight text-cream-100">
                            {product.name}
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-moss-500 uppercase">
                            {product.mg} mg · {product.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeLine(line.productId)}
                          className="btn-press rounded-md p-1.5 text-moss-500 hover:bg-moss-700 hover:text-clay-400"
                          aria-label={`Quitar ${product.name}`}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-moss-600 bg-moss-800">
                          <button
                            onClick={() => setQty(line.productId, line.qty - 1)}
                            disabled={line.qty <= 1}
                            className="btn-press p-2 text-cream-300 hover:text-cream-100 disabled:opacity-30"
                            aria-label={`Disminuir cantidad de ${product.name}`}
                          >
                            <MinusIcon className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center font-mono text-[13px] font-bold text-cream-100" aria-live="polite">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => setQty(line.productId, line.qty + 1)}
                            disabled={line.qty >= 12}
                            className="btn-press p-2 text-cream-300 hover:text-cream-100 disabled:opacity-30"
                            aria-label={`Aumentar cantidad de ${product.name}`}
                          >
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-[15px] font-bold text-cream-100">
                          {money(product.price * line.qty)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-moss-700 px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-cream-300/85">
                <dt>Subtotal</dt>
                <dd className="font-mono">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-cream-300/85">
                <dt>Envío</dt>
                <dd className={`font-mono ${shipping === 0 ? "font-bold text-leaf-300" : ""}`}>
                  {shipping === 0 ? "Gratis" : money(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-moss-700 pt-2.5 text-base font-bold text-cream-100">
                <dt>Total</dt>
                <dd className="font-mono">{money(total)}</dd>
              </div>
            </dl>
            <button
              onClick={onCheckout}
              className="btn-press mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-amber-500 py-3.5 text-sm font-bold text-moss-950 hover:bg-amber-400"
            >
              Ir a pagar · {money(total)} <ArrowRightIcon className="h-4 w-4" />
            </button>
            <p className="mt-2.5 text-center font-mono text-[10px] tracking-[0.1em] text-moss-500 uppercase">
              Nequi · Daviplata · PSE · Tarjeta · Contraentrega
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}
