const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const authentication = require("../Middleware/authentication");

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

router.get("/validator", authentication, async (req, res) => {
  try {
    // console.log("done");

    if (req.getData) {
      res.status(201).json({
        msg: "Authenticated user data is valid.",
        status: 201,
        data: req.getData
      });
    } else {
      res.status(201).json({
        status: 202,
        msg: "No authenticated user found."
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error
    });
  }
});

router.post("/addFood", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData } = req.body;
    if (!sendData) {
      res.status(400).json({
        message: "Please provide the food details!"
      });
    } else {
      const user = req.getData;
      if (!user) {
        res.status(400).json({
          message: "User not Found"
        });
      } else {
        // console.log(user);
        user.addFood.push(...sendData);

        const updatedUser = await user.save();

        res.status(201).json({
          message: "Successfully added to your Food List!",
          status: 201,
          data: updatedUser
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error
    });
  }
});

router.get("/fetchedDataForManagement", async (req, res) => {
  try {
    const fetched = await userdb.find({});
    // console.log(fetched);

    res.status(201).json({
      msg: "Fetched data",
      status: 201,
      data: fetched
    });
  } catch (error) {
    res.status(400).json({
      error: error
    });
  }
});

router.delete("/deleteFood", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    const { addFoodId } = req.body;
    if (!addFoodId) {
      res.status(400).json({
        msg: "Not find id"
      });
    } else {
      const user = req.getData;
      if (!user) {
        res.status(400).json({
          msg: "user not found"
        });
      } else {
        const entryField = user.addFood.find(
          (addFood) => addFood._id.toString() === addFoodId
        );

        if (!entryField) {
          res.status(400).json({
            msg: `This food is not in your list`
          });
        } else {
          // console.log(entryField);
          user.addFood = user.addFood.filter(
            (addFood) => addFood._id.toString() !== addFoodId
          );

          const updatedUser = await user.save();
          res.status(201).json({
            msg: "Delete successfully done",
            data: updatedUser,
            status: 204
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      error: "Error in deleting the food item"
    });
  }
});

module.exports = router;
