import { useEffect } from "react";
import { PRODUCTS, money } from "../data/products";
import SafeImg from "./SafeImg";
import { useShop } from "../state/shop";
import {
  ArrowRightIcon,
  BagIcon,
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
  const { cartOpen, setCartOpen, lines, setQty, removeLine, count, subtotal, total } = useShop();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  const browse = () => {
    setCartOpen(false);
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Bolsa de compras">
      <button
        className="absolute inset-0 animate-fade cursor-default bg-moss-950/70 backdrop-blur-[2px]"
        onClick={() => setCartOpen(false)}
        aria-label="Cerrar bolsa"
      />
      <aside className="animate-drawer-in absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-moss-600 bg-moss-850 shadow-[-30px_0_70px_-30px_rgba(43,50,42,0.5)]">
        <header className="flex items-center justify-between border-b border-moss-700 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl font-semibold text-cream-100">Tu bolsa</h2>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-cream-300 uppercase">
              {count} {count === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="btn-press grid h-9 w-9 place-items-center rounded-full border border-moss-600 text-cream-200 hover:border-cream-300/50 hover:text-cream-100"
            aria-label="Cerrar bolsa"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </header>

        {lines.length > 0 && (
          <div className="border-b border-moss-700 px-6 py-4">
            <p className="flex items-start gap-2.5 text-[13px] leading-snug font-medium text-cream-200">
              <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>
                Despacho a la transportadora en <strong className="text-leaf-300">24 horas</strong>.
                El valor del envío se paga <strong>contraentrega</strong>.
              </span>
            </p>
          </div>
        )}

        <div className="scroll-slim flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-moss-600 text-moss-500">
                <BagIcon className="h-9 w-9" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-cream-100">Tu bolsa está vacía</h3>
              <p className="mt-2 max-w-[260px] text-sm text-cream-300">
                Aceites de CBD, extractos y la línea para mascotas te esperan en la vitrina.
              </p>
              <button
                onClick={browse}
                className="btn-press mt-6 flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-moss-950 hover:bg-amber-400"
              >
                Ver productos <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map((line) => {
                const product = PRODUCTS.find((p) => p.id === line.productId);
                if (!product) return null;
                return (
                  <li key={line.productId} className="flex gap-4 border-b border-moss-700/70 pb-5">
                    <SafeImg
                      src={product.image}
                      fallback={product.fallback}
                      alt={product.name}
                      className="photo-plate h-24 w-20 shrink-0 rounded-md border border-moss-700 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-[17px] leading-tight font-semibold text-cream-100">
                            {product.name}
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-cream-300 uppercase">
                            {product.content}
                          </p>
                        </div>
                        <button
                          onClick={() => removeLine(line.productId)}
                          className="btn-press rounded-md p-1.5 text-moss-500 hover:bg-moss-800 hover:text-clay-400"
                          aria-label={`Quitar ${product.name}`}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-moss-600 bg-moss-900">
                          <button
                            onClick={() => setQty(line.productId, line.qty - 1)}
                            disabled={line.qty <= 1}
                            className="btn-press p-2 text-cream-200 hover:text-cream-100 disabled:opacity-30"
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
                            className="btn-press p-2 text-cream-200 hover:text-cream-100 disabled:opacity-30"
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
              <div className="flex justify-between text-cream-200">
                <dt>Subtotal</dt>
                <dd className="font-mono">{money(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between text-cream-200">
                <dt className="flex items-center gap-1.5">
                  Envío
                  <span className="rounded-full border border-amber-500/50 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-amber-300 uppercase">
                    Contraentrega
                  </span>
                </dt>
                <dd className="font-mono text-cream-300">Se paga al recibir</dd>
              </div>
              <div className="flex justify-between border-t border-moss-700 pt-2.5 text-base font-bold text-cream-100">
                <dt>Total a pagar</dt>
                <dd className="font-mono">{money(total)}</dd>
              </div>
            </dl>
            <button
              onClick={onCheckout}
              className="btn-press mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-amber-500 py-3.5 text-sm font-bold text-moss-950 hover:bg-amber-400"
            >
              Ir a pagar · {money(total)} <ArrowRightIcon className="h-4 w-4" />
            </button>
            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center font-mono text-[10px] tracking-[0.1em] text-cream-300 uppercase">
              <CheckIcon className="h-3 w-3 text-leaf-400" /> Nequi · Daviplata · Breve (Bre-B)
            </p>
          </footer>
        )}

        {lines.length === 0 && (
          <div className="border-t border-moss-700 px-6 py-4">
            <p className="flex items-center justify-center gap-2 text-center font-mono text-[10px] tracking-[0.14em] text-cream-300 uppercase">
              <LeafIcon className="h-3.5 w-3.5 text-leaf-400" /> Productos orgánicos de Hemp y Cannabis
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
