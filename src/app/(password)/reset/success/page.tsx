"use client";
import { useTranslation } from "react-i18next";
import React, { Suspense } from "react";
import Loader from "@/components/Loader";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-btn";

const PasswordSuccessComponent = () => {
  const { t } = useTranslation();
  const router = useRouter()
  return (
    <div className="flex h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-b  from-slate-100 via-red-100 to-yellow-50">
        <div className="w-fit h-fit bg-[#FFF4F4] p-2 rounded-xl opacity-50">
          <Check className="text-red-500" />
        </div>
        <div className="relative">
          <p className="text-4xl bg-gradient-to-r  from-green-600 via-red-600 to-yellow-600 p-8 top-0 bg-clip-text text-transparent">
            {t("password_changed")}!
          </p>
          <div className="absolute right-0 w-24 h-24 rounded-full bg-[#00000038] top-0"></div>
        </div>
        <p className="text-[#646464] w-2/3 mb-5 text-justify">
          {t("password_changed_successfully")}
        </p>
        <div className="p-4 w-[80%] xl:w-[55%] rounded-xl  bg-white/20 backdrop-blur py-10">
          <LoadingButton
            className="w-full"
            variant={"destructive"}
            onClick={() => router.push("/login")}
          >
            {t("continue")}
          </LoadingButton>
        </div>
      </div>
      <div className="w-full login_right_container hidden xl:block "></div>
    </div>
  );
};

const PasswordSuccess = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PasswordSuccessComponent />
    </Suspense>
  );
};

export default PasswordSuccess;
