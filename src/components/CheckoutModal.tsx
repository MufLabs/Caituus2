import { useEffect, useMemo, useRef, useState } from "react";
import {
  PAYMENT_METHODS,
  PAYU_LOGO,
  PRODUCTS,
  PSE_BANKS,
  PURCHASE_TERMS,
  money,
} from "../data/products";
import { useShop } from "../state/shop";
import { ArrowLeftIcon, CheckIcon, ChevronDownIcon, LockIcon, TruckIcon, XIcon } from "./icons";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "form" | "processing" | "success" | "pending" | "rejected";

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  bank: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
  bank: "",
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
  const { lines, subtotal, shipping, total, clearCart, count } = useShop();
  const [step, setStep] = useState<Step>("form");
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderRef, setOrderRef] = useState("");
  const [cashRef, setCashRef] = useState("");
  const [paidTotal, setPaidTotal] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setStep("form");
      setErrors({});
      setOrderRef("");
      setCashRef("");
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
  const isCard = methodMeta.kind === "card";
  const isPse = methodMeta.kind === "pse";
  const isCash = methodMeta.kind === "cash";

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
    if (isCard) {
      if (form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Número de 16 dígitos";
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "MM/AA";
      if (form.cvc.length < 3) e.cvc = "CVC";
    }
    if (isPse && !form.bank) e.bank = "Selecciona tu banco";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;
    setPaidTotal(total);
    setStep("processing");
    const ref = `CT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    if (isCash) setCashRef(String(Math.floor(1000000000 + Math.random() * 9000000000)));

    timer.current = window.setTimeout(() => {
      if (isCash) {
        setStep("pending"); // Baloto / Efecty: pago pendiente hasta confirmar en efectivo
      } else if (isCard && form.cardNumber.replace(/\s/g, "").startsWith("0000")) {
        setStep("rejected"); // Tarjeta de prueba rechazada
      } else {
        setStep("success");
      }
    }, 1800);
  };

  const fmtCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const fmtExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const inputCls = (k: string) => `field ${errors[k] ? "field-invalid" : ""}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Pago seguro">
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
                  <img src={PAYU_LOGO} alt="PayU" className="h-4 brightness-150" /> Pasarela segura
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
                <p className="font-mono text-[10px] tracking-[0.22em] text-cream-300 uppercase">Tu pedido · {count} {count === 1 ? "producto" : "productos"}</p>
                <ul className="mt-3 space-y-2">
                  {lines.map((l) => {
                    const p = PRODUCTS.find((x) => x.id === l.productId);
                    if (!p) return null;
                    return (
                      <li key={l.productId} className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-3">
                          <img src={p.image} alt="" className="h-10 w-9 rounded border border-moss-700 bg-white object-cover" />
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
                  <span className="font-mono text-amber-400">{shipping === 0 ? "Se paga al recibir" : money(shipping)}</span>
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
                <h3 className="font-mono text-[10px] tracking-[0.22em] text-cream-300 uppercase">2 · Método de pago</h3>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((m) => {
                    const active = method === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setMethod(m.id);
                          setErrors({});
                        }}
                        aria-pressed={active}
                        className={`btn-press rounded-lg border p-3.5 text-left transition-all ${
                          active
                            ? "border-leaf-500 bg-leaf-500/10 shadow-[0_8px_20px_-12px_rgba(93,148,99,0.5)]"
                            : "border-moss-600 bg-moss-900/60 hover:border-moss-500"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2.5">
                            {m.logos ? (
                              <span className="flex gap-1">
                                {m.logos.map((l) => (
                                  <img key={l} src={l} alt="" className="h-5 rounded-sm bg-white px-0.5 object-contain" />
                                ))}
                              </span>
                            ) : (
                              <img src={m.logo} alt="" className="h-6 rounded-sm bg-white px-1 object-contain" />
                            )}
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

                {isCard && (
                  <div className="mt-4 grid animate-rise gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <input
                        className={inputCls("cardNumber")}
                        placeholder="Número de tarjeta *  (0000… para simular rechazo)"
                        inputMode="numeric"
                        value={form.cardNumber}
                        onChange={(e) => set("cardNumber", fmtCard(e.target.value))}
                      />
                      {errors.cardNumber && <p className="mt-1 text-xs font-medium text-clay-400">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <input className={inputCls("expiry")} placeholder="MM/AA *" inputMode="numeric" value={form.expiry} onChange={(e) => set("expiry", fmtExpiry(e.target.value))} />
                      {errors.expiry && <p className="mt-1 text-xs font-medium text-clay-400">{errors.expiry}</p>}
                    </div>
                    <div>
                      <input className={inputCls("cvc")} placeholder="CVC *" inputMode="numeric" maxLength={4} value={form.cvc} onChange={(e) => set("cvc", e.target.value.replace(/\D/g, ""))} />
                      {errors.cvc && <p className="mt-1 text-xs font-medium text-clay-400">{errors.cvc}</p>}
                    </div>
                  </div>
                )}

                {isPse && (
                  <div className="relative mt-4 animate-rise">
                    <select className={`${inputCls("bank")} cursor-pointer appearance-none pr-9`} value={form.bank} onChange={(e) => set("bank", e.target.value)}>
                      <option value="">Selecciona tu banco *</option>
                      {PSE_BANKS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-moss-500" />
                    {errors.bank && <p className="mt-1 text-xs font-medium text-clay-400">{errors.bank}</p>}
                    <p className="mt-2 text-[11px] text-cream-300">Serás redirigido a tu banco para aprobar el débito. Al volver, confirmaremos tu pedido.</p>
                  </div>
                )}

                {isCash && (
                  <div className="mt-4 animate-rise rounded-md border border-amber-500/50 bg-amber-500/10 p-4">
                    <p className="text-[13px] font-bold text-cream-100">
                      {methodMeta.label}: pago en efectivo
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-cream-200">
                      Al confirmar generaremos una <strong>referencia de pago</strong>. Acércate a cualquier punto{" "}
                      {methodMeta.label} y presenta la referencia. Tu pedido quedará{" "}
                      <strong>pendiente</strong> hasta que el pago se confirme — te avisaremos por WhatsApp o correo.
                    </p>
                  </div>
                )}

                {methodMeta.kind === "wallet" && (
                  <div className="mt-4 animate-rise rounded-md border border-moss-600 bg-moss-900/60 p-4">
                    <p className="text-[12px] leading-relaxed text-cream-200">
                      Serás redirigido a PayPal para completar el pago de forma segura. Al finalizar, volverás a esta tienda con tu pedido confirmado.
                    </p>
                  </div>
                )}
              </section>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-cream-300 uppercase">
                  <LockIcon className="h-4 w-4 text-leaf-400" /> Pago cifrado SSL · Procesado por PayU
                </p>
                <button
                  onClick={placeOrder}
                  className="btn-press rounded-md bg-amber-500 px-8 py-3.5 text-sm font-bold text-moss-950 shadow-[0_10px_24px_-12px_rgba(207,144,50,0.7)] hover:bg-amber-400"
                >
                  {isCash ? `Generar referencia · ${money(total)}` : `Pagar ${money(total)}`}
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
            <h2 className="mt-6 font-display text-2xl font-semibold text-cream-100">Procesando tu pago…</h2>
            <p className="mt-2 max-w-sm text-sm text-cream-200">
              Estamos confirmando la transacción con {methodMeta.label} a través de PayU. No cierres esta ventana.
            </p>
            <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
              Orden {orderRef}
            </p>
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

        {step === "pending" && (
          <div className="px-6 py-12 text-center sm:px-12">
            <span className="mx-auto grid h-16 w-16 animate-pop place-items-center rounded-full bg-amber-500/20 text-amber-300">
              <span className="h-3 w-3 animate-pulse-dot rounded-full bg-amber-400" />
            </span>
            <p className="mt-5 font-mono text-[10px] tracking-[0.24em] text-amber-400 uppercase">Orden {orderRef} · pendiente</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-cream-100">Tu pago quedó pendiente</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream-200">
              Presenta esta referencia en cualquier punto <strong>{methodMeta.label}</strong> para completar tu pago.
              Una vez confirmado, tu producto será llevado a la empresa de mensajería dentro de las próximas 24 horas.
            </p>
            <div className="mx-auto mt-6 max-w-xs rounded-lg border border-dashed border-amber-500/60 bg-amber-500/10 px-6 py-4">
              <p className="font-mono text-[10px] tracking-[0.2em] text-cream-300 uppercase">Referencia de pago</p>
              <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-cream-100">{cashRef}</p>
              <p className="mt-1 font-mono text-[11px] text-cream-300">Valor: {money(paidTotal)}</p>
            </div>
            <p className="mt-4 text-[12px] text-cream-300">
              Te enviaremos la confirmación y la guía de transporte a tu WhatsApp o correo.
            </p>
            <button
              onClick={onClose}
              className="btn-press mt-6 rounded-full bg-amber-500 px-8 py-3 text-sm font-bold text-moss-950 hover:bg-amber-400"
            >
              Entendido, volver al inicio
            </button>
          </div>
        )}

        {step === "rejected" && (
          <div className="px-6 py-12 text-center sm:px-12">
            <span className="mx-auto grid h-16 w-16 animate-pop place-items-center rounded-full bg-clay-500/20 text-clay-400">
              <XIcon className="h-8 w-8" />
            </span>
            <p className="mt-5 font-mono text-[10px] tracking-[0.24em] text-clay-400 uppercase">Orden {orderRef} · rechazada</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-cream-100">Su pago fue rechazado</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream-200">
              El banco no aprobó la transacción. No se realizó ningún cobro. Verifica los datos de tu tarjeta o
              intenta con otro método de pago: PSE, Baloto y Efecty siempre están disponibles.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => setStep("form")}
                className="btn-press flex items-center justify-center gap-2 rounded-full bg-leaf-600 px-7 py-3 text-sm font-bold text-moss-900 hover:bg-leaf-500"
              >
                <ArrowLeftIcon className="h-4 w-4" /> Reintentar con otro método
              </button>
              <button
                onClick={onClose}
                className="btn-press rounded-full border border-moss-600 px-7 py-3 text-sm font-semibold text-cream-200 hover:border-cream-300/50"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
