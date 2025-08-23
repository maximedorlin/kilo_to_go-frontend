"use client";
import { ServerDataTable } from "@/components/tasks/components/server-data-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table,
} from "@tanstack/react-table";
import { usePathname } from "next/navigation";
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
import { useAppDispatch } from "@/hooks/redux-toolkit";
import { SetUnselectRows } from "@/store/slices/tables-pagiations-slices/geoSelectedIds.slice";
import {
  convertToDjangoFilters,
  FilterCondition,
  GenericFilter,
} from "@/components/SearchFilterComponent";
// import { emptyModel, equipmentFieldConfig } from "./field-search-config";
import { ConsumablesInterface } from "@/interfaces/sanitary/consumables.interface";
import { ConsumablesColumns } from "@/components/tables/administration/consummables-columns";
import {
  useDeleteConsumablesMultipleMutation,
  useDeleteConsumablesMutation,
  useGetConsumableWithFiltersQuery,
} from "@/store/apis/sanitary/consumables.api";
import { consumableFieldConfig, emptyModel } from "./field-search-config";
// import UrlGuard from "@/lib/UrlGuard";
import ErrorComponent from "@/components/dashboard/ErrorComponent";
// import PermissionGuard from "@/lib/PermissionGuard";

const Consumables = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [filters, setFilters] = React.useState<
    FilterCondition<ConsumablesInterface>[]
  >([]);

  const { data, refetch, error } = useGetConsumableWithFiltersQuery(
    `${Object.keys(convertToDjangoFilters(filters, consumableFieldConfig)).map(
      (key) =>
        `${key}=${convertToDjangoFilters(filters, consumableFieldConfig)[key]}&`
    )}`
  );

  const consumables = data?.results;

  // delete multiple equipments api
  const [deleteConsumablesMultiple, { isLoading: isLoadingDelMultiple }] =
    useDeleteConsumablesMultipleMutation();
  const [deleteConsumables, { isLoading: isLoadingDelete }] =
    useDeleteConsumablesMutation();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelected, setRowSelected] = useState<string[]>([]);
  const [DelOpen, setDelOpen] = useState(false);

  const ref = useRef<Table<ConsumablesInterface>>(null);

  // delete a single equipment
  const handleSingleDelete = async () => {
    try {
      await deleteConsumables(rowSelected[0]).unwrap();
      toast.success(t("consumable_delete_successfully"));
      dispatch(SetUnselectRows());
      await refetch();
      setDelOpen(false);
    } catch (error: any) {
      toast(t("an_error_occurred"));
      console.error(error);
    }
  };

  // delete several equipments
  const handleDeleteMultiple = async () => {
    try {
      await deleteConsumablesMultiple(rowSelected).unwrap();
      toast.success(t("consumables_delete_successfully"));
      dispatch(SetUnselectRows());
      await refetch();
      setDelOpen(false);
    } catch (error: any) {
      toast(t("an_error_occurred"));
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-195px)] pb-1">
      <div className="bg-white h-full shadow-md rounded-md p-5 overflow-y-scroll">
        <div className="flex w-full justify-between items-center">
          <span className="text-xl my-2">{t("consumables_list")}</span>
          {/* <PermissionGuard permission="add_consumable"> */}
            <Link href={`${pathname}/add`}>
              <Button variant={"default"}>
                {t("add")} <PlusCircle />
              </Button>
            </Link>
          {/* </PermissionGuard> */}
        </div>
        <GenericFilter
          model={emptyModel}
          filters={filters}
          onChange={setFilters}
          fieldConfig={consumableFieldConfig}
        />
        <hr className="my-1" />
        <div>
          <Tabs defaultValue="list" className="mt-3 w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-white gap-4">
              <TabsTrigger
                value="list"
                className="bg-background text-slate-500 data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl"
              >
                {t("consumables_list")}
              </TabsTrigger>
            </TabsList>
            <hr className="mt-4" />

            <TabsContent value="list">
              <span className="font-semibold">{t("consumables_list")}</span>
              {data && (
                <div>
                  <ServerDataTable
                    ref={ref}
                    pageIndex={pagination.pageIndex}
                    pageSize={pagination.pageSize}
                    pageCount={0}
                    onPaginationChange={setPagination}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    columnFilters={columnFilters}
                    onColumnFiltersChange={setColumnFilters}
                    columns={ConsumablesColumns}
                    data={consumables || []}
                    onSelectActions={[
                      <TableActions
                        key={"action-button"}
                        rowSelected={rowSelected}
                        actionsClicked={() => {
                          const selectedIds = Object.values(
                            ref.current?.getSelectedRowModel().rowsById ?? {}
                          ).map((row) => row.original.id);

                          setRowSelected(selectedIds);
                        }}
                        singleDelete={{
                          isLoading: isLoadingDelete,
                          handleDelete: handleSingleDelete,
                        }}
                        setDelOpen={setDelOpen}
                        changePermission="change_consumable"
                        deletePermission="delete_consumable"
                      />,
                    ]}
                  />
                </div>
              )}
              {error && (
                <>
                  <ErrorComponent error={error} />
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Supprimer plusieurs équipements */}
        <Dialog open={DelOpen} onOpenChange={setDelOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("delete")}</DialogTitle>
              <DialogDescription>
                {t("do_you_really_want_to_delete_these_elements")}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setDelOpen(false)} variant={"link"}>
                {t("cancel")}
              </Button>
              <LoadingButton
                onClick={() => handleDeleteMultiple()}
                loading={isLoadingDelMultiple}
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
    // <UrlGuard permission="view_consumable">
      <Consumables />
    // </UrlGuard>
  );
};

export default BasePage;
