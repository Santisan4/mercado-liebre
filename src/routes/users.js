const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usersControllers = require("../controllers/usersControllers.js");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//VALIDACIONES

const validateCreateForm = [
    body("nombre").notEmpty().withMessage("Debes completar el campo de Nombre "),
    body("apellido").notEmpty().withMessage("Debes completar el campo de Apellido"),
    body("email")
        .notEmpty().withMessage("Debes completar con un correo").bail()
        .isEmail().withMessage("Debes escribir un formato de correo válido"),
    body("password")
        .notEmpty()
        .isLength({min: 8})
        .withMessage("Tienes que escribir una contraseña"),
    body("category").notEmpty().withMessage("Tienes que elegir una categoria"),
];

const validateLogin = [
    body("email")
        .notEmpty().withMessage("Debes completar con un correo").bail()
        .isEmail().withMessage("Debes escribir un formato de correo válido"),
    body("password").notEmpty()
                    .withMessage("Tienes que escribir una contraseña")    
]

router.get("/", usersControllers.list);

router.get("/login", guestMiddleware, usersControllers.login);
router.post("/login", validateLogin, usersControllers.processLogin);

router.get("/check", function(req, res) {
    if(req.session.usuarioLogueado == undefined) {
        res.send("No estas logueado");
    } else {
        res.send("El usuario logueado es " + req.session.usuarioLogueado.email)
    }
})

router.get("/register", guestMiddleware, usersControllers.register);
router.post("/", validateCreateForm, usersControllers.create);

router.get("/list", usersControllers.list);

//Perfil del usuario
router.get("/profile", authMiddleware, usersControllers.profile);

router.get("/logout", usersControllers.logout);

router.get("/:id", usersControllers.detalle);

//router.get("/edit/:idUser", usersControllers.edit)
//router.put("/edit", function(req, res) {
//    res.send("Fui por put")
//})
router.delete("/delete/:idUser", function(req, res) {
    res.send("estoy viajando por delete")
})


module.exports = router;