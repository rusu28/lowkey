import { Link } from "react-router";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  return (
    <Link to="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <img src="/icon/icon.png" alt="LowkeyAIC logo" className={`${iconSizes[size]} rounded-md object-cover`} />
      <span className={`${textSizes[size]} font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors`}>
        LowkeyAIC
      </span>
    </Link>
  );
}
