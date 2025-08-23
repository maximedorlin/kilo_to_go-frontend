"use client";
import { useGetSingleUserQuery } from "@/store/apis/auth/authentication.api";
import UserForm from "../../form";
import React, { useEffect } from "react";
import ErrorComponent from "@/components/dashboard/ErrorComponent";

export interface Params {
  id: string;
}

const EditContract = ({ params }: { params: Params }) => {
  const { data, error, refetch } = useGetSingleUserQuery(params.id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {data && <UserForm initial={data} />}
      {error && <ErrorComponent error={error} />}
    </div>
  );
};

export default EditContract;
