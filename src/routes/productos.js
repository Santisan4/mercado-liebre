const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const multer = require("multer");
const path = require("path")
const productosController = require("../controllers/productosController.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/productos"));

    },
    filename: (req, file, cb) => {
        const newFilename = "producto-" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename)
    }
});

const upload = multer({ storage: storage })
const validations = [
    body("nombre").notEmpty().withMessage("Debes completar el campo de Nombre"),
    body("description").notEmpty().withMessage("Debes completar el campo de Descripción"),
    body("productImage").custom((value, { req }) => {
        let file = req.file;
        if(!file) {
            throw new Error('Tienes que seleccionar una imagen');
        }
        return true;
    }),
    body("category").notEmpty().withMessage("Debes completar el campo de Categoria"),
    body("price").notEmpty().withMessage("Debes completar el campo de Precio")
]



router.get("/", productosController.listaProductos);

router.get("/detalles/:idProducto", productosController.detalle);
router.get("/:idProducto/comentarios/:idComentario?", productosController.detalleComentarios);

router.get("/crear", productosController.formProducto);
router.post("/crear", upload.single("productImage"), validations, productosController.crearProducto);

router.get("/editar/:idProducto", productosController.editarProducto);

module.exports = router;
