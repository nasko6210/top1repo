module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "Posts",
      timestamps: true, //createdAt /updatedAt
    },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: "userId",
    });
    models.User.hasMany(Post, {
      foreignKey: "userId",
    });
    Post.belongsTo(models.Category, {
      foreignKey: "categoryId",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Post.belongsToMany(models.Attribute, {
      through: models.PostAttribute,
      foreignKey: "postId",
      otherKey: "attributeId",
    });
  };

  return Post;
};
