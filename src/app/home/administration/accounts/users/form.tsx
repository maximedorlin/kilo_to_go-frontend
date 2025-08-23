"use client";
import CancelButton from "@/components/ui/CancelButton";
import ComboboxField from "@/components/ui/ComboboxField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-btn";
import { useAppSelector } from "@/hooks/redux-toolkit";
import { UserInterface } from "@/interfaces/auth/authinterfaces";
import { useNavigateBack } from "@/lib/navigate-back";
import {
  useCreateUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/store/apis/auth/authentication.api";
import { useGetGroupsQuery } from "@/store/apis/auth/groups.api";
import { CreateUserValidator } from "@/validators/authvalidators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaSave } from "react-icons/fa";

interface Props {
  initial?: UserInterface;
}

const UserForm: React.FC<Props> = ({ initial }) => {
  const { t } = useTranslation();
  const navigateBack = useNavigateBack(1);
  const { data: groupsData } = useGetGroupsQuery();
  const form = useForm<UserInterface>({
    resolver: zodResolver(CreateUserValidator),
    defaultValues: initial ? { ...initial } : {},
  });

  const pagination = useAppSelector(
    (state) => state.AllTableSlice["observationsheetTable"]
  );

  const { refetch } = useGetUsersQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

  const handleSubmit = async () => {
    const formValues = form.getValues();
    try {
      if (initial) {
        await updateUser({ data: formValues, id: initial.id }).unwrap();
        toast.success(t("account_updated_successfully"));
        await refetch();
        navigateBack(1);
      } else {
        await createUser(formValues).unwrap();
        toast.success(t("account_created_successfully"));
        await refetch();
        navigateBack(1);
      }
    } catch (error) {
      console.log("ERROR ", error);
      toast.error(t("an_error_occurred"));
    }
  };

  return (
    <div className="flex h-[calc(100vh-195px)] gap-4 pb-0">
      <div
        className={`w-full h-full bg-white p-5 pt-1 overflow-hidden rounded-md shadow-lg  overflow-y-auto`}
      >
        <div className="py-5 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            {initial ? t("update_user") : t("add_user")}
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {
                handleSubmit();
              })}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required> {t("email")} </FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder={t("email")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="last_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required> {t("last_name")} </FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder={t("last_name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone_number"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required> {t("phone_number")} </FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder={t("phone_number")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ComboboxField
                  form={form}
                  label={t("user_group")}
                  name="group"
                  idType="number"
                  options={
                    groupsData
                      ? [
                          ...groupsData.map((group) => ({
                            id: group.id,
                            libelle: group.name,
                          })),
                        ]
                      : []
                  }
                />
              </div>
              <div className="flex justify-end gap-2 items-center">
                <CancelButton depth={1} />

                <LoadingButton
                  type="submit"
                  loading={isLoadingUpdate || isLoading}
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

export default UserForm;
