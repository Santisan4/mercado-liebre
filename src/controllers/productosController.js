const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const db = require("../database/models");

let productosController = {

    detalle: function(req, res){

        let productosJSON = fs.readFileSync("productos.json", {encoding: "utf-8"});

        let productos = JSON.parse(productosJSON);

        res.render("products/detalleProducto", {"productos": productos})

    },
    listaProductos: function (req, res) {
    
        db.productos.findAll().then((productos) => {

                let listaProductos = [];

                for (producto of productos) {
                    listaProductos.push(producto.nombre);
                } 

                console.log("ver: ", listaProductos);
                res.render("products/listaProductos", {productos: listaProductos});
            })
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

    detalle: function(req, res) {
        db.Productos.findByPk(req.params.id)
            .then(function(){
                res.render("products/detalleProduct", { producto: producto })
            });

    }

}

module.exports = productosController