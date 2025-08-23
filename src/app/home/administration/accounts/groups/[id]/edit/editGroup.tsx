"use client";
import GroupForm from "../../form";
import React, { useEffect } from "react";
import ErrorComponent from "@/components/dashboard/ErrorComponent";
import { useGetSingleGroupQuery } from "@/store/apis/auth/groups.api";

export interface Params {
  id: string;
}

const EditGroup = ({ params }: { params: Params }) => {
  const { data, error, refetch } = useGetSingleGroupQuery(params.id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {data && <GroupForm initial={data} />}
      {error && <ErrorComponent error={error} />}
      {/* {error && <ErrorComponent error={error} />} */}
    </div>
  );
};

export default EditGroup;
