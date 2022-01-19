const { Router } = require('express')
const router = Router()
const _ = require('underscore')

// Obtener el JSON como si fuera una BD
const usuarios = require('../DB-ejemplo.json')

//Obtener todos los usuarios mediante GET
router.get('/', (req, res) => {
    res.json(usuarios)
})

//Obtener un usuario mediante GET
router.get('/:id', (req, res) => {
    const { id } = req.params;
    //Iterar los usuarios
    _.each(usuarios, (usuario, i) => {
        //Si encuentra el numero de documento que se obtiene como parametro
        if (usuario.numero_documento == id) {
            //En el indice, eliminamos solo 1
            res.json(usuario)
        }
    })
    
})

//Crear un usuario mediante POST
router.post('/', (req, res) => {
    //Obtener los elementos del body
    const { nombre, apellido, tipo_documento, numero_documento, correo, celular, fecha_nacimiento } = req.body;
    
    //Validar los elementos
    if (nombre && apellido && tipo_documento && numero_documento && correo && celular && fecha_nacimiento) {
        
        //Almacenarlos en un nuevo objeto
        const newUsuario = {...req.body};

        //Insertar el objeto nuevo
        usuarios.push(newUsuario)

        //Responder con los elementos actualizados
        res.json(usuarios)
    }else{
        res.json({"message": 'No se guardo, campos incompletos'})
    }
})

//Actualizar un usuario mediante PUT
router.put('/:id', (req, res) => {

    //Obtener el id de usuario
    const { id } = req.params;

    //Obtener los elementos del body
    const { nombre, apellido, correo, celular, fecha_nacimiento } = req.body;

    //Validar los elementos
    if (nombre && apellido && correo && celular && fecha_nacimiento) {

        //Iterar los usuarios
        _.each(usuarios, (usuario, i) => {
            
            //Si encuentra el numero de documento que se obtiene como parametro
            if (usuario.numero_documento == id) {
                
                //Asignamos el nuevo valor
                usuario.nombre = nombre;
                usuario.apellido = apellido;
                usuario.correo = correo;
                usuario.celular = celular;
                usuario.fecha_nacimiento = fecha_nacimiento;
            }
        })
        res.json(usuarios)
    }else{
        res.json({"message": 'No se guardo, campos incompletos'})
    }
})

//Eliminar un usuario mediante DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    //Iterar los usuarios
    _.each(usuarios, (usuario, i) => {
        //Si encuentra el numero de documento que se obtiene como parametro
        if (usuario.numero_documento == id) {
            //En el indice, eliminamos solo 1
            usuarios.splice(i, 1)
        }
    })
    res.json(usuarios)
})

module.exports = router;