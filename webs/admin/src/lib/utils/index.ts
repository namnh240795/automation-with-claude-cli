import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for efficient className combining.
 * Used by shadcn-svelte components.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}