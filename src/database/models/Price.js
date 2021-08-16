module.exports = function (sequelize, dataTypes){

    let alias = "Price";

    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
  
          price: {
            type: dataTypes.INTEGER,
            allowNull: false,
          },
  
          discount: {
            type: dataTypes.INTEGER,
            allowNull: true,
          }
    }

    let config = {
        tableName: "price",
        timestamps: false
    }


    let Price = sequelize.define(alias, cols, config);

    
    // va el belongsTo porque es un producto a un precio
   Price.associate = function (models) {
        Price.hasMany(models.Product, {
            as: "product",
            foreignKey: "price_id"
        })
    }
  


    return Price;
}