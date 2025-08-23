"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "@tanstack/react-table";
import { usePathname } from "next/navigation";
import ErrorComponent from "@/components/dashboard/ErrorComponent";
import TableActions from "@/components/TableActions";
import { toast } from "react-hot-toast";
import {
  useDeleteGroupMutation,
  useGetGroupsQuery,
} from "@/store/apis/auth/groups.api";
import { GroupInterface } from "@/interfaces/auth/authinterfaces";
import { DataTable } from "@/components/tasks/components/data-table";
import { GroupsColumns } from "@/components/tables/administration/groups-columns";
import PermissionGuard from "@/lib/PermissionGuard";
// import UrlGuard from "@/lib/UrlGuard";

const Groups = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const ref = useRef<Table<GroupInterface>>(null);
  const [rowSelected, setRowSelected] = useState<string[]>([]);

  const { data, refetch, isFetching, error } = useGetGroupsQuery();

  const [deleteGroup, { isLoading: isLoadingSingleDelete }] =
    useDeleteGroupMutation();

  const handleSingleDelete = async () => {
    try {
      await deleteGroup(rowSelected[0]).unwrap();
      toast.success(t("group_deleted_successfully"));
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-195px)] gap-4 pb-1.5">
      <div
        className={`w-full h-full bg-white p-5 pt-4 overflow-hidden rounded-md shadow-lg  overflow-y-auto`}
      >
        <div className="flex w-full justify-between items-center">
          <span className="text-xl my-2">{t("groups_list")}</span>
          <PermissionGuard permission="add_group">
            <Link href={`${pathname}/add`}>
              <Button variant={"default"}>
                {t("add")} <PlusCircle />
              </Button>
            </Link>
          </PermissionGuard>
        </div>
        <hr className="my-1" />
        <div>
          <Tabs defaultValue="list" className="mt-3 w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-white gap-4">
              <TabsTrigger
                value="list"
                className="bg-background text-slate-500 data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl"
              >
                {t("groups_list")}
              </TabsTrigger>
              {/* <TabsTrigger
                value="statistics"
                className="bg-background data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl"
              >
                {t("statistics")}
              </TabsTrigger> */}
            </TabsList>
            <hr className="mt-4" />

            <TabsContent value="list">
              <span className="font-semibold">{t("groups_list")}</span>
              {data && (
                <div>
                  <DataTable
                    ref={ref}
                    onSelectActions={[
                      <TableActions
                        key={"action-button"}
                        rowSelected={rowSelected}
                        actionsClicked={() => {
                          const selectedIds = Object.values(
                            ref.current?.getSelectedRowModel().rowsById ?? {}
                          ).map((row) => row.original.id);
                          setRowSelected(selectedIds);
                          console.log("Selected IDs:", selectedIds);
                        }}
                        singleDelete={{
                          isLoading: isLoadingSingleDelete,
                          handleDelete: handleSingleDelete,
                        }}
                        changePermission="change_group"
                        deletePermission="delete_group"
                      />,
                    ]}
                    columns={GroupsColumns}
                    data={data}
                  />
                </div>
              )}
              {error && (
                <>
                  <ErrorComponent error={error} />
                </>
              )}
            </TabsContent>

            {/* <TabsContent value="statistics">
              {data && <GroupsStatisticsTab users={data.results} />}
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const BasePage = () => {
  return (
    // <UrlGuard permission="view_group">
      <Groups />
    // </UrlGuard> 
  );
};

export default BasePage;
