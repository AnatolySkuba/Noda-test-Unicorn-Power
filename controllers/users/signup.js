const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
    const { id, password } = req.body;
    const id_type = id.match(/.+@.+\..+/) ? "email" : "phone";
    const userUsed = await User.findOne({ id });
    if (userUsed) {
        throw RequestError(409, "Id in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
        id,
        password: hashPassword,
        id_type,
    });
    const user = await User.findOne({ id });
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10m" });
    await User.findByIdAndUpdate(user._id, { $push: { tokens: token } });

    res.status(201).json({
        token,
    });
};

module.exports = signup;
