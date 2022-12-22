const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../helpers");

const { users } = require("../controllers");

const { authenticate, refreshToken } = require("../middlewares");

router.post("/signup", ctrlWrapper(users.signup));
router.post("/signin", ctrlWrapper(users.signin));
router.get("/info", authenticate, refreshToken, ctrlWrapper(users.info));
router.get("/logout", authenticate, ctrlWrapper(users.logout));

module.exports = router;
