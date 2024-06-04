import React, { useEffect, useState } from 'react';
import * as ss from 'simple-statistics';

function calculateStatistics(data) {
  const sporesPerMg = data.map(d => d.sporesPerMg);
  const mean = ss.mean(sporesPerMg);
  const stdDev = ss.standardDeviation(sporesPerMg);
  const stdError = stdDev / Math.sqrt(sporesPerMg.length);

  return {
    mean: mean.toFixed(2),
    stdDev: stdDev.toFixed(2),
    stdError: stdError.toFixed(2),
  };
}

function calculateTTest(data1, data2) {
  const sporesPerMg1 = data1.map(d => d.sporesPerMg);
  const sporesPerMg2 = data2.map(d => d.sporesPerMg);
  const tTestResult = ss.tTestTwoSample(sporesPerMg1, sporesPerMg2, 0);
  return tTestResult.toFixed(3);
}

export default function Statistics({ data, onStatsCalculated }) {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const groupedData = data.reduce((acc, curr) => {
      if (!acc[curr.strain]) {
        acc[curr.strain] = [];
      }
      acc[curr.strain].push(curr);
      return acc;
    }, {});

    const colData = groupedData["Col"];

    const calculatedStats = Object.keys(groupedData).map(strain => {
      const strainData = groupedData[strain];
      const stats = calculateStatistics(strainData);
      if (strain !== "Col") {
        stats.tTest = calculateTTest(colData, strainData);
      }
      return {
        strain,
        ...stats,
      };
    });

    setStats(calculatedStats);
    onStatsCalculated(calculatedStats);
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <p className="text-lg font-semibold mb-2">Statistics</p>
      {stats.map(stat => (
        <div key={stat.strain} className="mb-4">
          <p className="text-gray-700 font-semibold">{stat.strain}</p>
          <p>Mean: {stat.mean}</p>
          <p>Standard Deviation: {stat.stdDev}</p>
          <p>Standard Error: {stat.stdError}</p>
          {stat.tTest && (
            <p>T-Test : {stat.tTest}</p>
          )}
        </div>
      ))}
    </div>
  );
}
