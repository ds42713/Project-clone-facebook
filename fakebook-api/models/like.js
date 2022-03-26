module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Like',{

  },{
      underscored: true,
      tableName: 'like',
  }); 

  model.associate = models =>{
      model.belongsTo(models.User , {
          foreignKey : {
              name: 'userId',
              allowNull: false
          }
      })

      model.belongsTo(models.Post , {
          foreignKey : {
              name: 'postId',
              allowNull: false 
          }
      })
  };

  return model;
}
