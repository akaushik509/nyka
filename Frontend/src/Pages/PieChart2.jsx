import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; 

const PieChart2 = ({ data, width, height }) => {
  const chartRef = useRef(null);
  console.log(data)
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
      }

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Pie Chart",
              data: data.values,
              backgroundColor: data.colors,
            },
          ],
        },
        options: {
          responsive: false,
        },
      });
    }
  }, [data, width, height]);

  return (
    <canvas ref={chartRef} width={width} height={height}></canvas>
  );
};

export default PieChart2;
