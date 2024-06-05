import React, { useState } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/solid';

export default function Home({ onDataLoaded }) {
    const [fileContent, setFileContent] = useState(null);

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setFileContent(json);
                    onDataLoaded(json);  // Pass the data to the parent component
                } catch (err) {
                    console.error('Error parsing JSON:', err);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="col-span-full">
            <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
                Raw data from the pathological test
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-800 focus-within:ring-offset-2 hover:text-gray-800"
                        >
                            <span>Upload your JSON file</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleFileUpload}
                            />
                        </label>
                        {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
