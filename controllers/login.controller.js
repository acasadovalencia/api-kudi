// Importaciones
const { User } = require('./../models/users.models') 

// Funciones de los endpoints
const postLogin = async (req , res , next)=>{
    // Gestion de errores
     try {
         const { username , password } = req.body                               // Los datos se utilizan en el body al ser POST

         const search = await User.findOne( {username , password} )             // Buscar un usuario con los mismos valores que lo existentes en el body

         search ? res.json( {login : true}) : res.json( {login: false} )        // Si hay algun elemento que coincidan, el login es true.

     } catch (err) {
         next( {statusText : err.message} )                                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
     }
}

// Exportaciones
module.exports = {
    postLogin
}