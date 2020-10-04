const fs = require('fs')
const path = require('path')
const winattr = require('winattr')

const ISWIN = process.platform.startsWith('win')

module.exports = Object.assign(indexFolder, {
    indexFolderGen,
    fileObject,
})

function indexFolder(in_path) {
    return Array.from(indexFolderGen(in_path))
}

function* indexFolderGen(in_path) {
    const root = typeof (in_path) === 'string' ? fileObject(path.dirname(in_path), path.basename(in_path)) : in_path
    Object.assign(root, { numFiles: 0, numFolders: 0, folderSizeBytes: 0, })

    for (let name of fs.readdirSync(in_path)) {
        const child = fileObject(in_path, name)
        if (child.isFolder) {
            for (let descendant of indexFolderGen(child.fullName)) {
                root.folderSizeBytes += descendant.sizeBytes
                descendant.isFolder ? root.numFolders++ : root.numFiles++
                yield descendant
            }
            // No yield obj here, since folders yield themselves (as root)
        } else {
            root.numFiles++
            yield child
        }
        root.folderSizeBytes += child.sizeBytes
    }
    yield root
}

function fileObject(inLocation, name) {
    const location = path.normalize(inLocation)
    const fullName = name ? (location + path.sep + name) : location
    const stat = fs.lstatSync(fullName)
    const attributes = ISWIN ? winattr.getSync(fullName) : { hidden: name.startsWith('.') }
    return {
        name,
        location,
        fullName,
        isFolder: stat.isDirectory(),
        sizeBytes: stat.size,
        atime: stat.atime,
        ctime: stat.ctime,
        mtime: stat.mtime,
        ...attributes
    }
}
