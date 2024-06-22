const jwt = require('../../utils/jsonwebtoken')

isAuthenticated = async function (req, res, next) {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {

        const token = authHeader.substring(7)
        const { id } = await jwt.decodeSessionToken(token)
        req.user = { id: id }
        return next()
    } else {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}

module.exports = {
    isAuthenticated
}