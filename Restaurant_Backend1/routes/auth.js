const express = require("express");
const { postSignup ,logoutUser, loginUser} = require("../controller/auth.js");
const upload = require("../utils/multer.js");
const router = express.Router();
const authMiddleware= require("../middleware/auth.middleware.js");

router.post("/signup", upload.single("image"), postSignup);
router.post("/login", loginUser);
// router.get('/profile', authMiddleware.authUser, getUserProfile)

router.get('/logout', authMiddleware.authUser, logoutUser)

module.exports = router;