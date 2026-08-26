/* Línea de productos Caituus — Productos Esenciales de Cannabis.
   Todas las ilustraciones son locales (src/assets/img) — cero dependencias externas. */

import aceite25 from "../assets/img/aceite-25.svg";
import aceite50 from "../assets/img/aceite-50.svg";
import aceite100 from "../assets/img/aceite-100.svg";
import mascotas50 from "../assets/img/mascotas-50.svg";
import extractoThc from "../assets/img/extracto-thc.svg";
import extractoJeringa from "../assets/img/extracto-jeringa.svg";
import imgLineup from "../assets/img/lineup.svg";
import imgLab from "../assets/img/lab.svg";
import imgBottle from "../assets/img/bottle-detail.svg";
import imgBoxes from "../assets/img/boxes.svg";
import imgLeaves from "../assets/img/leaves.svg";
import imgCat1 from "../assets/img/cat-1.svg";
import imgCat2 from "../assets/img/cat-2.svg";
import imgCat3 from "../assets/img/cat-3.svg";
import imgCatDosing from "../assets/img/cat-dosing.svg";

export const money = (n: number) =>
  "$" + Math.round(n).toLocaleString("es-CO", { maximumFractionDigits: 0 });

export type Category = "aceites" | "mascotas" | "extractos";

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "aceites", label: "Aceites CBD", blurb: "Aceite esencial de CBD en gotas — 25, 50 y 100 ml" },
  { id: "mascotas", label: "Mascotas", blurb: "Aceite CBD formulado para perros y gatos" },
  { id: "extractos", label: "Extractos", blurb: "Extracto THC 20 ml y Extracto Puro 5 ml (Indica / Sativa)" },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  aceites: "Aceite CBD",
  mascotas: "Mascotas",
  extractos: "Extracto",
};

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAt?: number;
  category: Category;
  image: string;
  content: string;
  kind: string;
  thc: string;
  use: { aplicacion: string; dosis: string; momento: string };
  specs: { label: string; value: string }[];
  notes: string[];
  stock: number;
  rating: number;
  reviews: number;
  badge?: { label: string; tone: "leaf" | "amber" | "sky" | "clay" };
  accent: string;
}

/* Número real del sitio original: pagos directos por Nequi / Daviplata */
export const PAY_PHONE = "311 504 9615";

const CBD_DESCRIPTION =
  "Aceite rico en Cannabidiol, cannabinoide no psicoactivo cuya utilidad como coadyuvante ha sido comprobada en el tratamiento de múltiples enfermedades. Incluye también CBG, CBN, CBC y otros cannabinoides. Preparado con aceite de oliva extra virgen y el extracto proveniente de las mejores cepas: 100% natural, sin efectos psicoactivos. Útil como apoyo en cáncer, epilepsia, fibromialgia, artritis, artrosis, glaucoma, dolores severos, autismo y depresión; sirve para contrarrestar los efectos de la quimioterapia (vómito, mareos, debilidad, pérdida de apetito). Es el complemento perfecto del Extracto Puro en afecciones muy graves como Parkinson y Alzheimer avanzado. Este producto no es un medicamento.";

const CBD_SPECS = [
  { label: "Tipo", value: "Rico en CBD · espectro completo" },
  { label: "Base", value: "Aceite de oliva extra virgen" },
  { label: "Uso", value: "Oral (sublingual) y tópico · en gotas" },
  { label: "Frecuencia", value: "Tres veces al día" },
  { label: "Presentación", value: "Frasco ámbar, tapa seguridad, gotero" },
  { label: "Envío", value: "Incluido en el precio" },
];

