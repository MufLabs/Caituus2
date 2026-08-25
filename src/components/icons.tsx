interface IconProps {
  className?: string;
  strokeWidth?: number;
}

const base = (className?: string) => className ?? "w-5 h-5";

export function BeanIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
      <path d="M7.2 4.6c4.4-2.6 9.6-1 11.8 3s.4 9.4-4 12-9.6 1-11.8-3-.4-9.4 4-12Z" />
      <path d="M8.4 5.4c2.4 1.8 2 4.6 3.9 6.8s4.8 2.6 5.2 5.8" />
    </svg>
  );
}

export function CupIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M5 10h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v-6Z" />
      <path d="M16 11.5h1.5a2.75 2.75 0 0 1 0 5.5H16" />
      <path d="M8.5 3.5c-.8 1.2.8 1.8 0 3M12 3.5c-.8 1.2.8 1.8 0 3" />
    </svg>
  );
}

export function FlameIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M12 21c3.9 0 6.5-2.5 6.5-6.1 0-2.6-1.6-4.4-3-6-1.2-1.4-2.3-2.7-2.6-4.9-2.9 1.7-4.4 4.1-4.3 6.6-.7-.3-1.3-1-1.6-2-1.2 1.3-2 3.4-2 5.3 0 4.5 3.1 7.1 7 7.1Z" />
      <path d="M12 21c1.8 0 3-1.3 3-3.1 0-1.7-1.2-2.7-3-4.4-1.8 1.7-3 2.7-3 4.4 0 1.8 1.2 3.1 3 3.1Z" />
    </svg>
  );
}

export function LeafIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z" />
      <path d="M5 19c3-5 6-8 10-10" />
    </svg>
  );
}

export function MountainIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="m3 19 6.5-11L13 13l2.5-4L21 19H3Z" />
      <path d="m8 9.5 1.5 2 1.5-2" />
    </svg>
  );
}

export function SearchIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
      <circle cx="10.5" cy="10.5" r="6.2" />
      <path d="m19.8 19.8-4.9-4.9" />
    </svg>
  );
}

export function BagIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M6 7.5h12l1.2 12a1.5 1.5 0 0 1-1.5 1.6H6.3a1.5 1.5 0 0 1-1.5-1.6L6 7.5Z" />
      <path d="M9 10V6.8a3 3 0 0 1 6 0V10" />
    </svg>
  );
}

export function HeartIcon({ className, filled = false, strokeWidth = 1.7 }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M12 20.2S4 15.3 4 9.9A4.4 4.4 0 0 1 8.4 5.5c1.6 0 3 .9 3.6 2.1.6-1.2 2-2.1 3.6-2.1A4.4 4.4 0 0 1 20 9.9c0 5.4-8 10.3-8 10.3Z" />
    </svg>
  );
}

export function PlusIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function XIcon({ className, strokeWidth = 1.9 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function TrashIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M4.5 6.5h15M9.5 6V4.8A1.3 1.3 0 0 1 10.8 3.5h2.4a1.3 1.3 0 0 1 1.3 1.3V6.5M6.5 6.5l.8 12.2a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-12.2" />
      <path d="M10 10.5v6M14 10.5v6" />
    </svg>
  );
}

export function ArrowRightIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M20 12H4M10 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronDownIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function StarIcon({ className, filled = true }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" className={base(className)}>
      <path d="m12 3.6 2.5 5.3 5.8.7-4.3 4 1.1 5.8-5.1-2.9-5.1 2.9 1.1-5.8-4.3-4 5.8-.7L12 3.6Z" />
    </svg>
  );
}

export function TruckIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M2.5 5.5h12v11h-12zM14.5 9h4l3 3.5v4h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  );
}

export function DropIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  );
}

export function ThermoIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M10 4a2 2 0 0 1 4 0v9.3a4.5 4.5 0 1 1-4 0V4Z" />
      <path d="M12 9v7" />
    </svg>
  );
}

export function TimerIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <circle cx="12" cy="13.5" r="7" />
      <path d="M12 10v3.8l2.5 1.7M9.5 2.5h5" />
    </svg>
  );
}

export function ScaleIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M12 7a3.5 3.5 0 0 0-3.4 4.4l3.4 1 3.4-1A3.5 3.5 0 0 0 12 7Z" />
      <path d="M8 17h8" />
    </svg>
  );
}

export function LockIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
    </svg>
  );
}
