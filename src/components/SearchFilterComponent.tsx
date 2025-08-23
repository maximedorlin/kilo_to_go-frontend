/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Filter,
  Plus,
  Sliders,
  X,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";

export type FilterOperator =
  | "eq"
  | "neq"
  | "contains"
  | "notContains"
  | "startsWith"
  | "endsWith"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "eqNum"
  | "after"
  | "before"
  | "on"
  | "in"
  | "notIn";

export type FilterCondition<T> = {
  field: keyof T;
  operator: FilterOperator;
  value: any;
};

export type FieldConfig<T> = {
  type: "string" | "number" | "date" | "select" | "boolean";
  label: string;
  options?: { value: any; label: string }[];
};

export type GenericFilterProps<T> = {
  model: Partial<T>;
  filters: FilterCondition<T>[];
  onChange: (filters: FilterCondition<T>[]) => void;
  fieldConfig: Partial<Record<keyof T, FieldConfig<T>>>;
  className?: string;
};

export const operatorLabels: Record<FilterOperator, string> = {
  eq: "=",
  neq: "≠",
  contains: "contient",
  notContains: "ne contient pas",
  startsWith: "commence par",
  endsWith: "finit par",
  gt: ">",
  lt: "<",
  gte: "≥",
  lte: "≤",
  eqNum: "=",
  after: "après",
  before: "avant",
  on: "le",
  in: "dans",
  notIn: "pas dans",
};

const getOperatorsForType = (type: string): FilterOperator[] => {
  switch (type) {
    case "string":
      return ["eq", "neq", "contains", "notContains", "startsWith", "endsWith"];
    case "number":
      return ["eqNum", "gt", "lt", "gte", "lte"];
    case "date":
      return ["after", "before", "on"];
    case "select":
      return ["in", "notIn"];
    case "boolean":
      return ["eq"];
    default:
      return ["eq", "neq"];
  }
};

