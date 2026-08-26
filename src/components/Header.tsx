import { useEffect, useState } from "react";
import { useShop } from "../state/shop";
import { BagIcon, CaituusMark, WhatsAppIcon } from "./icons";

const TICKER = [
  "Envío gratis desde " + "$200.000",
  "Paga con Nequi · Daviplata · PSE · Contraentrega",
  "Hemp orgánico · THC < 0.3%",
  "Verificados en laboratorio por lote",
  "Bogotá, Colombia · Envíos a todo el país",
  "Ley 1787 de 2016 · Decreto 613 de 2017",
];

export default function Header() {
  const { count, cartOpen, setCartOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 450);
    return () => window.clearTimeout(t);
  }, [count]);

  return (
    <header className="sticky top-0 z-40">
      <div className="marquee overflow-hidden border-b border-moss-700/70 bg-moss-950">
        <div className="marquee-track flex w-max animate-marquee items-center">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center" aria-hidden={half === 1}>
              {TICKER.map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 pr-3 font-mono text-[10px] tracking-[0.22em] whitespace-nowrap text-cream-300/85 uppercase"
                >
                  <span className="py-2">{item}</span>
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-leaf-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M12 4c.5 3.4 2.1 5.1 5.5 5.6-3.4.5-5 2.2-5.5 5.6-.5-3.4-2.1-5.1-5.5-5.6 3.4-.5 5-2.2 5.5-5.6Z" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`border-b border-moss-700/70 transition-all duration-300 ${
          scrolled ? "bg-moss-900/95 shadow-[0_12px_36px_-18px_rgba(11,19,12,0.9)] backdrop-blur-md" : "bg-moss-900/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="group flex items-center gap-3">
            <CaituusMark className="h-9 w-9 text-leaf-400 transition-transform duration-300 group-hover:rotate-6" />
            <span className="leading-none">
              <span className="block font-display text-[26px] tracking-wide text-cream-100">Caituus</span>
              <span className="mt-0.5 block font-mono text-[8px] tracking-[0.3em] text-leaf-500 uppercase">
                Cannabis esencial
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-cream-300 md:flex" aria-label="Navegación principal">
            <a href="#tienda" className="transition-colors hover:text-leaf-300">Tienda</a>
            <a href="#metodo" className="transition-colors hover:text-leaf-300">El método</a>
            <a href="#como-comprar" className="transition-colors hover:text-leaf-300">Cómo comprar</a>
            <a href="#contacto" className="transition-colors hover:text-leaf-300">Contacto</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noreferrer"
              className="btn-press hidden items-center gap-2 rounded-full border border-moss-600 px-4 py-2 text-xs font-bold text-leaf-300 hover:border-leaf-500 hover:bg-moss-800 sm:flex"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="btn-press relative grid h-11 w-11 place-items-center rounded-full border border-moss-600 text-cream-100 hover:border-leaf-500 hover:bg-moss-800"
              aria-label={`Abrir bolsa de compras, ${count} productos`}
            >
              <BagIcon className="h-5 w-5" />
              {count > 0 && (
                <span
                  className={`absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 font-mono text-[10px] font-bold text-moss-950 ${
                    bump ? "animate-pop" : ""
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
