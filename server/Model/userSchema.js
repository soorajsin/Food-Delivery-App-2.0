const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "jkhgftrdfvbcdsewrqaszlkjpoiuyblm";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  addFood: [
    {
      fname: String,
      fprice: Number,
      fimg: String,
      fdec: String
    }
  ],
  addToCart: [
    {
      fname: String,
      fprice: Number,
      fimg: String,
      fdec: String
    }
  ],
  buyFood: [
    {
      fname: String,
      fprice: Number,
      fimg: String,
      fdec: String
    }
  ],
  response: [
    {
      fname: String,
      fprice: Number,
      fimg: String,
      fdec: String,
      dname: String,
      dmobile: Number,
      dduration: String
    }
  ]
});

//hash password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    this.password = await bcrypt.hash(user.password, 10);
    this.cpassword = await bcrypt.hash(user.cpassword, 10);
  }

  next();
});

//generate token
userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id
      },
      keysecret
    );

    this.tokens = this.tokens.concat({
      token
    });

    await this.save();
    return token;
  } catch (error) {
    console.log("Error in generating Token : ", error);
  }
};

const userdb = mongoose.model("users", userSchema);
module.exports = userdb;
