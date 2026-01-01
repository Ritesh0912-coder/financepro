import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'primary';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        const variants = {
            default: 'bg-slate-700 text-slate-200',
            success: 'bg-green-500/20 text-green-400 border border-green-500/30',
            warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
            danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
            info: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
            primary: 'bg-primary-muted text-primary border border-primary-glow',
            outline: 'border border-slate-600 text-slate-300',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Badge.displayName = 'Badge';

export { Badge };
