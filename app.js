const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req,res) =>{
   res.sendFile(path.join(__dirname, './views/index.html'));  // Permite enviar un archivo HTML
});

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, './views/register.html'));
 });
 

app.use(express.static(path.join(__dirname, './public')));

app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor corriendo en el puerto 3000");
})
