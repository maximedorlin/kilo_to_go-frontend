"use client";

import React from "react";
import MaterialForm from "../form";
import {
  convertToDjangoFilters,
  FilterCondition,
} from "@/components/SearchFilterComponent";
import { ConsumablesInterface } from "@/interfaces/sanitary/consumables.interface";
import { useGetConsumableWithFiltersQuery } from "@/store/apis/sanitary/consumables.api";
import { consumableFieldConfig } from "../field-search-config";
// import UrlGuard from "@/lib/UrlGuard";

const AddConsumable = () => {
  const [filters] = React.useState<FilterCondition<ConsumablesInterface>[]>([]);

  const { refetch } = useGetConsumableWithFiltersQuery(
    `${Object.keys(convertToDjangoFilters(filters, consumableFieldConfig)).map(
      (key) =>
        `${key}=${convertToDjangoFilters(filters, consumableFieldConfig)[key]}&`
    )}`
  );
  return (
    <div>
      <MaterialForm refetchObject={refetch} />
    </div>
  );
};

const BasePage = () => {
  return (
    // <UrlGuard permission="add_consumable">
      <AddConsumable />
    // </UrlGuard>
  );
};

export default BasePage;
