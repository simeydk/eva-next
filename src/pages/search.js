
export default function Search({ time = "time" }) {
  return (
    <div className="min-h-screen bg-gray-200 p-1">
      <form class="text-xl mx-auto max-w-xl m-4 p-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg shadow-lg">

          <div className="relative">
            <input type="text" value="archer" className="w-full text-xl py-1 px-3 rounded-lg bg-gray-300 text-gray-700 border border-gray-500 focus:outline-none focus:bg-white focus:text-gray-800 focus:border-teal-800 transition-colors duration-100" />
          </div>
    
      </form>

      <div className="max-w-xl mx-auto">
            {/* <ul className="bg-white border border-gray-400 w-full divide-y divide-gray-400 rounded-md">
              <li className="py-1 px-2 text-base">Hello</li>
              <li className="py-1 px-2 text-base">My Name is</li>
              <li className="py-1 px-2 text-base">Slim Shady</li>
            </ul> */}
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-3 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Mod
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th class="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <div></div>
          <tbody class="bg-white divide-y divide-gray-200 border border-gray-200  shadow-sm rounded-xl">
            <Result />
            <Result />
            <Result />
            <Result />
            <Result />

          </tbody>
          </table>
      </div>

    </div>


  )
}

function Result() {
  return <tr>
    <td class="px-3 py-1 whitespace-no-wrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-8 w-8">
          <img class="h-8 w-8" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
        </div>
        <div class="ml-3">
          <div class="text-sm leading-5 font-medium text-gray-900">
            Kane and Abel - Jeffrey Archer.mobi
          </div>
          <div class="text-sm leading-5 text-gray-500">
            D: \Downloads\_Ebooks\Archer, Jeffrey
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <div class="text-sm leading-5 text-gray-500">14 Sep</div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
      1.3MB
    </td>
    <td class="px-6 py-2 whitespace-no-wrap text-right text-xs leading-5 font-medium">
      <div>
        <a href="#" class="text-indigo-600 hover:text-indigo-900">Copy</a>
      </div>
      <div>
        <a href="#" class="text-indigo-600 hover:text-indigo-900">Copy</a>

      </div>
    </td>
  </tr>;
}

