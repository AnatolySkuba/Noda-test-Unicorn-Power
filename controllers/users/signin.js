const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
    const { id, password } = req.body;
    const user = await User.findOne({ id });
    if (!user) {
        throw RequestError(401, "Id not found");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw RequestError(401, "Password wrong");
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10m" });
    await User.findByIdAndUpdate(user._id, { $push: { tokens: token } });

    res.json({
        token,
    });
};

module.exports = signin;
