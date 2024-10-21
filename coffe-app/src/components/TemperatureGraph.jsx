import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TemperatureGraph = ({ data }) => {
  // y軸の最大値と最小値を計算
  const yMin = Math.min(...data.datasets[0].data) - 5 || 0;
  const yMax = Math.max(...data.datasets[0].data) + 5 || 10;

  return (
    <div className='temperature-graph'>
      <h2>リアルタイム温度グラフ</h2>
      <Line 
        data={data} 
        options={{
          responsive: true,
          maintainAspectRatio: false, 
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: '時間 (秒)',
                font: { size: 14 },
              },
              grid: {
                color: 'rgba(200, 200, 200, 0.5)',
              },
            },
            y: {
              title: {
                display: true,
                text: '温度 (°C)',
                font: { size: 14 },
              },
              grid: {
                color: 'rgba(200, 200, 200, 0.5)',
              },
              min: yMin,
              max: yMax,
            },
          },
        }} 
      />
    </div>
  );
};

export default TemperatureGraph;
