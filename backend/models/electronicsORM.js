module.exports=(sequelize,DataTypes)=>{
    const electronicstable=sequelize.define("electronicstable",{
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        subCategory:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:true
        },
        price:{
            type:DataTypes.STRING,
            allowNull:true
        },
        phoneNumber:{
            type:DataTypes.STRING,
            allowNull:true
        }

    })
return electronicstable;
}