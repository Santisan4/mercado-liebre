module.exports = (sequelize, DataTypes) => {
    let alias = "producto_usuario";
    let cols = {
        id:{
            allowNull: false,
            type: DataTypes.INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
             type: DataTypes.DATE 
        },

        producto_id: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        cantidad_productos: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        monto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eliminado: { 
            type: DataTypes.INTEGER 
        },

        cod_factura: {
            type: DataTypes.INTEGER(30),
            allowNull: false
        }
        
    };
    let config = {
        tableName: "producto_usuario",
        timestamps: false,
    };

    const producto_usuario = sequelize.define(alias, cols, config);

    return producto_usuario;
}
