"use client"
import Footer from "@/components/web/Footer";
import NavigationBar from "@/components/web/NavigationBar";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className="bg-white scroll-smooth">
      <NavigationBar/>
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
