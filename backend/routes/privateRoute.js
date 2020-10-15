const router = require("express").Router();
const User = require("../models/User");
const validate = require("./validation");

router.get("/", validate, async (req, res) => {
  try {
    const validUser = await User.findOne({ _id: req.user._id });
    res.json(validUser);
  } catch (error) {
    res.send("Token Failed");
  }
});

module.exports = router;
