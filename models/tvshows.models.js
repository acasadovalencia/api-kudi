// Importaciones
const mongoose = require('mongoose')
const { tvshowsSchema } = require('../schemas/tvshows.schema')

// Crear modelo

const Tvshows = mongoose.model('Tvshows' , tvshowsSchema)

// Exportaciones
module.exports = {
    Tvshows
}
