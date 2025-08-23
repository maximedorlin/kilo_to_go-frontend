"use client";
// import ErrorComponent from "@/components/dashboard/ErrorComponent";
import { useEffect } from "react";
import ErrorComponent from "@/components/dashboard/ErrorComponent";
import EquipmentForm from "../../form";
import {
  useGetEquipmentsWithFiltersQuery,
  useGetSingleEquipementQuery,
} from "@/store/apis/sanitary/equipement.api";
import { EquipementInterface } from "@/interfaces/sanitary/equipement.interface";
import React from "react";
import {
  convertToDjangoFilters,
  FilterCondition,
} from "@/components/SearchFilterComponent";
import { equipmentFieldConfig } from "../../field-search-config";

export interface Params {
  id: string;
}

const EditRequest = ({ params }: { params: Params }) => {
  const { data, error, refetch } = useGetSingleEquipementQuery(
    params.id as string,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const [filters] = React.useState<FilterCondition<EquipementInterface>[]>([]);
  const { refetch: refetchEq } = useGetEquipmentsWithFiltersQuery(
    `${Object.keys(convertToDjangoFilters(filters, equipmentFieldConfig)).map(
      (key) =>
        `${key}=${convertToDjangoFilters(filters, equipmentFieldConfig)[key]}&`
    )}`
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {data && (
        <EquipmentForm
          refetchObject={refetchEq}
          initial={data as EquipementInterface}
        />
      )}
      {error && <ErrorComponent error={error} />}
    </div>
  );
};

export default EditRequest;
