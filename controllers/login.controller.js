// Importaciones
const { User } = require('./../models/users.models') 

// Funciones de los endpoints
const postLogin = async (req , res , next)=>{
    // Gestion de errores
     try {
         const { username , password } = req.body                            // Los datos se utilizan del body al ser POST

         const search = await User.findOne( {username , password} )          // Buscar un usuario con los mismos valores que los existentes en el body. Devuelve un objeto al ser findOne

         search ? res.json( {login : true}) : res.json( {login: false} )     // Si hay algun elemento que coincidan, search existirá y el login es true. Al usar findOne en el metodo, si no encuentra no devuelve nada. search no existe

     } catch (err) {
         next( {statusText : err.message} )                                  // Enviar datos de error a través de next al último middleware de tratamiento de errores
     }
}

// Exportaciones
module.exports = {
    postLogin
}