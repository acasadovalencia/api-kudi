// Importaciones
const express = require('express')
const { postLogin} = require('../controllers/login.controller')
const { getUsers , getUser , postUser , putUser , deleteUser , deleteFavMovie , deleteFavTvshow } = require('../controllers/users.controller')
const { getMovies , getMovie } = require('../controllers/movies.controller') 
const { getTvshows , getTvshow } = require('../controllers/tvshows.controller')
const { getCategories } = require('../controllers/categories.controller')
const router = express.Router()

// Endpoints
    router.route('/login')                                      // Para hacer Login a la APP
        .post(postLogin)

    router.route('/signup')                                     // Para crear usuarios en la APP
        .post(postUser)
        .put(putUser)
    
    router.route('/users')                                      // Para obtener los usuarios y modificarlos
        .get(getUsers)
        .put(putUser)
    
    router.route('/users/:userId/fav_movies/:movieId')          // Para eliminar datos determinados de usuarios
        .delete(deleteFavMovie) 

    router.route('/users/:userId/fav_tvshows/:tvshowId')        // Para eliminar datos determinados de usuarios
        .delete(deleteFavTvshow)
    
    router.route('/user/id/:id')                                // Para obtener el usuario por id y eliminarlo
        .get(getUser)
        .delete(deleteUser)

    router.route('/movies')                                     // Para obtener las películas
        .get(getMovies)

    router.route('/movies/:id')                                 // Para obtener una película por id
        .get(getMovie)

    router.route('/tvshows')                                    // Para obtener las series
        .get(getTvshows)
    
    router.route('/tvshows/:id')                                // Para obtener las series por id
        .get(getTvshow)

    router.route('/categories')                                // Para obtener las series por id
        .get(getCategories)

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