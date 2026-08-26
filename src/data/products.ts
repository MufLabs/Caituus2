export type Category = "piel" | "salud" | "mascotas";

export interface Product {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  image: string;
  price: number;
  compareAt?: number;
  mg: number;
  size: string;
  notes: string[];
  rating: number;
  reviews: number;
  stock: number;
  accent: string;
  badge?: { label: string; tone: "leaf" | "amber" | "sky" | "clay" };
  usage: { method: string; dose: string; when: string };
  specs: [string, string][];
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "piel", label: "Piel", blurb: "Tópicos y cosmética con CBD" },
  { id: "salud", label: "Salud", blurb: "Aceites y bienestar diario" },
  { id: "mascotas", label: "Mascotas", blurb: "Calma para perros y gatos" },
];

export const INTENSITY_LEVELS = [
  { id: 1, label: "Suave", range: "≤ 300 mg" },
  { id: 2, label: "Media", range: "500 – 750 mg" },
  { id: 3, label: "Intensa", range: "≥ 1000 mg" },
] as const;

export function intensityOf(mg: number): number {
  if (mg <= 300) return 1;
  if (mg <= 750) return 2;
  return 3;
}

export const PRODUCTS: Product[] = [
  {
    id: "aceite-full-10",
    name: "Aceite Full Spectrum 10%",
    category: "salud",
    tagline: "El esencial de todos los días",
    description:
      "Extracto de espectro completo en aceite MCT de coco orgánico. Diseñado para tu rutina diaria: calma, descanso y equilibrio del sistema endocannabinoide con cada dosis sublingual.",
    image:
      "https://image.qwenlm.ai/generated-images/a0999335-f01a-43a0-b573-8e2afa4541e1/_result.png",
    price: 145000,
    mg: 1000,
    size: "30 ml",
    notes: ["Calma", "Descanso", "Rutina diaria"],
    rating: 4.9,
    reviews: 214,
    stock: 24,
    accent: "#DBA545",
    badge: { label: "Más vendido", tone: "amber" },
    usage: { method: "Sublingual", dose: "0.5 ml ≈ 16 mg de CBD", when: "1 – 2 veces al día" },
    specs: [
      ["Extracción", "CO₂ supercrítico"],
      ["Origen del hemp", "Cultivo orgánico certificado"],
      ["THC", "< 0.3% (cumple normativa)"],
      ["Análisis", "Certificado por lote (QR en el empaque)"],
    ],
  },
  {
    id: "aceite-full-25",
    name: "Aceite Full Spectrum 25%",
    category: "salud",
    tagline: "Concentración intensa",
    description:
      "La misma fórmula de espectro completo, con dos veces y media la concentración. Para quienes ya conocen el CBD y buscan soporte intensivo para molestias crónicas y recuperación.",
    image:
      "https://image.qwenlm.ai/generated-images/a0999335-f01a-43a0-b573-8e2afa4541e1/_result.png",
    price: 289000,
    compareAt: 322000,
    mg: 2500,
    size: "30 ml",
    notes: ["Molestias crónicas", "Recuperación", "Concentración"],
    rating: 4.8,
    reviews: 167,
    stock: 12,
    accent: "#7FA365",
    badge: { label: "Intenso", tone: "leaf" },
    usage: { method: "Sublingual", dose: "0.5 ml ≈ 41 mg de CBD", when: "1 – 2 veces al día" },
    specs: [
      ["Extracción", "CO₂ supercrítico"],
      ["Origen del hemp", "Cultivo orgánico certificado"],
      ["THC", "< 0.3% (cumple normativa)"],
      ["Análisis", "Certificado por lote (QR en el empaque)"],
    ],
  },
  {
    id: "crema-recovery",
    name: "Crema Tópica Recovery",
    category: "piel",
    tagline: "Alivio localizado, cuerpo en movimiento",
    description:
      "CBD de amplio espectro combinado con árnica, mentol y alcanfor natural. Se absorbe rápido y acompaña músculos y articulaciones después del entrenamiento o de jornadas largas.",
    image:
      "https://image.qwenlm.ai/generated-images/bf0ee331-d96d-4920-b25b-5b1eb597e336/_result.png",
    price: 118000,
    mg: 500,
    size: "60 ml",
    notes: ["Árnica", "Mentol", "Post-entrenamiento"],
    rating: 4.7,
    reviews: 98,
    stock: 30,
    accent: "#9DBE83",
    usage: { method: "Tópico", dose: "Aplicar sobre la zona y masajear", when: "2 – 3 veces al día" },
    specs: [
      ["Fórmula", "Amplio espectro · 0% THC"],
      ["Activos", "Árnica, mentol y alcanfor"],
      ["Textura", "Crema de rápida absorción"],
      ["Apto para", "Todo tipo de piel, uso externo"],
    ],
  },
  {
    id: "serum-glow",
    name: "Sérum Facial Glow",
    category: "piel",
    tagline: "Calma visible para piel sensible",
    description:
      "Sérum ligero de CBD con rosa mosqueta, vitamina E y escualano vegetal. Hidrata, ayuda a reducir rojeces y devuelve luminosidad sin obstruir los poros.",
    image:
      "https://image.qwenlm.ai/generated-images/9c1357b7-116f-45b9-9bf3-c5a471fa7915/_result.png",
    price: 132000,
    mg: 300,
    size: "30 ml",
    notes: ["Rosa mosqueta", "Vitamina E", "Piel sensible"],
    rating: 4.8,
    reviews: 76,
    stock: 18,
    accent: "#E8B960",
    badge: { label: "Nuevo", tone: "sky" },
    usage: { method: "Facial", dose: "3 – 4 gotas en rostro limpio", when: "En la noche, antes de la crema" },
    specs: [
      ["Fórmula", "Amplio espectro · 0% THC"],
      ["Activos", "Rosa mosqueta, vitamina E, escualano"],
      ["Comedogénico", "No comedogénico"],
      ["Apto para", "Piel sensible y mixta"],
    ],
  },
  {
    id: "pet-calm",
    name: "Pet Calm Gotas",
    category: "mascotas",
    tagline: "Calma orgánica para perros y gatos",
    description:
      "Gotas de CBD formuladas para mascotas, con sabor salmón que aceptan sin pelear. Pensadas para ansiedad por separación, ruidos fuertes y viajes en carro.",
    image:
      "https://image.qwenlm.ai/generated-images/611023f9-5860-44e9-936a-6b345895b769/_result.png",
    price: 98000,
    mg: 250,
    size: "30 ml",
    notes: ["Ansiedad", "Ruidos fuertes", "Sabor salmón"],
    rating: 4.9,
    reviews: 143,
    stock: 40,
    accent: "#DBA545",
    badge: { label: "Para peludos", tone: "clay" },
    usage: { method: "Oral (mascotas)", dose: "1 gota por cada 5 kg de peso", when: "30 min antes del evento estresante" },
    specs: [
      ["Especies", "Perros y gatos"],
      ["Sabor", "Salmón natural"],
      ["THC", "0% — fórmula pet-safe"],
      ["Registro", "Uso veterinario, guíate por la tabla de peso"],
    ],
  },
  {
    id: "pet-calm-forte",
    name: "Pet Calm Forte",
    category: "mascotas",
    tagline: "Soporte intensivo para razas grandes",
    description:
      "La fórmula Pet Calm triplicada en concentración para razas grandes, mascotas senior o casos de ansiedad severa. Apoya también articulaciones en perros mayores.",
    image:
      "https://image.qwenlm.ai/generated-images/611023f9-5860-44e9-936a-6b345895b769/_result.png",
    price: 172000,
    mg: 750,
    size: "30 ml",
    notes: ["Razas grandes", "Senior", "Articulaciones"],
    rating: 4.8,
    reviews: 89,
    stock: 6,
    accent: "#BC8734",
    badge: { label: "Razas grandes", tone: "amber" },
    usage: { method: "Oral (mascotas)", dose: "1 gota por cada 10 kg de peso", when: "1 – 2 veces al día" },
    specs: [
      ["Especies", "Perros (+15 kg) y gatos bajo guía"],
      ["Sabor", "Salmón natural"],
      ["THC", "0% — fórmula pet-safe"],
      ["Registro", "Uso veterinario, guíate por la tabla de peso"],
    ],
  },
];

