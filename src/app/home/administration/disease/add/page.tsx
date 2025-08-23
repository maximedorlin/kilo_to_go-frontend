"use client";
import React from "react";
import DiseaseForm from "../form";
import { useGetDiseaseQuery } from "@/store/apis/administrative-deases.api";
import { useAppSelector } from "@/hooks/redux-toolkit";
// import UrlGuard from "@/lib/UrlGuard";

const AddDisease = () => {
  const observationsheetTable = useAppSelector(
    (state) => state.AllTableSlice["observationsheetTable"]
  );

  const { refetch } = useGetDiseaseQuery({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
    sorting: observationsheetTable.sorting,
  });
  return (
    <div>
      <DiseaseForm refetchObject={refetch} />
    </div>
  );
};

const BasePage = () => {
  return (
    // <UrlGuard permission="change_disease">
      <AddDisease />
    // </UrlGuard>
  );
};

export default BasePage;
