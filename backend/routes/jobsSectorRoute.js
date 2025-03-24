const express = require("express");
const router = express.Router();
const { jobssectortable } = require("../models");

router.get('/:id', async (req, res) => {
  const jobId = +req.params.id
  const jobsSectorArray = await jobssectortable.findAll(jobId);
  res.json(jobsSectorArray)
})
router.post("/", async (req, res) => {
  const jobSectorBody = req.body;
//console.log(jobSectorBody)
  jobSectorBody.jobSector.forEach(async (sector) => {
    try {
       await jobssectortable.create({ jobSector: sector, jobId: jobSectorBody.jobId })
    } catch (error) { 
      console.log(error)
    }
    
  }) 
  
})
module.exports = router; 