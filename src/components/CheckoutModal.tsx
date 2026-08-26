import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  PAYMENT_METHODS,
  PRODUCTS,
  PSE_BANKS,
  money,
  type PaymentMethod,
} from "../data/products";
import { useShop } from "../state/shop";
import {
  ArrowLeftIcon,
  BankIcon,
  CheckIcon,
  LockIcon,
  TruckIcon,
  WalletIcon,
  XIcon,
} from "./icons";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "details" | "payment" | "processing" | "success";

const PROCESSING_MESSAGES: Record<string, string> = {
  nequi: "Esperando la aprobación en tu Nequi…",
  daviplata: "Confirmando el pago en tu Daviplata…",
  pse: "Contactando tu banco por PSE…",
  card: "Verificando tu tarjeta de forma segura…",
  cod: "Reservando tu pedido para contraentrega…",
};

function formatCardNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { lines, subtotal, shipping, total, clearCart, pushToast } = useShop();
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "Bogotá", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [methodId, setMethodId] = useState("nequi");
  const [payPhone, setPayPhone] = useState("");
  const [bank, setBank] = useState(PSE_BANKS[0]);
  const [card, setCard] = useState({ number: "", holder: "", expiry: "", cvv: "" });
  const [payError, setPayError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [paidTotal, setPaidTotal] = useState(0);
  const [paidMethod, setPaidMethod] = useState("");
  const [shipCity, setShipCity] = useState("Bogotá");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step, onClose]);

  useEffect(() => {
    if (open) {
      setStep("details");
      setErrors({});
      setPayError("");
    }
  }, [open]);

  useEffect(() => {
    if (step !== "processing") return;
    const method = PAYMENT_METHODS.find((m) => m.id === methodId);
    const t = window.setTimeout(() => {
      const num = `CA-${Date.now().toString(36).slice(-6).toUpperCase()}`;
      setOrderNumber(num);
      setPaidTotal(total);
      setPaidMethod(method?.label ?? "");
      setShipCity(form.city);
      setStep("success");
      clearCart();
      pushToast({ title: "¡Pedido confirmado!", sub: `${num} · ${method?.label}`, kind: "success" });
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#9DBE83", "#E8B960", "#F5F1E4", "#7FA365", "#DBA545"],
      });
    }, 2400);
    return () => window.clearTimeout(t);
  }, [step, methodId, total, clearCart, pushToast, form.city]);

  if (!open) return null;

  const method = PAYMENT_METHODS.find((m) => m.id === methodId) as PaymentMethod;

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = "Escribe tu nombre completo";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Teléfono de 10 dígitos";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Correo no válido";
    if (form.address.trim().length < 6) e.address = "Dirección muy corta";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goPayment = () => {
    if (validateDetails()) setStep("payment");
  };

  const validatePayment = () => {
    setPayError("");
    if (method.kind === "phone") {
      if (!/^\d{10}$/.test(payPhone.replace(/\s/g, ""))) {
        setPayError(`Ingresa el celular de tu ${method.label} (10 dígitos)`);
        return false;
      }
    }
    if (method.kind === "card") {
      if (card.number.replace(/\s/g, "").length !== 16) {
        setPayError("El número de tarjeta debe tener 16 dígitos");
        return false;
      }
      if (card.holder.trim().length < 3) {
        setPayError("Escribe el nombre como aparece en la tarjeta");
        return false;
      }
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
        setPayError("Vencimiento en formato MM/AA");
        return false;
      }
      if (!/^\d{3,4}$/.test(card.cvv)) {
        setPayError("CVV de 3 o 4 dígitos");
        return false;
      }
    }
    return true;
  };

  const pay = () => {
    if (!validatePayment()) return;
    setStep("processing");
  };

  const input = (key: keyof typeof form, label: string, placeholder: string, type = "text") => (
    <div>
      <label htmlFor={`f-${key}`} className="font-mono text-[10px] tracking-[0.2em] text-moss-500 uppercase">
        {label}
      </label>
      <input
        id={`f-${key}`}
        type={type}
        value={form[key]}
        onChange={(e) => {
          setForm({ ...form, [key]: e.target.value });
          setErrors((prev) => ({ ...prev, [key]: "" }));
        }}
        placeholder={placeholder}
        className={`field mt-1.5 ${errors[key] ? "field-invalid" : ""}`}
      />
      {errors[key] && <p className="mt-1 text-xs font-medium text-clay-400">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Finalizar compra">
      <button
        className="absolute inset-0 animate-fade cursor-default bg-moss-950/80 backdrop-blur-[3px]"
        onClick={() => step !== "processing" && onClose()}
        aria-label="Cerrar"
      />
      <div className="animate-panel-in scroll-slim relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-xl border border-moss-600/70 bg-moss-850 shadow-[0_40px_90px_-30px_rgba(11,19,12,1)] sm:rounded-xl">
        {step !== "processing" && (
          <button
            onClick={onClose}
            className="btn-press absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-moss-600 bg-moss-900/80 text-cream-300 hover:border-cream-300/40 hover:text-cream-100"
            aria-label="Cerrar"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}

        {step === "details" && (
          <div className="p-6 sm:p-8">
            <p className="font-mono text-[10px] tracking-[0.24em] text-leaf-500 uppercase">Paso 1 de 2</p>
            <h2 className="mt-1.5 font-display text-3xl text-cream-100">Datos de envío</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {input("name", "Nombre completo", "María Fernanda Ríos")}
              {input("phone", "Celular / WhatsApp", "300 123 4567", "tel")}
              {input("email", "Correo electrónico", "maria@correo.co", "email")}
              <div>
                <label htmlFor="f-city" className="font-mono text-[10px] tracking-[0.2em] text-moss-500 uppercase">
                  Ciudad
                </label>
                <select
                  id="f-city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="field mt-1.5 cursor-pointer"
                >
                  {["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga", "Cartagena", "Otra ciudad"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                {input("address", "Dirección de entrega", "Cra 13 # 85 - 24, Apto 502")}
              </div>
            </div>

            <div className="mt-6 rounded-md border border-moss-700 bg-moss-900/60 p-4">
              <ul className="max-h-32 space-y-2 overflow-y-auto">
                {lines.map((l) => {
                  const p = PRODUCTS.find((x) => x.id === l.productId);
                  if (!p) return null;
                  return (
                    <li key={l.productId} className="flex justify-between gap-4 text-[13px]">
                      <span className="text-cream-300/85">
                        {l.qty} × {p.name}
                      </span>
                      <span className="font-mono text-cream-100">{money(p.price * l.qty)}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 flex justify-between border-t border-moss-700 pt-3 text-sm font-bold text-cream-100">
                <span>Total con envío</span>
                <span className="font-mono">{money(total)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button onClick={onClose} className="btn-press flex items-center gap-2 text-sm font-semibold text-cream-300 hover:text-cream-100">
                <ArrowLeftIcon className="h-4 w-4" /> Volver a la tienda
              </button>
              <button
                onClick={goPayment}
                className="btn-press rounded-md bg-amber-500 px-6 py-3 text-sm font-bold text-moss-950 hover:bg-amber-400"
              >
                Continuar al pago
              </button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="p-6 sm:p-8">
            <p className="font-mono text-[10px] tracking-[0.24em] text-leaf-500 uppercase">Paso 2 de 2</p>
            <h2 className="mt-1.5 font-display text-3xl text-cream-100">Método de pago</h2>
            <p className="mt-1 text-sm text-cream-300/70">Elige cómo quieres pagar tu pedido de {money(total)}.</p>

            <div className="mt-5 grid gap-2.5" role="radiogroup" aria-label="Método de pago">
              {PAYMENT_METHODS.map((m) => {
                const active = methodId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMethodId(m.id);
                      setPayError("");
                    }}
                    role="radio"
                    aria-checked={active}
                    className={`btn-press flex items-center gap-4 rounded-md border p-3.5 text-left ${
                      active ? "border-leaf-500 bg-moss-700/60" : "border-moss-600 bg-moss-800 hover:border-moss-500"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${
                        active ? "bg-leaf-500/20 text-leaf-300" : "bg-moss-700 text-cream-300/60"
                      }`}
                    >
                      {m.kind === "card" ? <WalletIcon className="h-5 w-5" /> : m.kind === "bank" ? <BankIcon className="h-5 w-5" /> : <TruckIcon className="h-5 w-5" />}
                    </span>
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className={`text-sm font-bold ${active ? "text-cream-100" : "text-cream-200"}`}>{m.label}</span>
                        <span className="rounded-full bg-moss-700 px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-cream-300/70 uppercase">
                          {m.tag}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-cream-300/60">{m.hint}</span>
                    </span>
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                        active ? "border-leaf-500 bg-leaf-500 text-moss-950" : "border-moss-500"
                      }`}
                    >
                      {active && <CheckIcon className="h-3 w-3" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>

            {method.kind === "phone" && (
              <div className="mt-4 animate-rise">
                <label htmlFor="pay-phone" className="font-mono text-[10px] tracking-[0.2em] text-moss-500 uppercase">
                  Celular registrado en {method.label}
                </label>
                <input
                  id="pay-phone"
                  inputMode="numeric"
                  value={payPhone}
                  onChange={(e) => setPayPhone(e.target.value.replace(/[^\d\s]/g, "").slice(0, 12))}
                  placeholder="300 123 4567"
                  className="field mt-1.5"
                />
              </div>
            )}

            {method.kind === "bank" && (
              <div className="mt-4 animate-rise">
                <label htmlFor="pay-bank" className="font-mono text-[10px] tracking-[0.2em] text-moss-500 uppercase">
                  Tu banco
                </label>
                <select id="pay-bank" value={bank} onChange={(e) => setBank(e.target.value)} className="field mt-1.5 cursor-pointer">
                  {PSE_BANKS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            {method.kind === "card" && (
              <div className="mt-4 grid animate-rise gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="card-number" className="font-mono text-[10px] tracking-[0.2em] text-moss-500 uppercase">
                    Número de tarjeta
                  </label>
                  <input
                    id="card-number"
                    inputMode="numeric"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                    placeholder="4242 4242 4242 4242"
                    className="field mt-1.5 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="card-holder" className="font-mono text-[10px] tracking-[0.2em] text-moss-500 uppercase">
                    Titular
                  </label>
                  <input
                    id="card-holder"
                    value={card.holder}
                    onChange={(e) => setCard({ ...card, holder: e.target.value.toUpperCase() })}
                    placeholder="MARIA F RIOS"
                    className="field mt-1.5"
                  />
                </div>
                <div>
                  <label htmlFor="card-expiry" className="font-mono text-[10px] tracking-[0.2em] text-moss-500 uppercase">
                    Vencimiento
                  </label>
                  <input
                    id="card-expiry"
                    inputMode="numeric"
                    value={card.expiry}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                    }}
                    placeholder="12/27"
                    className="field mt-1.5 font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="card-cvv" className="font-mono text-[10px] tracking-[0.2em] text-moss-500 uppercase">
                    CVV
                  </label>
                  <input
                    id="card-cvv"
                    inputMode="numeric"
                    type="password"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                    placeholder="•••"
                    className="field mt-1.5 font-mono"
                  />
                </div>
              </div>
            )}

            {payError && (
              <p className="mt-3 animate-rise text-sm font-medium text-clay-400">{payError}</p>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              <button onClick={() => setStep("details")} className="btn-press flex items-center gap-2 text-sm font-semibold text-cream-300 hover:text-cream-100">
                <ArrowLeftIcon className="h-4 w-4" /> Datos de envío
              </button>
              <button
                onClick={pay}
                className="btn-press flex items-center gap-2 rounded-md bg-leaf-500 px-6 py-3 text-sm font-bold text-moss-950 hover:bg-leaf-400"
              >
                <LockIcon className="h-4 w-4" />
                {method.kind === "none" ? "Confirmar pedido" : `Pagar ${money(total)}`}
              </button>
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-moss-500 uppercase">
              <LockIcon className="h-3 w-3" /> Demo — no se procesa ningún pago real
            </p>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center px-6 py-16 text-center sm:py-20">
            <div className="relative h-16 w-16">
              <span className="absolute inset-0 animate-slowspin rounded-full border-2 border-moss-600 border-t-leaf-400" style={{ animationDuration: "1s" }} />
              <LeafGlyph />
            </div>
            <h2 className="mt-6 font-display text-3xl text-cream-100">Procesando tu pago…</h2>
            <p className="mt-2 font-mono text-xs tracking-[0.1em] text-cream-300/70" aria-live="polite">
              {PROCESSING_MESSAGES[methodId]}
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="p-6 text-center sm:p-10">
            <span className="mx-auto grid h-16 w-16 animate-pop place-items-center rounded-full bg-leaf-500/20 text-leaf-300">
              <CheckIcon className="h-8 w-8" />
            </span>
            <h2 className="mt-5 font-display text-4xl text-cream-100">¡Gracias por tu pedido!</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream-300/85">
              Tu pago con <strong className="text-cream-100">{paidMethod}</strong> fue confirmado. Te
              escribiremos por WhatsApp para coordinar la entrega en{" "}
              <strong className="text-cream-100">{shipCity}</strong>.
            </p>

            <div className="mx-auto mt-6 max-w-sm rounded-md border border-dashed border-moss-600 bg-moss-900/60 p-5 text-left">
              <div className="flex justify-between">
                <span className="font-mono text-[9px] tracking-[0.2em] text-moss-500 uppercase">Pedido</span>
                <span className="font-mono text-sm font-bold text-amber-300">{orderNumber}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="font-mono text-[9px] tracking-[0.2em] text-moss-500 uppercase">Pagado</span>
                <span className="font-mono text-sm font-bold text-cream-100">{money(paidTotal)}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="font-mono text-[9px] tracking-[0.2em] text-moss-500 uppercase">Entrega estimada</span>
                <span className="font-mono text-sm font-bold text-leaf-300">24 – 72 h</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-press mt-7 rounded-full bg-amber-500 px-8 py-3 text-sm font-bold text-moss-950 hover:bg-amber-400"
            >
              Seguir explorando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LeafGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-leaf-400" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z" />
      <path d="M5 19c3-5 6-8 10-10" />
    </svg>
  );
}
