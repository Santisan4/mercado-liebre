//REQUERIMIENTOS

const express = require('express');
const path = require('path');
const app = express();
const rutasProductos = require("./src/routes/productos.js");
const rutasMain = require("./src/routes/main.js");
const rutasUsuarios = require("./src/routes/users.js");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const recordameMiddleware = require("./src/middlewares/recordameMiddleware")




//MIDDLEWARES
app.use(express.static(path.join(__dirname, './public')));

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({secret: "Secreto!!"}));
app.use(cookieParser());
app.use(recordameMiddleware);


app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor corriendo en el puerto 3000");
})

// RUTAS
app.use("/", rutasMain);
app.use("/productos", rutasProductos);
app.use("/users", rutasUsuarios);


//ERROR

app.use((req, res, next) => {
    res.status(404).render("not-found");
})