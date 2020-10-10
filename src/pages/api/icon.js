const fs = require('fs')
const path = require('path')
const { getImageForPath, flags } = require('shell-image-win');
const cloneBuffer = require('clone-buffer')

const ICON_FOLDER = path.join('.data', 'ICONS')

async function getPngIconBuffer(filePath, size = 32, isFolder) {
  if(isFolder === undefined) isFolder = fs.lstatSync(filePath).isDirectory()
  const ext = isFolder ? '_folder' : path.extname(filePath).toLowerCase()
  const iconName = path.join(ICON_FOLDER, `${ext}_${size}.PNG`)
  if (fs.existsSync(iconName)) {
    return fs.promises.readFile(iconName)
  } else {
    const imageBuffer = await getImageForPath(filePath, { height: size, width: size, flags: flags.IconOnly })
    fs.mkdirSync(ICON_FOLDER, { recursive: true })
    fs.promises.writeFile(iconName, cloneBuffer(imageBuffer))
    return imageBuffer
  }
}

export default async (req, res) => {
  const filePath = req.query.for
  const size = Number(req.query.size) | 32
  try {
    const buffer = await getPngIconBuffer(filePath, size)
    res.setHeader('Content-Type', 'image/png')
    await res.send(buffer)
    res.end()
  } catch (error) {
    console.log({error, filePath, size})
    res.send('error')
    res.end()
  }
}
