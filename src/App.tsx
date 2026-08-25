import { useEffect, useMemo, useState } from "react";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import CraftBand from "./components/CraftBand";
import Footer from "./components/Footer";
import Header from "./components/Header";
import OpeningBoard from "./components/OpeningBoard";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import Reveal from "./components/Reveal";
import Toasts from "./components/Toasts";
import Toolbar, { type SortId } from "./components/Toolbar";
import { SearchIcon, XIcon } from "./components/icons";
import {
  PRODUCTS,
  formatDay,
  mostRecentMonday,
  type Category,
  type Product,
} from "./data/products";
import { ShopProvider, useShop } from "./state/shop";

function AppContent() {
  const { cartOpen, setCartOpen } = useShop();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [roastFilter, setRoastFilter] = useState<number | null>(null);
  const [sort, setSort] = useState<SortId>("featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (roastFilter !== null && p.roast !== roastFilter) return false;
      if (!q) return true;
      const haystack = [p.name, p.origin, p.region, p.process, p.varietal, p.notes.join(" "), p.category]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "roast-asc") list = [...list].sort((a, b) => a.roast - b.roast);
    return list;
  }, [query, category, roastFilter, sort]);

  const overlayOpen = cartOpen || checkoutOpen || selected !== null;
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setRoastFilter(null);
  };

  return (
    <div className="min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <Header />

      <main>
        <OpeningBoard />

        <section id="shop" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-14 sm:px-6 lg:px-8 lg:pt-16">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] text-ember-400 uppercase">The shelf</p>
                <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-sand-100 sm:text-5xl">
                  This week&apos;s roast board
                </h2>
              </div>
              <p className="hidden font-mono text-[11px] tracking-[0.16em] text-latte-500 uppercase md:block">
                All bags 250 g · dropped Mon {formatDay(mostRecentMonday())}
              </p>
            </div>
          </Reveal>

          <Toolbar
            query={query}
            onQuery={setQuery}
            category={category}
            onCategory={setCategory}
            roastFilter={roastFilter}
            onRoastFilter={setRoastFilter}
            sort={sort}
            onSort={setSort}
            resultCount={filtered.length}
          />

          {filtered.length > 0 ? (
            <div className="grid gap-6 py-10 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 90} className="h-full">
                  <ProductCard product={p} onOpen={setSelected} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="my-14 flex animate-rise flex-col items-center rounded-lg border border-dashed border-bark-600 px-6 py-20 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-bark-600 bg-bark-800 text-latte-500">
                <SearchIcon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-sand-100">
                Nothing on the shelf matches
              </h3>
              <p className="mt-2 max-w-sm text-sm text-latte-400">
                {query
                  ? `We couldn't find anything for "${query}" with those filters. Try a tasting note like "chocolate" or clear the filters.`
                  : "No coffees match that combination. Loosen a filter or two."}
              </p>
              <button
                onClick={clearFilters}
                className="btn-press mt-6 flex items-center gap-2 rounded-full border border-bark-600 px-5 py-2.5 text-sm font-semibold text-sand-200 hover:border-ember-500 hover:text-ember-300"
              >
                <XIcon className="h-4 w-4" /> Clear search & filters
              </button>
            </div>
          )}
        </section>

        <CraftBand />
      </main>

      <Footer onOpenProduct={setSelected} onCategory={setCategory} />

      {selected && <ProductModal key={selected.id} product={selected} onClose={() => setSelected(null)} />}
      <CartDrawer
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
