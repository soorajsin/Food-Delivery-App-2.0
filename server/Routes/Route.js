const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, cpassword, role } = req.body;
    if (!name || !email || !password || !cpassword || !role) {
      return res.status(400).json({ msg: "Please fill all fields" });
    } else {
      const checkUser = await userdb.findOne({ email });

      if (checkUser) {
        res
          .status(400)
          .json({ status: 202, msg: "Email is already registered!" });
        // console.log(checkUser);
      } else {
        // console.log("done");
        const newForm = new userdb({ name, email, password, cpassword, role });

        const updatedUser = await newForm.save();

        res.status(201).json({
          msg: "Registered successsfully done",
          data: updatedUser,
          status: 201
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Register failed"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "please enter your email and password" });
    } else {
      const checkUser = await userdb.findOne({ email });

      if (!checkUser) {
        return res
          .status(400)
          .json({ status: 202, msg: "No User Found with this Email" });
      } else {
        const veriFiedPassword = await bcrypt.compare(
          password,
          checkUser.password
        );

        if (!veriFiedPassword) {
          return res
            .status(400)
            .json({ status: 203, msg: "Invalid Password!" });
        } else {
          // console.log("done");

          const token = await checkUser.generateToken();
          // console.log(token);

          //generate cookie
          res.cookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
          });

          const result = {
            checkUser,
            token
          };

          res.status(201).json({
            msg: "Login successfully done",
            status: 201,
            data: result
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to login"
    });
  }
});

module.exports = router;
