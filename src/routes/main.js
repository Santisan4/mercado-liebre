const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers.js");



router.get("/", mainControllers.index);

router.get("/contacto", function(req, res) {
    res.send("Dejanos tu contacto!")
})


module.exports = router;