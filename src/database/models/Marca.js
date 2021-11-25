module.exports = (sequelize, DataTypes) => {
    let alias = "marcas";
    let cols = {
        id:{
            allowNull: false,
            type: DataTypes.INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            allowNull: false,
            type: DataTypes.STRING(30)
        },

    };
    let config = {
        tableName: "marcas",
        timestamps: false,
    };

    const marca = sequelize.define(alias, cols, config);

    marca.associate = (modelos) => {
        marca.hasMany(modelos.productos, {
            as: "productos",
            foreignKey: "marca_id"
        })
    }

    return marca;
}
