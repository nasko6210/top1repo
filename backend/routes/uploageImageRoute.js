const express = require("express");
const router = express.Router();
const { uploadimagestable } = require("../models");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'B:/vscode/sellme/top1/frontend/src/pictures')
    },
    filename: (req, file, cb) => {

        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: storage })


router.get(`/:id`, async (req, res) => {
    const id = +req.params.id
    const post = await uploadimagestable.findByPk(id);

    res.send([url, post.imageName])
})


router.post("/", upload.array("images"), async (req, res) => {
   
    const files = req.files
 
   
    const imagesArray = []
    for(let i=0; i<files.length; i++){
      imagesArray.push(files[i].filename)

    }
    //for (let i = 0; i < files.length; i++) {
    //    const image = await uploadimagestable.create({ imageName: files[i].filename });
    //    imagesArray.push(image)
    //    if (i == files.length-1) {
    //        res.send(imagesArray)
    //    }
    //}  
res.send(imagesArray)
})
router.delete("/:id", async (req, res) => {
    const id = +req.params.id
    const post = await uploadimagestable.findByPk(id)
    if (!post) {
        res.status(404).send("Post Not Found");
        return
    }
    console.log(`Successfully deleted post id: ${id} name: ${post.imageName}`)
    res.send(post)
})
module.exports = router; 