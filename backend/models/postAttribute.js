module.exports = (sequelize, DataTypes) => {
  const PostAttribute = sequelize.define(
    "PostAttribute",
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attributeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "PostAttributes",
      timestamps: true,
    },
  );

  return PostAttribute;
};
