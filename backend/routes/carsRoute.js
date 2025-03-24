const express=require("express");
const router=express.Router();
const {carstable}=require("../models");

router.get("/",async(req,res)=>{
    const listOfCars=await carstable.findAll();
    res.json(listOfCars);
})
router.post("/", async(req,res)=>{
    const car=req.body;
    await carstable.create(car);
    res.json(car)
})  
module.exports=router;
 