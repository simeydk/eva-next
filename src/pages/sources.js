
import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import filesize from 'filesize'


const HeroIcons = {

  document: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>,
  folder: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>,
  pie: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
  </svg>,
  pencil: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>,
  refresh: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>,
  trash: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>,

}


function useFetch(url, initialvalue = '') {
  const [response, setResponse] = useState(initialvalue)
  const refresh = () => fetch(url).then(response => response.json()).then(setResponse) 
  useEffect(refresh, [url])
  return [response, refresh]
}

function useDraft(initialValue) {
  const [draft, setDraft] = useState(initialValue)
  const [value, setValue] = useState(initialValue)
  const commit = () => setValue(draft)
  const d = debounce(commit, 300)
  useEffect(() => { d() }, [draft])
  return [draft, setDraft, value, commit]
}

export default function Sources() {
  const [response, refreshResponse] = useFetch(`/api/sources`, { sources: [] })
  const { sources } = response
  const updateAll = () => {fetch('/api/sources/update').then(refreshResponse)}
  return (
    <div className="min-h-screen bg-gray-200 p-1">
      <div className="mx-auto max-w-2xl">
        <div className="flex px-4 justify-between">
        <h1 className="text-2xl font-bold my-2">Sources</h1>
        <button onClick={updateAll} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-200">
        <HeroIcons.refresh className="h-6 mt-px" />
      </button>
        </div>
        {sources.length === 0 ? null :
          <div className="max-w-4xl mx-auto">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200 border border-gray-200  shadow-sm rounded-xl">
                  {sources.map(Source)}
                </tbody>
              </table>
            </div>
          </div>}
      </div>

    </div>


  )
}


function TH({ children, className = "" }) {
  return <th className={"px-4 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider " + className}>
    {children}
  </th>
}

function Source({ location = '', DirEntries, refresh, remove }) {
  const { entries = 0, folders = 0, totalSizeBytes = 0} = DirEntries[0] || {}
  const files = entries - folders
  const filesText = Number(files).toLocaleString()
  const foldersText = Number(folders).toLocaleString()
  const sizeText = filesize(totalSizeBytes, { round: 1 })

  if (!refresh) refresh = () => { }
  if (!remove) remove = () => { }

  return (<tr >
    <td className="px-3 py-2 whitespace-no-wrap">
      <div className="flex">
        <div className="flex-shrink-0 h-6 w-6">
          <img className="h-6 w-6" src={`/api/icon?for=${location}`} alt="" />
        </div>
        <div className="ml-3">
          <div className="leading-5 whitespace-normal mb-1">
            {location}
          </div>
          <div className="flex gap-3 text-xs">
            <div className="whitespace-no-wrap text-right text-sm leading-5 text-gray-500">
              <div className="flex justify-end items-center gap-1">
                <div>
                  {filesText}
                </div>
                <div className="flex-shrink-0 h-4 w-4">
                  <HeroIcons.document className="text-gray-400 h-4 mt-px" />
                </div>
              </div>
            </div>
            <div className="whitespace-no-wrap text-right text-sm leading-5 text-gray-500">
              <div className="flex justify-end items-center gap-1">
                <div>
                  {foldersText}
                </div>
                <div className="flex-shrink-0 h-4 w-4">
                  <HeroIcons.folder className="text-gray-400 h-4 mt-px" />
                </div>
              </div>
            </div>
            <div className="whitespace-no-wrap text-right text-sm leading-5 text-gray-500">
              <div className="flex justify-end items-center gap-1">
                <div>
                  {sizeText}
                </div>
                <div className="flex-shrink-0 h-4 w-4">
                  <HeroIcons.pie className="text-gray-400 h-4 mt-px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </td>
    <td className="w-2">
      <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-200">
        <HeroIcons.pencil className="h-6 mt-px" />
      </button>
    </td>
    <td className="w-2">
      <button onClick={refresh} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-200">
        <HeroIcons.refresh className="h-6 mt-px" />
      </button>
    </td>
    <td className="w-2">
      <button onClick={remove} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-200">
        <HeroIcons.trash className="h-6 mt-px" />
      </button>
    </td>
  </tr>);
}
