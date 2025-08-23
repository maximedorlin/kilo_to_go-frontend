import React from "react";
import EditContract, { Params } from "./editUser";
// import UrlGuard from "@/lib/UrlGuard";

const BasePage = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  return (
    // <UrlGuard permission="change_user">
      <EditContract params={resolvedParams} />
    // </UrlGuard>
  );
};

export default BasePage;
