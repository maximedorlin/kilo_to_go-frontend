import { Users } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserInterface } from "@/interfaces/auth/authinterfaces";
import { useTranslation } from "react-i18next";

export default function UsersStatisticsTab({
  users,
}: {
  users: UserInterface[];
}) {
  // Calculate statistics
  const { t } = useTranslation();
  const totalUsers = users.length;

  const statsCards = [
    {
      label: t("total_users"),
      value: totalUsers,
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6 h-[400px] overflow-y-auto">
      <h2 className="text-2xl font-bold">{t("total_users")}</h2>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className={`${stat.bg} border-0`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <span className="text-sm font-medium text-gray-600">
                {stat.label}
              </span>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
