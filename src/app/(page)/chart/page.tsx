"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartItem, Colors } from "chart.js/auto";
import "./style.css";

interface Props {}

function ChartPage(props: Props) {
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Looping tension",
        data: [65, 59, 80, 81, 26, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  useEffect(() => {
    // Chart.register(Colors);
    Chart.defaults.font.size = 20;
    Chart.defaults.font.weight = "bold";
    const ctx = barChartRef.current;
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data,

        options: {
          responsive: true,
          maintainAspectRatio: true,
          // scales: {
          //   y: {
          //     beginAtZero: true,
          //   },
          // },
        },
      });
    }
  }, [barChartRef]);

  useEffect(() => {
    // Chart.register(Colors);
    Chart.defaults.font.size = 20;
    Chart.defaults.font.weight = "bold";
    const ctx = lineChartRef.current;
    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data,

        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 1,
              to: 0,
              loop: true,
            },
          },
          scales: {
            y: {
              // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 100,
            },
          },
        },
      });
    }
  }, [lineChartRef]);

  return (
    <div className="chart-container">
      <div className="chart-inner">
        <h1>BAR Chart</h1>
        <canvas id="myChart" ref={barChartRef}></canvas>
      </div>
      <div className="chart-inner">
        <h1>LINE Chart</h1>
        <canvas id="myChart" ref={lineChartRef}></canvas>
      </div>
      <div className="chart-inner">
        <h1>PIE Chart</h1>
        {/* <canvas id="myChart" ref={pieChartRef}></canvas> */}
      </div>
    </div>
  );
}

export default ChartPage;
