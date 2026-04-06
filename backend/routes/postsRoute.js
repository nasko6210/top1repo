const express = require("express");
const router = express.Router();
const { Post } = require("../models");
const { Attribute, Type, AttributeOption } = require("../models");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching cars: ", error);
    res.status(500).json({ message: "Server error", data: [] });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await Post.findAll({
      where: {
        categoryId: id,
      },
    });

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    res.status(500).json({ message: "Server error", data: [] });
  }
});

router.get("/:categoryId/:postId", async (req, res) => {
  try {
    
    const { categoryId, postId } = req.params;
    const attributeOptionsMapper = new Map();

    const attributes = await Attribute.findAll({
      attributes: ['categoryId', 'typeId', 'name', 'id'],
      where: {
        categoryId
      },
      include: [
        {
          model: Type,
          attributes: ['field'],
          requred: true
        }
      ]
    })
    console.log('attrbutes: ', attributes);

    attributes.forEach( async (element) => {

      const attributeOption = await AttributeOption.findOne({
        where: {
          attributeId: element.id
        }
      })

      attributeOptionsMapper.set(element.id, attributeOption?.dataValues.value);
    });

    const post = await Post.findByPk(postId)

    console.log('attributeOptionsMapper: ', attributeOptionsMapper)

    res.status(200).json({
      attributes,
      post
    })
  } catch (error) {
    console.error("Error fetching single post: ", error);
    res.status(500).json({ message: "Server error", data: [] });
  }
})


module.exports = router;