export const PRODUCTS: Product[] = [
  {
    id: "aceite-cbd-25",
    name: "Aceite Esencial CBD 25 ml",
    tagline: "Premium — el primer paso hacia tu bienestar",
    description: CBD_DESCRIPTION,
    price: 103500,
    category: "aceites",
    image: aceite25,
    content: "25 ml · frasco gotero",
    kind: "Rico en CBD · espectro completo",
    thc: "THC en concentración muy baja",
    use: {
      aplicacion: "Uso oral (sublingual): gotas bajo la lengua. También puede aplicarse tópicamente sobre la zona afectada.",
      dosis: "Inicia con 3 gotas, 3 veces al día. Si la respuesta es satisfactoria, aumenta paulatinamente: 4 gotas, posteriormente 5.",
      momento: "Cada 6–8 horas, para mantener la saturación adecuada de cannabinoides en el cuerpo.",
    },
    specs: [{ label: "Contenido", value: "25 ml · frasco gotero" }, ...CBD_SPECS],
    notes: ["Bienestar diario", "Sabor natural", "Gotero graduado"],
    stock: 24,
    rating: 4.8,
    reviews: 412,
    badge: { label: "Ideal para iniciar", tone: "leaf" },
    accent: "#4c7f53",
  },
  {
    id: "aceite-cbd-50",
    name: "Aceite Esencial CBD 50 ml",
    tagline: "Nuestro formato más querido",
    description: CBD_DESCRIPTION,
    price: 187000,
    category: "aceites",
    image: aceite50,
    content: "50 ml · caja + frasco gotero",
    kind: "Rico en CBD · espectro completo",
    thc: "THC en concentración muy baja",
    use: {
      aplicacion: "Uso oral (sublingual): gotas bajo la lengua. También puede aplicarse tópicamente sobre la zona afectada.",
      dosis: "Inicia con 3 gotas, 3 veces al día. Si la respuesta es satisfactoria, aumenta paulatinamente: 4 gotas, posteriormente 5.",
      momento: "Cada 6–8 horas, para mantener la saturación adecuada de cannabinoides en el cuerpo.",
    },
    specs: [{ label: "Contenido", value: "50 ml · caja + frasco gotero" }, ...CBD_SPECS],
    notes: ["Más vendido", "Rinde 8 semanas", "Caja protectora"],
    stock: 18,
    rating: 4.9,
    reviews: 861,
    badge: { label: "Más vendido", tone: "amber" },
    accent: "#b87a26",
  },
  {
    id: "aceite-cbd-100",
    name: "Aceite Esencial CBD 100 ml",
    tagline: "Bienestar para toda la temporada",
    description: CBD_DESCRIPTION,
    price: 359000,
    category: "aceites",
    image: aceite100,
    content: "100 ml · frasco gotero familiar",
    kind: "Rico en CBD · espectro completo",
    thc: "THC en concentración muy baja",
    use: {
      aplicacion: "Uso oral (sublingual): gotas bajo la lengua. También puede aplicarse tópicamente sobre la zona afectada.",
      dosis: "Inicia con 3 gotas, 3 veces al día. Una dosis efectiva puede variar entre unos miligramos y un gramo o más; aumenta según la respuesta del cuerpo.",
      momento: "Cada 6–8 horas, para mantener la saturación adecuada de cannabinoides en el cuerpo.",
    },
    specs: [{ label: "Contenido", value: "100 ml · frasco gotero" }, ...CBD_SPECS],
    notes: ["Formato familiar", "Mejor precio por ml", "Alta duración"],
    stock: 11,
    rating: 4.8,
    reviews: 377,
    badge: { label: "Formato familiar", tone: "sky" },
    accent: "#3f7189",
  },
  {
    id: "aceite-mascotas-50",
    name: "Aceite CBD Mascotas 50 ml",
    tagline: "Para ellos también — perros y gatos",
    description:
      "Cuando tus amigos de cuatro patas sufren convulsiones, tienen dolores articulares por artritis o artrosis, tienen cáncer o por su vejez se enferman y sufren dolores, puedes tratarlos y darles una mejor vida con nuestro Aceite de Cannabis (CBD) para Mascotas. Extracto puro de CBD con aceite de oliva extra virgen, fabricado con las mejores cepas: producto 100% natural, que no causa adicción ni dependencia ni efectos psicoactivos, y no afecta el hígado, los riñones ni el tracto gastrointestinal. Este producto no es un medicamento.",
    price: 208000,
    category: "mascotas",
    image: mascotas50,
    content: "50 ml · frasco ámbar, tapa de seguridad y gotero",
    kind: "Full spectrum (CBD · THC · CBG · CBN)",
    thc: "Sin efecto psicoactivo",
    use: {
      aplicacion: "Directamente en la boca o mezclado con su comida o galletas favoritas — les encanta lamer la cuchara.",
      dosis: "Perros pequeños y gatos (<10 kg): 4 gotas, 3 veces al día. Medianos (10–20 kg): 3 gotas + 1 por cada 5 kg. Grandes (>20 kg): 4 gotas + 1 por cada 6 kg, 3 veces al día.",
      momento: "Dosis constante diaria para una mejora progresiva y permanente. No suministrar en embarazo o lactancia. Consulte a su veterinario.",
    },
    specs: [
      { label: "Contenido", value: "25 · 50 · 100 ml" },
      { label: "Tipo", value: "Espectro completo" },
      { label: "Base", value: "Aceite de oliva prensado en frío" },
      { label: "Especies", value: "Perros, gatos y más" },
      { label: "Presentación", value: "Frasco ámbar, tapa seguridad, gotero" },
      { label: "Envío", value: "Incluido en el precio" },
    ],
    notes: ["Convulsiones y dolor", "Perros, gatos y más", "Sabor que les gusta"],
    stock: 15,
    rating: 4.9,
    reviews: 528,
    badge: { label: "Pet friendly", tone: "leaf" },
    accent: "#4c7f53",
  },
  {
    id: "extracto-thc-20",
    name: "Extracto THC 20 ml",
    tagline: "Fórmula de alta concentración",
    description:
      "Extracto rico en THC y CBD en proporción 2:1. Producto 100% natural, de plantas orgánicas, cuya concentración de THC no excede los límites máximos permitidos por los decretos del gobierno nacional. No causa efectos psicoactivos por el contenido de CBD en su composición, ni dependencia ni adicción. Es antiespasmódico, broncodilatador, antioxidante, analgésico y antiinflamatorio: muy efectivo como coadyuvante en tratamientos contra el cáncer, los síntomas del Alzheimer y el Parkinson, la epilepsia, el insomnio, la fibromialgia, dolores crónicos y diferentes neuropatías. Puede causar ansiedad en algunas personas: recomendamos acompañarlo con el Aceite Esencial CBD. Este producto no es un medicamento — por favor consulte a su médico.",
    price: 429600,
    category: "extractos",
    image: extractoThc,
    content: "20 ml · frasco ámbar gotero",
    kind: "Extracto THC:CBD (2:1)",
    thc: "Solo mayores de 18 años",
    use: {
      aplicacion: "Uso oral (sublingual), en gotas. Recomendamos acompañarlo con Aceite Esencial CBD para contrarrestar posibles efectos de ansiedad.",
      dosis: "3 gotas bajo la lengua, 3 veces al día. Inicie con dosis pequeñas y aumente paulatinamente según la respuesta.",
      momento: "Mañana, mediodía y noche. Consulte a su médico antes de iniciar.",
    },
    specs: [
      { label: "Contenido", value: "20 ml" },
      { label: "Proporción", value: "THC : CBD — 2 : 1" },
      { label: "Uso", value: "Oral (sublingual) · 3 veces al día" },
      { label: "Origen", value: "Plantas orgánicas · 100% natural" },
      { label: "Marco legal", value: "Ley 1787 de 2016 · Decretos nacionales" },
      { label: "Envío", value: "No incluido — se paga al recibir" },
    ],
    notes: ["Alta concentración", "Uso adulto", "Guía de dosis incluida"],
    stock: 7,
    rating: 4.7,
    reviews: 203,
    badge: { label: "Solo +18", tone: "clay" },
    accent: "#c05f41",
  },
  {
    id: "extracto-puro-5",
    name: "Extracto Puro 5 ml",
    tagline: "Indica & Sativa — jeringa dosificadora",
    description:
      "La presentación más potente de los productos derivados de la planta. Extraído de las cepas más puras y con mayor concentración de CBD, THC, CBG, CBN, otros cannabinoides y terpenos. Tiene un efecto muy importante en la regeneración celular y es muy efectivo como apoyo en enfermedades graves como cáncer, Parkinson y Alzheimer, además de epilepsia, estrés, depresión, esclerosis múltiple, dolores severos de cabeza, afecciones digestivas, artritis, artrosis, dolores crónicos y fibromialgia. Puede usarse tópicamente en problemas de la piel, ulceraciones y llagas. No recomendada su administración en pacientes con tensión baja o ciertos tipos de esquizofrenia; precaución en embarazo o lactancia. Este producto no es un medicamento — por favor consulte a su médico.",
    price: 150000,
    category: "extractos",
    image: extractoJeringa,
    content: "5 ml · jeringa dosificadora",
    kind: "Indica / Sativa",
    thc: "Solo mayores de 18 años",
    use: {
      aplicacion: "Una microgota bajo la lengua; ingerir alimentos previamente y tomar al menos 5 vasos de agua en el día. Uso tópico: aplicar en el área afectada.",
      dosis: "Microgota cada seis horas. Inicie con MUY pequeñas dosis; para tratamientos severos, con supervisión constante.",
      momento: "Sativa para tratamiento diurno (efecto activo); Indica para nocturno (efecto calmante y somnífero).",
    },
    specs: [
      { label: "Contenido", value: "5 ml · jeringa" },
      { label: "Variedades", value: "Sativa (día) · Indica (noche)" },
      { label: "Uso", value: "Oral (microgotas) y tópico" },
      { label: "Composición", value: "CBD · THC · CBG · CBN · terpenos" },
      { label: "Marco legal", value: "Ley 1787 de 2016" },
      { label: "Envío", value: "No incluido — se paga al recibir" },
    ],
    notes: ["Indica & Sativa", "Jeringa precisa", "Máxima pureza"],
    stock: 9,
    rating: 4.8,
    reviews: 341,
    badge: { label: "Indica / Sativa", tone: "amber" },
    accent: "#b87a26",
  },
];

