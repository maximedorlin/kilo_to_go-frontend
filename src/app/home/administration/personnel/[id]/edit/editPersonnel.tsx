"use client";

import ErrorComponent from "@/components/dashboard/ErrorComponent";
import { useEffect } from "react";

import { Personnel } from "@/interfaces/administrative.interface";

import PersonnelForm from "../../form";
import { useGetSinglePersonnelQuery } from "@/store/apis/administrative-personnel.api";

export interface Params {
  id: string;
}

const EditPersonnel = ({ params }: { params: Params }) => {
  const { data, error, refetch } = useGetSinglePersonnelQuery(params.id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {data && <PersonnelForm initial={data as unknown as Personnel} />}
      {error && <ErrorComponent error={error} />}
    </div>
  );
};

export default EditPersonnel;
