import { useState, type FormEvent } from "react";
import { CATEGORIES, CONTACT_TOPICS, LEGAL, PRODUCTS, SOCIALS, type Category, type Product } from "../data/products";
import { useShop } from "../state/shop";
import { ArrowRightIcon, CaituusMark, CheckIcon, FacebookIcon, InstagramIcon, LeafIcon, XSocialIcon } from "./icons";

interface FooterProps {
  onOpenProduct: (p: Product) => void;
  onCategory: (c: Category | "all") => void;
}

const SOCIAL_ICONS = [InstagramIcon, FacebookIcon, XSocialIcon];

export default function Footer({ onOpenProduct, onCategory }: FooterProps) {
  const { pushToast } = useShop();
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const send = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = "Escribe tu nombre";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Correo inválido";
    if (!form.topic) errs.topic = "Cuéntanos qué te interesa";
    if (form.message.trim().length < 5) errs.message = "Escribe tu comentario";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setForm({ name: "", email: "", phone: "", topic: "", message: "" });
    pushToast({
      title: "¡Mensaje enviado!",
      sub: "Te responderemos muy pronto. Y pregunta todo lo que quieras y necesitas.",
      kind: "success",
    });
  };

  const jumpCategory = (c: Category | "all") => {
    onCategory(c);
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputCls = (k: string) => `field ${errors[k] ? "field-invalid" : ""}`;

  return (
    <footer id="contacto" className="scroll-mt-24 border-t border-moss-700/70 bg-moss-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Escríbenos */}
          <div className="lg:col-span-5">
            <RevealLike>
              <p className="font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">Contacto</p>
              <h2 className="mt-2 font-display text-4xl font-medium text-cream-100">
                Contáctanos <em className="text-amber-400">!!!</em>
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-200">
                <strong className="font-bold">ESCRÍBENOS</strong> — y pregunta todo lo que quieras y
                necesitas sobre nuestros aceites, extractos y la línea para mascotas.
              </p>
            </RevealLike>

            <form onSubmit={send} className="mt-6 max-w-md space-y-3" noValidate>
              <div>
                <input className={inputCls("name")} placeholder="Nombre *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <p className="mt-1 text-xs font-medium text-clay-400">{errors.name}</p>}
              </div>
              <div>
                <input className={inputCls("email")} placeholder="Correo electrónico *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="mt-1 text-xs font-medium text-clay-400">{errors.email}</p>}
              </div>
              <div>
                <input className={inputCls("phone")} placeholder="Teléfono (opcional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <select className={`${inputCls("topic")} cursor-pointer`} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                  <option value="">¿Quieres saber sobre…? *</option>
                  {CONTACT_TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.topic && <p className="mt-1 text-xs font-medium text-clay-400">{errors.topic}</p>}
              </div>
              <div>
                <textarea
                  className={`${inputCls("message")} min-h-[96px] resize-y`}
                  placeholder="Comentarios *"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && <p className="mt-1 text-xs font-medium text-clay-400">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="btn-press flex items-center gap-2 rounded-md bg-leaf-600 px-6 py-3 text-sm font-bold text-moss-900 hover:bg-leaf-500"
              >
                Enviar mensaje <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-7">
              <p className="font-mono text-[10px] tracking-[0.22em] text-cream-300 uppercase">Síguenos</p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                {SOCIALS.map((s, i) => {
                  const Icon = SOCIAL_ICONS[i];
                  return (
                    <span
                      key={s.label}
                      className="flex items-center gap-2 rounded-full border border-moss-600 bg-moss-850 px-3.5 py-2 text-[12px] font-semibold text-cream-200"
                    >
                      <Icon className="h-4 w-4 text-leaf-400" />
                      {s.handle}
                      <span className="font-mono text-[9px] tracking-[0.14em] text-cream-300 uppercase">{s.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-cream-300 uppercase">En la vitrina</h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onOpenProduct(p)}
                    className="group flex items-baseline gap-2 text-left text-sm text-cream-200 transition-colors hover:text-leaf-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-moss-500 transition-colors group-hover:bg-leaf-400" />
                    <span className="font-medium">{p.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Líneas */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-cream-300 uppercase">Líneas</h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button onClick={() => jumpCategory(c.id)} className="text-sm text-cream-200 transition-colors hover:text-leaf-300">
                    {c.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="#informacion" className="text-sm text-cream-200 transition-colors hover:text-leaf-300">
                  Información CBD
                </a>
              </li>
              <li>
                <a href="#mascotas" className="text-sm text-cream-200 transition-colors hover:text-leaf-300">
                  Mascotas
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-cream-300 uppercase">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-[13px] leading-snug text-cream-300">
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf-400" /> Ley 1787 de 2016
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf-400" /> Decreto 613 de 2017
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf-400" /> THC &lt; 0.3% línea humana
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf-400" /> 0% THC línea mascotas
              </li>
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-cream-300 italic">{LEGAL.disclaimer}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-moss-700/70 pt-6 sm:flex-row sm:items-center">
          <span className="flex items-center gap-2.5">
            <CaituusMark className="h-7 w-7 text-leaf-400" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-cream-300 uppercase">
              © Caituus · Productos Esenciales de Cannabis
            </span>
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] text-cream-300 uppercase">
            © 2026 Caituus — Todos los derechos reservados
          </span>
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-cream-300 uppercase">
            <LeafIcon className="h-3.5 w-3.5 text-leaf-400" /> Bogotá · Colombia
          </span>
        </div>
      </div>
    </footer>
  );
}

/* pequeño helper para mantener ritmo de aparición sin importar Reveal */
function RevealLike({ children }: { children: React.ReactNode }) {
  return <div className="animate-rise">{children}</div>;
}