/* ------------------------------------------------------------------ */
/* Medios de pago — únicamente Nequi, Daviplata y Breve (Bre-B).       */
/* ------------------------------------------------------------------ */

export interface PaymentMethod {
  id: string;
  label: string;
  hint: string;
  field: string; // etiqueta del campo de la app
  color: string;
  kind: "push" | "transfer";
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "nequi",
    label: "Nequi",
    hint: "Te enviaremos una notificación a tu app Nequi para que apruebes el pago.",
    field: "Número de Nequi (celular)",
    color: "#8d4fc4",
    kind: "push",
  },
  {
    id: "daviplata",
    label: "Daviplata",
    hint: "Recibirás un mensaje de pago en tu app Daviplata para confirmarlo.",
    field: "Número de Daviplata (celular)",
    color: "#e03a2f",
    kind: "push",
  },
  {
    id: "breve",
    label: "Breve (Bre-B)",
    hint: "Transferencia inmediata desde tu banco con tu llave Bre-B.",
    field: "Celular o llave Bre-B",
    color: "#0e8f76",
    kind: "transfer",
  },
];

/* ------------------------------------------------------------------ */
/* Condiciones de compra                                               */
/* ------------------------------------------------------------------ */

export const PURCHASE_TERMS = [
  "Su producto está siendo procesado.",
  "El valor pagado no incluye el valor del envío.",
  "El producto será llevado a la empresa de mensajería dentro de las próximas 24 horas.",
  "Usted deberá pagar el valor del envío a la empresa de mensajería al momento de la entrega del producto.",
  "Le enviaremos la guía de transporte a su WhatsApp o a su Correo, una vez la tengamos disponible.",
];

