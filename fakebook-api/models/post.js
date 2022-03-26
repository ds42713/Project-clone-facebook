module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Post',{
      title: {
          type: DataTypes.STRING, 
      },
      img: {
          type: DataTypes.STRING, 
      },

  },{
      underscored: true,
      tableName: 'post',
  }); 

  model.associate = models =>{
      model.belongsTo(models.User , {
          foreignKey : {
              name: 'userId',
              allowNull: false
          }
      })
      model.hasMany(models.Comment , {
          foreignKey : {
              name: 'postId',
              allowNull: false // ในcommentมี postเสมอ
          }
      })
      model.hasMany(models.Like , {
          foreignKey : {
              name: 'postId',
              allowNull: false // ในcommentมี postเสมอ
          }
      })

  };

  return model;
}