"use client";
// import ErrorComponent from "@/components/dashboard/ErrorComponent";
import { useEffect } from "react";
import ErrorComponent from "@/components/dashboard/ErrorComponent";
import ConsumableForm from "../../form";
import {
  useGetConsumableWithFiltersQuery,
  useGetSingleConsumablesQuery,
} from "@/store/apis/sanitary/consumables.api";
import {
  convertToDjangoFilters,
  FilterCondition,
} from "@/components/SearchFilterComponent";
import { consumableFieldConfig } from "../../field-search-config";
import React from "react";
import { ConsumablesInterface } from "@/interfaces/sanitary/consumables.interface";

export interface Params {
  id: string;
}

const EditConsumable = ({ params }: { params: Params }) => {
  const [filters] = React.useState<FilterCondition<ConsumablesInterface>[]>([]);
  const { data, error, refetch } = useGetSingleConsumablesQuery(
    params.id as string,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const { refetch: refetchConsumables } = useGetConsumableWithFiltersQuery(
    `${Object.keys(convertToDjangoFilters(filters, consumableFieldConfig)).map(
      (key) =>
        `${key}=${convertToDjangoFilters(filters, consumableFieldConfig)[key]}&`
    )}`
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {data && (
        <ConsumableForm refetchObject={refetchConsumables} initial={data} />
      )}
      {error && <ErrorComponent error={error} />}
    </div>
  );
};

export default EditConsumable;
