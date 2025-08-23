"use client";
import { useTranslation } from "react-i18next";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";

const COOKIE_NAME = "mailCooldown";
const MailSentComponent = () => {
  const { t } = useTranslation();

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Check the remaining cooldown time
  const checkCooldown = () => {
    const expiryTime = localStorage.getItem(COOKIE_NAME);
    if (!expiryTime) return null;

    const remaining = parseInt(expiryTime) - Date.now();
    return remaining > 0 ? remaining : 0;
  };

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

  return (
    <div className="flex h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-b  from-slate-100 via-red-100 to-yellow-50">
        <div className="w-fit h-fit bg-[#FFF4F4] p-2 rounded-xl opacity-50">
          <MailCheck className="text-red-500" />
        </div>
        <div className="relative">
          <p className="text-4xl bg-gradient-to-r  from-green-600 via-red-600 to-yellow-600 p-8 top-0 bg-clip-text text-transparent">
            {t("verify_mail")}!
          </p>
          <div className="absolute right-0 w-24 h-24 rounded-full bg-[#00000038] top-0"></div>
        </div>
        <div className="border-2 p-4 w-[80%] xl:w-[55%] rounded-xl  bg-white/20 backdrop-blur py-10">
          <p className="text-[#646464] mb-5 text-justify">
            <span>{t("mail_not_received")}</span>{" "}
            <Link href={"/forgot"} className="text-secondary">
              {t("click_to_resend")}
            </Link>{" "}
            {timeLeft !== null && <span>{t("in")}{formatTime(timeLeft)}</span>}
          </p>
        </div>
        <Link href={"/login"} className="text-primary flex gap-3 mt-5">
          <ArrowLeft /> <div>{t("back_to_login")}</div>
        </Link>
      </div>
      <div className="w-full login_right_container hidden xl:block "></div>
    </div>
  );
};

const MailSent = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MailSentComponent />
    </Suspense>
  );
};

export default MailSent;
