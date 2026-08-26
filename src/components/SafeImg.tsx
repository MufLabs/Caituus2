import { useState } from "react";

interface SafeImgProps {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  /** Si falla la imagen principal y no hay fallback, oculta el elemento (para decoración) */
  hideOnFail?: boolean;
}

export default function SafeImg({
  src,
  fallback,
  alt,
  className = "",
  loading = "lazy",
  hideOnFail = false,
}: SafeImgProps) {
  const [failed, setFailed] = useState(false);
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  const useFallback = failed && fallback;

  return (
    <img
      src={useFallback ? fallback : src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (!failed && fallback) {
          setFailed(true);
        } else if (hideOnFail) {
          setHidden(true);
        }
      }}
    />
  );
}
