import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { PRODUCTS, money } from "../data/products";
import { useShop } from "../state/shop";
import { ArrowLeftIcon, CheckIcon, LockIcon, XIcon } from "./icons";

type Step = "details" | "payment" | "processing" | "success";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

interface Fields {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const EMPTY: Fields = {
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function formatCard(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { lines, subtotal, shipping, total, clearCart, pushToast } = useShop();
  const [step, setStep] = useState<Step>("details");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [orderNo, setOrderNo] = useState("");
  const [paidTotal, setPaidTotal] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setStep("details");
      setFields(EMPTY);
      setErrors({});
      setOrderNo("");
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [open]);

  useEffect(() => {
    if (!open || step === "processing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step, onClose]);

  useEffect(() => {
    if (step === "success") {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.35 },
        colors: ["#dea04c", "#c4843a", "#a3b484", "#f6eddd", "#b66633"],
        scalar: 0.9,
      });
    }
  }, [step]);

  if (!open) return null;

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateDetails = () => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email";
    if (!fields.address.trim()) e.address = "Address is required";
    if (!fields.city.trim()) e.city = "City is required";
    if (!fields.zip.trim()) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!fields.cardName.trim()) e.cardName = "Name on card is required";
    if (fields.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Enter a 16-digit card number";
    const m = fields.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) e.expiry = "Use MM/YY";
    if (!/^\d{3,4}$/.test(fields.cvc)) e.cvc = "3–4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validatePayment()) return;
    setStep("processing");
    setPaidTotal(total);
    timer.current = setTimeout(() => {
      const n = `EM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNo(n);
      clearCart();
      pushToast({ title: "Order placed", sub: `${n} · confirmation sent`, kind: "success" });
      setStep("success");
    }, 1900);
  };

  const field = (
    key: keyof Fields,
    label: string,
    placeholder: string,
    opts: { transform?: (v: string) => string; inputMode?: "text" | "numeric" | "email"; maxLength?: number; className?: string } = {}
  ) => (
    <div className={opts.className}>
      <label className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-latte-500 uppercase" htmlFor={`f-${key}`}>
        {label}
      </label>
      <input
        id={`f-${key}`}
        value={fields[key]}
        onChange={(ev) => set(key)(opts.transform ? opts.transform(ev.target.value) : ev.target.value)}
        placeholder={placeholder}
        inputMode={opts.inputMode}
        maxLength={opts.maxLength}
        className={`field ${errors[key] ? "field-invalid" : ""}`}
      />
      {errors[key] && <p className="mt-1 text-xs font-medium text-clay-400">{errors[key]}</p>}
    </div>
  );

  const stepIndex = step === "details" ? 1 : step === "payment" ? 2 : 3;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <button
        className="absolute inset-0 animate-fade cursor-default bg-bark-950/80 backdrop-blur-[2px]"
        onClick={() => step !== "processing" && onClose()}
        aria-label="Close checkout"
      />
      <div className="animate-panel-in scroll-slim relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-xl border border-bark-600/70 bg-bark-850 shadow-[0_40px_90px_-30px_rgba(16,10,6,1)] sm:rounded-xl">
        {step !== "processing" && step !== "success" && (
          <button
            onClick={onClose}
            className="btn-press absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-bark-600 bg-bark-900/80 text-latte-300 hover:border-latte-500 hover:text-sand-100"
            aria-label="Close checkout"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}

        {step === "processing" ? (
          <div className="flex flex-col items-center px-8 py-20 text-center">
            <span className="h-12 w-12 animate-spin rounded-full border-2 border-bark-600 border-t-ember-400" />
            <h2 className="mt-6 font-display text-2xl font-semibold text-sand-100">
              Warming up the drum…
            </h2>
            <p className="mt-2 font-mono text-xs tracking-[0.14em] text-latte-500 uppercase">
              Confirming your order · do not close
            </p>
          </div>
        ) : step === "success" ? (
          <div className="flex flex-col items-center px-8 py-16 text-center">
            <span className="grid h-16 w-16 animate-pop place-items-center rounded-full border-2 border-sage-500 bg-sage-500/15 text-sage-300">
              <CheckIcon className="h-7 w-7" />
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold text-sand-100">Order confirmed</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-latte-300">
              Thanks, {fields.name.split(" ")[0] || "friend"}. Your beans leave the roastery within
              48 hours — a confirmation is on its way to{" "}
              <span className="font-semibold text-sand-200">{fields.email}</span>.
            </p>
            <div className="mt-6 grid w-full max-w-xs grid-cols-2 gap-3">
              <div className="rounded-md border border-bark-600 bg-bark-800 px-4 py-3">
                <p className="font-mono text-[9px] tracking-[0.2em] text-latte-500 uppercase">Order</p>
                <p className="mt-1 font-mono text-sm font-bold text-ember-300">{orderNo}</p>
              </div>
              <div className="rounded-md border border-bark-600 bg-bark-800 px-4 py-3">
                <p className="font-mono text-[9px] tracking-[0.2em] text-latte-500 uppercase">Paid</p>
                <p className="mt-1 font-mono text-sm font-bold text-sand-100">{money(paidTotal)}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-press mt-8 rounded-full bg-ember-500 px-8 py-3.5 text-sm font-bold text-bark-950 hover:bg-ember-400"
            >
              Back to the roastery
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-[1fr_240px]">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase">
                {["Details", "Payment", "Done"].map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    {i > 0 && <span className="h-px w-5 bg-bark-600" />}
                    <span className={i + 1 <= stepIndex ? "text-ember-400" : "text-latte-600"}>
                      0{i + 1} {s}
                    </span>
                  </span>
                ))}
              </div>

              {step === "details" ? (
                <>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-sand-100">
                    Where should it land?
                  </h2>
                  <div className="mt-6 space-y-4">
                    {field("name", "Full name", "Ada Kettle")}
                    {field("email", "Email", "ada@example.com", { inputMode: "email" })}
                    {field("address", "Street address", "415 Roastery Lane")}
                    <div className="grid grid-cols-[1fr_110px] gap-4">
                      {field("city", "City", "Portland")}
                      {field("zip", "ZIP", "97209", { inputMode: "numeric", maxLength: 10 })}
                    </div>
                  </div>
                  <button
                    onClick={() => validateDetails() && setStep("payment")}
                    className="btn-press mt-7 w-full rounded-md bg-ember-500 py-3.5 text-sm font-bold text-bark-950 hover:bg-ember-400"
                  >
                    Continue to payment
                  </button>
                </>
              ) : (
                <>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-sand-100">
                    Payment
                  </h2>
                  <p className="mt-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-latte-500 uppercase">
                    <LockIcon className="h-3.5 w-3.5 text-sage-400" /> Demo — any numbers work, nothing is charged
                  </p>
                  <div className="mt-6 space-y-4">
                    {field("cardName", "Name on card", "Ada Kettle")}
                    {field("cardNumber", "Card number", "4242 4242 4242 4242", {
                      transform: formatCard,
                      inputMode: "numeric",
                      maxLength: 19,
                    })}
                    <div className="grid grid-cols-2 gap-4">
                      {field("expiry", "Expiry", "08/27", { transform: formatExpiry, inputMode: "numeric", maxLength: 5 })}
                      {field("cvc", "CVC", "123", { inputMode: "numeric", maxLength: 4 })}
                    </div>
                  </div>
                  <div className="mt-7 flex gap-3">
                    <button
                      onClick={() => setStep("details")}
                      className="btn-press flex items-center gap-2 rounded-md border border-bark-600 px-5 py-3.5 text-sm font-semibold text-sand-200 hover:border-latte-500"
                    >
                      <ArrowLeftIcon className="h-4 w-4" /> Back
                    </button>
                    <button
                      onClick={placeOrder}
                      className="btn-press flex-1 rounded-md bg-ember-500 py-3.5 text-sm font-bold text-bark-950 hover:bg-ember-400"
                    >
                      Place order · {money(total)}
                    </button>
                  </div>
                </>
              )}
            </div>

            <aside className="border-t border-bark-700 bg-bark-900/50 p-6 sm:border-t-0 sm:border-l">
              <h3 className="font-mono text-[10px] tracking-[0.22em] text-latte-500 uppercase">
                Order summary
              </h3>
              <ul className="mt-4 space-y-3">
                {lines.map((line) => {
                  const p = PRODUCTS.find((x) => x.id === line.productId);
                  if (!p) return null;
                  return (
                    <li key={line.key} className="flex items-center justify-between gap-3 text-[13px]">
                      <span className="min-w-0 truncate text-sand-200">
                        {p.name} <span className="font-mono text-[11px] text-latte-500">× {line.qty}</span>
                      </span>
                      <span className="font-mono text-xs text-latte-300">{money(p.price * line.qty)}</span>
                    </li>
                  );
                })}
              </ul>
              <dl className="mt-5 space-y-1.5 border-t border-bark-700 pt-4 text-[13px]">
                <div className="flex justify-between text-latte-300">
                  <dt>Subtotal</dt>
                  <dd className="font-mono">{money(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-latte-300">
                  <dt>Shipping</dt>
                  <dd className={`font-mono ${shipping === 0 ? "text-sage-300" : ""}`}>
                    {shipping === 0 ? "Free" : money(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-bark-700 pt-2 text-[15px] font-bold text-sand-100">
                  <dt>Total</dt>
                  <dd className="font-mono">{money(total)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
