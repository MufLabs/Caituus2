export type Category = "single-origin" | "blend" | "espresso" | "decaf";
export type Grind = "whole" | "filter" | "espresso";

export interface Product {
  id: string;
  name: string;
  origin: string;
  region: string;
  category: Category;
  process: string;
  varietal: string;
  roast: 1 | 2 | 3 | 4 | 5;
  altitude: string;
  producer: string;
  notes: string[];
  price: number;
  weight: number;
  stock: number;
  rating: number;
  reviews: number;
  badge?: { label: string; tone: "sage" | "ember" | "berry" | "copper" };
  description: string;
  brew: { method: string; ratio: string; temp: string; time: string };
  accent: string;
  image: string;
}

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All coffees" },
  { id: "single-origin", label: "Single origin" },
  { id: "espresso", label: "Espresso" },
  { id: "blend", label: "Blends" },
  { id: "decaf", label: "Decaf" },
];

export const GRINDS: { id: Grind; label: string; hint: string }[] = [
  { id: "whole", label: "Whole bean", hint: "Grind at home" },
  { id: "filter", label: "Filter", hint: "V60 · batch brew" },
  { id: "espresso", label: "Espresso", hint: "Fine grind" },
];

export const grindLabel = (g: Grind) => GRINDS.find((x) => x.id === g)?.label ?? g;

export const ROAST_LABELS: Record<number, string> = {
  1: "Extra light",
  2: "Light",
  3: "Medium",
  4: "Medium-dark",
  5: "Dark",
};

export const FREE_SHIPPING_AT = 45;
export const FLAT_SHIPPING = 6;

export const money = (n: number) => `$${n.toFixed(2)}`;

export function mostRecentMonday(): Date {
  const d = new Date();
  const offset = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - offset);
  d.setHours(9, 0, 0, 0);
  return d;
}

