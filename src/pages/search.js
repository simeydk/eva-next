
import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import Highlighter from 'react-highlight-words'
import filesize from 'filesize'
import formatDate from '../utils/formatDate'

function useFetch(url, initialvalue = '') {
  const [response, setResponse] = useState(initialvalue)
  useEffect(() => { fetch(url).then(response => response.json()).then(setResponse) }, [url])
  return response
}

function useDraft(initialValue) {
  const [draft, setDraft] = useState(initialValue)
  const [value, setValue] = useState(initialValue)
  const commit = () => setValue(draft)
  const d = debounce(commit, 300)
  useEffect(() => { d() }, [draft])
  return [draft, setDraft, value, commit]
}

export default function Search() {
  const [draft, setDraft, query, commit] = useDraft('.pdf')
  const response = useFetch(`/api/search?q=${query}`, { q: query, results: [] })

  return (
    <div className="min-h-screen bg-gray-200 p-1">
      <div className="mx-auto max-w-4xl">
        <form onSubmit={e => { e.preventDefault(); commit() }} className="text-xl mx-auto max-w-4xl m-4 p-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg shadow-lg">
          <div className="relative">
            <input type="text" value={draft} onChange={e => setDraft(e.target.value)} className="w-full text-xl py-1 px-3 rounded-lg bg-gray-300 text-gray-700 border border-gray-500 focus:outline-none focus:bg-white focus:text-gray-800 focus:border-teal-800 transition-colors duration-100" />
          </div>
        </form>
        {response.results.length === 0 ? null :
          <div className="max-w-4xl mx-auto">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {/* <thead>
                  <tr className="bg-gray-100">
                    <TH className="text-left"> Name </TH>
                    <TH className="text-right"> Mod </TH>
                    <TH className="text-right"> Size </TH>
                    <TH className="text-right"></TH>
                  </tr>
                </thead> */}
                <tbody className="bg-white divide-y divide-gray-200 border border-gray-200  shadow-sm rounded-xl">
                  {response.results.map(result => <Result {...result} searchWords={response.q.split(' ')} key={JSON.stringify(result)} />)}
                </tbody>
              </table>
            </div>
          </div>}
      </div>

    </div>


  )
}


function TH({children, className = ""}) {
  return <th className={"px-4 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider " + className}>
    {children}
  </th>
}

function Result({ name = '', location = '', fullName = '', sizeBytes = 0, mtime = '', searchWords = [], hidden = false, system = false, archive = false }) {
  return <tr className={(hidden || system) ? "opacity-75" : ""}>
    <td className="px-3 py-2 whitespace-no-wrap">
      <div className="flex">
        <div className="flex-shrink-0 h-6 w-6 pt-1">
          <img className="h-6 w-6" src={`/api/icon?for=${fullName}`} alt="" />
        </div>
        <div className="ml-3">
          <div className="text-base leading-5 font-medium text-gray-900 whitespace-normal">
            <Highlighter highlightClassName="bg-yellow-200" searchWords={searchWords} autoEscape={true} textToHighlight={name} />
          </div>
          <div className="text-xs leading-tight text-gray-500 whitespace-normal">
            {location}
          </div>
        </div>
      </div>
    </td>
    <td className="px-2 py-4 whitespace-no-wrap text-right text-sm leading-5 text-gray-500">
      {formatDate(new Date(mtime))}
    </td>
    <td className="px-2 py-4 whitespace-no-wrap text-right text-sm leading-5 text-gray-500">
      {filesize(sizeBytes, { round: 1 })}
    </td>
    <td className="px-2 py-1 whitespace-no-wrap text-right text-xs leading-tight font-medium">
      <div>
        <a href="#" className="text-indigo-600 hover:text-indigo-900">Copy</a>
      </div>
      <div>
        <a href="#" className="text-indigo-600 hover:text-indigo-900">Copy</a>

      </div>
    </td>
  </tr>;
}

