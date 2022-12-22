const jwt = require("jsonwebtoken");

const { User } = require("../models");
const RequestError = require("../helpers/RequestError");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
        next(RequestError(401, "Not authorized"));
    }

    try {
        const { id } = req.body;
        if (!id) {
            throw RequestError(401, "Id not found");
        }
        const userById = await User.findOne({ id });
        if (!userById) {
            throw RequestError(401, "Id not found");
        }
        const currentToken = userById.refreshTokens[token] ? userById.refreshTokens[token] : token;
        const verifiedToken = jwt.verify(currentToken, SECRET_KEY);
        const user = await User.findById(verifiedToken.id);
        if (!user || !user.tokens.includes(token)) {
            next(RequestError(401, "Not authorized"));
        }
        req.user = user;

        next();
    } catch (error) {
        next(RequestError(401, error.message));
    }
};

module.exports = authenticate;
