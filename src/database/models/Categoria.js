module.exports = (sequelize, DataTypes) => {
    let alias = "categorias";
    let cols = {
        id:{
            allowNull: false,
            type: DataTypes.INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            allowNull: false,
            type: DataTypes.INTEGER(30)
        },

    };
    let config = {
        tableName: "categorias",
        timestamps: false,
    };

    const categoria = sequelize.define(alias, cols, config);

    categoria.associate = (modelos) => {
        categoria.hasMany(modelos.productos, {
            as: "productos",
            foreignKey: "categoria_id"
        })
    }

    return categoria;
}
