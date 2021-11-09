const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController.js");

router.get("/", productosController.listaProductos);

router.get("/detalles/:idProducto", productosController.detalle);
router.get("/productos/:idProducto/comentarios/:idComentario?", productosController.detalleComentarios);

router.get("/crear", productosController.formProducto);
router.post("/crear", productosController.crearProducto);

router.get("/editar/:idProducto", productosController.editarProducto);

module.exports = router;
