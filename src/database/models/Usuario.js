function usuariosData (sequelize, DataTypes) {
    let alias = "usuarios";
    let cols = {
        id:{
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        },

        nombre: {
            allowNull: false,
            type: DataTypes.STRING(50)
        },
        apellido: {
            allowNull: false,
            type: DataTypes.STRING(50)

        },
        email: {
            allowNull: false,
            type: DataTypes.STRING(50)

        },
        pass: {
            allowNull: false,
            type: DataTypes.STRING(50)
        },

    };
    let config = {
        tableName: "usuarios",
        timestamps: false,
    };

    const usuario = sequelize.define(alias, cols, config);

    usuario.associate = function (modelos) {
        usuario.belongsToMany(modelos.productos, {
            as: "productos",
            through: "compra_productos",
            foreignKey: "usuario_id",
            otherKey: "producto_id",
            timestamps: false
        })
    }

    return usuario;
}

module.exports = usuariosData;