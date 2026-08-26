import { useState } from "react";
import { LEGAL, SECTION_FALLBACKS, SECTION_IMAGES } from "../data/products";
import Reveal from "./Reveal";
import SafeImg from "./SafeImg";
import {
  ArrowRightIcon,
  BankIcon,
  ChevronDownIcon,
  FlaskIcon,
  LeafIcon,
  PawIcon,
  ShieldIcon,
  TruckIcon,
  WalletIcon,
  WhatsAppIcon,
} from "./icons";

const STEPS = [
  { title: "Elige tu producto", copy: "Aceites de 25, 50 y 100 ml, extractos y la línea mascotas.", icon: LeafIcon },
  { title: "Paga desde tu celular", copy: "Nequi, Daviplata o Breve (Bre-B) — tú eliges.", icon: WalletIcon },
  { title: "Despacho en 24 h", copy: "Llevamos tu pedido a la transportadora al día siguiente.", icon: TruckIcon },
  { title: "Recibe y paga el envío", copy: "El envío se paga contraentrega. Guía por WhatsApp o correo.", icon: WhatsAppIcon },
];

/* Preguntas reales del blog original de Caituus
   ("Aquí tienes lo básico, lo que QUIERES saber" — 22/07/2021) */
const FAQ = [
  {
    q: "¿Qué es el aceite de CBD?",
    a: "Es un aceite preparado con aceite de oliva extra virgen y alto contenido de Cannabidiol, componente no psicoactivo que ha sido comprobado como efectivo para el tratamiento de múltiples enfermedades. Este aceite también tiene otros cannabinoides como CBG, CBC, CBN y otros.",
  },
  {
    q: "¿Qué son los cannabinoides?",
    a: "La planta de cannabis está llena de los cannabinoides que la componen y necesitas: el THC, el CBD, el CBN, el CBC, el CBG y aproximadamente 80 moléculas más que componen la familia de los fitocannabinoides, en cantidades variables según las condiciones ambientales. Científicos de todo el mundo los siguen estudiando y cada vez encuentran más beneficios.",
  },
  {
    q: "¿Qué efectos tienen el CBD y el THC?",
    a: "El THC estimula el apetito, reduce las náuseas y vómitos, tiene propiedades analgésicas y al mezclarse con el CBD actúan en sinergia y potencian su efecto contra el dolor. También es antiinflamatorio, antioxidante, neuroprotector y neurogénico, y ayuda a controlar espasmos y temblores. Algunos cannabinoides son además antidepresivos, ansiolíticos, antieméticos, antiespasmódicos y broncodilatadores: protegen el sistema nervioso y combaten síntomas del Alzheimer y el Parkinson; han funcionado en autismo, esclerosis múltiple, epilepsia y glaucoma, y se ha documentado ampliamente su acción antitumoral.",
  },
  {
    q: "¿El aceite de CBD me “traba” o me pone “high”?",
    a: "No. El CBD es un cannabinoide no psicoactivo que actúa sobre los receptores CB1 y CB2 del sistema cannabinoideo, activando funciones naturales del cuerpo. Ayuda como tratamiento eficaz para artritis, diabetes, esclerosis múltiple, dolor crónico, inflamación, ansiedad, epilepsia, depresión, Parkinson y Alzheimer. No produce ningún tipo de dependencia o adicción; en algunos casos el efecto es simplemente de tranquilidad o relajación.",
  },
  {
    q: "¿Requiero fórmula médica para consumir el aceite?",
    a: "No. El aceite de cannabis no requiere fórmula médica ni para su compra ni para su consumo. Lo que sí sugerimos es que, si lo va a consumir, solicite el consejo de su asesor médico para la dolencia que usted desea tratar.",
  },
  {
    q: "¿Hay diferentes tipos de aceite?",
    a: "Sí. El aceite de cáñamo (Hemp Oil) se extrae de las semillas, es rico en omega 3 y omega 6, no es psicoactivo y se usa como complemento alimenticio y cosmético. El Aceite Medicinal Esencial de Cannabis (CBD Oil) se produce a partir de la extracción de las flores (cogollos): es una solución concentrada de cannabinoides para tratar dolores fuertes, como los causados por la quimioterapia. Y el extracto puro de cannabis se empaca en jeringas para su consumo directo, extraído por el método Rick Simpson, con CO₂ u otros métodos.",
  },
  {
    q: "¿Cómo uso el aceite de CBD y el extracto de THC?",
    a: "Debe empezarse con dosis pequeñas: 3 gotas de aceite de CBD, 3 veces al día, es más que suficiente; para el extracto de THC, 3 gotas bajo la lengua, 3 veces al día. Si la respuesta es satisfactoria, puede ir aumentando paulatinamente: 4 gotas, posteriormente 5. Con el extracto puro debe iniciarse con MUY pequeñas dosis — una gota bajo la lengua es suficiente. Siempre atento a la respuesta del cuerpo y consultando a su médico.",
  },
  {
    q: "¿Por qué tres veces al día?",
    a: "Los cannabinoides trabajan máximo hasta 6 horas; después su efecto disminuye rápidamente. Para garantizar la continuidad del tratamiento y que el organismo mantenga una saturación adecuada de cannabinoides, debe utilizarse el aceite cada pocas horas.",
  },
  {
    q: "Si el CBD es tan beneficioso, ¿CBD puro no sería mejor?",
    a: "No. La molécula aislada de CBD sola no es tan efectiva como el aceite rico en CBD extraído de la planta: los estudios demuestran que la molécula aislada requiere cantidades muy altas para ser efectiva, mientras que el aceite rico en CBD requiere dosis más bajas con una eficacia superior para muchas dolencias.",
  },
  {
    q: "¿Es producido naturalmente?",
    a: "Nuestro aceite es producido artesanalmente, extraído de flores de las mejores cepas, de plantas cultivadas en grupos pequeños por cultivadores privados sin exceder el número de plantas permitido por la ley: sin pesticidas, con crecimiento y cuidado totalmente orgánicos. Los aceites vehículos (oliva, coco) son orgánicos, extra vírgenes, prensados en frío.",
  },
  {
    q: "¿Es legal?",
    a: "En Colombia ya existe legislación aprobada que permite a las personas naturales y/o jurídicas sembrar, producir, transformar y comercializar el cannabis para uso medicinal y no medicinal, con las resoluciones y decretos que la reglamentan.",
  },
];

