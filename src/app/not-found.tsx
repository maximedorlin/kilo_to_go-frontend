"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-8xl font-extrabold text-primary drop-shadow-lg"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-700 dark:text-gray-300 mt-4 max-w-lg" 
      >
        {t("notFound_message")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Button
          onClick={() => router.push("/web")}
          className="px-8 py-3 text-lg rounded-lg shadow-lg"
        >
          {t("notFound_button")}
        </Button>
      </motion.div>
    </div>
  );
}