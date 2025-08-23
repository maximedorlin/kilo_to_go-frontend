"use client";
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
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  useChangePasswordMutation,
  useLazyGetUserProfileQuery,
  useUpdateUserMutation,
} from "@/store/apis/auth/authentication.api";
import {
  ChangePaswordValidator,
  UpdateUserValidator,
} from "@/validators/authvalidators";
import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSuccess } from "@/store/slices/authslice";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
// import { useGetSinglePermissionQuery } from "@/store/apis/auth/permissions.api";
import toast from "react-hot-toast";
import { setIsHomeTrue } from "@/store/slices/homePageSlice";
import CustumBreadcrumb from "@/components/ui/CustumBreadcrumb";
import { ChangePasswordInterface } from "@/interfaces/auth/authinterfaces";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";

const Account = () => {
  const { t } = useTranslation();
  const userData = useAppSelector((state) => state.auth.user);
  const [hasChanged, setHasChanged] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  // const dispatch = useAppDispatch();
  const [getProfile, { isLoading }] = useLazyGetUserProfileQuery();
  const [updateUser, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateUserMutation();
  // const { data: roleData } = useGetSinglePermissionQuery(
  //   userData.role as number
  // );

  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();

  const form = useForm<z.infer<typeof UpdateUserValidator>>({
    resolver: zodResolver(UpdateUserValidator),
    defaultValues: { ...userData },
  });

  const form2 = useForm<ChangePasswordInterface>({
    resolver: zodResolver(ChangePaswordValidator),
    defaultValues: { old_password: "", new_password: "", confirm_password: "" },
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setIsHomeTrue());
  }, [dispatch]);

  const watchedValues = form.watch();

  useEffect(() => {
    setHasChanged(
      watchedValues.last_name !== userData.last_name ||
        watchedValues.email !== userData.email ||
        watchedValues.phone_number !== userData.phone_number
    );
  }, [watchedValues, userData]);

  const handleSubmit = async () => {
    try {
      await updateUser({ data: { ...form.getValues() }, id: userData.id })
        .unwrap()
        .then(() => {
          getProfile();
          toast.success(t("account_updated_successfully"));
        });
    } catch (error) {
      console.log(error);
      toast.error(t("error_updating_account"));
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePassword = async () => {
    try {
      await changePassword(form2.getValues())
        .unwrap()
        .then(() => {
          toast.success(t("password_updated_successfully"));
          setOpenDialog(false);
          setShowChangePassword(false);
          form2.reset();
        });
    } catch (error: any) {
      console.log(error);
      if (error?.data && typeof error.data === "object") {
        Object.entries(error.data).forEach(([key, message]) => {
          toast.custom(
            <div className="bg-white border border-red-400 rounded-md shadow p-4 text-sm text-red-600">
              <strong>{t(key)}</strong>: {message as string}
            </div>
          );
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="py-10">
      <CustumBreadcrumb
        firstElement={t("my_account")}
        breakCrumbList={{ "^/home/account$": "my_account" }}
      />
      <div className="bg-white p-6 flex flex-col lg:flex-row gap-6 shadow-lg rounded-xl mt-10">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center space-y-5">
          {/* Avatar rond avec initiale */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 via-red-400 to-yellow-300 flex items-center justify-center shadow-lg">
            <span className="text-4xl font-extrabold text-white dark:text-gray-800 uppercase">
              {userData.last_name[0]}
            </span>
          </div>

          {/* Nom complet */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white capitalize">
              {userData.last_name} {userData.first_name}
            </h2>
            {/* <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
            {roleData?.libelle}
          </p> */}
          </div>

          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>

          {/* Détails utilisateur */}
          <div className="w-full text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Email :</span>
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Téléphone :</span>
              <span>{userData.phone_number}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">{t("last_name")} :</span>
              <span className="uppercase font-semibold text-gray-800 dark:text-white">
                {userData.last_name}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="font-medium text-black border-b pb-3 mb-6">
            {t("update_information")}
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="last_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("last_name")}</FormLabel>
                      <FormControl>
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
                      <FormLabel>{t("phone_number")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t("phone_number")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("email")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("email")} {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between items-end mt-6">
                <div
                  // href={"/forgot"}
                  // onClick={() => setShowChangePassword((prev) => !prev)}
                  className="text-sm font-medium text-slate-500 dark:text-slate-100 hover:underline hover:text-primary cursor-pointer"
                >
                  {t("Reset__password")}
                </div>
                <LoadingButton
                  loading={updateLoading || isLoading}
                  type="submit"
                  disabled={!hasChanged || updateLoading}
                  className={`px-6 py-2 rounded-lg text-white font-medium transition duration-300 ${
                    hasChanged
                      ? "bg-secondary hover:bg-secondary/90"
                      : "bg-secondary/50 cursor-not-allowed"
                  }`}
                >
                  {updateSuccess && !hasChanged ? (
                    <div className="flex gap-2 items-center">
                      <Check className="text-primary" /> {t("update_success")}
                    </div>
                  ) : (
                    t("save_form")
                  )}
                </LoadingButton>
              </div>
            </form>
          </Form>
          {showChangePassword && (
            <div className="min-h-36 mt-5 w-72 mx-auto border p-10 pb-5 px-5">
              <Form {...form2}>
                <form onSubmit={form2.handleSubmit(() => setOpenDialog(true))}>
                  <div className="flex flex-col gap-4">
                    <FormField
                      name="old_password"
                      control={form2.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("old_password")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("old_password")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="new_password"
                      control={form2.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("new_password")}</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder={t("new_password")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="confirm_password"
                      control={form2.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("confirm_password")}</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder={t("confirm_password")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <LoadingButton
                      loading={
                        updateLoading || isLoading || changePasswordLoading
                      }
                      type="submit"
                      className={`px-6 py-2 rounded-lg text-white font-medium transition duration-300`}
                    >
                      {t("change_password")}
                    </LoadingButton>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("change_password")}</DialogTitle>
            <DialogDescription>
              {t("are_you_sure_you_want_to_change_password")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} variant={"link"}>
              {t("cancel")}
            </Button>
            <LoadingButton
              onClick={() => handleChangePassword()}
              loading={isLoading || changePasswordLoading}
              variant={"destructive"}
            >
              {t("change")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Account;
