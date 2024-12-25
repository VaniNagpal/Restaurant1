const express = require("express");
const { postLogin, postSignup ,logoutUser} = require("../controller/auth.js");
const upload = require("../utils/multer.js");
const router = express.Router();
const authMiddleware= require("../middleware/auth.middleware.js");

router.post("/signup", upload.single("image"), postSignup);
router.post("/login", postLogin);
// router.get('/profile', authMiddleware.authUser, getUserProfile)

router.get('/logout', authMiddleware.authUser, logoutUser)

module.exports = router;