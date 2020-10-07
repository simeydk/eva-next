import search from '../../lib/search'



export default async (req, res) => {
  const q = req.query.q
  await search.init()
  const results = q ? await search.search(q) : []
  res.statusCode = 200
  res.json({q, results})
}
