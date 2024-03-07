const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const signUpValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().required()
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const fetchUsers = async (req, res) => {
  let users = await User.find();
  res.send(users);
};

const postUser = async (req, res, next) => {
  try {
    await signUpValidation.validateAsync(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    let errors = err.details.map(el => { //this error is only from joi validation
      console.log(err);
      return {
        field: el.context.key,
        name: err.name,
        message: el.message,
      };
    });
    return res.send({ errors });
  }

  //email validation
  
  try {
    // if (await User.findOne({ email: req.body.email })) {
    //   return res.send({
    //     field: 'email',
    //     message: 'email already exists'
    //   });
    // }
    let hashed = await bcrypt.hash(req.body.password, 10);
    let user = await User.create({ ...req.body, password: hashed });
    // user = user.toObject()
    // delete user.password //hides password field while posting

    user.password = undefined;//another way to hide password field
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    await loginValidation.validateAsync(req.body, { abortEarly: false });
  } catch (err) {
    return res.send(err);
  }

  try {
    if (!(await User.findOne({ email: req.body.email }))) {
      return res.send("Invalid Credentials");
    }
    let user = await User.findOne(
      { email: req.body.email }
    );
    let status = await bcrypt.compare(req.body.password, user.password);
    user.password = undefined
    if (status) {
      user = user.toObject();
      let token = jwt.sign(user, "shhhhh");
      res.send({
        token,
      });
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  fetchUsers,
  postUser,
  loginUser,
};
