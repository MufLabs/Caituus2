import { useEffect, useState } from "react";
import { useShop } from "../state/shop";
import { BagIcon, LeafIcon, MenuIcon, TruckIcon, XIcon } from "./icons";

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Información", href: "#informacion" },
  { label: "Mascotas", href: "#mascotas" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const { count, setCartOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="overflow-hidden bg-leaf-700 text-moss-900">
        <div className="marquee relative flex whitespace-nowrap">
          <div className="animate-marquee marquee-track flex items-center gap-10 py-2 pr-10 font-mono text-[10px] font-bold tracking-[0.22em] uppercase">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-10" aria-hidden={dup === 1}>
                <span className="flex items-center gap-2">
                  <TruckIcon className="h-3.5 w-3.5" /> Envío contraentrega a toda Colombia
                </span>
                <span>Despacho en 24 horas</span>
                <span>Certificado de laboratorio por lote</span>
                <span>THC &lt; 0.3% en línea humana</span>
                <span>Hecho en Bogotá · Hemp orgánico</span>
                <span>Paga con PSE · Baloto · Efecty · Tarjetas</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`border-b border-moss-700/70 bg-moss-900/90 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(43,50,42,0.35)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="#inicio" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-leaf-500/50 bg-moss-850 text-leaf-400 transition-colors group-hover:border-leaf-500 group-hover:text-leaf-300">
              <LeafIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-[1.35rem] leading-none font-semibold tracking-[0.06em] text-cream-100 uppercase">
                Caituus
              </span>
              <span className="mt-1 block font-mono text-[8.5px] tracking-[0.24em] text-cream-300 uppercase">
                Productos esenciales de cannabis
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[13px] font-bold tracking-[0.1em] text-cream-200 uppercase transition-colors hover:bg-moss-800 hover:text-leaf-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <span className="mr-1 hidden font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase md:block">
              Bogotá · Colombia
            </span>
            <button
              onClick={() => setCartOpen(true)}
              className="btn-press relative grid h-11 w-11 place-items-center rounded-full border border-moss-600 bg-moss-850 text-cream-100 transition-colors hover:border-leaf-500 hover:text-leaf-300"
              aria-label={`Abrir bolsa de compras (${count} productos)`}
            >
              <BagIcon className="h-5 w-5" />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute -top-1 -right-1 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-amber-500 px-1 font-mono text-[10px] font-bold text-moss-950"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="btn-press grid h-11 w-11 place-items-center rounded-full border border-moss-600 text-cream-100 lg:hidden"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="animate-rise border-t border-moss-700/70 px-4 pt-2 pb-4 lg:hidden" aria-label="Menú móvil">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-dashed border-moss-700 py-3 font-display text-xl text-cream-100 last:border-0 hover:text-leaf-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
