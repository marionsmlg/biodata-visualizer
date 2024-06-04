import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { BarWithErrorBarsController, BarWithErrorBar } from 'chartjs-chart-error-bars';

Chart.register(
  BarWithErrorBarsController,
  BarWithErrorBar
);

function BarChart({ rawData }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'barWithErrorBars',
      data: {
        labels: rawData.map(item => item.strain),
        datasets: [{
          label: 'Spores per Mg',
          data: rawData.map(item => ({
            x: item.strain,
            y: parseFloat(item.mean),
            yMin: parseFloat(item.mean) - parseFloat(item.stdError),
            yMax: parseFloat(item.mean) + parseFloat(item.stdError),
          })),
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'left',
            display: false
          },
          title: {
            display: true,
            text: 'Downy mildew sporulation rates on A. thaliana UPR mutant lines',
            font: context => ({
              size: Math.min(16, context.chart.width / 32),
            }),
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Spores/mg fresh weight',
              font: context => ({
                size: Math.min(16, context.chart.width / 32),
              }),
            },
          },
        },
      }
    });

    chartRef.current = chart;

    return () => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
    };
  }, [rawData]);

  return <div className="relative h-96 w-full"><canvas ref={canvasRef} /></div>;
};

export default BarChart;
