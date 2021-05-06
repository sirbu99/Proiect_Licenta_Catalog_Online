const jwt = require('jsonwebtoken');

exports.checkAuth = async(req, res, next) => {
    const decodedData = jwt.verify(req.get('Authorization'), process.env.JWT_SECRET);
    if (!decodedData.id) {
        return res.sendStatus(401)
    }
    process.env.AUTH_ID = decodedData.id;

    next();
}