"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLazyGetUserProfileQuery } from "@/store/apis/auth/authentication.api";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import { loginSuccess } from "@/store/slices/authslice";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

export default function Home() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const [getProfile, { data, isFetching }] = useLazyGetUserProfileQuery();
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      getProfile();
    }
  }, [getProfile]);

  useEffect(() => {
    if (value >= 100 && !isFetching) {
      redirect("/web");
    }
  }, [value, isFetching]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= 100) {
          clearInterval(intervalId); // Stop once we reach 10
          return prevValue;
        }
        return prevValue + 1;
      });
    }, 10); // 10ms × 10 = 100ms (0.1s total)

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(loginSuccess({ isLoggedIn: true, user: data }));
    }
  }, [data, dispatch]);
  return (
    <div className="relative flex flex-col justify-center items-center h-screen  w-full">
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: { duration: 1 },
        }}
      >
        <div className="w-24 h-24 z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={IMAGES.logo_cud_tranparent}
            alt="Logo CUD"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <div className="relative w-[113px] h-[113px] animate-spin rounded-full bg-gradient-to-r from-primary to-secondary ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gray-200 rounded-full border-2 border-white z-10"></div>
        </div>
        <div className="flex gap-1 absolute  left-1/2 -translate-x-1/2 translate-y-2">
          <span className="text-slate-400 animate-pulse">Loading</span>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 rounded-full animate-pulse bg-slate-400"></div>
            <div className="w-2 h-2 rounded-full animate-pulse bg-slate-400"></div>
            <div className="w-2 h-2 rounded-full animate-pulse bg-slate-400"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
