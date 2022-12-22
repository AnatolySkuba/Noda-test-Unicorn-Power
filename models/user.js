const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        id: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        id_type: {
            type: String,
        },
        tokens: {
            type: Array,
            default: [],
        },
        refreshTokens: {
            type: Object,
            default: {},
        },
    },
    { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = {
    User,
};
