import React from "react";
import EditDisease, { Params } from "./editDisease";
// import UrlGuard from "@/lib/UrlGuard";

const BasePage = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  return (
    // <UrlGuard permission="change_disease">
      <EditDisease params={resolvedParams} />
    // </UrlGuard>
  );
};

export default BasePage;
