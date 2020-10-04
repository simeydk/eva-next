// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import x from 'node-system-icon'

export default (req, res) => {
  console.log(req)
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
