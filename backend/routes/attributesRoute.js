const express=require("express");
const router=express.Router();
const {Attribute, Type, AttributeOption}=require("../models");

router.get("/:categoryId", async(req,res)=>{
    try{
        const {categoryId}=req.params;
        const attributes=await Attribute.findAll({
            where:{categoryId},
            include:[
                {
                    model:Type,
                    attributes:["field"],
                },
                {
                    model:AttributeOption,
                    attributes:["id","value","slug"]
                },
            ],
            order:[["id","ASC"]]
        });
        res.json(attributes);
    }catch(error){
        console.log("Error fetching attributes:",error);
        res.status(500).json({message:"Server error"})
    }
})
module.exports=router;