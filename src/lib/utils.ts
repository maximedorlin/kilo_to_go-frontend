import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculatePercentage(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

type GroupedTable<T> = {
    [key: string]: T[]
  }
export function groupBy<T>(items: T[], key: keyof T): GroupedTable<T> {
  return items.reduce((result, item) => {
    const groupKey = String(item[key]);
    if(!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as GroupedTable<T>);
}