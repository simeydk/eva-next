const fs = require('fs')
const { getImageForPath } = require('shell-image-win');

export default (req, res) => {
  const path = req.query.for
  const size = Number(req.query.size) | 32 
  
  try {
    getImageForPath(path, { height: size, width: size }, (err, imageBuffer) => {      
        res.setHeader('Content-Type', 'image/png')
        res.send(imageBuffer)
        res.end()
      })
  } catch {
      res.end()
  }
}
