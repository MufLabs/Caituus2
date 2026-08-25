import { useEffect } from "react";
import { FREE_SHIPPING_AT, PRODUCTS, grindLabel, money } from "../data/products";
import { useShop } from "../state/shop";
import {
  ArrowRightIcon,
  CheckIcon,
  CupIcon,
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
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button
        className="absolute inset-0 animate-fade cursor-default bg-bark-950/75 backdrop-blur-[2px]"
        onClick={() => setCartOpen(false)}
        aria-label="Close bag"
      />
      <aside className="animate-drawer-in absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-bark-600/70 bg-bark-850 shadow-[-30px_0_70px_-30px_rgba(16,10,6,0.9)]">
        <header className="flex items-center justify-between border-b border-bark-700 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl font-semibold text-sand-100">Your bag</h2>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-latte-500 uppercase">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="btn-press grid h-9 w-9 place-items-center rounded-full border border-bark-600 text-latte-300 hover:border-latte-500 hover:text-sand-100"
            aria-label="Close bag"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </header>

        {lines.length > 0 && (
          <div className="border-b border-bark-700 px-6 py-4">
            {remaining > 0 ? (
              <p className="flex items-center gap-2 text-[13px] font-medium text-latte-300">
                <TruckIcon className="h-4 w-4 shrink-0 text-ember-400" />
                <span>
                  You&apos;re <strong className="text-ember-300">{money(remaining)}</strong> from free
                  shipping
                </span>
              </p>
            ) : (
              <p className="flex items-center gap-2 text-[13px] font-semibold text-sage-300">
                <CheckIcon className="h-4 w-4 shrink-0" /> Free shipping unlocked
              </p>
            )}
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-bark-700">
              <div
                className={`h-full rounded-full transition-all duration-500 ${remaining > 0 ? "bg-gradient-to-r from-copper-500 to-ember-400" : "bg-sage-500"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="scroll-slim flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-bark-600 text-latte-600">
                <CupIcon className="h-9 w-9" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-sand-100">
                Your bag is empty
              </h3>
              <p className="mt-2 max-w-[240px] text-sm text-latte-400">
                Six coffees are waiting on this week&apos;s roast board.
              </p>
              <button
                onClick={browse}
                className="btn-press mt-6 flex items-center gap-2 rounded-full bg-ember-500 px-6 py-3 text-sm font-bold text-bark-950 hover:bg-ember-400"
              >
                Browse coffees <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map((line) => {
                const product = PRODUCTS.find((p) => p.id === line.productId);
                if (!product) return null;
                return (
                  <li key={line.key} className="flex gap-4 border-b border-bark-700/70 pb-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-20 shrink-0 rounded-md border border-bark-700 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-[17px] leading-tight font-semibold text-sand-100">
                            {product.name}
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-latte-500 uppercase">
                            {grindLabel(line.grind)} · {product.weight} g
                          </p>
                        </div>
                        <button
                          onClick={() => removeLine(line.key)}
                          className="btn-press rounded-md p-1.5 text-latte-500 hover:bg-bark-700 hover:text-clay-400"
                          aria-label={`Remove ${product.name}`}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-bark-600 bg-bark-800">
                          <button
                            onClick={() => setQty(line.key, line.qty - 1)}
                            disabled={line.qty <= 1}
                            className="btn-press p-2 text-latte-300 hover:text-sand-100 disabled:opacity-30"
                            aria-label={`Decrease ${product.name} quantity`}
                          >
                            <MinusIcon className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center font-mono text-[13px] font-bold text-sand-100" aria-live="polite">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => setQty(line.key, line.qty + 1)}
                            disabled={line.qty >= 12}
                            className="btn-press p-2 text-latte-300 hover:text-sand-100 disabled:opacity-30"
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-[15px] font-bold text-sand-100">
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
          <footer className="border-t border-bark-700 px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-latte-300">
                <dt>Subtotal</dt>
                <dd className="font-mono">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-latte-300">
                <dt>Shipping</dt>
                <dd className={`font-mono ${shipping === 0 ? "font-bold text-sage-300" : ""}`}>
                  {shipping === 0 ? "Free" : money(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-bark-700 pt-2.5 text-base font-bold text-sand-100">
                <dt>Total</dt>
                <dd className="font-mono">{money(total)}</dd>
              </div>
            </dl>
            <button
              onClick={onCheckout}
              className="btn-press mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-ember-500 py-3.5 text-sm font-bold text-bark-950 hover:bg-ember-400"
            >
              Checkout · {money(total)} <ArrowRightIcon className="h-4 w-4" />
            </button>
            <p className="mt-2.5 text-center font-mono text-[10px] tracking-[0.1em] text-latte-600 uppercase">
              Demo checkout — no real payment
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}
