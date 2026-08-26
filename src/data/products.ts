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

export const PRODUCTS: Product[] = [
  {
    id: "aceite-cbd-25",
    name: "Aceite Esencial CBD 25 ml",
    tagline: "El primer paso hacia tu bienestar",
    description:
      "Aceite esencial de CBD de espectro completo en frasco gotero de 25 ml. Elaborado con hemp orgánico cultivado en Colombia y extraído por CO₂ supercrítico, sin solventes ni aditivos. Ideal para comenzar tu rutina de bienestar.",
    price: 95000,
    category: "aceites",
    image: aceite25,
    content: "25 ml · frasco gotero",
    kind: "Espectro completo",
    thc: "THC < 0.3%",
    use: {
      aplicacion: "Vía sublingual: coloca las gotas bajo la lengua y espera 60 segundos antes de tragar.",
      dosis: "Inicia con 5 gotas (≈ 8 mg de CBD) una vez al día. Ajusta cada semana según tu respuesta.",
      momento: "Mañana o noche, siempre a la misma hora para crear constancia.",
    },
    specs: [
      { label: "Contenido", value: "25 ml / 750 mg CBD" },
      { label: "Tipo", value: "Espectro completo" },
      { label: "Portador", value: "Aceite MCT orgánico" },
      { label: "Extracción", value: "CO₂ supercrítico" },
      { label: "Certificado", value: "Análisis por lote con QR" },
      { label: "Origen", value: "Hemp orgánico colombiano" },
    ],
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
    description:
      "La presentación favorita de nuestros clientes: 50 ml de aceite esencial de CBD de espectro completo con caja y frasco gotero. Más gotas, más semanas de tranquilidad, mejor precio por mililitro.",
    price: 160000,
    compareAt: 190000,
    category: "aceites",
    image: aceite50,
    content: "50 ml · caja + frasco gotero",
    kind: "Espectro completo",
    thc: "THC < 0.3%",
    use: {
      aplicacion: "Vía sublingual: gotas bajo la lengua, espera 60 segundos y traga.",
      dosis: "Inicia con 10 gotas (≈ 16 mg de CBD) al día. Ajusta gradualmente según necesidad.",
      momento: "En la mañana para el día a día, o en la noche para descansar mejor.",
    },
    specs: [
      { label: "Contenido", value: "50 ml / 1500 mg CBD" },
      { label: "Tipo", value: "Espectro completo" },
      { label: "Portador", value: "Aceite MCT orgánico" },
      { label: "Extracción", value: "CO₂ supercrítico" },
      { label: "Certificado", value: "Análisis por lote con QR" },
      { label: "Origen", value: "Hemp orgánico colombiano" },
    ],
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
    description:
      "Nuestro frasco de mayor capacidad: 100 ml de aceite esencial de CBD de espectro completo. Pensado para usuarios frecuentes y familias que ya conocen su dosis y quieren el mejor valor por gota.",
    price: 260000,
    category: "aceites",
    image: aceite100,
    content: "100 ml · frasco gotero familiar",
    kind: "Espectro completo",
    thc: "THC < 0.3%",
    use: {
      aplicacion: "Vía sublingual: gotas bajo la lengua, espera 60 segundos y traga.",
      dosis: "Para usuarios con rutina establecida: 15–20 gotas (≈ 24–32 mg de CBD) al día.",
      momento: "Distribuye la dosis en la mañana y la noche según tu rutina.",
    },
    specs: [
      { label: "Contenido", value: "100 ml / 3000 mg CBD" },
      { label: "Tipo", value: "Espectro completo" },
      { label: "Portador", value: "Aceite MCT orgánico" },
      { label: "Extracción", value: "CO₂ supercrítico" },
      { label: "Certificado", value: "Análisis por lote con QR" },
      { label: "Origen", value: "Hemp orgánico colombiano" },
    ],
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
      "Aceite de CBD formulado especialmente para perros y gatos, con 0% THC y saborizante natural que facilita la toma. Acompaña la ansiedad por ruidos o separación, el descanso y la movilidad de tu peludo.",
    price: 150000,
    category: "mascotas",
    image: mascotas50,
    content: "50 ml · gotero con jeringa dosificadora",
    kind: "Amplio espectro · 0% THC",
    thc: "0% THC — seguro para mascotas",
    use: {
      aplicacion: "Mezcla las gotas con su comida favorita o aplícalas directo en la boca con la jeringa.",
      dosis: "1 gota por cada 5 kg de peso, 1–2 veces al día. Consulta la tabla del empaque.",
      momento: "30 minutos antes de eventos estresantes (ruidos, viajes, visitas al veterinario).",
    },
    specs: [
      { label: "Contenido", value: "50 ml / 1000 mg CBD" },
      { label: "Tipo", value: "Amplio espectro" },
      { label: "THC", value: "0% — apto mascotas" },
      { label: "Especies", value: "Perros y gatos" },
      { label: "Certificado", value: "Análisis por lote con QR" },
      { label: "Registro", value: "Formulado para uso veterinario" },
    ],
    notes: ["Ansiedad y calma", "Perros y gatos", "Sabor agradable"],
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
      "Extracto de cannabis con THC en presentación de 20 ml, elaborado para usuarios adultos que buscan una fórmula de alta concentración. Venta exclusiva para mayores de edad conforme a la Ley 1787 de 2016.",
    price: 180000,
    category: "extractos",
    image: extractoThc,
    content: "20 ml · frasco ámbar gotero",
    kind: "Extracto con THC",
    thc: "Solo mayores de 18 años",
    use: {
      aplicacion: "Vía sublingual en dosis pequeñas y medidas. Lee la guía incluida antes del primer uso.",
      dosis: "Comienza con la dosis mínima de la guía (1–2 gotas) y espera al menos 2 horas antes de ajustar.",
      momento: "Preferiblemente en la noche. No conduzcas ni operes maquinaria después de consumirlo.",
    },
    specs: [
      { label: "Contenido", value: "20 ml" },
      { label: "Tipo", value: "Extracto con THC" },
      { label: "Uso", value: "Adultos +18" },
      { label: "Extracción", value: "CO₂ supercrítico" },
      { label: "Certificado", value: "Análisis por lote con QR" },
      { label: "Marco legal", value: "Ley 1787 de 2016" },
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
      "Extracto puro de cannabis en jeringa dosificadora de 5 ml, disponible en variedades Indica y Sativa. La presentación preferida de usuarios experimentados: precisa, portátil y de máxima pureza.",
    price: 120000,
    category: "extractos",
    image: extractoJeringa,
    content: "5 ml · jeringa dosificadora",
    kind: "Indica / Sativa",
    thc: "Solo mayores de 18 años",
    use: {
      aplicacion: "Dosis medible con la jeringa. Indica para la noche, Sativa para el día.",
      dosis: "Inicia con 0.1 ml. Espera 2 horas antes de aumentar; menos es más con extractos puros.",
      momento: "Sativa en la mañana o tarde; Indica al finalizar el día.",
    },
    specs: [
      { label: "Contenido", value: "5 ml · jeringa" },
      { label: "Variedades", value: "Indica y Sativa" },
      { label: "Uso", value: "Adultos +18" },
      { label: "Pureza", value: "Extracto puro" },
      { label: "Certificado", value: "Análisis por lote con QR" },
      { label: "Marco legal", value: "Ley 1787 de 2016" },
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
