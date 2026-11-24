module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define(
    "Attribute",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );
  Attribute.associate = (models) => {
    Attribute.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });
    Attribute.belongsTo(models.Type, {
      foreignKey: "typeId",
    });
    Attribute.belongsToMany(models.Post, {
      through: models.PostAttribute,
      foreignKey: "attributeId",
      otherKey: "postId",
    });
    Attribute.hasMany(models.AttributeOption, {
      foreignKey: "attributeId",
    });
  };
  return Attribute;
};