interface InfoSectionsProps {
  onBrowseMascotas: () => void;
}

export default function InfoSections({ onBrowseMascotas }: InfoSectionsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ---------------- INFORMACIÓN · BLOG ---------------- */}
      <section id="informacion" className="scroll-mt-24 border-y border-moss-700/70 bg-moss-850/80">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">Información · Del blog de Caituus</p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <h2 className="max-w-2xl font-display text-4xl leading-[1.02] font-medium text-cream-100 sm:text-5xl">
                Preguntas y respuestas <em className="text-leaf-400">sobre cannabis.</em>
              </h2>
              <p className="font-mono text-[11px] tracking-[0.16em] text-cream-300 uppercase">
                “Aquí tienes lo básico, lo que QUIERES saber” · 22 · 07 · 2021
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <aside className="space-y-5 lg:col-span-4">
              <Reveal>
                <div className="rounded-lg border border-leaf-600/50 bg-leaf-600/10 p-6">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-leaf-300 uppercase">Nuestra convicción</p>
                  <p className="mt-3 font-display text-[1.35rem] leading-snug text-cream-100 italic">
                    “Queremos que te cuides. Queremos que te sanes.
                    <span className="text-amber-300"> Queremos que estés bien !!”</span>
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-cream-200">
                    Estamos convencidos de los beneficios de la marihuana medicinal. Somos
                    empresarios convencidos de que las personas se pueden curar naturalmente con
                    derivados de esta planta, sin el uso de compuestos químicos que en vez de
                    curar, destruyen el cuerpo.
                  </p>
                  <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">— Caituus</p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <figure className="overflow-hidden rounded-lg border border-moss-700 bg-moss-900">
                  <SafeImg
                    src={SECTION_IMAGES.lab}
                    fallback={SECTION_FALLBACKS.lab}
                    alt="Tubos de ensayo de laboratorio: análisis de cada lote Caituus"
                    className="h-52 w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-60"
                    loading="lazy"
                  />
                  <figcaption className="px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
                    Procesos supervisados · controles escritos de calidad
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={160}>
                <div className="rounded-lg border border-moss-700 bg-moss-900/70 p-5">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-leaf-400 uppercase">Cumplimiento legal</p>
                  <p className="mt-2 flex items-start gap-2.5 text-[13px] leading-relaxed text-cream-200">
                    <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" />
                    {LEGAL.laws} Los extractos con THC se venden únicamente a mayores de 18 años.
                  </p>
                  <p className="mt-3 border-t border-dashed border-moss-700 pt-3 text-[11px] leading-relaxed text-cream-300 italic">
                    {LEGAL.disclaimer}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <figure className="overflow-hidden rounded-lg border border-moss-700 bg-moss-900">
                  <SafeImg
                    src={SECTION_IMAGES.sativaIndica}
                    fallback={SECTION_FALLBACKS.sativaIndica}
                    alt="Hojas de cannabis Sativa e Indica"
                    className="h-44 w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-52"
                    loading="lazy"
                  />
                  <figcaption className="px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
                    Sabiduría ancestral + conocimiento científico
                  </figcaption>
                </figure>
              </Reveal>
            </aside>

            <div className="lg:col-span-8">
              <Reveal delay={80}>
                <div className="overflow-hidden rounded-lg border border-moss-700">
                  {FAQ.map((item, i) => {
                    const open = openFaq === i;
                    return (
                      <div key={item.q} className={i > 0 ? "border-t border-moss-700" : ""}>
                        <button
                          onClick={() => setOpenFaq(open ? null : i)}
                          aria-expanded={open}
                          className={`btn-press flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors sm:px-6 ${
                            open ? "bg-moss-800" : "bg-moss-850 hover:bg-moss-800"
                          }`}
                        >
                          <span className="flex items-baseline gap-4">
                            <span className={`font-mono text-[11px] font-bold ${open ? "text-amber-400" : "text-moss-500"}`}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className={`font-display text-lg leading-snug font-semibold sm:text-xl ${open ? "text-cream-100" : "text-cream-200"}`}>
                              {item.q}
                            </span>
                          </span>
                          <ChevronDownIcon
                            className={`h-5 w-5 shrink-0 text-moss-500 transition-transform duration-300 ${open ? "rotate-180 text-amber-400" : ""}`}
                          />
                        </button>
                        {open && (
                          <div className="animate-rise border-t border-dashed border-moss-700 bg-moss-850 px-5 py-5 sm:px-6">
                            <p className="max-w-2xl pl-8 text-[14px] leading-relaxed text-cream-200 sm:pl-9">{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal delay={140}>
                <figure className="mt-5 overflow-hidden rounded-lg border border-moss-700 bg-moss-900">
                  <SafeImg
                    src={SECTION_IMAGES.blackBottle}
                    fallback={SECTION_FALLBACKS.blackBottle}
                    alt="Frasco ámbar con gotero y gota de aceite esencial de CBD"
                    className="h-56 w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-64"
                    loading="lazy"
                  />
                  <figcaption className="px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
                    Aceite de oliva extra virgen + extracto puro de flor · frasco ámbar
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>

          <Reveal delay={100}>
            <div className="relative mt-10 overflow-hidden rounded-lg border border-moss-700">
              <SafeImg
                src={SECTION_IMAGES.boxesDark}
                fallback={SECTION_FALLBACKS.boxesDark}
                alt="Cajas de la línea de aceites de CBD Caituus sobre fondo oscuro"
                className="h-56 w-full object-cover sm:h-64"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-moss-950/85 via-moss-950/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-9">
                <p className="font-mono text-[10px] tracking-[0.24em] text-amber-300 uppercase">La línea completa</p>
                <p className="mt-2 max-w-sm font-display text-2xl leading-snug text-moss-900 sm:text-3xl">
                  25, 50 y 100 ml para ti;
                  <em className="text-amber-300"> 25, 50 y 100 ml para ellos.</em>
                </p>
                <a href="#productos" className="mt-4 flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-amber-300 uppercase hover:text-amber-400">
                  Ir a la tienda <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MASCOTAS ---------------- */}
      <section id="mascotas" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.28em] text-amber-400 uppercase">
              <PawIcon className="h-4 w-4" /> Línea mascotas
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] font-medium text-cream-100 sm:text-5xl">
              El cannabis sirve para todas nuestras mascotas…
              <em className="text-amber-400"> y sus efectos son increíbles.</em>
            </h2>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="text-[15px] leading-relaxed text-cream-200">
                Ya se ha comprobado el efecto beneficioso del cannabis en mascotas y animales en
                general: <strong className="text-cream-100">se reducen o terminan las convulsiones, los dolores se van
                y las mascotas son felices.</strong> Con nuestros diferentes productos — desde el aceite
                medicinal de CBD suave hasta el extracto puro — todos aliviarán a sus amigos de
                cuatro patas. No importa qué tipo de animal tiene:{" "}
                <strong className="text-cream-100">el aceite funciona para todos.</strong>
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-cream-300">
                Siempre se pensó que el cannabis sólo podía ser usado por humanos. Con el tiempo se
                ha descubierto que también pueden usarlo los animales — todos — con beneficios que
                las drogas comunes no logran, sin afectar su fisiología ni causar efectos
                psicoactivos desagradables.
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <figure className="overflow-hidden rounded-lg border border-moss-700 bg-moss-850">
                <SafeImg src={SECTION_IMAGES.dosingCat} fallback={SECTION_FALLBACKS.dosingCat} alt="Gotero dosificando aceite de CBD sobre la comida de un gato" className="h-56 w-full object-cover transition-transform duration-700 hover:scale-[1.04] sm:h-64" loading="lazy" />
                <figcaption className="px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">
                  Directo en la boca o mezclado con su comida
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mt-14">
            <Reveal>
              <h3 className="font-display text-3xl font-medium text-cream-100 sm:text-4xl">
                Todo lo que debes saber
              </h3>
            </Reveal>
            <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-2">
              {[
                {
                  q: "¿Cuáles son los beneficios?",
                  a: "El aceite esencial de cannabis puede tratar ataques convulsivos, náuseas, estrés, ansiedad, cáncer, artritis, artrosis y dolores de las articulaciones. El alivio se produce por la interacción de los cannabinoides con el sistema endocannabinoide y los receptores CB1 y CB2, que regulan síntomas como el dolor y la ansiedad.",
                  extra: "Su acción es muy diferente a la de los medicamentos comunes: no causa efectos colaterales ni tiene contraindicaciones conocidas, no afecta el sistema gastrointestinal, el hígado ni los riñones, y al ser un extracto natural los animales no se sentirán “high” ni sedados en ningún momento.",
                },
                {
                  q: "¿Y qué riesgos tiene?",
                  a: "Hasta ahora no se conocen casos de efectos fatales por sobredosificación del aceite medicinal. En el peor caso, su mascota estará en un estado de relajación profunda por más tiempo de lo normal. Es más factible un efecto toxicológico si el animal ingiere chocolate, café o uvas pasas.",
                  extra: "El cannabis es metabolizado por el cuerpo cada seis horas. Evite la ingesta de grandes cantidades de planta y manténgase en las dosis recomendadas; si cree que su mascota está en riesgo, consulte a su veterinario de inmediato.",
                },
                {
                  q: "¿Cómo lo administramos?",
                  a: "Normalmente por vía oral: directamente en la boca de la mascota, o mezclado con su comida o con sus galletas favoritas. Sabemos que a veces es difícil suministrar gotas, pero por experiencia de nuestros usuarios, a sus perros y gatos les encanta lamer la cuchara — y si son reacios, prémielos con una galleta.",
                  extra: "Para resultados efectivos hay que mantener la dosis adecuada: así se logra una mejora evidente, progresiva y posteriormente permanente. Es importante aclarar que este es un producto natural: NO es un medicamento.",
                },
                {
                  q: "“Pero ya le estoy dando medicamentos…”",
                  a: "El aceite esencial de cannabis puede trabajar conjuntamente con la mayoría de los medicamentos, en una especie de sinergia que hace que los animales se sientan mejor.",
                  extra: "Hay pocas interacciones significativas con los medicamentos — si es que las hay — de las que realmente deba preocuparse.",
                },
              ].map((item, i) => (
                <Reveal key={item.q} delay={(i % 2) * 90}>
                  <article className="h-full rounded-lg border border-moss-700 bg-moss-850 p-6 transition-colors hover:border-moss-500 sm:p-7">
                    <p className="font-mono text-[10px] tracking-[0.24em] text-leaf-400 uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h4 className="mt-2 font-display text-[1.55rem] leading-snug font-semibold text-cream-100">
                      {item.q}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-cream-200">{item.a}</p>
                    <p className="mt-3 border-l-2 border-amber-500/60 pl-4 text-sm leading-relaxed text-cream-300 italic">
                      {item.extra}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h3 className="font-display text-3xl font-medium text-cream-100">
                ¿Y cómo lo <em className="text-amber-400">dosificamos?</em>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-200">
                La dosis de nuestro sitio original, según el peso de su mascota. Se suministra{" "}
                <strong className="text-cream-100">tres veces al día</strong>; manténgala constante para una mejora
                progresiva y permanente.
              </p>
              <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-cream-300">
                <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" />
                Dosis de acuerdo al peso de la mascota. Por favor consulte a su veterinario.
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-8">
              <div className="overflow-hidden rounded-lg border border-moss-700">
                {[
                  { range: "Perros pequeños y gatos", weight: "menos de 10 kg", dose: "4 gotas", detail: "de aceite, 3 veces al día" },
                  { range: "Perros medianos", weight: "10 kg – 20 kg", dose: "3 gotas + 1", detail: "por cada 5 kg de peso, 3 veces al día" },
                  { range: "Perros grandes", weight: "más de 20 kg", dose: "4 gotas + 1", detail: "por cada 6 kg de peso, 3 veces al día" },
                ].map((d, i) => (
                  <div
                    key={d.range}
                    className={`grid items-center gap-4 bg-moss-850 px-6 py-5 transition-colors hover:bg-moss-800 sm:grid-cols-[1fr_auto_auto] ${i > 0 ? "border-t border-dashed border-moss-700" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-moss-600 bg-moss-900 text-amber-400">
                        <PawIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-display text-xl font-semibold text-cream-100">{d.range}</p>
                        <p className="font-mono text-[10px] tracking-[0.18em] text-cream-300 uppercase">{d.weight}</p>
                      </div>
                    </div>
                    <p className="font-display text-3xl font-medium text-leaf-300">{d.dose}</p>
                    <p className="max-w-[190px] text-[12px] leading-snug text-cream-300">{d.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid items-center gap-8 lg:grid-cols-12">
            <Reveal className="order-2 lg:order-1 lg:col-span-4">
              <div className="grid grid-cols-3 gap-3">
                <SafeImg src={SECTION_IMAGES.cat4} fallback={SECTION_FALLBACKS.cat4} alt="Gata tranquila con aceite de CBD" className="h-28 w-full rounded-lg border border-moss-700 object-cover transition-transform duration-500 hover:-translate-y-1 sm:h-36" loading="lazy" />
                <SafeImg src={SECTION_IMAGES.cat5} fallback={SECTION_FALLBACKS.cat5} alt="Gato descansando profundamente" className="h-28 w-full rounded-lg border border-moss-700 object-cover transition-transform duration-500 hover:-translate-y-1 sm:h-36" loading="lazy" />
                <SafeImg src={SECTION_IMAGES.cat6} fallback={SECTION_FALLBACKS.cat6} alt="Carita de gato sana y alerta" className="h-28 w-full rounded-lg border border-moss-700 object-cover transition-transform duration-500 hover:-translate-y-1 sm:h-36" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-8">
              <h3 className="font-display text-3xl font-medium text-cream-100">
                ¿Y nuestro aceite <em className="text-amber-400">qué contiene?</em>
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-cream-200">
                Preparado con <strong className="text-cream-100">aceite de oliva prensado en frío</strong> y extracto
                puro de flor de cannabis, le permitirá llevar una vida mejor con una reducción muy
                importante de sus molestias, sin afectar el tracto gastrointestinal, el hígado o los
                riñones. Con un sabor que les gusta y con todos los cannabinoides.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["CBD", "THC (sin efecto psicoactivo)", "CBG", "CBN", "Full spectrum", "Frasco ámbar 25 · 50 · 100 ml", "Tapa de seguridad + gotero"].map((chip) => (
                  <span key={chip} className="rounded-full border border-moss-600 bg-moss-850 px-3.5 py-1.5 text-[12px] font-semibold text-cream-200">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <p className="flex items-start gap-2.5 rounded-md border border-clay-500/40 bg-clay-500/10 p-4 text-[12.5px] leading-snug text-cream-200">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-clay-400" />
                  No suministrar en estado de embarazo o durante la lactancia: efectos conocidos en
                  humanos pueden replicarse en sus mascotas.
                </p>
                <p className="flex items-start gap-2.5 rounded-md border border-moss-600 bg-moss-850 p-4 text-[12.5px] leading-snug text-cream-200">
                  <FlaskIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  También llegan las cremas esenciales no tóxicas con cera de abejas, para aplicar
                  en las articulaciones y aliviar el dolor junto con el aceite.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-moss-700 bg-moss-850 px-6 py-5">
              <p className="font-display text-xl text-cream-100 sm:text-2xl">
                ¿Listo para aliviar a su amigo de cuatro patas?
              </p>
              <button
                onClick={onBrowseMascotas}
                className="btn-press group flex items-center gap-2.5 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-moss-950 hover:bg-amber-400"
              >
                Ver aceite para mascotas
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CÓMO COMPRAR ---------------- */}
      <section id="como-comprar" className="scroll-mt-24 border-t border-moss-700/70 bg-moss-850/80">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">Cómo comprar</p>
                <h2 className="mt-2 font-display text-3xl font-medium text-cream-100 sm:text-4xl">
                  Cuatro pasos <em className="text-leaf-400">y tu pedido va en camino.</em>
                </h2>
              </div>
              <p className="flex max-w-xs items-center gap-2 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-cream-300 uppercase">
                <BankIcon className="h-4 w-4 shrink-0 text-amber-400" />
                Pagos: Nequi · Daviplata · Breve (Bre-B)
              </p>
            </div>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <li className="relative h-full rounded-lg border border-moss-700 bg-moss-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-leaf-500/70">
                  <span className="absolute top-5 right-5 font-mono text-[11px] font-bold text-moss-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-moss-600 bg-moss-850 text-amber-400">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-cream-100">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream-300">{s.copy}</p>
                  {i < STEPS.length - 1 && (
                    <ArrowRightIcon className="absolute top-1/2 -right-4 hidden h-4 w-4 -translate-y-1/2 text-moss-500 lg:block" />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
