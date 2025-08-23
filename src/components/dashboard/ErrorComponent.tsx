"use client";
import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { useTranslation } from "react-i18next";

export const Oops = () => {
  return (
    <div className="text-primary font-bold flex gap-1 items-end mt-5">
      <span className="text-4xl">O</span>
      <span className="text-xl">O</span>
      <span className="text-2xl">O</span>
      <span className="text-4xl">p</span>
      <span className="text-4xl">S</span>
      <span className="text-4xl">!</span>
      <span className="text-2xl">!</span>
      <span className="text-xl">!</span>
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ErrorComponent: React.FC<{ error: any }> = ({ error }) => {
  console.log("Errror  ==============>  ", error);

  const { t } = useTranslation();
  return (
    <div className="pt-20">
      {((error.status >= 500 && error.status < 600) ||
        (error.originalStatus >= 500 && error.originalStatus < 600)) && (
        <>
          <div className="flex justify-center items-center flex-col">
            <div className="relative">
              <div className="absolute text-4xl text-primary font-bold bottom-28 right-10">
                500
              </div>
              <Image
                alt="internal server error"
                className="aspect-square"
                src={IMAGES.internal_server_error}
                width={300}
              />
            </div>
            <Oops />
          </div>
          <p className="text-center">{t("an_internal_error_occured")}</p>
        </>
      )}
      {(error.status == 400 || error.originalStatus == 400) && (
        <>
          <div className="flex justify-center items-center flex-col">
            <Image
              alt="bad request"
              className="aspect-square"
              src={IMAGES.bad_request}
              width={300}
            />
            <Oops />
          </div>
          <p className="text-center">{t("bad_request")}</p>
        </>
      )}
      {(error.status == 401 || error.originalStatus == 401) && (
        <>
          <div className="flex justify-center items-center flex-col">
            <Image
              alt="unauthorized"
              className="aspect-square"
              src={IMAGES.undraw_unauthorized}
              width={300}
            />
            <Oops />
          </div>
          <p className="text-center">{t("unauthorized")}</p>
        </>
      )}
      {(error.status == 403 || error.originalStatus == 403) && (
        <>
          <div className="flex justify-center items-center flex-col">
            <Image
              alt="unauthorized"
              className="aspect-square"
              src={IMAGES.undraw_unauthorized}
              width={300}
            />
            <Oops />
          </div>
          <p className="text-center">{t("unauthorized")}</p>
        </>
      )}
      {(error.status == 404 || error.originalStatus == 404) && (
        <>
          <div className="flex justify-center items-center flex-col">
            <Image
              alt="not found"
              className="aspect-square"
              src={IMAGES.undraw_not_found}
              width={300}
            />
            <Oops />
          </div>
          <p className="text-center">{t("not_found_ressource")}</p>
        </>
      )}
    </div>
  );
};
export default ErrorComponent;
