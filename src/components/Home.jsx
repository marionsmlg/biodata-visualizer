
import { DocumentTextIcon } from '@heroicons/react/24/solid'

export default function Home() {
    return (
        <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
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
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    {/* <p className="text-xs leading-5 text-gray-600">JSON</p> */}
                </div>
            </div>
        </div>
    )
}
