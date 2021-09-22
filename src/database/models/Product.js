module.exports = function (sequelize, dataTypes){

    let alias = "Product";

    let cols = {
        
            id: {
              type: dataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
    
            name: {
              type: dataTypes.STRING,
              allowNull: false,
              unique: true
            },
    
            specie_id: {
              type: dataTypes.INTEGER,
              default: 1
            },
    
            price_id: {
              type: dataTypes.INTEGER,

            },
    
            des: {
              type: dataTypes.TEXT
            },
    
            irr: {
              type: dataTypes.INTEGER
            },
    
            light: {
              type: dataTypes.INTEGER
            },
    
            scale: {
              type: dataTypes.INTEGER
            },
    
            pet: {
              type: dataTypes.INTEGER
            },
    
            diff: {
              type: dataTypes.INTEGER
            },
    
            img_id: {
              type: dataTypes.TEXT // por las dudas que la cadena sea larga
          }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }


    let Product = sequelize.define(alias, cols, config);

    
    // asociaciones - foreignKeys (verificar que funcionen bien despues)

    Product.associate = function (models) {
        Product.belongsTo(models.Specie, {
            as: "especies",
            foreignKey: "specie_id"
        })
    
        Product.belongsTo(models.Price, {
            as: "precios",
            foreignKey: "price_id"
        })
    
    // este esta armado asi porque le quiero mandar un array dentro de un campo. No estoy seguro que sea la mejor idea, pero queda a revisar.
    
        Product.belongsTo(models.Image, {
            as: "imagenes",
            foreignKey: "img_id", 
        })
    }
    

    return Product;
}