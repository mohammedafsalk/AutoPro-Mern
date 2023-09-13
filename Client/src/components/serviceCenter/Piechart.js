import React from "react";
import ReactApexChart from "react-apexcharts";

function PieChart({ names }) {
  const pieData = {
    series: Object.values(names),
    labels: Object.keys(names), 
  };
  const pieOptions = {
    labels: pieData.labels,
  };

  return (
    <div>
      <h2>Bookings</h2>
      <ReactApexChart
        options={pieOptions}
        series={pieData.series}
        type="pie"
        width="380"
      />
    </div>
  );
}

export default PieChart;
