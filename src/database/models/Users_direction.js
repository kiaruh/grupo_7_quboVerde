module.exports = function (sequelize, dataTypes){

    let alias = "UserDirection";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
  
          user_ID: {
            type: dataTypes.INTEGER,
            allowNull: false,
          },
  
          street: {
            type: dataTypes.STRING,
            allowNull: true,
          },
  
          number: {
            type: dataTypes.INTEGER,
            allowNull: false,
          },
  
          dp: {
            type: dataTypes.STRING,
            allowNull: true,
          },
  
          city: {
            type: dataTypes.STRING,
            allowNull: false,
          },
  
          zipcode: {
            type: dataTypes.INTEGER,
            allowNull: false,
          }
    }

    let config = {
        tableName: "user_directions",
        timestamps: false
    }


    let UserDirection = sequelize.define(alias, cols, config);

    return UserDirection;
}