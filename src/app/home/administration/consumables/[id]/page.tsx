"use client";

import { DetailItem } from "@/components/infor-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/dateFormat";
import { Calendar, Compass, Edit, FileText, Zap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { useGetSingleConsumablesQuery } from "@/store/apis/sanitary/consumables.api";
// import UrlGuard from "@/lib/UrlGuard";
// import PermissionGuard from "@/lib/PermissionGuard";

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

const ConsumablesDetails = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const pathname = usePathname();
  const { data: consumable } = useGetSingleConsumablesQuery(id as string, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="flex h-[calc(100vh-195px)] pb-0"
    >
      <div className="w-full h-full bg-white/95 backdrop-blur-sm px-6 pb-6 rounded-xl border border-gray-200/50 shadow-xs overflow-y-auto">
        <div className="max-w-screen-xl mx-auto space-y-6">
          {consumable && (
            <>
              {/* Header */}
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10 pt-2 pb-4"
              >
                <div className="flex flex-col justify-between items-start gap-1 pt-6">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
                    {t("consumable_details")}{" "}
                    <span className="text-primary">
                      #{consumable.id.slice(0, 8)}
                    </span>
                  </h1>
                  <Badge className="h-full">{consumable.consumable_name}</Badge>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  {/* <PermissionGuard permission="change_consumable"> */}
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
                </div>
              </motion.div>

              <Separator className="my-4 bg-gray-100" />

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
                        label={t("name")}
                        value={consumable.consumable_name}
                        icon={Zap}
                      />

                      <DetailItem
                        label={t("sig_type")}
                        value={t(consumable.consumable_type)}
                        icon={Compass}
                      />
                      <DetailItem
                        label={t("quantity")}
                        value={consumable.consumable_quantity}
                        icon={Compass}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Dates */}
                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        {t("dates")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <DetailItem
                        label={t("creation_date")}
                        value={formatDate(consumable.created_at, i18n.language)}
                      />
                      <DetailItem
                        label={t("update_date")}
                        value={formatDate(consumable.updated_at, i18n.language)}
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
    // <UrlGuard permission="view_consumable">
      <ConsumablesDetails />
    // </UrlGuard>
  );
};

export default BasePage;
