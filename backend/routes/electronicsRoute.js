const express=require("express");
const router=express.Router();
const {electronicstable}=require("../models");
const multer=require("multer");

const storage=multer.memoryStorage();
const upload=multer({storage:storage});

router.get("/", async(req,res)=>{
    const listOfElectronics=await electronicstable.findAll();
    res.json(listOfElectronics)
})
router.post("/", async(req,res)=>{
    const electronic=req.body;
    await electronicstable.create(electronic);
    res.json(electronic)
})
router.post("/upload",upload.single("image"),async(req,res)=>{
    console.log(req.file)
})
module.exports=router;
