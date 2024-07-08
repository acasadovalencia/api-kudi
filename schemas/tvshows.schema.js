// Importaciones
const mongoose = require('mongoose')

// Crear schemas
const tvshowsSchema = new mongoose.Schema(
    {title:String , runtime:Number , episodes:Number , rating:Number , pegi:String , description:String , director:Array , cast:Array , producers:Array , genre:Array , country:String , language:String , subtitle:String , release:Number , company:String , poster:Object , trailer:String},
    {collection: 'tvshows' , versionKey : false}
)

// Exportaciones
module.exports = {
    tvshowsSchema
}