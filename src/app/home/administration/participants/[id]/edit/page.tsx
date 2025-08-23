import React from "react";
import EditParticipant, { Params } from "./editParticipant";
// import UrlGuard from "@/lib/UrlGuard";

const BasePage = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  return (
    // <UrlGuard permission="change_participant">
      <EditParticipant params={resolvedParams} />
    // </UrlGuard>
  );
};

export default BasePage;
