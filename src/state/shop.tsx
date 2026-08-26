import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, money, type Product } from "../data/products";

export interface CartLine {
  productId: string;
  qty: number;
}

export interface ToastData {
  id: number;
  title: string;
  sub?: string;
  kind?: "info" | "success";
  ctaLabel?: string;
  onCta?: () => void;
}

interface ShopContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (product: Product, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  toasts: ToastData[];
  pushToast: (t: Omit<ToastData, "id">) => void;
  dismissToast: (id: number) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readLS("caituus.cart.v1", []));
  const [favorites, setFavorites] = useState<string[]>(() => readLS("caituus.favs.v1", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const toastId = useRef(1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem("caituus.cart.v1", JSON.stringify(lines));
    } catch {
      /* sin almacenamiento */
    }
  }, [lines]);

  useEffect(() => {
    try {
      localStorage.setItem("caituus.favs.v1", JSON.stringify(favorites));
    } catch {
      /* sin almacenamiento */
    }
  }, [favorites]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const pushToast = useCallback((t: Omit<ToastData, "id">) => {
    const id = toastId.current++;
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    const timer = window.setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 3800);
    timers.current.push(timer);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      setLines((prev) => {
        const found = prev.find((l) => l.productId === product.id);
        if (found) {
          return prev.map((l) =>
            l.productId === product.id ? { ...l, qty: Math.min(12, l.qty + qty) } : l
          );
        }
        return [...prev, { productId: product.id, qty }];
      });
      pushToast({
        title: "Agregado a la bolsa",
        sub: `${product.name} · ${money(product.price)}`,
        ctaLabel: "Ver bolsa",
        onCta: () => setCartOpen(true),
      });
    },
    [pushToast]
  );

  const setQty = useCallback((productId: string, qty: number) => {
    const clamped = Math.max(1, Math.min(12, qty));
    setLines((prev) => prev.map((l) => (l.productId === productId ? { ...l, qty: clamped } : l)));
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const p = PRODUCTS.find((x) => x.id === l.productId);
        return sum + (p ? p.price * l.qty : 0);
      }, 0),
    [lines]
  );

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  /* El sitio original no cobra el envío en línea: se paga a la
     transportadora contraentrega. El envío se reporta como 0. */
  const shipping = 0;
  const total = subtotal + shipping;

  const value: ShopContextValue = {
    lines,
    count,
    subtotal,
    shipping,
    total,
    cartOpen,
    setCartOpen,
    addToCart,
    setQty,
    removeLine,
    clearCart,
    favorites,
    toggleFavorite,
    toasts,
    pushToast,
    dismissToast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop debe usarse dentro de ShopProvider");
  return ctx;
}
