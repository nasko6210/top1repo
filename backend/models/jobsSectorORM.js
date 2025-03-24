module.exports=(sequelize,DataTypes)=>{
    const jobssectortable=sequelize.define("jobssectortable",{
        jobSector:{
            type:DataTypes.STRING,
            allowNull:false
        },
        jobId:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }) 

return jobssectortable;
}