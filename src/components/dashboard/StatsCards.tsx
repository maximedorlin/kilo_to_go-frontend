import React, { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  gradient: string;
  icon: ReactNode;
}

const _stats: StatCardProps[] = [
  // {
  //   title: "EARNING",
  //   value: "$5729",
  //   gradient: "bg-gradient-to-r from-green-500 to-green-700",
  // },
  // {
  //   title: "PAGEVIEWS",
  //   value: "293878",
  //   gradient: "bg-gradient-to-r from-green-500 to-red-600",
  // },
  // {
  //   title: "DOWNLOAD",
  //   value: "582920",
  //   gradient: "bg-gradient-to-r from-red-500 to-red-700",
  // },
];

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  gradient,
  icon,
}) => {
  return (
    <div className="w-full p-6 rounded-lg shadow-lg bg-white text-center overflow-hidden relative">
      <div className="absolute left-0 -top-5 w-full flex justify-center">
        <div className="w-32 h-32 bg-green-300  rounded-full flex justify-center items-center">
          {icon}
        </div>
      </div>

      <div
        className={`text-white font-semibold text-lg p-3 rounded-t-lg mt-24 ${gradient}`}
      >
        {title}
      </div>
      <div className="text-3xl font-bold mt-4">{value}</div>
    </div>
  );
};

const StatsCards: React.FC<{ data: StatCardProps[] }> = ({ data }) => {
  return (
    <div className="grid xl:grid-cols-3 gap-7">
      {data.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
