const open = require('open')

export default async (req, res) => {
    try {
        const filePath = req.query.p
        await open(filePath)
        res.statusCode = 200
        res.json({ status: `succesfully opened`, path: filePath })
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}
