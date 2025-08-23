"use client";

import ErrorComponent from "@/components/dashboard/ErrorComponent";
import { useEffect } from "react";
import ParticipantsForm from "../../form";
import { ParticipantsInterface } from "@/interfaces/administrative.interface";
import { useGetSingleParticipantsQuery } from "@/store/apis/participants.api";

export interface Params {
  id: string;
}

const EditParticipant = ({ params }: { params: Params }) => {
  const { data, error, refetch } = useGetSingleParticipantsQuery(params.id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {data && (
        <ParticipantsForm initial={data as unknown as ParticipantsInterface} />
      )}
      {error && <ErrorComponent error={error} />}
    </div>
  );
};

export default EditParticipant;
