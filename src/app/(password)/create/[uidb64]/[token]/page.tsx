"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/passwordinput";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "@/store/apis/auth/authentication.api";
import { redirect } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-btn";
import { useTranslation } from "react-i18next";
import React, { Suspense } from "react";
import Loader from "@/components/Loader";
import { Key } from "lucide-react";
import { ResetPasswordValidator } from "@/validators/loginvalidator";
const ResetPasswordComponent = () => {
  const params = useParams();
  const { uidb64, token } = params;
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const form = useForm<z.infer<typeof ResetPasswordValidator>>({
    resolver: zodResolver(ResetPasswordValidator),
    defaultValues: {
      password: "",
    },
  });

  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      await resetPassword({
        uidb64: uidb64 as string,
        token: token as string,
        body: form.getValues(),
      })
        .unwrap()
        .then(() => {
          toast.success(t("password_create_successfull"));
          redirect("/reset/success");
        });
    } catch (error: any) {
      if (error.data.error) {
        toast.error(error.data.error);
        console.log(error);
      } else {
        toast.error(t("an_error_occurred"));
        console.log(error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-b  from-slate-100 via-red-100 to-yellow-50">
        <div className="w-fit h-fit bg-[#FFF4F4] p-2 rounded-xl opacity-50">
          <Key className="text-red-500" />
        </div>
        <div className="relative">
          <p className="text-4xl bg-gradient-to-r  from-green-600 via-red-600 to-yellow-600 p-8 top-0 bg-clip-text text-transparent">
            {t("create_password")}
          </p>
          <div className="absolute right-0 w-24 h-24 rounded-full bg-[#00000038] top-0"></div>
        </div>
        <p className="text-[#646464] w-2/3 mb-5 text-justify">
          {t("enter_new_password")}
        </p>
        <div className="border-2 p-4 w-[80%] xl:w-[55%] rounded-xl  bg-white/20 backdrop-blur py-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {
                handleSubmit();
              })}
              className="space-y-8"
            >
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl className="flex-1">
                        <PasswordInput
                          className="bg-transparent rounded-lg ring-0 focus:ring-0 focus-visible:ring-0"
                          prefix="sd"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirm_password")}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          className="bg-transparent rounded-lg ring-0 focus:ring-0 focus-visible:ring-0"
                          prefix="sd"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <LoadingButton
                loading={isLoading}
                type="submit"
                className="w-full"
                variant={"destructive"}
              >
                {t("validate")}
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>
      <div className="w-full login_right_container hidden xl:block  "></div>
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ResetPasswordComponent />
    </Suspense>
  );
};

export default ResetPassword;
