const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usersControllers = require("../controllers/usersControllers.js");

//VALIDACIONES

const validateCreateForm = [
    body("firstName").notEmpty().withMessage("Debes completar el campo de Nombre "),
    body("lastName").notEmpty().withMessage("Debes completar el campo de Apellido"),
    body("email").isEmail().withMessage("Debes completar con un email válido"),
];



router.get("/", usersControllers.list);

router.get("/login", usersControllers.login);

router.get("/register", usersControllers.register);

router.post("/",validateCreateForm, usersControllers.create);

router.get("/list", usersControllers.list);


router.get("/:id", usersControllers.detalle);

//router.get("/edit/:idUser", usersControllers.edit)
//router.put("/edit", function(req, res) {
//    res.send("Fui por put")
//})
router.delete("/delete/:idUser", function(req, res) {
    res.send("estoy viajando por delete")
})


module.exports = router;