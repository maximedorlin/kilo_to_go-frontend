import React from "react";
import EditPersonnel, { Params } from "./editPersonnel";
// import UrlGuard from "@/lib/UrlGuard";

const BasePage = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  return (
    // <UrlGuard permission="change_personnel">
      <EditPersonnel params={resolvedParams} />
    // </UrlGuard>
  );
};

export default BasePage;
