const fs = require('fs')
const path = require('path')
const { Op } = require('sequelize')
const indexFolder = require('../indexFolder/async')
const setupSequelize = require('./sequelize')


let models
let sequelize

async function init() {
    sequelize = await setupSequelize()
    models = sequelize.models
    // console.log('done setting up sequelize', sequelize.models)
}

async function update(sources) {
    const where = sources ? { location: sources } : {}
    for (const source of await models.Source.findAll({ where, logging: console.log } )) {
        const numDestroyedRows = (await models.DirEntry.destroy({
            where: { SourceLocation: source.dataValues.location},
        }))
        // console.log({source: source.dataValues.location, numDestroyedRows})
        const dirEntries = await models.DirEntry.bulkCreate(await indexFolder(source.location))
        await source.addDirEntries(dirEntries)
    }
}

function all(params = {}) {
    return models.DirEntry.findAll(params).then(extractDataValues)
}

function extractDataValues(results) {
    return results.map(result => result.dataValues)
}

async function search(queryString, filesOnly = true) {
    const words = queryString.split(' ')
    if (Math.max(...words.map(w => w.length)) < 3) return []
    const filesOnlyFilter = filesOnly ? { isFolder: false } : {}
    const results = await models.DirEntry.findAll({
        where: {
            [Op.and]: words.map(word => ({ name: { [Op.substring]: word } })),
            ...filesOnlyFilter,
        },
        limit: 20,
    }).then(extractDataValues)
    return results
}

function browse(location) {
    return models.DirEntry.findAll({ where: { location } }).then(extractDataValues)
}

function addSources(sources) {
    if (!Array.isArray(sources)) sources = [sources]
    console.log(sources)
    const missingSources = sources.filter(source => !fs.existsSync(source))
    if (missingSources.length > 0) throw new Error('The following sources do not exist:\n' + missingSources.join('\n'))
    models.Source.bulkCreate(sources.map(path.normalize).map(source => ({ location: source })))
}

function setSources(sources) {
    models.Source.destroy({ where: {}, truncate: true })
    addSources(sources)
}

function removeSources(sources) {
    models.Source.destroy({ where: {Location:'D:\\Ebooks'}, truncate: true, logging: console.log }).then(console.log)
}

function getSources() {

    return models.Source.findAll({
        include: [
            {
                model: models.DirEntry,
                attributes: [
                    [sequelize.fn('count', sequelize.col('name')), 'entries'],
                    [sequelize.fn('sum', sequelize.col('DirEntries.isFolder')), 'folders'],
                    [sequelize.fn('sum', sequelize.col('DirEntries.sizeBytes')), 'totalSizeBytes'],
                ]
            }
        ],
        group: ['source.location'],
    }).then(extractDataValues)
}

module.exports = {
    init,
    all,
    search,
    browse,
    update,
    getSources,
    setSources,
    removeSources,
    addSources,
}
