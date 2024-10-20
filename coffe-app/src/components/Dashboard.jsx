import React from 'react';
import TemperatureGraph from './TemperatureGraph'; // 先ほどのグラフコンポーネントをインポート

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="graph-container">
        <TemperatureGraph />
      </div>
      {/* 他のコンポーネントや要素をここに追加できます */}
    </div>
  );
};


export default Dashboard;
