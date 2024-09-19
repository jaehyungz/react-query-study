"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
// import Chart, { ChartConfiguration, ChartItem } from "chart.js/auto";

interface Props {}

function ChartPage(props: Props) {
  const {} = props;

  //   async function drawChart() {
  //     if (document) {
  //       const data = [
  //         { year: 2010, count: 10 },
  //         { year: 2011, count: 20 },
  //         { year: 2012, count: 15 },
  //         { year: 2013, count: 25 },
  //         { year: 2014, count: 22 },
  //         { year: 2015, count: 30 },
  //         { year: 2016, count: 28 },
  //       ];

  //       const chartItem = document.getElementById("chart1") as HTMLCanvasElement;

  //       const config: ChartConfiguration = {
  //         type: "scatter",
  //         data: {
  //           labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //           datasets: [
  //             {
  //               label: "# of Votes",
  //               data: [12, 19, 3, 5, 2, 3],
  //               borderWidth: 1,
  //             },
  //           ],
  //         },
  //         options: {
  //           onClick(event, elements, chart) {
  //             console.log(event);
  //             console.log(chart);
  //           },
  //           scales: {
  //             y: {
  //               beginAtZero: true,
  //             },
  //           },
  //         },
  //       };

  //       const chart = new Chart(chartItem, config);
  //     }
  //   }

  //   useEffect(() => {
  //     drawChart();
  //   }, []);
  const handleButton = () => {
    performance.now();
    return "hello world!";
  };

  return (
    <div>
      <div style={{ width: 800 }}>
        <button onClick={handleButton}>hello</button>
        {/* <canvas id="chart1"></canvas> */}
      </div>
    </div>
  );
}

export default ChartPage;
