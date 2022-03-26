module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Friend',{
      status: {
          type: DataTypes.STRING, // REQUESTED, ACCEPTED มีค่าได้2อย่าง ENUM('REQUESTED','ACCEPTED')
          allowNull: false,
          defaultValue: 'REQUESTED',
          validator: {
            isIn: [['ACCEPTED','REQUESTED']]
          },
      },

  },{
      underscored: true,
      tableName: 'friend',
  }); 

  model.associate = models =>{
        model.belongsTo(models.User , {
          as: 'RequestFrom',
            foreignKey : {
                name: 'requestFromId',
                allowNull: false
            }
        })
        model.belongsTo(models.User , {
          as: 'RequestTo',
            foreignKey : {
                name: 'requestToId',
                allowNull: false
            }
        })
  };

  return model;
}