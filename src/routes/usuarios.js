const express = require("express");
const router = express.Router();
const usuariosControllers = require("../controllers/usuariosControllers.js");

router.get("/login", usuariosControllers.login);

router.get("/register", usuariosControllers.register);
router.post("/register", usuariosControllers.create)

router.get("/lista", usuariosControllers.lista);

router.get("/buscar", usuariosControllers.buscar)

router.get("/edit/:idUser", usuariosControllers.edit)
router.put("/edit", function(req, res) {
    res.send("Fui por put")
})
router.delete("/delete/:idUser", function(req, res) {
    res.send("estoy viajando por delete")
})


module.exports = router;