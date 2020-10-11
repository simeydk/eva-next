import search from '../../../lib/search'

export default async (req, res) => {
  const sources = req.query.sources
  await search.init()
  await search.addSources(sources)
  res.statusCode = 200
  res.send("success")
  res.end()
}
