import React, { useState } from 'react';
import DataTable from './components/DataTable.jsx';
import Statistics from './components/Statistics.jsx';
import BarChartWithErrors from './components/BarChartWithErrors.jsx';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import { Route, Routes } from 'react-router-dom';

function processData(rawData) {
  return rawData.map(row => {
    const totalSpores = row.sporesPer5Microlitres * 300;
    const sporesPerMg = totalSpores / row.freshWeightMg;

    return {
      strain: row.strain,
      sporesPer5Microlitres: row.sporesPer5Microlitres,
      freshWeightMg: row.freshWeightMg,
      totalSpores,
      sporesPerMg,
    };
  });
};

function App() {
  const [dataProcessed, setDataProcessed] = useState([]);
  const [stats, setStats] = useState([]);

  function handleDataLoaded(jsonData) {
    const processedData = processData(jsonData);
    setDataProcessed(processedData);
  };

  function handleStatsCalculated(calculatedStats) {
    setStats(calculatedStats);
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home onDataLoaded={handleDataLoaded} />} />
            <Route path="/datatable" element={<DataTable data={dataProcessed} />} />
            <Route path="/statistics" element={<Statistics data={dataProcessed} onStatsCalculated={handleStatsCalculated} />} />
            <Route path="/graphics" element={<BarChartWithErrors rawData={stats} />} />
          </Routes>
        </div>
      </Layout>
    </>
  );
};

export default App;
