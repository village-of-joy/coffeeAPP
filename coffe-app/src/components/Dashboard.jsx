import React, { useEffect, useState } from 'react';
import TemperatureGraph from './TemperatureGraph'; // 先ほどのグラフコンポーネントをインポート
import TemperatureDisplay from './TemperatureDisplay';
import RecordedTemperatureGraph from './RecordedTemperatureGraph';

const Dashboard = () => {
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
        borderColor: 'rgba(225, 55, 100, 1)',
        backgroundColor: 'rgba(225, 55, 100, 0.2)',
        fill: true,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  });

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState(0);  // 新しく現在の温度を保存
  const [jsonData, setJsonData] = useState([]); // jsoonDataを状態として保持

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemperature = Math.floor(Math.random() * 30 + 15);
      setCurrentTemperature(newTemperature);  // 現在の温度を設定

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
          borderColor: 'rgba(225, 55, 100, 1)',
          backgroundColor: 'rgba(225, 55, 100, 0.2)',
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

    setJsonData(jsonData)
    console.log("データが保存されました：", JSON.stringify(jsonData));
    // ここでJSONデータを適切に保存することができる
  };

  return (
    <div className="dashboard">
      <div className="graph-container">
        <TemperatureGraph data={data} />
        <div>
          {isRunning ? (
            <button onClick={stopRecording} className='data-btn'>データ取得終了</button>
          ) : (
            <button onClick={startRecording} className='data-btn'>データ取得開始</button>
          )}
        </div>
      </div>
      <div className='data-container'>
        <div className='display-container'>
          <TemperatureDisplay temperature={currentTemperature} />
        </div>
        <div className='Recorded-data-container'>
          <RecordedTemperatureGraph jsonData={jsonData}/>
        </div>
      </div>
      {/* 他のコンポーネントや要素をここに追加できます */}
    </div>
  );
};

export default Dashboard;
