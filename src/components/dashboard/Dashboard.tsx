import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard: React.FC = () => {
  const gaugeOptions: ApexOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%",
        },
        dataLabels: {
          name: {
            fontSize: "16px",
          },
          value: {
            fontSize: "24px",
          },
        },
      },
    },
    colors: ["#00E396"],
    labels: ["Actual Cost"],
  };

  const gaugeSeries = [52];

  const barOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: [
        "Closure Stage",
        "Execution Stage",
        "Monitor & Control",
        "Project Initiation Stage",
        "Project Planning Stage",
      ],
    },
    colors: ["#008FFB"],
  };

  const barSeries = [
    {
      name: "Hours",
      data: [56, 164, 36, 40, 144],
    },
  ];

  const pieOptions: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: [
      "Project Planning Stage",
      "Project Initiation Stage",
      "Closure Stage",
      "Monitor & Control",
      "Execution Stage",
    ],
    colors: ["#00E396", "#008FFB", "#FEB019", "#FF4560", "#775DD0"],
  };

  const pieSeries = [60, 13.3, 0, 0, 100];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6  min-h-screen">
      <div className=" p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Actual Cost</h2>
        <Chart
          options={gaugeOptions}
          series={gaugeSeries}
          type="radialBar"
          height={300}
        />
      </div>
      <div className=" p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Time Vs Project Phase</h2>
        <Chart
          options={barOptions}
          series={barSeries}
          type="bar"
          height={300}
        />
      </div>
      <div className=" p-6 rounded-lg shadow-lg col-span-2">
        <h2 className="text-xl font-bold mb-4">Project Phase % Completed</h2>
        <Chart
          options={pieOptions}
          series={pieSeries}
          type="pie"
          height={300}
        />
      </div>
    </div>
  );
};

export default Dashboard;
