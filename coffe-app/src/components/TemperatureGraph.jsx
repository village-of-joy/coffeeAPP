import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TemperatureGraph = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '温度 (°C)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  });

  const [time, setTime] = useState(0);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemperature = Math.floor(Math.random() * 30 + 15);
      setTime(prevTime => {
        const newTime = prevTime + 1;

        // データが30秒集まったらフラグを立てる
        if (newTime === 30) {
          setIsDataReady(true);
        }

        // 最新のデータのみ管理
        setData(prevData => {
          const newLabels = [...prevData.labels, newTime];
          const newData = [...prevData.datasets[0].data, newTemperature];

          // 30秒を超えた場合、最初のデータを削除
          if (isDataReady) {
            if (newLabels.length > 30) {
              newLabels.shift();
              newData.shift();
            }
          }

          return {
            labels: newLabels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newData,
              },
            ],
          };
        });

        return newTime;
      });
    }, 1000); // 1秒ごとに更新

    return () => clearInterval(interval);
  }, [isDataReady]);

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
          maintainAspectRatio: false, //アスペクト比を維持しない
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
                font: {
                    size: 14,
                }
              },
              grid: {
                color: 'rgba(200, 200, 200, 0.5)',
              },
            },
            y: {
              title: {
                display: true,
                text: '温度 (°C)',
                font: {
                    size: 14, //フォントサイズ調整
                }
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
