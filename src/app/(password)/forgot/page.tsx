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
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { LoadingButton } from "@/components/ui/loading-btn";
import { redirect } from "next/navigation";
import { useTranslation } from "react-i18next";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useResetPasswordGetTokenMutation } from "@/store/apis/auth/authentication.api";
import { ArrowLeft, Key } from "lucide-react";
import Link from "next/link";
import { MailValidator } from "@/validators/loginvalidator";

const COOKIE_NAME = "mailCooldown";
const EXPIRY_DURATION = 5 * 60 * 1000;

const ForgotPassword = () => {
  const [sendMail, { isLoading }] = useResetPasswordGetTokenMutation();

  const form = useForm<z.infer<typeof MailValidator>>({
    resolver: zodResolver(MailValidator),
    defaultValues: {
      email: "",
    },
  });

  const { t } = useTranslation();
  const [errorResponse, setErrorResponse] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Set a cookie-like timer using localStorage
  const setCooldown = () => {
    const expiryTime = Date.now() + EXPIRY_DURATION;
    localStorage.setItem(COOKIE_NAME, expiryTime.toString());
    setTimeLeft(EXPIRY_DURATION);
    startCountdown();
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      const updatedRemaining = checkCooldown();
      if (updatedRemaining === 0) {
        localStorage.removeItem(COOKIE_NAME);
        setTimeLeft(null);
        clearInterval(interval);
      } else {
        setTimeLeft(updatedRemaining);
      }
    }, 1000);
  };

  // Check the remaining cooldown time
  const checkCooldown = () => {
    const expiryTime = localStorage.getItem(COOKIE_NAME);
    if (!expiryTime) return null;

    const remaining = parseInt(expiryTime) - Date.now();
    return remaining > 0 ? remaining : 0;
  };

  // Timer effect
  useEffect(() => {
    const remaining = checkCooldown();
    if (remaining !== null && remaining > 0) {
      setTimeLeft(remaining);

      const interval = setInterval(() => {
        const updatedRemaining = checkCooldown();
        if (updatedRemaining === 0) {
          localStorage.removeItem(COOKIE_NAME);
          setTimeLeft(null);
          clearInterval(interval);
        } else {
          setTimeLeft(updatedRemaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  // Format time (mm:ss)
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000); // Convert to seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    try {
        await sendMail({ ...form.getValues() })
          .unwrap()
          .then(() => {
            toast.success(t("mail_sent"));
            setCooldown(); // Set the cooldown timer
            redirect("/forgot/mailsent")
          });
    } catch (error: any) {
      toast.error(t("email_send_error"));
      console.log(error);
      if (error.status == 400 || error.status == 404) {
        setErrorResponse(error.data.error);
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
            {t("password_reset")}
          </p>
          <div className="absolute right-0 w-24 h-24 rounded-full bg-[#00000038] top-0"></div>
        </div>
        <p className="text-[#646464] w-2/3 mb-5 text-justify">
          {t("forgot_password_description")}
        </p>
        <div className="border-2 p-4 w-[80%] xl:w-[55%] rounded-xl  bg-white/20 backdrop-blur py-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {
                handleSubmit();
              })}
              className="space-y-8"
            >
              <div className="flex flex-col gap-x-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl className="flex-1">
                        <Input
                          className="bg-transparent rounded-lg ring-0 focus:ring-0 focus-visible:ring-0"
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          disabled={timeLeft !== null}
                        />
                      </FormControl>

                      <FormMessage />
                      {errorResponse && (
                        <p className="text-red-500 text-sm">{errorResponse}</p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {timeLeft !== null ? (
                <div className="text-center text-red-500 font-bold">
                  ⏳ {t("wait_before_resend")}: {formatTime(timeLeft)}
                </div>
              ) : (
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  className="w-full"
                  variant={"destructive"}
                >
                  {t("send")}
                </LoadingButton>
              )}
            </form>
          </Form>
        </div>
        <Link href={"/login"} className="text-primary flex gap-3 mt-5">
          <ArrowLeft /> <div>{t("back_to_login")}</div>
        </Link>
      </div>
      <div className="w-full login_right_container hidden xl:block  "></div>
    </div>
  );
};

const Forgot = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ForgotPassword />
    </Suspense>
  );
};

export default Forgot;
