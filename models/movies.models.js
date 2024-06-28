// Importaciones
const mongoose = require('mongoose')
const { moviesSchema } = require('../schemas/movies.schema')

// Crear modelo

const Movies = mongoose.model('Movies' , moviesSchema)

// Exportaciones
module.exports = {
    Movies
}
