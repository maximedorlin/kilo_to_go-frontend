"use client";

import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import CancelButton from "@/components/ui/CancelButton";
import { LoadingButton } from "@/components/ui/loading-btn";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigateBack } from "@/lib/navigate-back";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { setTablePaginationState } from "@/store/slices/tables-pagiations-slices/all-table-slices";
import { useEffect, useState } from "react";
import React from "react";
import { Personnel } from "@/interfaces/administrative.interface";

import {
  useCreatePersonnelMutation,
  useGetPersonnelQuery,
  usePartialUpdatePersonnelMutation,
} from "@/store/apis/administrative-personnel.api";
import { PersonnelValidator } from "@/validators/administrator";

const PersonnelForm = ({ initial }: { initial?: Personnel }) => {
  const { t } = useTranslation();
  const navigateBack = useNavigateBack(1);
  const dispatch = useAppDispatch();
  const form = useForm<Personnel>({
    resolver: zodResolver(PersonnelValidator),
    defaultValues: initial ? { ...initial } : {},
  });
  // const storedPagination = useAppSelector((state) => state.geoTable);

  const observationsheetTable = useAppSelector(
    (state) => state.AllTableSlice["observationsheetTable"]
  );

  const [pagination] = React.useState<PaginationState>({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
  });

  const [sorting] = React.useState<SortingState>(observationsheetTable.sorting);

  const [columnFilters] = useState<ColumnFiltersState>([]);

  const { refetch } = useGetPersonnelQuery({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
    sorting: observationsheetTable.sorting,
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

  const [createPersonnel, { isLoading }] = useCreatePersonnelMutation();
  const [updatePersonnel, { isLoading: isLoadingUpdate }] =
    usePartialUpdatePersonnelMutation();

  // const handleSubmit = async () => {
  //   const formValues = form.getValues();
  //   const createData : { ...formValues };

  const handleSubmit = async () => {
    const formValues = form.getValues();
    if (initial) {
      try {
        await updatePersonnel({
          data: formValues,
          id: initial.id,
        }).unwrap();
        toast.success(t("personnel_updated_successfully"));
        refetch();
        navigateBack();
      } catch (error) {
        console.log("ERROR ", error);
        toast.error(t("an_error_occurred"));
      }
    } else {
      try {
        await createPersonnel(formValues).unwrap();
        toast.success(t("personnel_created_successfully"));
        refetch();
        navigateBack();
        refetch();
      } catch (error) {
        console.log(error);
        toast.error(t("an_error_occurred"));
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-195px)] gap-4 pb-3">
      <div
        className={`w-full h-full bg-white p-5 pt-1 overflow-hidden rounded-md shadow-lg  overflow-y-auto`}
      >
        <div className="py-5 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            {initial ? t("edit_personnel") : t("add_personnel")}
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => handleSubmit())}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  name="personnel_type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("personnel_type")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("personnel_type")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="personnel_description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("personnel_description")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("personnel_description")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 items-center">
                <CancelButton depth={1} />

                <LoadingButton
                  type="submit"
                  loading={isLoading || isLoadingUpdate}
                  className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <FaSave />
                  {t("save")}
                </LoadingButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PersonnelForm;
