"use client";

import React from "react";
import EquipmentForm from "../form";
import { EquipementInterface } from "@/interfaces/sanitary/equipement.interface";
import {
  convertToDjangoFilters,
  FilterCondition,
} from "@/components/SearchFilterComponent";
import { useGetEquipmentsWithFiltersQuery } from "@/store/apis/sanitary/equipement.api";
import { equipmentFieldConfig } from "../field-search-config";
// import UrlGuard from "@/lib/UrlGuard";

const AddEquipment = () => {
  const [filters] = React.useState<FilterCondition<EquipementInterface>[]>([]);
  const { refetch } = useGetEquipmentsWithFiltersQuery(
    `${Object.keys(convertToDjangoFilters(filters, equipmentFieldConfig)).map(
      (key) =>
        `${key}=${convertToDjangoFilters(filters, equipmentFieldConfig)[key]}&`
    )}`
  );
  return (
    <div>
      <EquipmentForm refetchObject={refetch} />
    </div>
  );
};

const BasePage = () => {
  return (
    // <UrlGuard permission="add_equipment">
      <AddEquipment />
    // </UrlGuard>
  );
};

export default BasePage;
