import {
  CATEGORIES,
  INTENSITY_LEVELS,
  PRODUCTS,
  type Category,
} from "../data/products";
import { ChevronDownIcon, DropIcon, LeafIcon, PawIcon, SearchIcon, SparkIcon, XIcon } from "./icons";

export type SortId = "featured" | "price-asc" | "price-desc" | "mg-asc";

const CATEGORY_ICONS: Record<Category, typeof LeafIcon> = {
  piel: SparkIcon,
  salud: DropIcon,
  mascotas: PawIcon,
};

interface ToolbarProps {
  query: string;
  onQuery: (v: string) => void;
  category: Category | "all";
  onCategory: (v: Category | "all") => void;
  intensity: number | null;
  onIntensity: (v: number | null) => void;
  sort: SortId;
  onSort: (v: SortId) => void;
  resultCount: number;
}

export default function Toolbar({
  query,
  onQuery,
  category,
  onCategory,
  intensity,
  onIntensity,
  sort,
  onSort,
  resultCount,
}: ToolbarProps) {
  const hasActive = query !== "" || category !== "all" || intensity !== null;

  const countFor = (c: Category) => PRODUCTS.filter((p) => p.category === c).length;

  return (
    <div className="sticky top-[98px] z-30 -mx-4 border-y border-moss-700/60 bg-moss-900/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <div className="relative w-full xl:w-72">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-moss-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Buscar aceite, sérum, mascotas…"
              aria-label="Buscar productos"
              className="field pr-9 pl-10 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                onClick={() => onQuery("")}
                className="btn-press absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-moss-500 hover:bg-moss-700 hover:text-cream-100"
                aria-label="Limpiar búsqueda"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoría">
            <button
              onClick={() => onCategory("all")}
              aria-pressed={category === "all"}
              className={`btn-press rounded-full border px-4 py-2 text-[13px] font-bold whitespace-nowrap ${
                category === "all"
                  ? "border-leaf-500 bg-leaf-500/15 text-leaf-300"
                  : "border-moss-600 text-cream-300 hover:border-moss-500 hover:text-cream-100"
              }`}
            >
              Todo · {PRODUCTS.length}
            </button>
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICONS[c.id];
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onCategory(active ? "all" : c.id)}
                  aria-pressed={active}
                  title={c.blurb}
                  className={`btn-press flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold whitespace-nowrap ${
                    active
                      ? "border-leaf-500 bg-leaf-500/15 text-leaf-300"
                      : "border-moss-600 text-cream-300 hover:border-moss-500 hover:text-cream-100"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {c.label} · {countFor(c.id)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5" role="group" aria-label="Filtrar por intensidad">
            {INTENSITY_LEVELS.map((lvl) => {
              const active = intensity === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => onIntensity(active ? null : lvl.id)}
                  aria-pressed={active}
                  title={`CBD ${lvl.range}`}
                  className={`btn-press flex items-center gap-1.5 rounded-md border px-2.5 py-2 font-mono text-[10px] tracking-[0.12em] uppercase ${
                    active
                      ? "border-amber-500 bg-amber-500/15 text-amber-300"
                      : "border-moss-600 text-cream-300/70 hover:border-moss-500 hover:text-cream-100"
                  }`}
                >
                  {lvl.label}
                  <span className={`font-bold ${active ? "text-amber-300" : "text-moss-500"}`}>{lvl.id}●</span>
                </button>
              );
            })}
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSort(e.target.value as SortId)}
              aria-label="Ordenar productos"
              className="field cursor-pointer appearance-none pr-9 text-[13px] font-semibold"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio · menor a mayor</option>
              <option value="price-desc">Precio · mayor a menor</option>
              <option value="mg-asc">CBD · menor a mayor</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-moss-500" />
          </div>

          <span className="font-mono text-[11px] tracking-[0.14em] text-moss-500 uppercase" aria-live="polite">
            {resultCount} {resultCount === 1 ? "producto" : "productos"}
            {hasActive && (
              <button
                onClick={() => {
                  onQuery("");
                  onCategory("all");
                  onIntensity(null);
                }}
                className="ml-3 text-amber-400 underline decoration-amber-600/50 underline-offset-4 hover:text-amber-300"
              >
                limpiar
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
