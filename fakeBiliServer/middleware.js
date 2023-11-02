function tokenErrorHandler(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token')
    }
}

module.exports = { tokenErrorHandler }