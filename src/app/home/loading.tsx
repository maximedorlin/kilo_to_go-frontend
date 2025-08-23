// app/loading.tsx
import React from "react";
import CustumSkeleton from "@/components/CustumSkeleton";

const Loading = () => {
  return (
    <div className="p-10 space-y-20 animate-pulse">
      <CustumSkeleton />
    </div>
  );
};

export default Loading;
