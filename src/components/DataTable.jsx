import React from 'react';

function DataTable ({ data }) {
  return (
    <table className="min-w-full bg-white border border-gray-200 mb-4">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Lignée</th>
          <th className="py-2 px-4 border-b">Spores/5µl</th>
          <th className="py-2 px-4 border-b">Fresh Weight (mg)</th>
          <th className="py-2 px-4 border-b">Total Spores</th>
          <th className="py-2 px-4 border-b">Spores/mg</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="text-center">
            <td className="py-2 px-4 border-b">{row.strain}</td>
            <td className="py-2 px-4 border-b">{row.sporesPer5Microlitres}</td>
            <td className="py-2 px-4 border-b">{row.freshWeightMg}</td>
            <td className="py-2 px-4 border-b">{row.totalSpores}</td>
            <td className="py-2 px-4 border-b">{row.sporesPerMg.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
