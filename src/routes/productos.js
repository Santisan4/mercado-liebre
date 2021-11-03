const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController.js");

// Detalle - Un producto 

router.get('/:idProducto', productosController.detalle);

// Detalle - Comentario - Producto

router.get("/:idProducto/comentarios/:idComentario?", productosController.detalleComentarios);


module.exports = router;
