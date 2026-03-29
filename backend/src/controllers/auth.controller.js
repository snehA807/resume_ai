const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model") 

async function registerUserController(req, res) {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }]
  })

  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exist" })
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    username,
    email,
    password: hash
  })

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.jwt_secret,
    { expiresIn: "1d" }
  )

  res.cookie("token", token)

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

async function loginUserController(req, res) {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.jwt_secret,
    { expiresIn: "1d" }
  )

  res.cookie("token", token)

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

async function logoutUserController(req, res) {
  const token = req.cookies?.token

  if (!token) {  
    return res.status(400).json({ message: "No token found" }) 
  }

  await blacklistModel.create({ token }) 

  res.clearCookie("token")

  return res.status(200).json({ message: "Logout successful" })
}

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id)

  res.status(200).json({
    message: "User details fetched successfully",
    user: { 
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController
}