export const BRAND_ASSET_URL =
  "https://assets.zyrosite.com/OexDtvuEhf2ueeIp/design-1-AUzK6VSiurSsozgL.png";

/* ---------- Pagos (configurados según el mercado colombiano de la marca) ---------- */

export type PaymentKind = "phone" | "bank" | "card" | "none";

export interface PaymentMethod {
  id: string;
  label: string;
  tag: string;
  kind: PaymentKind;
  hint: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "nequi",
    label: "Nequi",
    tag: "Aprueba desde tu app",
    kind: "phone",
    hint: "Te enviaremos una notificación push a tu Nequi para aprobar el pago.",
  },
  {
    id: "daviplata",
    label: "Daviplata",
    tag: "Pago al instante",
    kind: "phone",
    hint: "Recibirás la solicitud de pago en tu Daviplata para confirmar.",
  },
  {
    id: "pse",
    label: "PSE · Transferencia",
    tag: "Todos los bancos",
    kind: "bank",
    hint: "Selecciona tu banco y autoriza el débito desde tu banca virtual.",
  },
  {
    id: "card",
    label: "Tarjeta crédito / débito",
    tag: "Visa · Mastercard · Amex",
    kind: "card",
    hint: "Procesamiento seguro. No almacenamos los datos de tu tarjeta.",
  },
  {
    id: "cod",
    label: "Pago contraentrega",
    tag: "Bogotá y alrededores",
    kind: "none",
    hint: "Paga en efectivo o con Nequi cuando recibas tu pedido en la puerta.",
  },
];

