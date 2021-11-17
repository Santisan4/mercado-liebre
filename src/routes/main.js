const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers.js");



router.get("/", mainControllers.index);

router.get("/contacto", function(req, res) {
    res.send("Dejanos tu contacto!")
})

router.get("/pruebaSession", (req, res) => {
    if(req.session.numeroVisitas == undefined) {
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas++;

    res.send("Session tiene el numero: " + req.session.numeroVisitas)
})


module.exports = router;