module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define("Type", {
    field: {
      type: DataTypes.STRING, //test,number,select,checkbox
      allowNull: false,
    },
  });
  Type.associate = (models) => {
    Type.hasMany(models.Attribute, {
      foreignKey: "typeId",
    });
  };

  return Type;
};
