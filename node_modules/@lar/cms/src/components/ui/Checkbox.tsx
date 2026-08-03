import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <label className={cn("flex items-start gap-3 cursor-pointer group", className)}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="checkbox"
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <div className="h-5 w-5 rounded-md border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 transition-all peer-checked:border-secondary-500 peer-checked:bg-secondary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-secondary-500 peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"></div>
          <Check className="absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{label}</span>}
            {description && <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
