import search from '../../../lib/search'

export default async (req, res) => {
  await search.init()
  const sources = await search.getSources()
  res.statusCode = 200
  res.json({sources})
}
