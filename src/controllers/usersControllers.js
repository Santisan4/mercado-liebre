const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

let usersControllers = {
    register: (req, res) =>{

        res.render("users/register")
    },

    login: (req, res) => {

        res.render("users/login")
    },
    
    processLogin : (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let archivoUsuario = fs.readFileSync("users.json", { encoding:"utf-8" });

            let usuarios;
            if(archivoUsuario == "") {
                usuarios = [];
            } else {
                usuarios = JSON.parse(archivoUsuario);
            }
            
            let usuarioALoguearse;

            for (let i = 0; i < usuarios.length; i++) {
                if(usuarios[i].email == req.body.email && bcrypt.compareSync(req.body.password, usuarios[i].password)) {
                    usuarioALoguearse = usuarios[i];
                }
            }

            if(usuarioALoguearse == undefined) {
                return res.render("users/login", {errors : [
                    {msg: 'Credenciales invalidas'}
                ]});
            } 

            req.session.usuarioLogueado = usuarioALoguearse;

            if( req.body.recordame != undefined) {
                res.cookie("recordame", usuarioALoguearse.email, { maxAge: 60000 } )

            }

            res.send("success!");

        } else {
            res.render("users/login", {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    list: (req, res) => {
        let archivoJSON = fs.readFileSync("users.json", { encoding: "utf-8" });

        let users = JSON.parse(archivoJSON);

        res.render("users/userList", { "users" : users });

    },

    detalle: (req, res) => {

        

    },

    create: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            let usuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
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

            res.redirect("/users/login")
        
        } else {
            res.render("users/register", {
                 errors : errors.mapped(),
                 old: req.body
            })
        }
        
    }

}

module.exports = usersControllers;