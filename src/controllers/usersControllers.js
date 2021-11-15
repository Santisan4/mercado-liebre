const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

let usersControllers = {
    register: (req, res) =>{

        res.render("users/register")
    },

    login: (req, res) => {

        res.render("users/login")
    },

    list: (req, res) => {
        let archivoJSON = fs.readFileSync("users.json", { encoding: "utf-8" });

        let users = JSON.parse(archivoJSON);

        res.render("users/userList", { "users" : users });

    },

    detalle: (req, res) => {

        

    },

    create: (req, res) => {
        let usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
            category: req.body.category
        }

        let archivoUsuario = fs.readFileSync("users.json", { encoding:"utf-8" });

        let usuarios;
        if(archivoUsuario == "") {
            usuarios = [];
        } else {
            usuarios = JSON.parse(archivoUsuario);
        }

        usuarios.push(usuario);
        
        usuariosJSON = JSON.stringify(usuarios, null, 4);

        fs.writeFileSync("users.json", usuariosJSON);

        res.redirect("/users/list")
        
    }

}

module.exports = usersControllers;