import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable.jsx';
import Statistics from './components/Statistics.jsx';
import BarChartWithErrors from './components/BarChartWithErrors.jsx';
import data from './data.js';
import Layout from './components/Layout.jsx'
import { Route, Routes, Link } from "react-router-dom";

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
    <>
    <Layout>
    <div className="container mx-auto p-4">
      {dataProcessed.length > 0 && (
          <>
          <Routes>
            <Route path='/datatable' element={<DataTable data={dataProcessed} />}/>
            <Route path='/statistics' element={<Statistics data={dataProcessed} onStatsCalculated={handleStatsCalculated} />}/>
            <Route path='/graphics' element={<BarChartWithErrors rawData={stats}/>}/>
          </Routes>
          </>
        
      )}
    </div>
    </Layout>
    </>
  );
};

export default App;
