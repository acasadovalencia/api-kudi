// Importaciones
const {Tvshows} = require('../models/tvshows.models')

const getTvshows = async (req , res , next)=>{
    
    try {
        const search = await Tvshows.find()
        res.json(search)

    } catch (err) {
        next( {statusText : err.message} )                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
    }
}

const getTvshow = async (req , res , next)=>{
    // Gestion de errores
    try {
        const { id } = req.params                              // Enviaremos el id de la pelicula a mostrar por params (url)                     

        const search = await Tvshows.findById(id)               // Buscar la pelicula por su id y guardarla en variable

        res.json(search)                                                               

    } catch (err) {
        next( {statusText : err.message} )                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
    }
}

module.exports = {
    getTvshows,
    getTvshow
}