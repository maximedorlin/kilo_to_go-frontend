/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ServerDataTable } from "@/components/tasks/components/server-data-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table,
} from "@tanstack/react-table";
import { usePathname } from "next/navigation";
import { UsersColumns } from "@/components/tables/administration/user-columns";
// import UsersStatisticsTab from "./userStatisticsTab";
import ErrorComponent from "@/components/dashboard/ErrorComponent";
import TableActions from "@/components/TableActions";
import { toast } from "react-hot-toast";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/store/apis/auth/authentication.api";
import { setTablePaginationState } from "@/store/slices/tables-pagiations-slices/all-table-slices";
import { UserInterface } from "@/interfaces/auth/authinterfaces";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { useGetGroupsQuery } from "@/store/apis/auth/groups.api";
// import UrlGuard from "@/lib/UrlGuard";
import PermissionGuard from "@/lib/PermissionGuard";

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { data: groupData } = useGetGroupsQuery();

  const observationsheetTable = useAppSelector(
    (state) => state.AllTableSlice["observationsheetTable"]
  );

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
  });

  const ref = useRef<Table<UserInterface>>(null);
  const [rowSelected, setRowSelected] = useState<string[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, refetch, isFetching, error } = useGetUsersQuery({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
  });

  useEffect(() => {
    dispatch(
      setTablePaginationState({
        key: "observationsheetTable",
        realPayload: {
          filters: columnFilters,
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sorting,
        },
      })
    );
  }, [sorting, columnFilters, pagination, dispatch]);

  const [deleteUser, { isLoading: isLoadingSingleDelete }] =
    useDeleteUserMutation();

  const handleSingleDelete = async () => {
    try {
      await deleteUser(rowSelected[0]).unwrap();
      toast.success(t("user_deleted_successfully"));
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
          <span className="text-xl my-2">{t("users_list")}</span>
          <PermissionGuard permission="add_user">
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
                {t("users_list")}
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
              <span className="font-semibold">{t("users_list")}</span>
              {data && (
                <div>
                  <ServerDataTable
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
                        changePermission="change_user"
                        deletePermission="delete_user"
                      />,
                    ]}
                    pageIndex={pagination.pageIndex}
                    pageSize={pagination.pageSize}
                    pageCount={0}
                    onPaginationChange={setPagination}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    columnFilters={columnFilters}
                    onColumnFiltersChange={setColumnFilters}
                    columns={UsersColumns(groupData)}
                    data={data.results}
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
              {data && <UsersStatisticsTab users={data.results} />}
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const BasePage = () => {
  return (
    // <UrlGuard permission="view_user">
      <Users />
    // </UrlGuard>
  );
};

export default BasePage;
