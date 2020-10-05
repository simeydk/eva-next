
import {useState} from 'react'
import path from 'path'

export default function Search({ time = "time" }) {
  return (
    <div className="min-h-screen bg-gray-200 p-1">
      <form className="text-xl mx-auto max-w-2xl m-4 p-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg shadow-lg">

        <div className="relative">
          <input type="text" value="archer" className="w-full text-xl py-1 px-3 rounded-lg bg-gray-300 text-gray-700 border border-gray-500 focus:outline-none focus:bg-white focus:text-gray-800 focus:border-teal-800 transition-colors duration-100" />
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
            <div></div>
            <tbody className="bg-white divide-y divide-gray-200 border border-gray-200  shadow-sm rounded-xl">
              <Result />
              <Result />
              <Result />
              <Result />
              <Result />

            </tbody>
          </table>
        </div>
      </div>
    </div>


  )
}


const demoFiles = [
  "C:\\Users\\simey\\OneDrive\\Documents\\Siemens Toastmasters Dues April 2020.docx",
  "C:\\Users\\simey\\OneDrive\\Documents\\Default.rdp",
  "C:\\Users\\simey\\OneDrive\\Documents\\Easy-speak made easy 20200716.pptx",
  "C:\\Users\\simey\\OneDrive\\Documents\\OMF Credit Life NDR Estimate 2020-03 (based on SAM 2020 Q3).xlsx",
  "C:\\Users\\simey\\OneDrive\\Documents\\OMART.url",
  "C:\\Users\\simey\\OneDrive\\Documents\\Emma woorde.pptx",
  "D:\\Ebooks\\Calibre Library\\Dave Cullen\\Columbine (47)\\Columbine - Dave Cullen.mobi",
  "D:\\Ebooks\\Calibre Library\\Dave Cullen\\Columbine (47)\\cover.jpg",
  "D:\\Ebooks\\Calibre Library\\Dave Cullen\\Columbine (47)\\metadata.opf",
]

const randomElement = arr => arr[Math.floor(Math.random() * arr.length)]

function Result() {
  const [src, setSrc] = useState(randomElement(demoFiles))
  const filename = path.basename(src)
  return <tr>
    <td className="px-3 py-1 whitespace-no-wrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8">
          <img className="h-8 w-8" src={`/api/icon?for=${src}`} alt="" />
        </div>
        <div className="ml-3">
          <div className="text-sm leading-5 font-medium text-gray-900">
            {/* Kane and Abel - Jeffrey Archer.mobi */}
            {filename}
          </div>
          <div className="text-sm leading-5 text-gray-500">
            D:\Downloads\_Ebooks\Archer, Jeffrey
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-no-wrap">
      <div className="text-sm leading-5 text-gray-500">14 Sep</div>
    </td>
    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
      1.3MB
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

