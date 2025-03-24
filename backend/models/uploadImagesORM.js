module.exports = (sequelize, DataTypes) => {
    const uploadimagestable = sequelize.define("uploadimagestable", {
        imageName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jobId:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }) 
    return uploadimagestable;
}  