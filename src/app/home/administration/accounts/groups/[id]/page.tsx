"use client";
import React, { JSX, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, usePathname } from "next/navigation";
import { ArrowLeft, Edit, FileText, Loader, Zap } from "lucide-react";
import ErrorComponent from "@/components/dashboard/ErrorComponent";
import { motion } from "motion/react";
import { DetailItem } from "@/components/infor-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GroupInterface } from "@/interfaces/auth/authinterfaces";
import Link from "next/link";
import { useGetSingleGroupQuery } from "@/store/apis/auth/groups.api";
// import UrlGuard from "@/lib/UrlGuard";
import PermissionGuard from "@/lib/PermissionGuard";
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

const GroupDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const pathname = usePathname();
  const navigateBack = useNavigateBack(1);
  const {
    data: contract,
    isFetching,
    error,
  } = useGetSingleGroupQuery(id as string, {
    refetchOnMountOrArgChange: true,
  });

  const properties: GroupInterface = useMemo(
    () => (contract || {}) as GroupInterface,
    [contract]
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
                    {t("group_details")}{" "}
                    <span className="text-primary">#{properties.id}</span>
                  </h1>
                </div>
                <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
                  <PermissionGuard permission="change_group">
                    <Link
                      href={`${pathname}/edit`}
                      className="flex gap-2 items-center"
                    >
                      <Button className="flex-1 sm:flex-none gap-2 bg-primary hover:bg-primary/90">
                        <Edit className="h-4 w-4" />
                        <span className="font-medium">{t("edit")}</span>
                      </Button>
                    </Link>
                  </PermissionGuard>
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

              <div className="grid grid-cols-1 gap-6 pb-6">
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
                        value={t(properties.name)}
                        icon={Zap}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              <div className="text-center text-2xl font-bold">
                <span>{t("permissions")}</span>
                <hr className="my-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                {properties.permissions &&
                  (() => {
                    const groupsMap: Record<
                      string,
                      typeof properties.permissions
                    > = {};

                    // Group permissions by suffix
                    properties.permissions.forEach((permission) => {
                      const parts = permission.codename.split("_");
                      const suffix = parts.slice(1).join("_");
                      if (!groupsMap[suffix]) {
                        groupsMap[suffix] = [];
                      }
                      groupsMap[suffix].push(permission);
                    });

                    // Create JSX blocks for each group
                    const groups: JSX.Element[] = Object.entries(groupsMap).map(
                      ([suffix, groupPermissions], index) => (
                        <div
                          key={`group-${suffix}-${index}`}
                          className="mb-6 overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md"
                        >
                          {/* Group Header */}
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 dark:from-gray-800 dark:to-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                              {t(suffix.replaceAll("_", " "))}
                            </h3>
                          </div>

                          {/* Permissions List */}
                          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
                            {groupPermissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-center rounded-md border border-gray-100 bg-white p-4 shadow-xs transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                              >
                                <span className="text-md font-medium text-gray-700 break-all hyphens-auto">
                                  {t(permission.codename)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    );

                    return groups;
                  })()}
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
    // <UrlGuard permission="view_group">
      <GroupDetails />
    //* </UrlGuard> */}
  );
};

export default BasePage;
