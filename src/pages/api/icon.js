const fs = require('fs')
const { getImageForPath } = require('shell-image-win');

export default (req, res) => {
  const path = req.query.for
  
  getImageForPath(path, { height: 32, width: 32 }, (err, imageBuffer) => {      
      res.setHeader('Content-Type', 'image/jpg')
      res.send(imageBuffer)
      res.end()
    })
}