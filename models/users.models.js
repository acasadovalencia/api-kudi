// Importaciones
const mongoose = require('mongoose')
const { userSchema } = require('../schemas/users.schema')

// Crear model
const User = mongoose.model('User' , userSchema)

// Exportaciones
module.exports = {
    User
}