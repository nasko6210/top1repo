
module.exports=(sequelize,DataTypes)=>{
    const registrationtable=sequelize.define("registrationtable",{
       email:{
        type:DataTypes.STRING,
        allowNull:false
       },
       password:{
        type:DataTypes.STRING,
        allowNull:false
       }
    })
    return registrationtable;
}