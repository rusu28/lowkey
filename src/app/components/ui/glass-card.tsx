import { HTMLAttributes, forwardRef } from 'react';
import { cn } from './utils';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong';
  hover?: boolean;
  glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = false, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border',
          variant === 'default' ? 'glass' : 'glass-strong',
          hover && 'hover-lift cursor-pointer',
          glow && 'shadow-glow',
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
