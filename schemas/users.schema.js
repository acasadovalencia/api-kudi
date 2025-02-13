// Importaciones
const mongoose = require('mongoose')

// Crear Schemas
const userSchema = new mongoose.Schema(
    { username:String , password:String , movies_favs:Array , tvshows_favs:Array },       // Definir los tipos de los datos en la bbdd
    { collection: 'users' , versionKey: false}                     // versionKey para no generar un parámetro con la versión en el registro de bbdd al crear usuarios
)

// Exportaciones
module.exports = {
    userSchema
}