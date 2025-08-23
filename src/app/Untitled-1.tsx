// import PermissionGuard from "@/lib/PermissionGuard";
// import UrlGuard from "@/lib/UrlGuard";
import React from "react";

const Untitled = () => {
  return (
    <div>
      {/* <UrlGuard permission="add_streetlamp"> */}
        <></>
      {/* </UrlGuard> */}
      {/* <PermissionGuard permission="add_streetlamp"> */}
        <></>
      {/* </PermissionGuard> */}
    </div>
  );
};

const BasePage = () => {
  return (
    // <UrlGuard permission="view_user">
      <Untitled />
    // </UrlGuard>
  );
};

export default BasePage;
{
  /* 
  Module collecte des dechets / Mettre les permissions sur les pages et boutons
  */
}
