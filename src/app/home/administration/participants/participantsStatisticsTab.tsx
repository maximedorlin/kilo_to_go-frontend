import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ParticipantsStatisticsInterface } from "@/interfaces/administrative.interface";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Progress } from "@/components/ui/progress";
const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -3,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
  },
};

export const ParticipantsStatisticsTab: React.FC<
  ParticipantsStatisticsInterface
> = ({ total, type_participant, profil }) => {
  const { t } = useTranslation();

  const calculatePercentage = (value: number) =>
    total > 0 ? Math.round((value / total) * 100) : 0;

  const renderStatsBlock = (
    title: string,
    stats: Record<string, number>,
    colors: string[]
  ) => (
    <motion.div
      custom={1}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={statVariants}
      className="bg-gradient-to-br from-blue-50 to-blue-50/70 border border-blue-200/80 rounded-2xl p-6 hover:border-blue-300/50 transition-all duration-300 cursor-default relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/50 to-transparent" />
      <div className="z-10">
        <h3 className="text-sm font-medium text-gray-600 tracking-wide mb-4">
          {title}
        </h3>
        <div className="space-y-4">
          {Object.entries(stats).map(([key, value], idx) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 capitalize">{t(key)}</span>
                <span className="font-medium">
                  {value} ({calculatePercentage(value)}%)
                </span>
              </div>
              <Progress
                value={calculatePercentage(value)}
                className={`h-2 ${colors[idx % colors.length]}`}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <Card className="border-none rounded-3xl shadow-xs max-w-5xl mx-auto bg-white/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-50/20 to-transparent pointer-events-none" />

      <CardHeader className="pb-4 px-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
            {t("Participants_statistics")}
          </CardTitle>
        </motion.div>
      </CardHeader>

      <CardContent className="px-6 pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={statVariants}
            className="bg-gradient-to-br from-amber-50 to-amber-50/70 border border-yellow-200/80 rounded-2xl p-6 hover:border-yellow-300/50 transition-all duration-300 cursor-default relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/50 to-transparent" />
            <div className="z-10">
              <h3 className="text-sm font-medium text-gray-600 tracking-wide mb-4">
                {t("total")}
              </h3>
              <div className="space-y-4 text-xl flex justify-center items-center">
                {total}
              </div>
            </div>
          </motion.div>
          {profil &&
            renderStatsBlock(t("by_profil"), profil, [
              "bg-amber-500",
              "bg-orange-500",
            ])}
          {type_participant &&
            renderStatsBlock(t("type_participant"), type_participant, [
              "bg-amber-500",
              "bg-orange-500",
            ])}
        </div>
      </CardContent>
    </Card>
  );
};
