module.exports = function (sequelize, dataTypes){

    let alias = "User";

    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
  
          user: {
            type: dataTypes.STRING,
            allowNull: false,
          },

          bday: {
            type: dataTypes.DATEONLY,
            alowNull: false
          },

          firstname: {
            type: dataTypes.STRING,
            allowNull: false,
          },

          lastname: {
            type: dataTypes.STRING,
            allowNull: false,
          },
  
          email: {
            type: dataTypes.STRING,
            alowNull: false,
            unique: true
          },
  
          password: {
            type: dataTypes.INTEGER,
            alowNull: false
          },

          admin: {
            type: dataTypes.INTEGER,
            alowNull: false
          },
  
          avatar: {
            type: dataTypes.STRING,
            alowNull: true,
          },
  
          send_ID: { // puede no tener una direccion ingresada
            type: dataTypes.INTEGER,
            alowNull: true
          },
  
          pm_ID: { // puede no tener un medio de pago ingresado
            type: dataTypes.INTEGER,
            alowNull: true
          }
  
    }

    let config = {
        tableName: "users",
        timestamps: false
    }


    let User = sequelize.define(alias, cols, config);

    return User;
}