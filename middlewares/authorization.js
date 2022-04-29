const { extractApiKey } = require("../utils/authorizationUtils");
require('dotenv').config();

exports.authorizationMiddleware = (req, res, next) => {
    if (req.method.toLowerCase() === 'options') {
        next();
        return;
    }
    const apiKey = extractApiKey(req);
    if (apiKey) {
        if (apiKey !== process.env.INTERNAL_API_KEY) {
            next(new Error('API key invalid'));
        }
        next();
    } else {
        next(new Error('API key missing'));
    }
};