const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { SignJWT } = require("jose");
const { User } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "importantsecret",
)
// ============================================================
// POST /loginregistration
// Register a new user
// ============================================================
router.post("/", async (req, res) => {
  try {
    const payload = req.body?.data || req.body || {};
    const { email, password } = payload;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email aready in use" });
    }
    const hashedPassowrd = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassowrd });
    return res.status(201).json({ ok: true });
  }  
  catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// ============================================================
// POST /loginregistration/login
// Login an existing user
// ============================================================
router.post("/login", async (req, res) => {
  try {
    const payload = req.body?.data || req.body || {};
    const { email, password } = payload;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const accessToken = await new SignJWT({
      email: user.email,
      id: user.id,
      role: user.role
    }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("14d").sign(SECRET_KEY);
    return res.json({
      token: accessToken,
      email: user.email,
      id: user.id,
      role: user.role
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
});
// ============================================================
// GET /loginregistration/auth
// Validate the accessToken header and return the payload
// ============================================================
router.get("/auth",validateToken,(req,res)=>{
  res.json(req.user);
})
module.exports = router;
