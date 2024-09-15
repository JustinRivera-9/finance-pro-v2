import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fixedDateArray = () => {
  const arr = [];
  for (let i = 1; i < 32; i++) {
    arr.push(i);
  }

  return arr;
};
