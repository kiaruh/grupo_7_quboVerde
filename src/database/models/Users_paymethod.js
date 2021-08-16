module.exports = function (sequelize, dataTypes){

    let alias = "UserPM";

    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
  
          user_ID: {
            type: dataTypes.INTEGER,
            allowNull: false
          },
  
          number: {
            type: dataTypes.INTEGER,
            allowNull: false
          },
  
          bank: {
            type: dataTypes.STRING,
            allowNull: false
          },
  
          expdate: {
            type: dataTypes.NUMBER,
            allowNull: false
          }
    }

    let config = {
        tableName: "user_paymethod",
        timestamps: false
    }


    let UserPM = sequelize.define(alias, cols, config);

    return UserPM;
}