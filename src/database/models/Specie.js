module.exports = function (sequelize, dataTypes){

    let alias = "Specie";

    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
  
          specie: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
          }
    }

    let config = {
        tableName: "species",
        timestamps: false
    }


    let Specie = sequelize.define(alias, cols, config);


 // va el hasMany `porque una especie puede estar en varios productos
    Specie.associate = function (models) {
        Specie.hasMany(models.Product, {
            as: "products",
            foreignKey: "specie_id"
        })
    }

    return Specie;
}