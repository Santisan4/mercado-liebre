module.exports = (sequelize, DataTypes) => {
    let alias = "productos";
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE
        },

        nombre: {
            type: DataTypes.INTEGER(500),
            allowNull: false
        },

        imagen: {
            type: DataTypes.STRING(100)
        },

        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        precio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        color: {
            type: DataTypes.STRING(300),
            allowNull: false
        },

        marca_id: {
            type: DataTypes.STRING(300),
            allowNull: false
        },

        categoria_id: {
            type: DataTypes.STRING(300),
            allowNull: false
        }

    };
    let config = {
        camelCase: false,
        tableName: "productos",
        timestamps: false,
    };

    const producto = sequelize.define(alias, cols, config);

    producto.associate = (modelos) => {

        producto.belongsTo(modelos.marcas, {
            as: "marcas",
            foreignKey: "marca_id"
        });
        
        producto.belongsTo(modelos.categorias, {
            as: "categoria",
            foreignKey: "categoria_id"
        });

        producto.belongsToMany(modelos.usuarios, {

            as: "usuarios",
            through: "productos_usuario",
            foreignKey: "producto",
            otherKey: "usuario_id",
            timestamps: false
            
        })
        
    }

    return producto;
}
