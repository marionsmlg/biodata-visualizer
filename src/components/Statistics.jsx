import React, { useEffect, useState } from 'react';
import * as ss from 'simple-statistics';

function calculateStatistics (data) {
  const sporesPerMg = data.map(d => d.sporesPerMg);
  const mean = ss.mean(sporesPerMg);
  const stdDev = ss.standardDeviation(sporesPerMg);
  const stdError = stdDev / Math.sqrt(sporesPerMg.length);

  return {
    mean: mean.toFixed(2),
    stdDev: stdDev.toFixed(2),
    stdError: stdError.toFixed(2),
  };
};

export default function Statistics ({ data, onStatsCalculated }) {

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const groupedData = data.reduce((acc, curr) => {
      if (!acc[curr.strain]) {
        acc[curr.strain] = [];
      }
      acc[curr.strain].push(curr);
      return acc;
    }, {});

    const calculatedStats = Object.keys(groupedData).map(strain => ({
      strain,
      ...calculateStatistics(groupedData[strain]),
    }));
console.log(calculatedStats)
    setStats(calculatedStats);
    onStatsCalculated(calculatedStats);
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <p className="text-lg font-semibold">Statistics</p>
      {stats.map(stat => (
        <div key={stat.strain} className="mb-4">
          <p className="text-lg font-semibold">{stat.strain}</p>
          <p>Mean: {stat.mean}</p>
          <p>Standard Deviation: {stat.stdDev}</p>
          <p>Standard Error: {stat.stdError}</p>
        </div>
      ))}
    </div>
  );
};


