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

router.put("/updateFood", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData, addFoodId } = req.body;
    if (!sendData || !addFoodId) {
      res.status(400).json({
        msg: "Missing Data"
      });
    } else {
      const user = req.getData;
      if (!user) {
        res.status(400).json({
          msg: "user not found"
        });
      } else {
        const entryFieldIndex = user.addFood.findIndex(
          (addFood) => addFood._id.toString() === addFoodId
        );

        if (entryFieldIndex === -1) {
          res.status(400).json({
            msg: "This field does not already exist."
          });
        } else {
          // Update the fields using the index
          user.addFood[entryFieldIndex].fname = sendData.fname;
          user.addFood[entryFieldIndex].fprice = sendData.fprice;
          user.addFood[entryFieldIndex].fimg = sendData.fimg;
          user.addFood[entryFieldIndex].fdec = sendData.fdec;

          const updatedUser = await user.save();
          res.status(201).json({
            msg: "Update food data successfully done",
            status: 205,
            data: updatedUser
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "failed to update"
    });
  }
});

router.post("/addToCart", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    const { addFoodId } = req.body;
    if (!addFoodId) {
      res.status(400).json({
        msg: "Plz fills all fields"
      });
    } else {
      const user = req.getData;
      if (!user) {
        res.status(400).json({
          msg: "Please login first"
        });
      } else {
        const entryField = user.addFood.find(
          (addFood) => addFood._id.toString() === addFoodId
        );

        if (!entryField) {
          res.status(400).json({
            msg: `This Food is not in your menu list`
          });
        } else {
          // console.log(entryField);
          user.addToCart.push(entryField);
          const updatedUser = await user.save();

          res.status(201).json({
            msg: "Succesffully  added to cart!",
            status: 206,
            data: updatedUser
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to addToCart"
    });
  }
});

router.post("/buyToFood", authentication, async (req, res) => {
  try {
    console.log(req.body);
    // const { addToCartId } = req.body;
    // if (!addToCartId) {
    //   res.status(400).json({
    //     msg: "not find add to cart id"
    //   });
    // } else {
    //   const user = req.getData;
    //   if (!user) {
    //     res.status(400).json({
    //       msg: "user not found"
    //     });
    //   } else {
    //     const entryField = user.addToCart.find(
    //       (addToCart) => addToCart._id.toString() === addToCartId
    //     );
    //     if (!entryField) {
    //       res.status(400).json({
    //         msg: "This item is not in your shopping list."
    //       });
    //     } else {
    //       // console.log(entryField);
    //       user.buyFood.push(entryField);
    //       const updatedUser = await user.save();

    //       res.status(201).json({
    //         msg: "Succesffully  buy!",
    //         status: 207,
    //         data: updatedUser
    //       });
    //     }
    //   }
    // }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to buy"
    });
  }
});

router.post("/responseUserFood", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData, buyFoodId } = req.body;
    if (!sendData || !buyFoodId) {
      res.status(400).json({
        msg: "Please provide all the necessary information!"
      });
    } else {
      const user = req.getData;
      if (!user) {
        res.status(400).json({
          msg: "You are not logged in!"
        });
      } else {
        const entryField = user.buyFood.find(
          (buyFood) => buyFood._id.toString() === buyFoodId
        );
        if (!entryField) {
          res.status(404).json({ msg: "No such food found on your list" });
        } else {
          // console.log(sendData);
          user.response.push(sendData);

          const updatedUser = await user.save();
          res.status(201).json({
            msg: "Successfully  responded!",
            status: 208,
            data: updatedUser
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to response"
    });
  }
});

router.delete("/deleteResponsed", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    const { responseId } = req.body;
    if (!responseId) {
      res.status(400).json({
        msg: "Please provide the id of the response you want to delete."
      });
    } else {
      const user = req.getData;
      if (!user) {
        res.status(400).json({
          msg: "Invalid User"
        });
      } else {
        const entryField = user.response.find(
          (response) => response._id.toString() === responseId
        );
        if (!entryField) {
          res.status(400).json({
            msg: `No such response with this ID exists in your profile.`
          });
        } else {
          user.response = user.response.filter(
            (response) => response._id.toString() !== responseId
          );

          const updatedUser = await user.save();
          res.status(400).json({
            msg: "delete successfully",
            status: 209,
            data: updatedUser
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

router.put("/responseUpdate", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData, responseId } = req.body;
    if (!sendData || !responseId) {
      return res.status(400).json({ msg: "Please provide all fields." });
    } else {
      const user = req.getData;
      if (!user) {
        res.status(401).json({
          msg: "Invalid user"
        });
      } else {
        const entryField = user.response.findIndex(
          (response) => response._id.toString() === responseId
        );
        if (entryField === -1) {
          res.status(400).json({
            msg: "This field does not already exist."
          });
        } else {
          // console.log(entryField);
          user.response[entryField].dname = sendData.dname;
          user.response[entryField].dmobile = sendData.dmobile;
          user.response[entryField].dduration = sendData.dduration;

          const updatedUser = await user.save();
          res.status(201).json({
            msg: "response update",
            status: 210,
            data: updatedUser
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error
    });
  }
});

module.exports = router;
