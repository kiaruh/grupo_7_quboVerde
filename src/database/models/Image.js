module.exports = function (sequelize, dataTypes){

    let alias = "Image";

    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
  
          image: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
          }
    }

    let config = {
        tableName: "images",
        timestamps: false
    }


    let Image = sequelize.define(alias, cols, config);

     // va el belongsTo porque es un campo de imagen a un producto. Ahora, todo porque quiero guardarlo como un array adentro, sino seria diferente en la DB y en el vinculo
     Image.associate = function (models) {
        Image.hasMany(models.Product, {
            as: "products",
            foreignKey: "img_id"
        })
    }

    return Image;
}