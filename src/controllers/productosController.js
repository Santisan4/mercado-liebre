let productosController = {

    detalle: function(req, res){

        res.send("Bienvenidos al detalle del producto " + req.params.idProducto);

    },
    detalleComentarios: function(req, res) {

        if(req.params.idComentario == undefined) {
            res.send("Bienvenidos al comentario del producto " + req.params.idProducto);
        }else {
            res.send("Bienvenidos a los comentarios del producto " + req.params.idProducto + " y estas enfocado en el comentario " + req.params.idComentario)
        }
    },

}

module.exports = productosController