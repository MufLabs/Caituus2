import { useState } from "react";
import { CaituusMark, LeafIcon } from "./icons";

const AGE_KEY = "caituus.age.ok";

export default function AgeGate() {
  const [status, setStatus] = useState<"ask" | "denied" | "ok">(() => {
    try {
      return localStorage.getItem(AGE_KEY) === "1" ? "ok" : "ask";
    } catch {
      return "ask";
    }
  });

  if (status === "ok") return null;

  const confirm = () => {
    try {
      localStorage.setItem(AGE_KEY, "1");
    } catch {
      /* sin almacenamiento */
    }
    setStatus("ok");
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-moss-950/95 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Verificación de edad">
      <div className="relative w-full max-w-md animate-rise overflow-hidden rounded-xl border border-moss-700 bg-moss-850 p-8 text-center shadow-[0_40px_90px_-30px_rgba(11,19,12,1)] sm:p-10">
        <LeafIcon className="pointer-events-none absolute -top-6 -left-6 h-32 w-32 rotate-[-18deg] text-moss-800/70" />
        <LeafIcon className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 rotate-[150deg] text-moss-800/70" />

        {status === "ask" ? (
          <>
            <CaituusMark className="mx-auto h-12 w-12 text-leaf-400" />
            <h2 className="mt-5 font-display text-3xl font-normal text-cream-100 sm:text-4xl">
              ¿Tienes 18 años o más?
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream-300/85">
              Este sitio presenta productos derivados del cannabis y el hemp con fines de
              bienestar, dirigidos exclusivamente a personas mayores de edad.
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <button
                onClick={confirm}
                className="btn-press rounded-full bg-leaf-500 px-7 py-3 text-sm font-bold text-moss-950 hover:bg-leaf-400"
              >
                Sí, soy mayor de 18
              </button>
              <button
                onClick={() => setStatus("denied")}
                className="btn-press rounded-full border border-moss-600 px-7 py-3 text-sm font-semibold text-cream-300 hover:border-cream-300/40 hover:text-cream-100"
              >
                No, aún no
              </button>
            </div>
            <p className="mt-5 font-mono text-[9px] tracking-[0.2em] text-moss-500 uppercase">
              Venta bajo la Ley 1787 de 2016 · Colombia
            </p>
          </>
        ) : (
          <>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-moss-600 text-clay-400">
              <LeafIcon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-3xl text-cream-100">Vuelve pronto</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream-300/85">
              Nuestros productos son para mayores de edad. Cuando cumplas 18, aquí estaremos —
              con la planta lista para ayudarte.
            </p>
            <button
              onClick={() => setStatus("ask")}
              className="btn-press mt-6 rounded-full border border-moss-600 px-6 py-2.5 text-sm font-semibold text-cream-300 hover:border-cream-300/40 hover:text-cream-100"
            >
              Me equivoqué, volver
            </button>
          </>
        )}
      </div>
    </div>
  );
}
