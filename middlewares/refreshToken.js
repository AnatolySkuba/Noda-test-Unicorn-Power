const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const refreshToken = async (req, _res, next) => {
    const { authorization = "" } = req.headers;
    const [_bearer, token] = authorization.split(" ");
    const { _id } = req.user;
    const payload = { id: _id };
    const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "10m" });
    await User.findByIdAndUpdate(_id, { refreshTokens: { [token]: newToken } });

    next();
};

module.exports = refreshToken;
