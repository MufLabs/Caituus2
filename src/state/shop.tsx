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
import {
  FLAT_SHIPPING,
  FREE_SHIPPING_AT,
  PRODUCTS,
  grindLabel,
  type Grind,
  type Product,
} from "../data/products";

export interface CartLine {
  key: string;
  productId: string;
  grind: Grind;
  qty: number;
}

export interface Toast {
  id: number;
  title: string;
  sub?: string;
  kind: "success" | "info";
  ctaLabel?: string;
  onCta?: () => void;
}

interface ShopValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  addToCart: (product: Product, grind: Grind, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopValue | null>(null);

const CART_KEY = "emberfield.cart.v1";
const FAV_KEY = "emberfield.favs.v1";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    const stored = load<CartLine[]>(CART_KEY, []);
    return stored.filter((l) => PRODUCTS.some((p) => p.id === l.productId));
  });
  const [favorites, setFavorites] = useState<string[]>(() => load<string[]>(FAV_KEY, []));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const toastId = useRef(1);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {
      /* storage unavailable */
    }
  }, [favorites]);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const pushToast = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = toastId.current++;
      setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
      const timer = setTimeout(() => dismissToast(id), 3600);
      timers.current.set(id, timer);
    },
    [dismissToast]
  );

  const addToCart = useCallback(
    (product: Product, grind: Grind, qty: number) => {
      const key = `${product.id}:${grind}`;
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(12, l.qty + qty) } : l));
        }
        return [...prev, { key, productId: product.id, grind, qty }];
      });
      pushToast({
        title: "Added to your bag",
        sub: `${product.name} · ${grindLabel(grind)} × ${qty}`,
        kind: "success",
        ctaLabel: "View bag",
        onCta: () => setCartOpen(true),
      });
    },
    [pushToast]
  );

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(12, qty) } : l))
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const has = prev.includes(id);
        const product = PRODUCTS.find((p) => p.id === id);
        if (product) {
          pushToast(
            has
              ? { title: "Removed from saved", sub: product.name, kind: "info" }
              : { title: "Saved for later", sub: product.name, kind: "success" }
          );
        }
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [pushToast]
  );

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const line of lines) {
      const product = PRODUCTS.find((p) => p.id === line.productId);
      if (!product) continue;
      c += line.qty;
      s += product.price * line.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  const value: ShopValue = {
    lines,
    count,
    subtotal,
    shipping,
    total,
    addToCart,
    setQty,
    removeLine,
    clearCart,
    favorites,
    toggleFavorite,
    toasts,
    pushToast,
    dismissToast,
    cartOpen,
    setCartOpen,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
