//REQUERIMIENTOS

const express = require('express');
const path = require('path');
const app = express();
const rutasProductos = require("./src/routes/productos.js");
const rutasMain = require("./src/routes/main.js");
const rutasUsuarios = require("./src/routes/usuarios.js");
const methodOverride = require("method-override");





//app.get('/', (req,res) =>{
//   res.sendFile(path.join(__dirname, './views/index.html'));  // Permite enviar un archivo HTML
//});

//APP USE


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, './public')));
//app.use(express.static(path.join(__dirname, './views')));

app.set("view engine", "ejs")

app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor corriendo en el puerto 3000");
})

// RUTAS
app.use("/", rutasMain);
app.use("/productos", rutasProductos);
app.use("/usuarios", rutasUsuarios);