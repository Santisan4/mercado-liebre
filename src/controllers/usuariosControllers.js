const { use } = require("../routes/productos");

let usuariosControllers = {

    register: function (req, res) {
        res.render("register")
    },
    login: function(req, res) {
        res.render("login")
    },
    lista: function (req, res) {
        let users = [
            {id: 1, name: "Dario"},
            {id: 2, name: "Javier"},
            {id: 3, name: "Maru"},
            {id: 4, name: "Ale"},
            {id: 5, name: "Santiago"},
        ];

        res.render("userList", { "users" : users });
    },
    buscar: function(req, res) {
        let loQueBuscoElUsuario = req.query.query;
        
        let users = [
            {id: 1, name: "Dario"},
            {id: 2, name: "Javier"},
            {id: 3, name: "Maru"},
            {id: 4, name: "Ale"},
            {id: 5, name: "Santiago"},
        ];

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
            nombre: req.body.nombres,
            email: req.body.email,
            direccion: req.body.direccion,
            nacimiento: req.body.nacimiento

        }
        res.redirect("/usuarios/lista")
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