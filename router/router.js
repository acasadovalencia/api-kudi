// Importaciones
const express = require('express')
const { postLogin} = require('../controllers/login.controller')
const { postUser , putUser , deleteUser } = require('../controllers/users.controller') 
const router = express.Router()

// Endpoints
    router.route('/login')
        .post(postLogin)

    router.route('/signup')
        .post(postUser)
        .put(putUser)
    
    router.route('/user/id/:id')
        .delete(deleteUser)

    // Middleware de gestion de errores
    router.all( '*' , (req , res , next)=>{                                   
        const err = new Error()                                     // Si llega a este middleware porque exista un error, crea un nuevo error
        err.status = 404                                            // Se asigna a err.status el valor 404
        err.statusText = '404 Endpoint not found'                   // Se asigna a err.statusText el valor 404
        next(err)                                                   // Se envía el error por next al siguiente middleware
    })
    router.use((err , req , res , next)=>{                          // Middleware de gestion de errores
        let {statusText , status} = err                             // Crear variable err con los datos que recibimos del error creado anteriormente
        status = status || 500                                      // Mostrar el status del error y si no existe el 500 por defecto
        statusText = statusText || 'Internal Server error 500'      // Mostrar el texto de error y si no existe uno predefinido
        res.status(status).json({status , statusText})              // Devolver el status y el texto de status
    })


// Exportaciones
module.exports = {
    router
}