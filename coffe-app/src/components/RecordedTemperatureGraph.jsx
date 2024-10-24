import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.jsの設定
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RecordedTemperatureGraph = ({ jsonData }) => {
  // グラフ用のデータフォーマットを生成
  const graphData = {
    labels: jsonData.map(item => `${item.time}秒`),  // X軸は時間（秒）
    datasets: [
      {
        label: '記録された温度 (°C)',
        data: jsonData.map(item => item.temperature),  // Y軸は温度
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
    ],
  };

  // グラフのオプション設定
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: '時間 (秒)',
        },
      },
      y: {
        title: {
          display: true,
          text: '温度 (°C)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="recorded-temperature-graph">
      <h2>記録された温度データ</h2>
      <Line data={graphData} options={options} />
    </div>
  );
};

export default RecordedTemperatureGraph;
