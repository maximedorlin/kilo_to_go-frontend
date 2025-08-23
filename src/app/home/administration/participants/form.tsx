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
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { setTablePaginationState } from "@/store/slices/tables-pagiations-slices/all-table-slices";
import { useEffect, useState } from "react";
import React from "react";
import {
  ParticipantsInterface,
  ParticipantsProfilList,
  TypeParticipantsList,
} from "@/interfaces/administrative.interface";
import {
  useCreateParticipantsMutation,
  useGetParticipantsQuery,
  usePartialUpdateParticipantsMutation,
} from "@/store/apis/participants.api";
import { ParticipantsValidator } from "@/validators/administrator";
import { useNavigateBack } from "@/lib/navigate-back";

const ParticipantsForm = ({ initial }: { initial?: ParticipantsInterface }) => {
  const { t } = useTranslation();
  const navigateBack = useNavigateBack(1);
  const dispatch = useAppDispatch();
  const form = useForm<ParticipantsInterface>({
    resolver: zodResolver(ParticipantsValidator),
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

  const { refetch } = useGetParticipantsQuery({
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

  const [createParticipant, { isLoading }] = useCreateParticipantsMutation();
  const [updateParticipant, { isLoading: isLoadingUpdate }] =
    usePartialUpdateParticipantsMutation();

  // const handleSubmit = async () => {
  //   const formValues = form.getValues();
  //   const createData : { ...formValues };

  const handleSubmit = async () => {
    const formValues = form.getValues();
    if (initial) {
      try {
        await updateParticipant({
          data: formValues,
          id: initial.id,
        }).unwrap();
        toast.success(t("participant_updated_successfully"));
        await refetch();
        navigateBack();
      } catch (error) {
        console.log("ERROR ", error);
        toast.error(t("an_error_occurred"));
      }
    } else {
      try {
        await createParticipant(formValues).unwrap();
        toast.success(t("participant_created_successfully"));
        await refetch();
        navigateBack();
        await refetch();
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
            {initial ? t("edit_participant") : t("add_participant")}
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => handleSubmit())}
              className="space-y-6"
            >
              <h3 className="font-semibold text-gray-700 mb-6">
                {t("participant_informations")}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  name="type_participant"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>{t("type_participant")}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_type")} />
                          </SelectTrigger>
                          <SelectContent>
                            {TypeParticipantsList.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {t(opt)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="profil"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>{t("profil")}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("profil")} />
                          </SelectTrigger>
                          <SelectContent>
                            {ParticipantsProfilList.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {t(opt)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="nom_complet"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("nom_complet")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("nom_complet")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="telephone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("telephone")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("telephone")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("email")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col mt-2"></div>
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

export default ParticipantsForm;
