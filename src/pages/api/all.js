import search from '../../lib/search'



export default async (req, res) => {
  // const q = req.query.q
  const q = { limit: 3, where: { SourceLocation:'D:\\Downloads'}
}
await search.init()
const results = q ? await search.all(q) : []
res.statusCode = 200
res.json({ q, results })
}
