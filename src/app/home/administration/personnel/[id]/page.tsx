"use client";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, usePathname } from "next/navigation";
import {
  ArrowLeft,
  Compass,
  Edit,
  FileText,
  Link,
  Loader,
  Zap,
} from "lucide-react";
import ErrorComponent from "@/components/dashboard/ErrorComponent";
import { motion } from "motion/react";
import { DetailItem } from "@/components/infor-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Personnel } from "@/interfaces/administrative.interface";

import { useGetSinglePersonnelQuery } from "@/store/apis/administrative-personnel.api";
// import UrlGuard from "@/lib/UrlGuard";
// import PermissionGuard from "@/lib/PermissionGuard";
import { useNavigateBack } from "@/lib/navigate-back";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const PersonnelDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const pathname = usePathname();
  const navigateBack = useNavigateBack(1);

  const {
    data: personnel,
    isFetching,
    error,
  } = useGetSinglePersonnelQuery(id as string, {
    refetchOnMountOrArgChange: true,
  });

  const properties: Personnel = useMemo(
    () => (personnel || {}) as Personnel,
    [personnel]
  );

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="flex h-[calc(100vh-195px)] pb-0"
    >
      <div className="w-full h-full bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 shadow-xs overflow-y-auto">
        <div className="max-w-screen-xl mx-auto space-y-6">
          {properties && (
            <>
              {/* Header */}
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10 pt-2 pb-4"
              >
                <div className="flex flex-col justify-between items-start gap-1">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
                    {t("Personnel_details")}{" "}
                    {/* <span className="text-primary">
                      #{properties.id.slice(0, 8)}
                    </span> */}
                  </h1>
                </div>
                <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
                  {/* <PermissionGuard permission="change_personnel"> */}
                    <Link
                      href={`${pathname}/edit`}
                      className="flex gap-2 items-center"
                    >
                      <Button className="flex-1 sm:flex-none gap-2 bg-primary hover:bg-primary/90">
                        <Edit className="h-4 w-4" />
                        <span className="font-medium">{t("edit")}</span>
                      </Button>
                    </Link>
                  {/* </PermissionGuard> */}
                  <Button
                    className="flex-1"
                    variant={"outline"}
                    onClick={() => {
                      navigateBack(1);
                    }}
                  >
                    <ArrowLeft /> {t("back")}
                  </Button>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
                <motion.div
                  variants={fadeIn}
                  className="lg:col-span-2 space-y-6"
                >
                  {/* Basic Info */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span>{t("road_sign_information")}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <DetailItem
                        label={t("personnel_description")}
                        value={t(properties.personnel_description)}
                        icon={Zap}
                      />
                      <DetailItem
                        label={t("personnel_type")}
                        value={t(properties.personnel_type)}
                        icon={Compass}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
};

const BasePage = () => {
  return (
    // <UrlGuard permission="view_personnel">
      <PersonnelDetails />
    // </UrlGuard>
  );
};

export default BasePage;
