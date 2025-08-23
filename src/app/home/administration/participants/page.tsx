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
import { ParticipantsColumns } from "@/components/tables/administration/participants-columns";
import {
  useDeleteMultipleParticipantsMutation,
  useDeleteParticipantsMutation,
  useGetParticipantsQuery,
  useGetParticipantStatisticsQuery,
} from "@/store/apis/participants.api";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { setTablePaginationState } from "@/store/slices/tables-pagiations-slices/all-table-slices";
import { ParticipantsInterface } from "@/interfaces/administrative.interface";
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
import { ParticipantsStatisticsTab } from "./participantsStatisticsTab";
// import UrlGuard from "@/lib/UrlGuard";
// import PermissionGuard from "@/lib/PermissionGuard";
// import { convertToDjangoFilters } from "@/components/SearchFilterComponent";

const Users = () => {
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
    useDeleteMultipleParticipantsMutation();

  const [DelOpen, setDelOpen] = useState(false);

  const { data: stats } = useGetParticipantStatisticsQuery();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const ref = useRef<Table<ParticipantsInterface>>(null);
  const [_rowSelected, setRowSelected] = useState<string[]>([]);

  const { data, refetch } = useGetParticipantsQuery({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
    sorting: observationsheetTable.sorting,
    // manualFilter: `${Object.keys(
    //   convertToDjangoFilters(filters, searchConfig)
    // ).map(
    //   (key) => `${key}=${convertToDjangoFilters(filters, searchConfig)[key]}&`
    // )}`,
    // filters: observationsheetTable.filters.map((f) => ({
    //   id: f.id,
    //   value: f.value,
    // })),
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

  const [deleteparticipant, { isLoading: isLoadingSingleDelete }] =
    useDeleteParticipantsMutation();

  const handleSingleDelete = async () => {
    try {
      await deleteparticipant(_rowSelected[0]).unwrap();
      toast.success(t("participants_deleted_successfully"));
      await refetch();
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
      await refetch();
      setDelOpen(false);
    } catch (error) {
      console.error("Delete bulk error:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-195px)] pb-1">
      <div className="bg-white h-full shadow-md rounded-md p-5 overflow-hidden">
        <div className="flex w-full justify-between items-center">
          <span className="text-xl my-2">{t("participants_list")}</span>
          {/* <PermissionGuard permission="add_participant"> */}
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
                {t("participants_list")}
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                className="bg-background data-[state=active]:bg-primary data-[state=active]:text-white rounded-2xl"
              >
                {t("statistics")}
              </TabsTrigger>
            </TabsList>
            <hr className="mt-4" />

            <TabsContent value="list">
              <span className="font-semibold">{t("participants_list")}</span>
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
                        changePermission="change_participant"
                        deletePermission="delete_participant"
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
                    columns={ParticipantsColumns}
                    data={data.results}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="statistics">
              {stats && (
                <ParticipantsStatisticsTab
                  total={stats.total}
                  profil={stats.profil}
                  type_participant={stats.type_participant}
                />
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
    // <UrlGuard permission="view_participant">
      <Users />
    // </UrlGuard>
  );
};

export default BasePage;
