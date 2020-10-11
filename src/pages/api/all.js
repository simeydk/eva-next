import search from '../../lib/search'



export default async (req, res) => {
  const q = req.query.q ? JSON.parse(req.query.q) : {}
  await search.init()
  const results = await search.all(q)
  res.statusCode = 200
  res.json({ q, results })
}
