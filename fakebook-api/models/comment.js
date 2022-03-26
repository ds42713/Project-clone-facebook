module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Comment',{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }  
        },
    },{
        underscored: true,
        tableName: 'comment',
    }); 

    model.associate = models =>{
        model.belongsTo( models.User , {
            foreignKey : {
                name: 'userId',
                allowNull: false
            }
        })
        model.belongsTo( models.Post , {
            foreignKey : {
                name: 'postId',
                allowNull: false 
            }
        })
    };

    return model;
}