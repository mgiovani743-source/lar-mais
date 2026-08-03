import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { MoreVertical } from 'lucide-react';

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block text-left">{children}</div>;
}

export function DropdownMenuTrigger({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <div onClick={onClick} className="cursor-pointer inline-flex">{children}</div>;
}

export function DropdownMenuContent({ 
  children, 
  isOpen, 
  onClose,
  align = 'right'
}: { 
  children: React.ReactNode; 
  isOpen: boolean; 
  onClose: () => void;
  align?: 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 w-48 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 shadow-medium animate-in fade-in zoom-in-95 duration-200",
        align === 'right' ? 'right-0' : 'left-0'
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ 
  children, 
  onClick, 
  className,
  destructive
}: { 
  children: React.ReactNode; 
  onClick: () => void;
  className?: string;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800",
        destructive ? "text-red-600 dark:text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" : "text-neutral-700 dark:text-neutral-200",
        className
      )}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator() {
  return <div className="h-px my-1 bg-neutral-200 dark:bg-neutral-800" />;
}
