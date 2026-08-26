interface IconProps {
  className?: string;
  strokeWidth?: number;
}

const base = (className?: string) => className ?? "w-5 h-5";

export function LeafIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M12 3.2c.9 2.6 2.6 4 4.9 4.6-1.9 1-3 2.3-3.4 4.2 1.5-.3 2.8-.1 4.2.7-1.9.9-3 2-3.4 3.7 1.3 0 2.4.3 3.4 1-2.1 1.6-4 2.2-5.7 1.7V21" />
      <path d="M12 3.2c-.9 2.6-2.6 4-4.9 4.6 1.9 1 3 2.3 3.4 4.2-1.5-.3-2.8-.1-4.2.7 1.9.9 3 2 3.4 3.7-1.3 0-2.4.3-3.4 1 2.1 1.6 4 2.2 5.7 1.7" />
    </svg>
  );
}

export function PawIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <ellipse cx="7" cy="8.5" rx="1.7" ry="2.2" />
      <ellipse cx="17" cy="8.5" rx="1.7" ry="2.2" />
      <ellipse cx="11" cy="5.5" rx="1.7" ry="2.2" />
      <path d="M12 11.5c2.6 0 5 2 5.4 4.6.3 1.9-1.1 3.4-3 3.4-1 0-1.7-.5-2.4-.5s-1.4.5-2.4.5c-1.9 0-3.3-1.5-3-3.4.4-2.6 2.8-4.6 5.4-4.6Z" />
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

export function MoonIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M19.5 14.2A8 8 0 0 1 9.8 4.5a8 8 0 1 0 9.7 9.7Z" />
      <path d="M15 4.5h4M17 2.5v4" />
    </svg>
  );
}

export function FlaskIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M9.5 3h5M10.5 3v5.2L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18L13.5 8.2V3" />
      <path d="M7.5 14.5h9" />
      <circle cx="10.5" cy="17.5" r="0.5" fill="currentColor" />
      <circle cx="13.5" cy="18.8" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function ShieldIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M12 3 5 5.8v5.4c0 4.5 2.9 7.8 7 9.8 4.1-2 7-5.3 7-9.8V5.8L12 3Z" />
      <path d="m8.8 11.8 2.3 2.3 4.2-4.6" />
    </svg>
  );
}

export function SparkIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M12 4c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
      <path d="M18.5 15.5c.3 1.7 1.1 2.6 2.8 2.9-1.7.3-2.5 1.2-2.8 2.9-.3-1.7-1.1-2.6-2.8-2.9 1.7-.3 2.5-1.2 2.8-2.9Z" />
    </svg>
  );
}

export function WalletIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="M20 10h-4.5a2 2 0 0 0 0 4H20" />
    </svg>
  );
}

export function BankIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="m4 8.5 8-4.5 8 4.5v1.5H4V8.5ZM5.5 10v7M10 10v7M14 10v7M18.5 10v7M4 17h16v3H4v-3Z" />
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

export function SearchIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
      <circle cx="10.5" cy="10.5" r="6.2" />
      <path d="m19.8 19.8-4.9-4.9" />
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

export function LockIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
    </svg>
  );
}

export function WhatsAppIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M8.8 9.2c.3-.7 1-.8 1.4-.2l.6 1c.2.4 0 .8-.3 1l-.3.3c.5 1 1.4 1.9 2.4 2.4l.3-.3c.3-.3.7-.4 1-.2l1 .7c.6.4.4 1.1-.2 1.4-2.8 1.3-7.2-3.1-5.9-6.1Z" />
    </svg>
  );
}

export function InstagramIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
      <path d="M14.5 20.5v-6h2.6l.5-3.1h-3.1V9.2c0-1 .4-1.7 1.8-1.7h1.4V4.7c-.7-.1-1.6-.2-2.4-.2-2.5 0-4 1.5-4 4.2v2.7H8.5v3.1h2.8v6" />
    </svg>
  );
}

export function XSocialIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function CaituusMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={base(className)}>
      <rect width="32" height="32" rx="9" fill="currentColor" opacity="0.14" />
      <path
        d="M16 5.5c3 2.2 4.5 5 4.5 8.9 0 5.1-2.6 9-4.5 11-1.9-2-4.5-5.9-4.5-11 0-3.9 1.5-6.7 4.5-8.9Z"
        fill="currentColor"
      />
      <path d="M16 9v13.5" stroke="var(--color-moss-900)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 13.5c-1.6-.3-2.8-1.2-3.6-2.7M16 17c1.6-.3 2.8-1.2 3.6-2.7" stroke="var(--color-moss-900)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
