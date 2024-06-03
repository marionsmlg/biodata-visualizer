import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BarWithErrorBarsController, BarWithErrorBar } from 'chartjs-chart-error-bars';

ChartJS.register(
BarWithErrorBarsController, 
BarWithErrorBar,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart ({rawData}) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'left',
            display: false
          },
          title: {
            display: true,
            text: 'Test Pathogénique',
            font: {
                size: 16, 
              },
          },
          
        },
        scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Spores/mg fresh weight',
                font: {
                  size: 16, 
                },
              },
            },
          },
      };


      const data = {
        labels: rawData.map(item => item.strain),
        datasets: [{
          label: 'Spores per Mg',
          data: rawData.map(item => ({
            x: item.strain,
            y: item.mean,
            yMin: item.mean - item.stdError,
            yMax: item.mean + item.stdError,
          })),
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          errorBars: 'y'
        }]
      };
      return (
        <Bar type='barWithErrorBars' options={options} data={data} />
      )
  
};
