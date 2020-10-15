const router = require("express").Router();
const User = require("../models/User");
const { registerSchema, loginSchema } = require("../schemas/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    await User.find((err, data) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
});

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //VALIDATION USING @hapi/joi
    await registerSchema.validateAsync(req.body);

    //CHECK IF EMAIL ALREADY EXISTS
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      return res.send("Email alerady exists");
    }

    //HASH THE PASSWORD

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.send(error.details[0].message);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //VALIDATION USING @hapi/joi
    await loginSchema.validateAsync(req.body);

    //CHECK IF EMAIL ALREADY EXISTS
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send("Email not Found");
    }

    //COMPARE PASSWORD
    const passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatched) {
      return res.send("Password not Matched");
    }

    //CREATE JWT
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (error) {
    res.send(error.details[0].message);
  }
});

//DELETE
router.delete("/delete/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.send({ msg: "error in deletion" });
    } else {
      res.send({ msg: "deleted successfully" });
    }
  });
});

module.exports = router;
