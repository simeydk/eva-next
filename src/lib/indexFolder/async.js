const fs = require('fs')
const path = require('path')
const winattr = require('winattr')

const ISWIN = process.platform.startsWith('win')

module.exports = Object.assign(indexFolder, {
    indexFolderGen,
    fileObject,
})

async function indexFolder(in_path) {
    return await asyncGenToArray(indexFolderGen(in_path))
}

async function* indexFolderGen(in_path) {
    const root = typeof (in_path) === 'string' ? await fileObject(path.dirname(in_path), path.basename(in_path), true) : in_path
    Object.assign(root, { numFiles: 0, numFolders: 0, folderSizeBytes: 0, })

    for (let name of (await fs.promises.readdir(in_path))) {
        const child = await fileObject(in_path, name)
        if (child.isFolder) {
            for await (let descendant of indexFolderGen(child.fullName)) {
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

async function fileObject(inLocation, name, inIsFolder) {
    const location = path.normalize(inLocation)
    const fullName = name ? (location + path.sep + name) : location
    try {

        const stat = await fs.promises.lstat(fullName)
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
    } catch (error) {
        return {
            name,
            location,
            fullName,
            isFolder: inIsFolder,
        }
    }
}

async function asyncGenToArray(generator) {
    const array = [];
    for await (const item of generator) {
        array.push(item);
    }
    return array
}
