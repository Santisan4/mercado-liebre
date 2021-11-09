const fs = require("fs");
const { join } = require("path");

let productosController = {

    detalle: function(req, res){

        res.send("Bienvenidos al detalle del producto " + req.params.idProducto);

    },
    detalleComentarios: function(req, res) {

        if(req.params.idComentario == undefined) {
            res.send("Bienvenidos al comentario del producto " + req.params.idProducto);
        }else {
            res.send("Bienvenidos a los comentarios del producto " + req.params.idProducto + " y estas enfocado en el comentario " + req.params.idComentario)
        }
    },
    listaProductos: function (req, res) {
        let productosJSON = fs.readFileSync("productos.json", {encoding: "utf-8"});

        let productos = JSON.parse(productosJSON);

        res.render("listaProductos", {"productos": productos});
    },
    formProducto: function (req, res) {

        res.render("crearProducto");
    },
    crearProducto: function (req, res) {
        let producto = {
            nombre: req.body.name,
            descripcion: req.body.description,
            categoria: req.body.category,
            precio: req.body.price
        }

        let productosJSON = fs.readFileSync("productos.json", {encoding: "utf-8"});
        let productos;
        if(productosJSON == ""){
            productos = []
        }else {
            productos = JSON.parse(productosJSON);
        }

        productos.push(producto);

        productosJSON = JSON.stringify(productos)

        fs.writeFileSync("productos.json", productosJSON)

        res.redirect("/productos")
    },
    editarProducto: function (req, res) {
        let idProducto = req.params.idProducto;

        let productosBase = fs.readFileSync("productos.json", {encoding: "utf-8"})
        let productos = JSON.parse(productosBase);

        let productoAEditar = productos[idProducto];

        res.render("productoEditar", {productoAEditar : productoAEditar})

    },

}

module.exports = productosController