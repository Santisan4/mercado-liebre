const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const db = require("../database/models");

let horaActual = new Date().toISOString().
replace(/T/, ' ').      // replace T with a space
replace(/\..+/, '')     // delete the dot and everything after

let usersControllers = {
    register: (req, res) =>{
        res.render("users/register")
    },

    login: (req, res) => {

        res.render("users/login")
    },
    
    processLogin : (req, res) => {

        let resultadoValidacion = validationResult(req)
        
        if (resultadoValidacion.errors.length <= 0) {

            let emailRecibido = req.body.email;
            let passwordRecibida = req.body.password;
            let recordarUsuario = req.body.recordarUsuario;
            
            let usuarioEncontrado 
            
            db.usuario.findAll()
            .then(usuarios => {
                usuarios.forEach(usuario => {
                    if (usuario.email == emailRecibido) {
                        usuarioEncontrado = usuario;
                    }
                })

                if(usuarioEncontrado == undefined){
                    let error = [{
                        value: "",
                        msg: "Email inválido",
                    }]
                    res.render("./users/login", {data: {session: req.session, errores: error}})
                }

                let passwordCorrecta = bcrypt.compareSync(passwordRecibida, usuarioEncontrado.contraseña);

                if (!passwordCorrecta) {
                    let error = [{
                        value: "",
                        msg: "Contraseña incorrecta",
                    }]
                    res.render("./users/login", {data: {session: req.session, errores: error}})
                } else {
        
                    if (Boolean(recordarUsuario)) {
                        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 //Esto equivale a un día en milisegundos
                    }
        
                    req.session.usuarioLogueado = true

                    db.usuario.findByPk(usuarioEncontrado.id)
                    .then(usuario => {
                        req.session.idUsuario = usuario.id
                        req.session.admin = usuario.admin

                        db.producto.findAll({where: {usuario_id: req.session.idUsuario, eliminado: null}})
                        .then(productosUsuario => {
                            req.session.productosUsuario = productosUsuario
                            res.redirect('/')
                        })
                    })

                }

            })

        } else {
            
            res.render("./users/login", {data: {session: req.session, errores: resultadoValidacion.errors}})
        }
          
    },

    list: (req, res) => {
        // let archivoJSON = fs.readFileSync("users.json", { encoding: "utf-8" });

        // let users = JSON.parse(archivoJSON);

        // res.render("users/userList", { "users" : users });

    },

    detalle: (req, res) => {

        

    },

    create: (req, res) => {
        let resultadoValidacion = validationResult(req)


        if (resultadoValidacion.errors.length <= 0) {
            
            let passwordHasheada = bcrypt.hashSync(req.body.password, 10);
            
            // Hora para los timestamps
            let horaActual = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')     // delete the dot and everything after
            
            let usuarioNuevo = {
                created_at: horaActual,
                updated_at: horaActual,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                pass: passwordHasheada,
            }
    
            db.usuario.create(usuarioNuevo)
            
            res.redirect('/users/login')

        } else {
            res.render("./users/register", {data: {session: req.session, errores: resultadoValidacion.errors}})
        }
         
    },

    profile: function (req, res) {
        return res.render("users/userProfile", {
            user: req.session.userLogged
        });
    },

    logout: function (req, res) {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/");
    }
}

module.exports = usersControllers;