"use client";
import Loading from "@/app/web/loading";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
const DefaultHome: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    router.push(`${pathname}/accounts`);
  }, [pathname, router]);
  return <Loading />;
};

export default DefaultHome;
