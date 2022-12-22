const { User } = require("../../models");

const logout = async (req, res) => {
    const { authorization = "" } = req.headers;
    const [_bearer, token] = authorization.split(" ");
    const { _id } = req.user;
    const { all } = req.query;
    all === "true"
        ? await User.findByIdAndUpdate(_id, { tokens: [] })
        : await User.findByIdAndUpdate(_id, { $pull: { tokens: token } });

    res.status(204).json({ message: "Logout success" });
};

module.exports = logout;
