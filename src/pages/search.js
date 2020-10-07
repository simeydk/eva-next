
import { useState, useEffect } from 'react'
import path from 'path'
import {debounce} from 'lodash'

function useFetch(url, initialvalue = '') {
  const [response, setResponse] = useState(initialvalue)
  useEffect(() => {fetch(url).then(response => response.json()).then(setResponse)}, [url])
  return response
}

function useDraft(initialValue) {
  const [draft, setDraft] = useState(initialValue)
  const [value, setValue] = useState(initialValue)
  const commit = () => setValue(draft)
  const d = debounce(commit,300)
  useEffect(() => {d()},[draft])
  return [draft, setDraft, value, commit]
}

export default function Search() {
  const [draft, setDraft, query, commit] = useDraft('variable xls')
  const response = useFetch(`/api/search?q=${query}`,{q:query,results:[]})

  const debouncedCommit = debounce(commit,600)
  const onChange = async e => {
    await setDraft(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-200 p-1">
      <form onSubmit={e => {e.preventDefault(); commit()} } className="text-xl mx-auto max-w-2xl m-4 p-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg shadow-lg">

        <div className="relative">
          <input type="text" value={draft} onChange={onChange} className="w-full text-xl py-1 px-3 rounded-lg bg-gray-300 text-gray-700 border border-gray-500 focus:outline-none focus:bg-white focus:text-gray-800 focus:border-teal-800 transition-colors duration-100" />
        </div>

      </form>

      <div className="max-w-2xl mx-auto">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          {/* <ul className="bg-white border border-gray-400 w-full divide-y divide-gray-400 rounded-md">
              <li className="py-1 px-2 text-base">Hello</li>
              <li className="py-1 px-2 text-base">My Name is</li>
              <li className="py-1 px-2 text-base">Slim Shady</li>
            </ul> */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
              </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Mod
              </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Size
              </th>
                <th className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 border border-gray-200  shadow-sm rounded-xl">
              {response.results.map(result => <Result {...result}/>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>


  )
}


function Result({name = '', location = '', fullName = '', sizeBytes = 0, mtime=''}) {
  return <tr>
    <td className="px-3 py-1 whitespace-no-wrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8">
          <img className="h-8 w-8" src={`/api/icon?for=${fullName}`} alt="" />
        </div>
        <div className="ml-3">
          <div className="text-sm leading-5 font-medium text-gray-900">
            {name}
          </div>
          <div className="text-sm leading-5 text-gray-500">
            {location}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-no-wrap">
      <div className="text-sm leading-5 text-gray-500">{mtime}</div>
    </td>
    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
      {sizeBytes}
    </td>
    <td className="px-6 py-2 whitespace-no-wrap text-right text-xs leading-5 font-medium">
      <div>
        <a href="#" className="text-indigo-600 hover:text-indigo-900">Copy</a>
      </div>
      <div>
        <a href="#" className="text-indigo-600 hover:text-indigo-900">Copy</a>

      </div>
    </td>
  </tr>;
}

