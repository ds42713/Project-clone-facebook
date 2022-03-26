module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('User',{
      firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validator: {
            notEmpty: true
          }
      },
      lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validator: {
            notEmpty: true
          }
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          validator: {
            isEmail: true
          }
      },
      phoneNumber: {
          type: DataTypes.STRING,
          unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImg: {
        type: DataTypes.STRING,
      },

  },{
      underscored: true,
      tableName: 'user',
  }); 

  model.associate = models =>{
        model.hasMany(models.Post , {
            foreignKey : {
                name: 'userId',
                allowNull: false
            }
        })
        model.hasMany(models.Comment , {
            foreignKey : {
                name: 'userId',
                allowNull: false
            }
        })
        model.hasMany(models.Like , {
            foreignKey : {
                name: 'userId',
                allowNull: false
            }
        })
        model.hasMany(models.Friend, {
            as: 'RequestFrom',
            foreignKey: {
                name: 'requestFromId',
                allowNull: false
            }
        })
        model.hasMany(models.Friend, {
            as: 'RequestTo',
            foreignKey: {
                name: 'requestToId',
                allowNull: false
            }
        })
  
  };

  return model;
}