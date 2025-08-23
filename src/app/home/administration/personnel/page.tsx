"use client";
import { ServerDataTable } from "@/components/tasks/components/server-data-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
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

import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { setTablePaginationState } from "@/store/slices/tables-pagiations-slices/all-table-slices";

import TableActions from "@/components/TableActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/loading-btn";
import toast from "react-hot-toast";
import { transformError } from "@/utils/transform-errors";
import {
  useDeleteMultiplePersonnelMutation,
  useDeletePersonnelMutation,
  useGetPersonnelQuery,
} from "@/store/apis/administrative-personnel.api";
import { Personnel } from "@/interfaces/administrative.interface";
import { PersonnelColumns } from "@/components/tables/administration/personnal-columns";
// import UrlGuard from "@/lib/UrlGuard";
// import PermissionGuard from "@/lib/PermissionGuard";

// import { convertToDjangoFilters } from "@/components/SearchFilterComponent";

const PersonnelPage = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const observationsheetTable = useAppSelector(
    (state) => state.AllTableSlice["observationsheetTable"]
  );

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
  });

  const [sorting, setSorting] = React.useState<SortingState>(
    observationsheetTable.sorting
  );

  const [deleteBulk, { isLoading: isLoadingDeleteBulk }] =
    useDeleteMultiplePersonnelMutation();

  const [DelOpen, setDelOpen] = useState(false);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const ref = useRef<Table<Personnel>>(null);
  const [rowSelected, setRowSelected] = useState<string[]>([]);

  const { data, refetch } = useGetPersonnelQuery({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
    sorting: observationsheetTable.sorting,
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

  const [deletepersonnel, { isLoading: isLoadingSingleDelete }] =
    useDeletePersonnelMutation();

  const handleSingleDelete = async () => {
    try {
      await deletepersonnel(rowSelected[0]).unwrap();
      toast.success(t("personnel_deleted_successfully"));
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBulk = async () => {
    try {
      await toast.promise(deleteBulk(rowSelected).unwrap(), {
        loading: t("Suppression_en_cours"),
        success: t("Elements_supprimes_avec_succes"),
        error: (err: any) => transformError(err),
      });
      refetch();
      setDelOpen(false);
    } catch (error) {
      console.error("Delete bulk error:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-195px)] pb-1">
      <div className="bg-white h-full shadow-md rounded-md p-5 overflow-hidden">
        <div className="flex w-full justify-between items-center">
          <span className="text-xl my-2">{t("personnel_list")}</span>
          {/* <PermissionGuard permission="add_personnel"> */}
            <Link href={`${pathname}/add`}>
              <Button variant={"default"}>
                {t("add")} <PlusCircle />
              </Button>
            </Link>
          {/* </PermissionGuard> */}
        </div>
        <hr className="my-1" />
        <div>
          <Tabs defaultValue="list" className="mt-3 w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-white gap-4">
              <TabsTrigger
                value="list"
                className="bg-background text-slate-500 data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl"
              >
                {t("personnel_list")}
              </TabsTrigger>
            </TabsList>
            <hr className="mt-4" />

            <TabsContent value="list">
              <span className="font-semibold">{t("personnel_list")}</span>
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
                        setDelOpen={setDelOpen}
                        changePermission="change_personnel"
                        deletePermission="delete_personnel"
                      />,
                    ]}
                    pageIndex={pagination.pageIndex}
                    pageSize={pagination.pageSize}
                    pageCount={Math.ceil(data.count / pagination.pageSize)}
                    onPaginationChange={setPagination}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    columnFilters={columnFilters}
                    onColumnFiltersChange={setColumnFilters}
                    columns={PersonnelColumns}
                    data={data.results}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <Dialog open={DelOpen} onOpenChange={setDelOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("delete")}</DialogTitle>
              <DialogDescription>
                {t("do_you_really_want_to_delete")}
                {"?"}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setDelOpen(false)} variant={"link"}>
                {t("cancel")}
              </Button>
              <LoadingButton
                onClick={() => handleDeleteBulk()}
                loading={isLoadingDeleteBulk}
                variant={"destructive"}
              >
                {t("delete")}
              </LoadingButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const BasePage = () => {
  return (
    // <UrlGuard permission="view_personnel">
      <PersonnelPage />
    // </UrlGuard>
  );
};

export default BasePage;
