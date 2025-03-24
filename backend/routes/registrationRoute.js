const express = require("express");
const router = express.Router();
const { registrationtable } = require("../models");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/login", async (req, res) => {
  const { email, password } = req.body.data

  const user = await registrationtable.
    findOne({ where: { email: email } })
  if (!user) {
    res.json({ error: "user doesnt exist" })
  }
  else {
    if (password == user.password) {
      const accessToken = sign({ email: user.email, id: user.id }, "importantsecret")
      res.json({ token: accessToken, email: user.email, id: user.id })
    } else {
      res.json({ error: "incorrect email/password" })
    }
  }
})
router.post("/", async (req, res) => {
  const accountInfo = req.body
  console.log(accountInfo)
  try {
    await registrationtable.create(accountInfo.data)
  } catch (error) {
    console.log(error)
  }
})
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user)
})
module.exports = router