const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

let productosController = {

    detalle: function(req, res){

        let productosJSON = fs.readFileSync("productos.json", {encoding: "utf-8"});

        let productos = JSON.parse(productosJSON);

        res.render("products/detalleProducto", {"productos": productos})

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

        res.render("products/listaProductos", {"productos": productos});
    },
    formProducto: function (req, res) {

        res.render("products/createProduct");
    },
    crearProducto: function (req, res) {
        let errors = validationResult(req);
        
        if(errors.isEmpty()) {
            if(req.file) {
                let producto = {
                    id: req.body.id,
                    nombre: req.body.nombre,
                    descripcion: req.body.description,
                    imagen: req.file.filename,
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
    
            productosJSON = JSON.stringify(productos, null, 4)
    
            fs.writeFileSync("productos.json", productosJSON)
    
            res.redirect("/productos")
    
            } else {
    
                res.render("products/createProduct");
    
            }

        } else {
            res.render("products/createProduct", {
                errors: errors.mapped(),
                old: req.body
            })
        }

        
    },
    editarProducto: function (req, res) {
        let detalleProducto = req.params.idProducto;

        let productosBase = fs.readFileSync("productos.json", {encoding: "utf-8"})
        let productos = JSON.parse(productosBase);

        let productoAEditar = productos[idProducto];

        res.render("products/productoEditar", {productoAEditar : productoAEditar})

    },

}

module.exports = productosController