export function formatDay(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const PRODUCTS: Product[] = [
  {
    id: "guji",
    name: "Guji Highlands",
    origin: "Ethiopia",
    region: "Oromia · Hambela",
    category: "single-origin",
    process: "Washed",
    varietal: "Heirloom 74158",
    roast: 2,
    altitude: "2,100–2,300 masl",
    producer: "Buku Abel station · ~450 smallholders",
    notes: ["Bergamot", "Blueberry", "Jasmine"],
    price: 21,
    weight: 250,
    stock: 18,
    rating: 4.9,
    reviews: 212,
    badge: { label: "New harvest", tone: "sage" },
    description:
      "Heirloom trees growing wild above 2,100 metres, picked deep-red and washed clean at the Buku Abel station. A luminous, tea-like cup — bergamot up front, blueberry as it cools, and a jasmine finish that lingers long after the last sip.",
    brew: { method: "V60 pour-over", ratio: "1 : 16", temp: "94°C", time: "2:45" },
    accent: "#E5B36B",
    image:
      "https://image.qwenlm.ai/generated-images/5c31bc6c-eed5-4622-99d4-d3694a6e95cd/_result.png",
  },
  {
    id: "huila",
    name: "La Palma, Huila",
    origin: "Colombia",
    region: "Huila · Garzón",
    category: "single-origin",
    process: "Honey",
    varietal: "Pink Bourbon",
    roast: 3,
    altitude: "1,750 masl",
    producer: "Finca La Palma · Rojas family",
    notes: ["Panela", "Red apple", "Almond"],
    price: 19,
    weight: 250,
    stock: 24,
    rating: 4.8,
    reviews: 164,
    description:
      "The Rojas family's honey-processed lot from a single ridge outside Garzón. Leaving the mucilage on through drying rounds the cup into something soft and sweet — panela up front, crisp red apple in the middle, a long almond-butter finish.",
    brew: { method: "V60 pour-over", ratio: "1 : 16", temp: "93°C", time: "2:50" },
    accent: "#8FA174",
    image:
      "https://image.qwenlm.ai/generated-images/8a00ccde-987a-400e-b758-cb9e7063438a/_result.png",
  },
  {
    id: "nyeri",
    name: "Nyeri AA",
    origin: "Kenya",
    region: "Nyeri County",
    category: "single-origin",
    process: "Washed · double fermented",
    varietal: "SL28 · SL34",
    roast: 2,
    altitude: "1,800 masl",
    producer: "Gichathaini factory · 700 members",
    notes: ["Blackcurrant", "Grapefruit", "Demerara"],
    price: 22,
    weight: 250,
    stock: 7,
    rating: 4.9,
    reviews: 98,
    badge: { label: "Small lot", tone: "berry" },
    description:
      "An AA outturn from the Gichathaini factory — small, dense SL28 and SL34 cherries given a meticulous double fermentation. Bright and structured: blackcurrant juice, pink grapefruit, and a deep demerara sweetness in the finish.",
    brew: { method: "Origami / Kalita", ratio: "1 : 16", temp: "93°C", time: "2:40" },
    accent: "#95566C",
    image:
      "https://image.qwenlm.ai/generated-images/016eec97-26cc-429d-9d42-0b76c96e078d/_result.png",
  },
  {
    id: "night-shift",
    name: "Night Shift",
    origin: "Brazil + Colombia",
    region: "Cerrado · Huila",
    category: "espresso",
    process: "Natural + washed",
    varietal: "Mundo Novo · Caturra",
    roast: 4,
    altitude: "1,100–1,600 masl",
    producer: "Blend of two partner farms",
    notes: ["Dark chocolate", "Hazelnut", "Molasses"],
    price: 18,
    weight: 250,
    stock: 42,
    rating: 4.7,
    reviews: 431,
    badge: { label: "Best seller", tone: "ember" },
    description:
      "Our espresso workhorse. A natural Brazil base wrapped in washed Colombia — syrupy body, dark chocolate and roasted hazelnut, and a molasses finish that cuts straight through milk. Forgiving on the grinder, relentless in the cup.",
    brew: { method: "Espresso", ratio: "1 : 2", temp: "93°C", time: "0:27" },
    accent: "#CD7F49",
    image:
      "https://image.qwenlm.ai/generated-images/fbfb8353-db78-4889-98b4-cc5944c3ab85/_result.png",
  },
  {
    id: "hearthside",
    name: "Hearthside",
    origin: "Guatemala + Ethiopia",
    region: "Antigua · Guji",
    category: "blend",
    process: "Washed",
    varietal: "Bourbon · Heirloom",
    roast: 3,
    altitude: "1,600–2,100 masl",
    producer: "House blend · two origins",
    notes: ["Caramel", "Orange zest", "Cocoa nib"],
    price: 17,
    weight: 250,
    stock: 36,
    rating: 4.8,
    reviews: 377,
    badge: { label: "Staff pick", tone: "copper" },
    description:
      "The house filter blend — a washed Guatemalan core with a floral Ethiopian top note. Comfortable every single day: caramel sweetness, a flick of orange zest, cocoa nib in the finish. Brews sweet on virtually any method.",
    brew: { method: "Batch brew", ratio: "1 : 17", temp: "92°C", time: "4:30" },
    accent: "#F1E3C8",
    image:
      "https://image.qwenlm.ai/generated-images/ff400b38-dbf0-4b6b-a874-60304e45f0e0/_result.png",
  },
  {
    id: "moonlit",
    name: "Moonlit",
    origin: "Colombia",
    region: "Huila · Pitalito",
    category: "decaf",
    process: "Sugarcane E.A. decaf",
    varietal: "Caturra · Castillo",
    roast: 3,
    altitude: "1,650 masl",
    producer: "Smallholder collective, Pitalito",
    notes: ["Milk chocolate", "Toffee", "Raisin"],
    price: 18,
    weight: 250,
    stock: 5,
    rating: 4.6,
    reviews: 203,
    description:
      "A sugarcane E.A. decaf from Huila, roasted to the same standard as everything else on the board. All of the comfort, none of the jolt — milk chocolate, soft toffee, raisin. A decaf you will not have to apologize for.",
    brew: { method: "French press", ratio: "1 : 14", temp: "96°C", time: "4:00" },
    accent: "#7C8AA0",
    image:
      "https://image.qwenlm.ai/generated-images/baeb25c4-3140-4bc6-a234-fb5b7065c1e4/_result.png",
  },
];

export const ROAST_LOG = [
  { batch: "№ 216", coffee: "Guji Highlands", charge: "176°C", drop: "204°C · 11:42", dev: "21.4% dev" },
  { batch: "№ 215", coffee: "Nyeri AA", charge: "172°C", drop: "199°C · 10:58", dev: "18.9% dev" },
  { batch: "№ 214", coffee: "Night Shift", charge: "181°C", drop: "214°C · 12:31", dev: "24.2% dev" },
];