export function GenericFilter<T>({
  model,
  filters,
  onChange,
  fieldConfig = {},
  className,
}: GenericFilterProps<T>) {
  // const { t } = useTranslation();
  const [newFilterField, setNewFilterField] = React.useState<keyof T | "">("");
  const [newFilterOperator, setNewFilterOperator] = React.useState<
    FilterOperator | ""
  >("");
  const [newFilterValue, setNewFilterValue] = React.useState<any>("");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );

  const fields = Object.keys(model as object).filter(
    (f) => fieldConfig[f as keyof T] !== undefined
  ) as Array<keyof T>;

  const getFieldType = (field: keyof T): string => {
    return fieldConfig[field]?.type || "string";
  };
  const { t } = useTranslation();
  const [advancedFilters, setAdvancedFilters] = React.useState<boolean>(false);

  const addFilter = () => {
    if (!newFilterField || !newFilterOperator) return;

    const newFilter: FilterCondition<T> = {
      field: newFilterField,
      operator: newFilterOperator,
      value: newFilterValue,
    };

    onChange([...filters, newFilter]);
    resetForm();
  };

  const removeFilter = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    onChange(newFilters);
  };

  const resetForm = () => {
    setNewFilterField("");
    setNewFilterOperator("");
    setNewFilterValue("");
    setDateRange(undefined);
  };

  const renderValueInput = (field: keyof T, newFilterOperator: string) => {
    const fieldType = getFieldType(field);
    const config = fieldConfig[field];

    if (fieldType === "select" && config?.options) {
      return (
        <Select onValueChange={setNewFilterValue} value={newFilterValue}>
          <SelectTrigger className="min-w-[180px]">
            <SelectValue placeholder={t("select_value")} />
          </SelectTrigger>
          <SelectContent>
            {config.options.map((option) => (
              <SelectItem key={String(option.value)} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (fieldType === "date") {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "min-w-[240px] justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from
                ? dateRange.to
                  ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                      dateRange.to,
                      "dd/MM/yyyy"
                    )}`
                  : format(dateRange.from, "dd/MM/yyyy")
                : "Sélectionnez une date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range);
                setNewFilterValue(range);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    }

    if (fieldType === "number") {
      return (
        <Input
          type="number"
          value={newFilterValue}
          onChange={(e) => setNewFilterValue(Number(e.target.value))}
          className="w-[120px]"
          placeholder="Valeur"
        />
      );
    }

    if (fieldType === "boolean") {
      return (
        <Select onValueChange={setNewFilterValue} value={newFilterValue}>
          <SelectTrigger className="min-w-[120px]">
            <SelectValue placeholder="Sélectionnez" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">{t("yes")}</SelectItem>
            <SelectItem value="false">{t("no")}</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        value={newFilterValue}
        onChange={(e) => setNewFilterValue(e.target.value)}
        placeholder="Valeur"
        className="min-w-[180px]"
      />
    );
  };

  const formatFilterValue = (value: any) => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "object" && "from" in value) {
      return value.to
        ? `${format(value.from, "dd/MM/yyyy")} - ${format(
            value.to,
            "dd/MM/yyyy"
          )}`
        : format(value.from, "dd/MM/yyyy");
    }
    return String(value);
  };

  return (
    <div
      className={cn(`${advancedFilters ? "-translate-y-1" : ""}`, className)}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-3 cursor-pointer hover:bg-background p-2 border rounded-lg w-fit bg-white ${
          advancedFilters ? "translate-y-[1px] border-b-0 rounded-b-none" : ""
        }`}
        onClick={() => setAdvancedFilters((prev) => !prev)}
      >
        <Sliders className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">{t("advanced_filters")}</h3>
        {filters.length > 0 && (
          <Badge variant="secondary" className="px-2 py-1">
            {filters.length} {t("active")}
            {filters.length > 1 ? "s" : ""}
          </Badge>
        )}
      </div>
      <AnimatePresence>
        {advancedFilters && (
          <motion.div
            key="advanced-filters"
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "100%", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
            className="space-y-6 p-4 border rounded-lg bg-card rounded-tl-none"
          >
            {/* Active filters display */}
            {filters.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {t("filter_applied")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-2 py-1.5 px-3 bg-background hover:bg-gray-50/80 transition-colors"
                    >
                      <span className="font-medium text-sm">
                        {(fieldConfig[filter.field] &&
                          t(fieldConfig[filter.field]!.label)) ||
                          t(String(filter.field))}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {t(operatorLabels[filter.operator])}
                      </span>
                      <span className="text-sm">
                        {t(formatFilterValue(filter.value))}
                      </span>
                      <button
                        onClick={() => removeFilter(index)}
                        className="ml-1 rounded-full p-0.5 hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Filter form */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {t("Ajouter_un_nouveau_filtre")}
              </h4>
              <div className="flex flex-wrap items-end gap-4">
                {/* Field selection */}
                <div className="space-y-1 flex-1 min-w-[200px]">
                  <label className="block text-xs text-muted-foreground mb-1">
                    {t("Champ")}
                  </label>
                  <Select
                    value={String(newFilterField)}
                    onValueChange={(value) => {
                      setNewFilterField(value as keyof T);
                      setNewFilterOperator("");
                      setNewFilterValue("");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("select_field")} />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((field) => (
                        <SelectItem key={String(field)} value={String(field)}>
                          {fieldConfig[field]?.label || String(field)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Operator selection */}
                {newFilterField && (
                  <div className="space-y-1 min-w-[120px]">
                    <label className="block text-xs text-muted-foreground mb-1">
                      {t("operateur")}
                    </label>
                    <Select
                      value={newFilterOperator}
                      onValueChange={(value) =>
                        setNewFilterOperator(value as FilterOperator)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="operateur" />
                      </SelectTrigger>
                      <SelectContent>
                        {getOperatorsForType(getFieldType(newFilterField)).map(
                          (op) => (
                            <SelectItem key={op} value={op}>
                              {operatorLabels[op]}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Value input */}
                {newFilterField && newFilterOperator && (
                  <div className="space-y-1 flex-1 min-w-[200px]">
                    <label className="block text-xs text-muted-foreground mb-1">
                      {t("valeur")}
                    </label>
                    {renderValueInput(newFilterField, newFilterOperator)}
                  </div>
                )}

                {/* Add button */}
                <Button
                  onClick={addFilter}
                  disabled={!newFilterField || !newFilterOperator}
                  className="h-10 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {t("to_filter")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function convertToDjangoFilters<T>(
  filters: FilterCondition<T>[],
  fieldConfig: Partial<Record<keyof T, FieldConfig<T>>>
): Record<string, any> {
  const djangoFilters: Record<string, any> = {};

  filters.forEach((filter) => {
    const field = String(filter.field);
    const operator = filter.operator;
    const value = filter.value;
    const fieldType = fieldConfig[filter.field]?.type || "string";

    switch (operator) {
      case "eq":
        djangoFilters[field] = value;
        break;
      case "neq":
        djangoFilters[`${field}__ne`] = value;
        break;
      case "contains":
      case "notContains":
      case "startsWith":
      case "endsWith":
        djangoFilters[`${field}__${operator}`] = value;
        break;

      // Number operations
      case "eqNum":
        djangoFilters[field] = value;
        break;
      case "gt":
      case "lt":
      case "gte":
      case "lte":
        djangoFilters[`${field}__${operator}`] = value;
        break;

      // Date operations
      case "after":
        djangoFilters[`${field}__gt`] = formatDateForDjango(
          value?.from || value
        );
        break;
      case "before":
        djangoFilters[`${field}__lt`] = formatDateForDjango(
          value?.from || value
        );
        break;
      case "on":
        djangoFilters[`${field}`] = formatDateForDjango(value?.from || value);
        break;

      // Select operations
      case "in":
        djangoFilters[`${field}__in`] = Array.isArray(value) ? value : [value];
        break;
      case "notIn":
        djangoFilters[`${field}__in`] = Array.isArray(value) ? value : [value];
        djangoFilters[`${field}__in`] = { $not: djangoFilters[`${field}__in`] };
        break;

      // Boolean operations
      case "eq":
        if (fieldType === "boolean") {
          djangoFilters[field] = value === "true";
        }
        break;

      default:
        djangoFilters[field] = value;
    }
  });

  return djangoFilters;
}

function formatDateForDjango(date: Date | string): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // Format: YYYY-MM-DD
}
export function convertToCQLFilters<T>(
  filters: FilterCondition<T>[],
  fieldConfig: Partial<Record<keyof T, FieldConfig<T>>>
): string {
  const cqlExpressions: string[] = [];

  filters.forEach((filter) => {
    const field = String(filter.field);
    const operator = filter.operator;
    const value = filter.value;
    const fieldConfigItem = fieldConfig[filter.field];
    const fieldType = fieldConfigItem?.type || "string";

    // Gestion spéciale pour les valeurs null
    if (value === null || value === undefined) {
      if (operator === "eq" || operator === "on") {
        cqlExpressions.push(`${field} IS NULL`);
      } else if (operator === "neq") {
        cqlExpressions.push(`${field} IS NOT NULL`);
      }
      return;
    }

    switch (operator) {
      case "eq":
        if (fieldType === "string") {
          cqlExpressions.push(`${field}='${escapeCQLString(value)}'`);
        } else if (fieldType === "boolean") {
          cqlExpressions.push(`${field}=${value === true || value === "true"}`);
        } else if (fieldType === "date") {
          cqlExpressions.push(`${field}='${formatDateForCQL(value)}'`);
        } else {
          cqlExpressions.push(`${field}=${value}`);
        }
        break;
      case "neq":
        if (fieldType === "string") {
          cqlExpressions.push(`${field}<>'${escapeCQLString(value)}'`);
        } else if (fieldType === "date") {
          cqlExpressions.push(`${field}<>'${formatDateForCQL(value)}'`);
        } else {
          cqlExpressions.push(`${field}<>${value}`);
        }
        break;
      case "contains":
        cqlExpressions.push(
          `${field} LIKE '%${escapeCQLString(value, true)}%'`
        );
        break;
      case "notContains":
        cqlExpressions.push(
          `${field} NOT LIKE '%${escapeCQLString(value, true)}%'`
        );
        break;
      case "startsWith":
        cqlExpressions.push(`${field} LIKE '${escapeCQLString(value, true)}%'`);
        break;
      case "endsWith":
        cqlExpressions.push(`${field} LIKE '%${escapeCQLString(value, true)}'`);
        break;

      // Number operations
      case "eqNum":
        cqlExpressions.push(`${field}=${value}`);
        break;
      case "gt":
        cqlExpressions.push(`${field}>${value}`);
        break;
      case "lt":
        cqlExpressions.push(`${field}<${value}`);
        break;
      case "gte":
        cqlExpressions.push(`${field}>=${value}`);
        break;
      case "lte":
        cqlExpressions.push(`${field}<=${value}`);
        break;

      // Date operations
      case "after":
        cqlExpressions.push(
          `${field}>'${formatDateForCQL(value?.from || value)}'`
        );
        break;
      case "before":
        cqlExpressions.push(
          `${field}<'${formatDateForCQL(value?.from || value)}'`
        );
        break;
      case "on":
        // Pour les dates égales, on utilise une plage d'une journée par défaut
        // car les comparaisons exactes de dates avec timezone peuvent être problématiques
        const dateValue = value?.from || value;
        const date = new Date(dateValue);

        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date value: ${dateValue}`);
        }

        // Créer une date pour le jour suivant
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);

        cqlExpressions.push(
          `${field}>='${formatDateForCQL(
            date
          )}' AND ${field}<'${formatDateForCQL(nextDay)}'`
        );
        break;

      case "in":
        const inValues = Array.isArray(value) ? value : [value];
        if (["string", "date", "select"].includes(fieldType)) {
          cqlExpressions.push(
            `${field} IN (${inValues
              .map((v) => `'${escapeCQLString(v)}'`)
              .join(",")})`
          );
        } else {
          cqlExpressions.push(`${field} IN (${inValues.join(",")})`);
        }
        break;
      case "notIn":
        const notInValues = Array.isArray(value) ? value : [value];
        if (["string", "date", "select"].includes(fieldType)) {
          cqlExpressions.push(
            `${field} NOT IN (${notInValues
              .map((v) => `'${escapeCQLString(v)}'`)
              .join(",")})`
          );
        } else {
          cqlExpressions.push(`${field} NOT IN (${notInValues.join(",")})`);
        }
        break;

      default:
        cqlExpressions.push(`${field}='${escapeCQLString(value)}'`);
    }
  });

  return cqlExpressions.join(" AND ");
}

function escapeCQLString(value: any, forLike = false): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value !== "string") return String(value);

  let escaped = value.replace(/'/g, "''");

  if (forLike) {
    // Échappe les caractères spéciaux du LIKE
    escaped = escaped
      .replace(/\\/g, "\\\\") // backslash
      .replace(/%/g, "\\%") // wildcard %
      .replace(/_/g, "\\_"); // wildcard _
  }

  return escaped;
}

function formatDateForCQL(date: any): string {
  if (!date) return "NULL";

  let dateObj: Date;
  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === "string") {
    dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new Error(`Invalid date string: ${date}`);
    }
  } else if (typeof date === "number") {
    dateObj = new Date(date);
  } else {
    throw new Error(`Unsupported date format: ${date}`);
  }

  return dateObj.toISOString();
}
