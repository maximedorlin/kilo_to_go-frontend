"use client";

import ErrorComponent from "@/components/dashboard/ErrorComponent";

import { useEffect } from "react";
import DiseaseForm from "../../form";
import { Disease } from "@/interfaces/administrative.interface";
import { useGetSingleDiseaseQuery } from "@/store/apis/administrative-deases.api";

export interface Params {
  id: string;
}

const EditDisease = ({ params }: { params: Params }) => {
  const { data, error, refetch } = useGetSingleDiseaseQuery(params.id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {data && <DiseaseForm initial={data as unknown as Disease} />}
      {error && <ErrorComponent error={error} />}
    </div>
  );
};

export default EditDisease;
