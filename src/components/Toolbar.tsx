import { CATEGORIES, PRODUCTS, ROAST_LABELS, type Category } from "../data/products";
import { ChevronDownIcon, SearchIcon, XIcon } from "./icons";

export type SortId = "featured" | "price-asc" | "price-desc" | "roast-asc";

interface ToolbarProps {
  query: string;
  onQuery: (q: string) => void;
  category: Category | "all";
  onCategory: (c: Category | "all") => void;
  roastFilter: number | null;
  onRoastFilter: (r: number | null) => void;
  sort: SortId;
  onSort: (s: SortId) => void;
  resultCount: number;
}

export default function Toolbar({
  query,
  onQuery,
  category,
  onCategory,
  roastFilter,
  onRoastFilter,
  sort,
  onSort,
  resultCount,
}: ToolbarProps) {
  const filtersActive = query !== "" || category !== "all" || roastFilter !== null;

  const counts = CATEGORIES.map((c) => ({
    ...c,
    count: c.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length,
  }));

  return (
    <div className="sticky top-[68px] z-30 -mx-4 border-y border-bark-700/70 bg-bark-900/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1 basis-64">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-latte-500" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search coffee, origin, tasting note…"
              className="field pl-10"
              aria-label="Search coffees"
            />
            {query && (
              <button
                onClick={() => onQuery("")}
                className="btn-press absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-latte-500 hover:bg-bark-700 hover:text-sand-100"
                aria-label="Clear search"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSort(e.target.value as SortId)}
              className="field cursor-pointer appearance-none pr-9 font-mono text-xs tracking-[0.1em] uppercase"
              aria-label="Sort coffees"
            >
              <option value="featured">Sort · Featured</option>
              <option value="price-asc">Price · Low to high</option>
              <option value="price-desc">Price · High to low</option>
              <option value="roast-asc">Roast · Lightest first</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-latte-500" />
          </div>

          <span className="font-mono text-[11px] tracking-[0.18em] text-latte-500 uppercase">
            {resultCount} {resultCount === 1 ? "coffee" : "coffees"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {counts.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onCategory(c.id)}
                className={`btn-press rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                  active
                    ? "border-ember-500 bg-ember-500 text-bark-950"
                    : "border-bark-600 bg-bark-850 text-latte-300 hover:border-latte-500 hover:text-sand-100"
                }`}
              >
                {c.label}
                <span className={`ml-2 font-mono text-[10px] ${active ? "text-bark-800" : "text-latte-600"}`}>
                  {c.count}
                </span>
              </button>
            );
          })}

          <span className="mx-1 hidden h-5 w-px bg-bark-600 sm:block" />

          <div className="flex items-center gap-1.5" role="group" aria-label="Filter by roast level">
            <span className="mr-1 font-mono text-[10px] tracking-[0.2em] text-latte-500 uppercase">Roast</span>
            {[1, 2, 3, 4, 5].map((r) => {
              const active = roastFilter === r;
              return (
                <button
                  key={r}
                  onClick={() => onRoastFilter(active ? null : r)}
                  title={`${ROAST_LABELS[r]} roast`}
                  aria-pressed={active}
                  className={`btn-press flex items-center gap-1 rounded-full border px-2.5 py-2 ${
                    active
                      ? "border-ember-500 bg-bark-700"
                      : "border-bark-600 bg-bark-850 hover:border-latte-500"
                  }`}
                >
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <span
                      key={dot}
                      className={`h-1.5 w-1.5 rounded-full ${
                        dot <= r ? (active ? "bg-ember-400" : "bg-latte-400") : "bg-bark-600"
                      }`}
                    />
                  ))}
                </button>
              );
            })}
          </div>

          {filtersActive && (
            <button
              onClick={() => {
                onQuery("");
                onCategory("all");
                onRoastFilter(null);
              }}
              className="btn-press ml-auto flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-clay-400 uppercase hover:bg-bark-800"
            >
              <XIcon className="h-3 w-3" /> Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
