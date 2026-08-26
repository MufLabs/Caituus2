import { useState, type FormEvent } from "react";
import { CATEGORIES, LEGAL, PRODUCTS, SOCIALS, type Category, type Product } from "../data/products";
import { useShop } from "../state/shop";
import {
  ArrowRightIcon,
  CaituusMark,
  FacebookIcon,
  InstagramIcon,
  LeafIcon,
  XSocialIcon,
} from "./icons";

interface FooterProps {
  onOpenProduct: (p: Product) => void;
  onCategory: (c: Category | "all") => void;
}

const SOCIAL_ICONS: Record<string, typeof LeafIcon> = {
  instagram: InstagramIcon,
  x: XSocialIcon,
  facebook: FacebookIcon,
};

export default function Footer({ onOpenProduct, onCategory }: FooterProps) {
  const { pushToast } = useShop();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Escribe un correo válido");
      return;
    }
    setError("");
    setEmail("");
    pushToast({ title: "Ya estás en la lista", sub: "Recibirás la carta de la planta cada lunes.", kind: "success" });
  };

  const jumpCategory = (c: Category | "all") => {
    onCategory(c);
    document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contacto" className="scroll-mt-24 border-t border-moss-700/70 bg-moss-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <CaituusMark className="h-10 w-10 text-leaf-400" />
              <span className="leading-none">
                <span className="block font-display text-3xl text-cream-100">Caituus</span>
                <span className="mt-0.5 block font-mono text-[8px] tracking-[0.3em] text-leaf-500 uppercase">
                  Essential Cannabis Products
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-300/75">
              Que personas y animales estén sanos y se alivien con productos orgánicos de hemp y
              cannabis. Esa es nuestra razón de ser, desde Bogotá para toda Colombia.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Caituus en ${s.label}`}
                    className="btn-press grid h-10 w-10 place-items-center rounded-full border border-moss-600 text-cream-300 hover:border-leaf-500 hover:bg-moss-800 hover:text-leaf-300"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
              <span className="font-mono text-[10px] tracking-[0.18em] text-moss-500 uppercase">@caituus</span>
            </div>

            <form onSubmit={subscribe} className="mt-7 max-w-sm" noValidate>
              <label htmlFor="newsletter" className="font-mono text-[10px] tracking-[0.22em] text-moss-500 uppercase">
                La carta de la planta · cada lunes
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="tu@correo.co"
                  className={`field flex-1 ${error ? "field-invalid" : ""}`}
                />
                <button
                  type="submit"
                  className="btn-press flex items-center gap-1.5 rounded-md bg-leaf-500 px-4 text-sm font-bold text-moss-950 hover:bg-leaf-400"
                >
                  Unirme <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
              {error && <p className="mt-1.5 text-xs font-medium text-clay-400">{error}</p>}
            </form>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-moss-500 uppercase">En la tienda</h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onOpenProduct(p)}
                    className="group flex items-baseline gap-2 text-left text-sm text-cream-300/80 transition-colors hover:text-leaf-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-moss-500 transition-colors group-hover:bg-leaf-400" />
                    <span className="font-medium">{p.name}</span>
                    <span className="font-mono text-[10px] text-moss-500">{p.mg} mg</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-moss-500 uppercase">Líneas</h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => jumpCategory(c.id)}
                    className="text-sm text-cream-300/80 transition-colors hover:text-leaf-300"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="#metodo" className="text-sm text-cream-300/80 transition-colors hover:text-leaf-300">
                  El método
                </a>
              </li>
              <li>
                <a href="#como-comprar" className="text-sm text-cream-300/80 transition-colors hover:text-leaf-300">
                  Cómo comprar
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-moss-500 uppercase">Bueno saberlo</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-300/80">
              <li>Envío gratis desde $200.000</li>
              <li>Entrega 24 – 72 h en Bogotá</li>
              <li>Certificado de análisis por lote</li>
              <li>Paga contraentrega en Bogotá</li>
            </ul>
            <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-moss-500 uppercase">
              {LEGAL.thc}
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-moss-700/70 pt-6">
          <p className="flex items-start gap-2.5 text-xs leading-relaxed text-moss-500">
            <LeafIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" />
            {LEGAL.disclaimer} Normativa aplicable: {LEGAL.laws}.
          </p>
          <div className="mt-5 flex flex-col items-start justify-between gap-3 font-mono text-[10px] tracking-[0.16em] text-moss-500 uppercase sm:flex-row sm:items-center">
            <span>© 2026 Caituus · Bogotá, Colombia</span>
            <span className="text-moss-600">Demo de vitrina — no se procesan pagos reales</span>
            <span>For your skin, your health — and your pets too!</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
