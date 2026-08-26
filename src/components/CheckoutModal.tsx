import { useEffect, useMemo, useRef, useState } from "react";
import { PAYMENT_METHODS, PRODUCTS, PURCHASE_TERMS, money } from "../data/products";
import { useShop } from "../state/shop";
import { ArrowLeftIcon, CheckIcon, LockIcon, TruckIcon, XIcon } from "./icons";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "form" | "processing" | "success";

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  appNumber: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  appNumber: "",
};

const CONFETTI_COLORS = ["#5d9463", "#cf9032", "#3f7189", "#c05f41", "#f8f6ec", "#37563c"];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        left: (i * 61) % 100,
        delay: (i % 12) * 0.12,
        dur: 2.6 + (i % 5) * 0.5,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: 5 + (i % 3) * 3,
        rot: (i * 47) % 360,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-[-4%] rounded-[2px]"
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.w * 1.7,
            background: p.color,
            transform: `rotate(${p.rot}deg)`,
            animation: `confetti-fall ${p.dur}s ${p.delay}s linear forwards`,
          }}
        />
      ))}
    </div>
  );
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { lines, total, clearCart, count } = useShop();
  const [step, setStep] = useState<Step>("form");
  const [method, setMethod] = useState("nequi");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderRef, setOrderRef] = useState("");
  const [paidTotal, setPaidTotal] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setStep("form");
      setErrors({});
      setOrderRef("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step, onClose]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (step === "success") {
      const id = window.setTimeout(() => clearCart(), 400);
      return () => window.clearTimeout(id);
    }
  }, [step, clearCart]);

  if (!open) return null;

  const methodMeta = PAYMENT_METHODS.find((m) => m.id === method)!;

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = "Escribe tu nombre completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Correo inválido";
    if (form.phone.replace(/\D/g, "").length < 7) e.phone = "Teléfono inválido";
    if (form.address.trim().length < 5) e.address = "Escribe tu dirección de entrega";
    if (form.city.trim().length < 2) e.city = "Escribe tu ciudad";
    const digits = form.appNumber.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 12) e.appNumber = "Escribe un número válido (7–12 dígitos)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;
    setPaidTotal(total);
    setStep("processing");
    setOrderRef(`CT-${Math.floor(100000 + Math.random() * 900000)}`);
    timer.current = window.setTimeout(() => setStep("success"), 2000);
  };

  const inputCls = (k: string) => `field ${errors[k] ? "field-invalid" : ""}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Pago">
      <button
        className="absolute inset-0 animate-fade cursor-default bg-moss-950/70 backdrop-blur-[2px]"
        onClick={() => step !== "processing" && onClose()}
        aria-label="Cerrar pago"
      />
      <div className="animate-panel-in scroll-slim relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-xl border border-moss-600 bg-moss-850 shadow-[0_40px_90px_-30px_rgba(43,50,42,0.6)] sm:rounded-xl">
        <Confetti />

        {step === "form" && (
          <>
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-moss-700 bg-moss-850/95 px-6 py-4 backdrop-blur">
              <div>
                <h2 className="font-display text-2xl font-semibold text-cream-100">Finalizar compra</h2>
                <p className="mt-0.5 flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-cream-300 uppercase">
                  <LockIcon className="h-3.5 w-3.5 text-leaf-400" /> Pago seguro desde tu celular
                </p>
              </div>
              <button
                onClick={onClose}
                className="btn-press grid h-9 w-9 place-items-center rounded-full border border-moss-600 text-cream-200 hover:border-cream-300/50 hover:text-cream-100"
                aria-label="Cerrar"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </header>

            <div className="px-6 py-5">
              <section className="rounded-lg border border-moss-700 bg-moss-900/60 p-4">
                <p className="font-mono text-[10px] tracking-[0.22em] text-cream-300 uppercase">
                  Tu pedido · {count} {count === 1 ? "producto" : "productos"}
                </p>
                <ul className="mt-3 space-y-2">
                  {lines.map((l) => {
                    const p = PRODUCTS.find((x) => x.id === l.productId);
                    if (!p) return null;
                    return (
                      <li key={l.productId} className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-3">
                          <img src={p.image} alt="" className="h-10 w-9 rounded border border-moss-700 object-cover" />
                          <span className="text-cream-100">
                            {p.name} <span className="font-mono text-xs text-cream-300">× {l.qty}</span>
                          </span>
                        </span>
                        <span className="font-mono text-cream-100">{money(p.price * l.qty)}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-dashed border-moss-700 pt-3 text-sm">
                  <span className="text-cream-300">Envío (contraentrega)</span>
                  <span className="font-mono text-amber-400">Se paga al recibir</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-base font-bold text-cream-100">
                  <span>Total a pagar hoy</span>
                  <span className="font-mono text-lg">{money(total)}</span>
                </div>
              </section>

              <section className="mt-6">
                <h3 className="font-mono text-[10px] tracking-[0.22em] text-cream-300 uppercase">1 · Datos de entrega</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <input className={inputCls("name")} placeholder="Nombre completo *" value={form.name} onChange={(e) => set("name", e.target.value)} />
                    {errors.name && <p className="mt-1 text-xs font-medium text-clay-400">{errors.name}</p>}
                  </div>
                  <div>
                    <input className={inputCls("email")} placeholder="Correo electrónico *" value={form.email} onChange={(e) => set("email", e.target.value)} />
                    {errors.email && <p className="mt-1 text-xs font-medium text-clay-400">{errors.email}</p>}
                  </div>
                  <div>
                    <input className={inputCls("phone")} placeholder="Teléfono / WhatsApp *" value={form.phone} onChange={(e) => set("phone", e.target.value.replace(/[^\d\s]/g, ""))} />
                    {errors.phone && <p className="mt-1 text-xs font-medium text-clay-400">{errors.phone}</p>}
                  </div>
                  <div>
                    <input className={inputCls("city")} placeholder="Ciudad *" value={form.city} onChange={(e) => set("city", e.target.value)} />
                    {errors.city && <p className="mt-1 text-xs font-medium text-clay-400">{errors.city}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <input className={inputCls("address")} placeholder="Dirección de entrega *" value={form.address} onChange={(e) => set("address", e.target.value)} />
                    {errors.address && <p className="mt-1 text-xs font-medium text-clay-400">{errors.address}</p>}
                  </div>
                </div>
                <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-snug text-cream-300">
                  <TruckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                  El valor del envío se paga directamente a la empresa de mensajería al momento de la entrega. Te enviaremos la guía por WhatsApp o correo.
                </p>
              </section>

              <section className="mt-6">
                <h3 className="font-mono text-[10px] tracking-[0.22em] text-cream-300 uppercase">2 · Medio de pago</h3>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                  {PAYMENT_METHODS.map((m) => {
                    const active = method === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setMethod(m.id);
                          setErrors((e) => ({ ...e, appNumber: "" }));
                        }}
                        aria-pressed={active}
                        className={`btn-press rounded-lg border p-3.5 text-left transition-all ${
                          active
                            ? "border-leaf-500 bg-leaf-500/10 shadow-[0_8px_20px_-12px_rgba(93,148,99,0.5)]"
                            : "border-moss-600 bg-moss-900/60 hover:border-moss-500"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span
                            className="grid h-9 min-w-9 place-items-center rounded-md px-1.5 font-display text-lg font-bold"
                            style={{ background: m.color, color: "#f8f6ec" }}
                            aria-hidden="true"
                          >
                            {m.label.charAt(0)}
                          </span>
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                              active ? "border-leaf-500 bg-leaf-500 text-moss-900" : "border-moss-500"
                            }`}
                          >
                            {active && <CheckIcon className="h-3 w-3" />}
                          </span>
                        </span>
                        <span className="mt-2 block text-[13px] font-bold text-cream-100">{m.label}</span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-cream-300">{m.hint}</span>
                      </button>
                    );
                  })}
                </div>

                <div key={method} className="mt-4 animate-rise">
                  <label htmlFor="app-number" className="font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
                    {methodMeta.field} *
                  </label>
                  <input
                    id="app-number"
                    className={`${inputCls("appNumber")} mt-1.5`}
                    placeholder="Ej: 300 123 4567"
                    inputMode="tel"
                    value={form.appNumber}
                    onChange={(e) => set("appNumber", e.target.value.replace(/[^\d\s]/g, ""))}
                  />
                  {errors.appNumber && <p className="mt-1 text-xs font-medium text-clay-400">{errors.appNumber}</p>}
                  <p className="mt-2 text-[11px] leading-relaxed text-cream-300">
                    {methodMeta.kind === "push"
                      ? `Al confirmar, recibirás una notificación en ${methodMeta.label} por ${money(total)}. Acéptala en tu app para completar la compra.`
                      : `Al confirmar, iniciaremos la transferencia inmediata de ${money(total)} desde tu banco a través de Bre-B. Recibirás la confirmación en segundos.`}
                  </p>
                </div>
              </section>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-cream-300 uppercase">
                  <LockIcon className="h-4 w-4 text-leaf-400" /> Transacción cifrada de extremo a extremo
                </p>
                <button
                  onClick={placeOrder}
                  className="btn-press rounded-md bg-amber-500 px-8 py-3.5 text-sm font-bold text-moss-950 shadow-[0_10px_24px_-12px_rgba(207,144,50,0.7)] hover:bg-amber-400"
                >
                  Enviar solicitud de pago · {money(total)}
                </button>
              </div>
              <p className="mt-3 text-center font-mono text-[9px] tracking-[0.12em] text-cream-300 uppercase">
                Demo — no se procesa ningún pago real
              </p>
            </div>
          </>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center px-6 py-20 text-center">
            <span className="h-14 w-14 animate-spin rounded-full border-4 border-moss-600 border-t-amber-500" />
            <h2 className="mt-6 font-display text-2xl font-semibold text-cream-100">
              {methodMeta.kind === "push" ? `Esperando tu aprobación en ${methodMeta.label}…` : "Confirmando tu transferencia Bre-B…"}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-cream-200">
              {methodMeta.kind === "push"
                ? `Enviamos una notificación a tu app ${methodMeta.label}. Apruébala para confirmar el pago de ${money(total)}.`
                : `Estamos conectando con tu banco para confirmar la transferencia de ${money(total)}. No cierres esta ventana.`}
            </p>
            <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">Orden {orderRef}</p>
          </div>
        )}

        {step === "success" && (
          <div className="relative px-6 py-12 text-center sm:px-12">
            <span className="mx-auto grid h-16 w-16 animate-pop place-items-center rounded-full bg-leaf-500/20 text-leaf-300">
              <CheckIcon className="h-8 w-8" />
            </span>
            <p className="mt-5 font-mono text-[10px] tracking-[0.24em] text-leaf-400 uppercase">Orden {orderRef} · aprobada</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-cream-100">¡Gracias por su compra!</h2>
            <p className="mt-1 font-display text-xl text-leaf-300 italic">Su pago ha sido exitoso</p>
            <ul className="mx-auto mt-6 max-w-md space-y-2.5 text-left">
              {PURCHASE_TERMS.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[13px] leading-snug text-cream-200">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-cream-300 uppercase">
              Pagaste {money(paidTotal)} con {methodMeta.label}
            </p>
            <button
              onClick={onClose}
              className="btn-press mt-6 rounded-full bg-leaf-600 px-8 py-3 text-sm font-bold text-moss-900 hover:bg-leaf-500"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
