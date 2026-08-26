import { useShop } from "../state/shop";
import { CheckIcon, LeafIcon, XIcon } from "./icons";

export default function Toasts() {
  const { toasts, dismissToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="relative animate-rise overflow-hidden rounded-md border border-moss-600 bg-moss-850 p-4 pr-10 shadow-[0_18px_40px_-16px_rgba(43,50,42,0.45)]"
        >
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                t.kind === "success" ? "bg-leaf-500/20 text-leaf-300" : "bg-amber-500/20 text-amber-300"
              }`}
            >
              {t.kind === "success" ? <CheckIcon className="h-3.5 w-3.5" /> : <LeafIcon className="h-4 w-4" />}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-cream-100">{t.title}</p>
              {t.sub && <p className="mt-0.5 truncate text-xs text-cream-300">{t.sub}</p>}
              {t.ctaLabel && t.onCta && (
                <button
                  onClick={() => {
                    t.onCta?.();
                    dismissToast(t.id);
                  }}
                  className="mt-1.5 font-mono text-[11px] font-bold tracking-[0.12em] text-amber-400 uppercase hover:text-amber-300"
                >
                  {t.ctaLabel} →
                </button>
              )}
            </div>
          </div>
          <button
            onClick={() => dismissToast(t.id)}
            className="btn-press absolute top-3 right-3 rounded-full p-1 text-moss-500 hover:bg-moss-800 hover:text-cream-100"
            aria-label="Descartar notificación"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
          <span className="absolute bottom-0 left-0 h-0.5 animate-toastbar bg-leaf-500/70" />
        </div>
      ))}
    </div>
  );
}
