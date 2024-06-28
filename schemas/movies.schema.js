// Importaciones
const mongoose = require('mongoose')

// Crear schemas
const moviesSchema = new mongoose.Schema(
    {title:String , runtime:Number , rating:Number , pegi:String , description:String , director:String , cast:Array , producers:Array , genre:Array , country:String , language:String , subtitle:String , release:Number , company:String , poster:Object , trailer:String},
    {collection: 'movies' , versionKey : false}
)

// Exportaciones
module.exports = {
    moviesSchema
}