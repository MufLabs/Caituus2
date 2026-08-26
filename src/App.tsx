import { useEffect, useMemo, useState } from "react";
import AgeGate from "./components/AgeGate";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import CompositionStrip from "./components/CompositionStrip";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InfoSections from "./components/InfoSections";
import OpeningBoard from "./components/OpeningBoard";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import Reveal from "./components/Reveal";
import Toasts from "./components/Toasts";
import Toolbar, { type SortId } from "./components/Toolbar";
import { SearchIcon, XIcon } from "./components/icons";
import { PRODUCTS, type Category, type Product } from "./data/products";
import { ShopProvider, useShop } from "./state/shop";

function AppContent() {
  const { cartOpen, setCartOpen } = useShop();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortId>("featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [p.name, p.tagline, p.description, p.category, p.notes.join(" ")]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);

  const overlayOpen = cartOpen || checkoutOpen || selected !== null;
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  useEffect(() => {
    const done = (window as unknown as { __CAITUUS_MOUNTED__?: () => void }).__CAITUUS_MOUNTED__;
    if (typeof done === "function") done();
  }, []);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
  };

  const browseMascotas = () => {
    setCategory("mascotas");
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <AgeGate />
      <Header />

      <main>
        <OpeningBoard />

        <CompositionStrip />

        <section id="productos" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-14 sm:px-6 lg:px-8 lg:pt-16">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] text-leaf-400 uppercase">Productos</p>
                <h2 className="mt-2 font-display text-4xl tracking-tight font-medium text-cream-100 sm:text-5xl">
                  La vitrina <em className="text-leaf-400">Caituus</em>
                </h2>
              </div>
              <p className="hidden max-w-xs font-mono text-[11px] leading-relaxed tracking-[0.1em] text-cream-300 uppercase md:block">
                Aceites 25 · 50 · 100 ml — extractos Indica & Sativa — línea mascotas
              </p>
            </div>
          </Reveal>

          <Toolbar
            query={query}
            onQuery={setQuery}
            category={category}
            onCategory={setCategory}
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
            <div className="my-14 flex animate-rise flex-col items-center rounded-lg border border-dashed border-moss-600 px-6 py-20 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-moss-600 bg-moss-850 text-moss-500">
                <SearchIcon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-cream-100">
                Nada en la vitrina coincide
              </h3>
              <p className="mt-2 max-w-sm text-sm text-cream-300">
                {query
                  ? `No encontramos nada para "${query}". Prueba con "aceite", "mascotas" o "extracto".`
                  : "Ningún producto coincide con esa combinación."}
              </p>
              <button
                onClick={clearFilters}
                className="btn-press mt-6 flex items-center gap-2 rounded-full border border-moss-600 px-5 py-2.5 text-sm font-semibold text-cream-200 hover:border-leaf-500 hover:text-leaf-300"
              >
                <XIcon className="h-4 w-4" /> Limpiar búsqueda y filtros
              </button>
            </div>
          )}
        </section>

        <InfoSections onBrowseMascotas={browseMascotas} />
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
    <ErrorBoundary>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </ErrorBoundary>
  );
}
