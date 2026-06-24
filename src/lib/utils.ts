import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';

export function assetUrl(path: string): string {
  return `${basePath}${path}`;
}
