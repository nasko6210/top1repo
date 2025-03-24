const express = require("express");
const router = express.Router();
const { jobstable } = require("../models");
const multer=require("multer")



router.get("/:id", async (req, res) => {
    const id=+req.params.id
    const createdJob = await jobstable.findByPk(id);
    res.json(createdJob)
})

router.post("/", async (req, res) => {
    
    const job = req.body;
    
    try {
         
         res.json(await jobstable.create(job))
    } catch (error) {
        console.log(error)
    }
    
})  
module.exports = router
   