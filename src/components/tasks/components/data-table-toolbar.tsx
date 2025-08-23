"use client"
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "../components/data-table-view-options";

import { Button } from "@/components/ui/button";
import { DeleteIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import React, { ReactNode } from "react";



interface OptionStatutFilter {
  label: string;
  value: string
  icon: React.ComponentType<{ className?: string }> | ReactNode;
}

export interface StatutFilter {
  column: string
  title: string
  options: OptionStatutFilter[]
}


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  state_filters?: StatutFilter[]
}

export function DataTableToolbar<TData>({
  table,
  state_filters
}: DataTableToolbarProps<TData>) {
  // Vérifie si un filtre est actif
  const isFiltered = table.getState().columnFilters.length > 0;
  // Fonction de filtrage global
  // const handleGlobalFilter = (value: string) => {
  //   table.setGlobalFilter(value); // Applique un filtre global à toutes les colonnes
  // };
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        {/* Filtre global */}
        {/* <Input
          placeholder={t("search")}
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => handleGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        {
          state_filters &&
          <>
            {
              state_filters.map((state_filter, index) => (
                <React.Fragment key={index}>
                  {table.getColumn(state_filter.column) && (
                    <DataTableFacetedFilter
                      column={table.getColumn(state_filter.column)}
                      title={state_filter.title}
                      options={state_filter.options}
                    />
                  )}
                </React.Fragment>
              ))
            }
          </>
        }

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetGlobalFilter()}
            className="h-8 px-2 lg:px-3"
          >
            {t('reset')}
            <DeleteIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>




      <DataTableViewOptions table={table} />
    </div>
  );
}
