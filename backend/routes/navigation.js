const express = require("express");
const router = express.Router();
const { Category } = require('../models');
const { useEffect, useState } = require("react");

router.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories: ", error);
        res.status(500).json({ message: "Server error", data: [] });
    }
})


module.exports = router;
