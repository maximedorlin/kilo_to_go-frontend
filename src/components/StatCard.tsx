"use client";

import { Card, CardContent } from "@/components/ui/card";
// import { ArrowUpRight, ArrowDownRight, Book, User2, Building2, Folder } from "lucide-react"; // Importation des icônes de Lucide
import React from "react";

interface DataItem {
  id: number;
  name: string;
  count: number;
  isProgress: boolean;
  color: string;
  icon: React.ReactNode;
  symbol?: string;
}

// const data: DataItem[] = [
//     {
//         id: 1,
//         name: "Total Project",
//         count: 106,
//         isProgress: true,
//         color: "blue-500",
//         icon: <User2 className="w-6 h-6" />
//     },
//     {
//         id: 2,
//         name: "Completed Project",
//         count: 60,
//         isProgress: true,
//         color: "red-500",
//         icon: <Building2 className="w-6 h-6" />
//     },
//     {
//         id: 3,
//         name: "In Progress",
//         count: 82,
//         isProgress: false,
//         color: "orange-500",
//         icon: <Folder className="w-6 h-6" />
//     },
//     {
//         id: 3,
//         name: "In Progress",
//         count: 82,
//         isProgress: false,
//         color: "yellow-500",
//         icon: <Book className="w-6 h-6" />
//     },

// ]

const StatCard: React.FC<{ data: DataItem }> = ({ data }) => {
  // Fonction pour formater le nombre
  const formatNumber = (value: number) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`; // Millions
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`; // Milliers
    if (value >= 100) return value.toLocaleString(); // Séparation des milliers
    return value; // Petit nombre inchangé
  };

  return (
    <Card className="h-full bg-background border-none shadow-md">
      <CardContent className="p-0">
        <div className="flex p-6">
          <div className="flex-1">
            <div className={`text-xl font-semibold text-${data.color}`}>
              {formatNumber(data.count)} {data.symbol && data.symbol}
            </div>
            <br />
            <div className="text-lg font-medium text-default-300">
              {data.name}
            </div>
          </div>
          <div className="flex-none">
            <div
              className={`w-6 h-6 flex justify-center items-center rounded bg-${data.color} bg-opacity-35`}
            >
              {data.icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// const StatData = () => {
//     return (
//         <>
//             {data.map((item, index) => (
//                 <Card key={`project-stat-${index}`} className="h-full bg-white border-none">
//                     <CardContent className="p-0">

//                         <div className="flex p-6">
//                             <div className="flex-1">
//                                 <div className={`text-3xl font-semibold text-${item.color}`}>{item.count}</div>
//                                 <div className="text-lg font-medium text-default-600">{item.name}</div>
//                             </div>
//                             <div className="flex-none">
//                                 <div className={`w-10 h-10 flex justify-center items-center rounded bg-${item.color} bg-opacity-35`}>
//                                     {item.icon}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className={`flex justify-between px-6 py-3.5 bg-${item.color}/10`}>
//                             <div className="text-sm font-medium text-default-800">Project Progress</div>
//                             <div>
//                                 {
//                                     item.isProgress ? <ArrowUpRight
//                                         className={`w-6 h-6 text-${item.color}`} /> :
//                                         <ArrowDownRight
//                                             className={`w-6 h-6 text-${item.color}`} />
//                                 }
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             ))}
//         </>
//     );
// };

export default StatCard;