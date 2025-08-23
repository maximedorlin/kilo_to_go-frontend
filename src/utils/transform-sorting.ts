import { Filter, Sort } from "@/interfaces/base.interface";

export function buildOrderingParam(sorting: Sort[]): string | undefined {
  if (!sorting || sorting.length === 0) return undefined;
  return sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",");
}

export function buildFilterParams(filters: Filter[]): Record<string, string> {
  const params: Record<string, string> = {};
  if (!filters || filters.length === 0) return params;

  filters.forEach((f) => {
    if (f.value !== undefined && f.value !== null && f.value !== "") {
      params[f.id] = String(f.value);
    }
  });

  return params;
}
