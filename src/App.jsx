// import { Fragment, useState, useEffect } from 'react'
// import { Dialog, Transition,Listbox } from '@headlessui/react'

// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'



// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function App() {
//   const[skinType, setSkinType] = useState([])
//   const [selected, setSelected] = useState({name:'Normale', id:""})

//   useEffect(() => {
//     async function fetchData (){
//       try {
//         const queryString = `/api/v1/skin-types`;
//         const url = "https://purecare-api-fastify-production.up.railway.app" + queryString;
//         const response = await fetch(url);
//         const data = await response.json();
//         setSkinType(data)
//         setSelected(data[3])
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchData()
//   }, []);

//   return (
//     <>
//       <Listbox value={selected} onChange={setSelected}>
//       {({ open }) => (
//         <>
//           <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Type de peau</Listbox.Label>
//           <div className="relative mt-2">
//             <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
//               <span className="block truncate">{selected.name}</span>
//               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                 <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </span>
//             </Listbox.Button>

//             <Transition
//               show={open}
//               as={Fragment}
//               leave="transition ease-in duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
       
//               <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                 {skinType.map((person) => (
//                   <Listbox.Option
//                     key={person.id}
//                     className={({ active }) =>
//                       classNames(
//                         active ? 'bg-indigo-600 text-white' : 'text-gray-900',
//                         'relative cursor-default select-none py-2 pl-3 pr-9'
//                       )
//                     }
//                     value={person}
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
//                           {person.name}
//                         </span>

//                         {selected ? (
//                           <span
//                             className={classNames(
//                               active ? 'text-white' : 'text-indigo-600',
//                               'absolute inset-y-0 right-0 flex items-center pr-4'
//                             )}
//                           >
//                             <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </Listbox.Option>
//                 ))}
//               </Listbox.Options>
//             </Transition>
//           </div>
//         </>
//       )}
//     </Listbox>




//     </>

    
//   )
// }
import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import Statistics from './components/Statistics';

import data from './data';

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


function App  () {
  const [dataProcessed, setDataProcessed] = useState([]);

  useEffect(() => {
    setDataProcessed(processData(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">BioData Visualizer</h1>
      {dataProcessed.length > 0 && (
        <>
          <DataTable data={dataProcessed} />
      
          <Statistics data={dataProcessed}  />
        
        </>
      )}
    </div>
  );
};

export default App;
