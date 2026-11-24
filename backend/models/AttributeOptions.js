module.exports = (sequelize, DataTypes) => {
  const AttributeOption = sequelize.define(
    "AttributeOption",
    {
      attributeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );
  AttributeOption.associate = (models) => {
    AttributeOption.belongsTo(models.Attribute, {
      foreignKey: "attributeId",
    });
  };
  return AttributeOption;
};
