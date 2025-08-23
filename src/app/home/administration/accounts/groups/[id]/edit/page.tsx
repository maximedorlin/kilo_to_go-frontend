import React from "react";
import EditGroup, { Params } from "./editGroup";
// import UrlGuard from "@/lib/UrlGuard";

const BasePage = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  return (
    // <UrlGuard requiredPermission="">
    <EditGroup params={resolvedParams} />
    // </UrlGuard>
  );
};

export default BasePage;
