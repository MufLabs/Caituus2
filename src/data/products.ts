/* Datos reales del sitio original de Caituus (repositorio MufLabs/Caituus,
   extraído de Weebly). Imágenes servidas desde la carpeta /images del repo. */

const REPO_IMG = "https://raw.githubusercontent.com/MufLabs/Caituus/main/images";

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
  content: string; // contenido del frasco
  kind: string; // tipo de extracto
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
    image: `${REPO_IMG}/cajas-25-gotas-2.png`,
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
    image: `${REPO_IMG}/caja-y-botella-50-ml-nueva.jpg`,
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
    image: `${REPO_IMG}/100-ml-nuevo.jpg`,
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
    image: `${REPO_IMG}/doble-perrito-50ml.jpg`,
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
    image: `${REPO_IMG}/extract_orig.jpg`,
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
    image: `${REPO_IMG}/jeringasindica600px-orig_orig.png`,
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
/* Pagos — el sitio original usaba la pasarela PayU con estos métodos,
   según los logos de images/logos del repositorio.                    */
/* ------------------------------------------------------------------ */

export interface PaymentMethod {
  id: string;
  label: string;
  hint: string;
  logo: string;
  logos?: string[];
  kind: "card" | "pse" | "cash" | "wallet";
}

export const PAYU_LOGO = `${REPO_IMG}/logos/payu-2x1-orig_orig.png`;

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card",
    label: "Tarjeta de crédito o débito",
    hint: "Visa · Mastercard · American Express · Diners Club",
    logo: `${REPO_IMG}/logos/visa-150px-2-orig_orig.png`,
    logos: [
      `${REPO_IMG}/logos/visa-150px-2-orig_orig.png`,
      `${REPO_IMG}/logos/master-48pxheight-orig_orig.png`,
      `${REPO_IMG}/logos/american-express-orig_orig.png`,
      `${REPO_IMG}/logos/dinersclub-48pxheight-orig_orig.png`,
    ],
    kind: "card",
  },
  {
    id: "pse",
    label: "PSE — débito bancario",
    hint: "Pagas desde tu banco en línea, al instante",
    logo: `${REPO_IMG}/logos/pse-orig_orig.png`,
    kind: "pse",
  },
  {
    id: "baloto",
    label: "Baloto",
    hint: "Pagas en efectivo con tu referencia — el pedido queda pendiente hasta confirmar",
    logo: `${REPO_IMG}/logos/baloto-orig_orig.png`,
    kind: "cash",
  },
  {
    id: "efecty",
    label: "Efecty",
    hint: "Pagas en efectivo en cualquier punto Efecty con tu referencia",
    logo: `${REPO_IMG}/logos/efe-orig_orig.png`,
    kind: "cash",
  },
  {
    id: "paypal",
    label: "PayPal",
    hint: "Para pagos internacionales",
    logo: `${REPO_IMG}/logos/paypal-206x102-orig_orig.png`,
    kind: "wallet",
  },
];

export const PSE_BANKS = [
  "Bancolombia",
  "Banco de Bogotá",
  "Davivienda",
  "BBVA Colombia",
  "Banco de Occidente",
  "Banco Popular",
  "Banco AV Villas",
  "Itaú",
  "Banco Caja Social",
  "Nequi (vía PSE)",
  "Daviplata (vía PSE)",
];

/* ------------------------------------------------------------------ */
/* Condiciones del sitio original (páginas exitoso/negado/pendiente)   */
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
  { label: "Instagram", handle: "@caituus", url: "https://instagram.com/caituus" },
  { label: "Facebook", handle: "Caituus Indica", url: "https://facebook.com/CaituusIndica" },
  { label: "X (Twitter)", handle: "@caituus", url: "https://x.com/caituus" },
];

/* Imágenes del repositorio usadas en las secciones */
export const SECTION_IMAGES = {
  lineup: `${REPO_IMG}/todas-las-cajas-fondo-blanco.png`,
  boxesDark: `${REPO_IMG}/cajas-cbd-fondo.png`,
  lab: `${REPO_IMG}/6-laboratory-test-tubes-orig_orig.png`,
  blackBottle: `${REPO_IMG}/frasco-aceite-negro-solo8x6-orig_orig.png`,
  dosingCat: `${REPO_IMG}/dosing-cat-mod-orig_orig.jpg`,
  cat4: `${REPO_IMG}/gatica4_orig.jpg`,
  cat5: `${REPO_IMG}/gatica5_orig.jpg`,
  cat6: `${REPO_IMG}/gatica6_orig.jpg`,
  petOil2019: `${REPO_IMG}/aceite-mascotas-2019.jpg`,
  sativaIndica: `${REPO_IMG}/sativa-indica.jpg`,
  jeringaSativa: `${REPO_IMG}/jeringasativa600px-orig_orig.png`,
  siteBackground: `${REPO_IMG}/background-images/1366250879.jpg`,
};

export const intensityOf = (mg: number) => (mg <= 500 ? 1 : mg <= 1000 ? 2 : 3);

export const INTENSITY_LEVELS = [
  { id: 1, label: "Inicio", range: "≤ 500 mg" },
  { id: 2, label: "Media", range: "501–1000 mg" },
  { id: 3, label: "Intensa", range: "> 1000 mg" },
];
