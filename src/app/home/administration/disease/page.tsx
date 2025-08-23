"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ServerDataTable } from "@/components/tasks/components/server-data-table";

import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table,
} from "@tanstack/react-table";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import TableActions from "@/components/TableActions";
import { setTablePaginationState } from "@/store/slices/tables-pagiations-slices/all-table-slices";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { transformError } from "@/utils/transform-errors";
import { LoadingButton } from "@/components/ui/loading-btn";
import { Disease } from "@/interfaces/administrative.interface";
import {
  useDeleteDiseaseMutation,
  useDeleteMultipleDiseaseMutation,
  useGetDiseaseQuery,
} from "@/store/apis/administrative-deases.api";
import {
  convertToDjangoFilters,
  FilterCondition,
  GenericFilter,
} from "@/components/SearchFilterComponent";
import { DiseaseColumns } from "@/components/tables/administration/diseases-columns";
import { emptyModel, searchConfig } from "./field-search-config";
// import UrlGuard from "@/lib/UrlGuard";
// import PermissionGuard from "@/lib/PermissionGuard";
import ErrorComponent from "@/components/dashboard/ErrorComponent";

const DiseasePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

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

  const ref = useRef<Table<Disease>>(null);
  const [_rowSelected, setRowSelected] = useState<string[]>([]);

  const [filters, setFilters] = React.useState<FilterCondition<Disease>[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [deleteBulk, { isLoading: isLoadingDeleteBulk }] =
    useDeleteMultipleDiseaseMutation();

  const [DelOpen, setDelOpen] = useState(false);

  // const { data: stats } = useGetDiseaseStatsQuery();

  const { data, refetch, error } = useGetDiseaseQuery({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
    sorting: observationsheetTable.sorting,
    manualFilter: `${Object.keys(
      convertToDjangoFilters(filters, searchConfig)
    ).map(
      (key) => `${key}=${convertToDjangoFilters(filters, searchConfig)[key]}&`
    )}`,
    filters: observationsheetTable.filters.map((f) => ({
      id: f.id,
      value: f.value,
    })),
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

  const [deleteDisease, { isLoading: isLoadingSingleDelete }] =
    useDeleteDiseaseMutation();

  const handleSingleDelete = async () => {
    try {
      await deleteDisease(_rowSelected[0]).unwrap();
      toast.success(t("disease_deleted_successfully"));
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBulk = async () => {
    try {
      await toast.promise(deleteBulk(_rowSelected).unwrap(), {
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
    <div className="flex h-[calc(100vh-195px)] gap-4 pb-3">
      <div
        className={`w-full h-full bg-white p-5 pt-1 overflow-hidden rounded-md shadow-lg  overflow-y-auto`}
      >
        <div className="flex w-full justify-between items-center">
          <span className="text-xl my-2">{t("diseases")}</span>
          {/* <PermissionGuard permission="add_disease"> */}
            <Link href={`${pathname}/add`}>
              <Button variant={"default"}>
                {t("add")} <PlusCircle />
              </Button>
            </Link>
          {/* </PermissionGuard> */}
        </div>
        <hr className="my-1" />

        <GenericFilter
          model={emptyModel}
          filters={filters}
          onChange={setFilters}
          fieldConfig={{
            ...searchConfig,
          }}
        />
        <div>
          <Tabs defaultValue="list" className="mt-3 w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-white gap-4">
              <TabsTrigger
                value="list"
                className="bg-background text-slate-500 data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl"
              >
                {t("disease_list")}
              </TabsTrigger>
            </TabsList>
            <hr className="mt-4" />

            <TabsContent value="list">
              <span className="font-semibold">{t("disease_list")}</span>
              {data && (
                <div>
                  <ServerDataTable
                    ref={ref}
                    onSelectActions={[
                      <TableActions
                        key={"action-button"}
                        rowSelected={_rowSelected}
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
                        changePermission="change_disease"
                        deletePermission="delete_disease"
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
                    columns={DiseaseColumns}
                    data={data?.results}
                  />
                </div>
              )}
              {error && <ErrorComponent error={error} />}
            </TabsContent>
          </Tabs>
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
    </div>
  );
};

const BasePage = () => {
  return (
    // <UrlGuard permission="view_disease">
      <DiseasePage />
    // </UrlGuard>
  );
};

export default BasePage;
