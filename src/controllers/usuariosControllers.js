const { use } = require("../routes/productos");
const fs = require("fs");

let usuariosControllers = {

    register: function (req, res) {
        res.render("register")
    },
    login: function(req, res) {
        res.render("login")
    },
    lista: function (req, res) {
        let archivoJSON = fs.readFileSync("usuarios.json",{encoding: "utf-8"});

        let users = JSON.parse(archivoJSON);

        res.render("userList", { "users" : users });
    },
    buscar: function(req, res) {
        let loQueBuscoElUsuario = req.query.query;

        let archivoJSON = fs.readFileSync("usuarios.json",{encoding: "utf-8"});

        let users = JSON.parse(archivoJSON);

        let usersResults =[];

        for(let i = 0; i < users.length; i++){
            if(users[i].name.includes(loQueBuscoElUsuario)){
                usersResults.push(users[i]);
            }
        }
        res.render("userResults", {usersResults: usersResults})
    },
    create: function(req, res) {
        let usuario = {
            nombre: req.body.firstName,
            email: req.body.email,
            direccion: req.body.direccion,
            nacimiento: req.body.nacimiento,
            password: req.body.password,
            categoria: req.body.category
        }

        let archivoUsiario = fs.readFileSync("usuarios.json", {encoding: "utf-8"});
        let usuarios;
        if( archivoUsiario == ""){
            usuarios = []
        }else {

            usuarios = JSON.parse(archivoUsiario);
        }
        
        usuarios.push(usuario);

        usuariosJSON = JSON.stringify(usuarios);

        fs.writeFileSync("usuarios.json", usuariosJSON);


        res.redirect("/usuarios/lista");
    },

    edit: function(req, res) {
        let idUser = req.params.idUser;

        let users = [
            {id: 1, name: "Dario"},
            {id: 2, name: "Javier"},
            {id: 3, name: "Maru"},
            {id: 4, name: "Ale"},
            {id: 5, name: "Santiago"},
        ];

        let userToEdit = users[idUser];

        res.render("userEdit", {userToEdit: userToEdit}); 
    }
}

module.exports = usuariosControllers;