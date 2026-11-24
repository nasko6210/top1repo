module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  Category.associate = (models) => {
    // parent conection
    Category.belongsTo(models.Category, {
      as: "Parent",
      foreignKey: "parentId",
    });
    //children conection
    Category.hasMany(models.Category, {
      as: "Children",
      foreignKey: "parentId",
    });
    Category.hasMany(models.Post, {
      foreignKey: "categoryId",
    });
    Category.hasMany(models.Attribute, {
      foreignKey: "categoryId",
    });
  };
  return Category;
};