export const PSE_BANKS = [
  "Bancolombia",
  "Davivienda",
  "Banco de Bogotá",
  "BBVA Colombia",
  "Banco de Occidente",
  "Banco Popular",
];

/* ---------- Envíos y normativa ---------- */

export const FREE_SHIPPING_AT = 200000;
export const SHIPPING_FEE = 12000;

export const LEGAL = {
  laws: "Ley 1787 de 2016 · Decreto 613 de 2017 · Resolución 539 de 2022",
  disclaimer:
    "Los productos Caituus se comercializan bajo el marco regulatorio colombiano para derivados del cannabis. No son medicamentos y ningún contenido de este sitio reemplaza la consulta con un profesional de la salud.",
  thc: "THC < 0.3% en todos los productos para humanos · 0% en línea mascotas",
};

export const SOCIALS = [
  { id: "instagram", label: "@caituus", url: "https://instagram.com/caituus" },
  { id: "x", label: "@caituus", url: "https://x.com/caituus" },
  { id: "facebook", label: "CaituusIndica", url: "https://facebook.com/CaituusIndica" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Mi bulldog le tenía pánico a la pólvora. Con Pet Calm, diciembre por fin fue otra historia para los dos.",
    name: "Andrés P.",
    city: "Bogotá",
    product: "Pet Calm Gotas",
  },
  {
    quote:
      "Llevaba años buscando algo para las rodillas después de entrenar. La Recovery ya vive en mi maleta del gimnasio.",
    name: "Camila R.",
    city: "Medellín",
    product: "Crema Tópica Recovery",
  },
  {
    quote:
      "El aceite 10% me ayudó a volver a dormir de corrido. Lo pido cada mes por Nequi y llega en dos días.",
    name: "Laura M.",
    city: "Cali",
    product: "Aceite Full Spectrum 10%",
  },
];

/* ---------- Utilidades ---------- */

export function money(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export const CATEGORY_LABELS: Record<Category, string> = {
  piel: "Piel",
  salud: "Salud",
  mascotas: "Mascotas",
};
