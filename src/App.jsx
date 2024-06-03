import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import Statistics from './components/Statistics';
import BarChartWithErrors from './components/BarChartWithErrors';
import data from './data.js';

function processData (rawData) {
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


function App () {
  const [dataProcessed, setDataProcessed] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setDataProcessed(processData(data));
  }, []);


function handleStatsCalculated (calculatedStats) {
    setStats(calculatedStats);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">BioData Visualizer</h1>
      {dataProcessed.length > 0 && (
        <>
          <DataTable data={dataProcessed} />
          <Statistics data={dataProcessed} onStatsCalculated={handleStatsCalculated} />
          <BarChartWithErrors rawData={stats}/>
        </>
      )}
    </div>
  );
};

export default App;