export const CONTACT_TOPICS = [
  "Aceite Esencial CBD 25ml, 50ml o 100ml",
  "Aceite CBD Mascotas 25ml, 50ml, 100ml",
  "Extracto THC 20ml",
  "Extracto Puro 5ml",
  "Distribución Productos",
];

export const LEGAL = {
  laws: "Productos comercializados bajo la Ley 1787 de 2016 y el Decreto 613 de 2017 (Colombia).",
  disclaimer:
    "Este producto no es un medicamento y no reemplaza tratamientos médicos. Consulte a su médico antes de usar, especialmente si está en embarazo, lactancia o toma medicamentos. Venta de extractos con THC exclusiva para mayores de 18 años.",
};

export const SOCIALS = [
  { label: "Instagram", handle: "@caituus" },
  { label: "Facebook", handle: "Caituus Indica" },
  { label: "X (Twitter)", handle: "@caituus" },
];

/* Ilustraciones locales usadas en las secciones */
export const SECTION_IMAGES = {
  lineup: imgLineup,
  lab: imgLab,
  blackBottle: imgBottle,
  boxesDark: imgBoxes,
  sativaIndica: imgLeaves,
  cat4: imgCat1,
  cat5: imgCat2,
  cat6: imgCat3,
  dosingCat: imgCatDosing,
};

export const intensityOf = (mg: number) => (mg <= 500 ? 1 : mg <= 1000 ? 2 : 3);

export const INTENSITY_LEVELS = [
  { id: 1, label: "Inicio", range: "≤ 500 mg" },
  { id: 2, label: "Media", range: "501–1000 mg" },
  { id: 3, label: "Intensa", range: "> 1000 mg" },
];
