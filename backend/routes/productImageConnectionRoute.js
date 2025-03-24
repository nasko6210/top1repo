const express=require("express");
const router=express.Router();
const {productimageconnection}=require("../models");

router.get("/:id", async(req,res)=>{
    const id=+req.params.id
   
   // const currentProductImage=await productimageconnection.findByPk(id);
   // res.json(currentProductImage)
})
router.post("/", async(req,res)=>{
    const product=req.body
   console.log(product.length)
   try {
   await    productimageconnection.create(product)
   } catch (error) {
       console.log(error)
   }
})    
module.exports=router 