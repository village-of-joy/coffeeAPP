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

  const [recordedData, setRecordedData] = useState({
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
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemperature = Math.floor(Math.random() * 30 + 15);
      setTime(prevTime => {
        const newTime = prevTime + 1;

        // 常に最新のデータを更新
        setData(prevData => {
          const newLabels = [...prevData.labels, newTime];
          const newData = [...prevData.datasets[0].data, newTemperature];

          // 最新のデータが30秒を超える場合、最初のデータを削除
          if (newLabels.length > 30) {
            newLabels.shift();
            newData.shift();
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

        // 記録中の場合、recordedDataにも追加
        if (isRunning) {
          setRecordedData(prevRecordedData => {
            const newRecordedLabels = [...prevRecordedData.labels, newTime];
            const newRecordedData = [...prevRecordedData.datasets[0].data, newTemperature];

            return {
              labels: newRecordedLabels,
              datasets: [
                {
                  ...prevRecordedData.datasets[0],
                  data: newRecordedData,
                },
              ],
            };
          });
        }

        return newTime;
      });
    }, 1000); // 1秒ごとに更新

    return () => clearInterval(interval);
  }, [isRunning]);

  // スタートボタンのハンドラー
  const startRecording = () => {
    setRecordedData({
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
    setTime(0);
    setIsRunning(true);
  };

  const stopRecording = () => {
    setIsRunning(false);

    // データをJson形式で保存
    const jsonData = recordedData.labels.map((label, index) => ({
      time: label,
      temperature: recordedData.datasets[0].data[index],
    }));

    console.log("データが保存されました：", JSON.stringify(jsonData));
    // ここでJSONデータを適切に保存することができる
  };

  // y軸の最大値と最小値を計算
  const yMin = Math.min(...data.datasets[0].data) - 5 || 0;
  const yMax = Math.max(...data.datasets[0].data) + 5 || 10;

  return (
    <div className='temperature-graph'>
      <h2>リアルタイム温度グラフ</h2>
      <div>
        {isRunning ? (
          <button onClick={stopRecording} className='data-btn'>データ取得終了</button>
        ) : (
          <button onClick={startRecording} className='data-btn'>データ取得開始</button>
        )}
      </div>
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
                    size: 14,
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
