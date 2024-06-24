// Importaciones
const { User } = require('./../models/users.models') 

// Funciones de los endpoints
    // Añadir usuario
const postUser = async (req , res , next)=>{
    // Gestion de errores
     try {
        const { username , password , favs } = req.body                        // Los datos se obtienen en el body al ser POST

        const newUser = new User({username , password , favs})                 // Crear nuevo usuario con los mismos parámetros que los existentes

        await newUser.save()                                                   // Guardar el usuario en la bbdd.

        const search = await User.find()

        res.json(search)

     } catch (err) {
         next( {statusText : err.message} )                                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
     }
}
    // Modificar usuario
const putUser = async (req , res , next)=>{
    // Gestion de errores
    try {
        const { id , ...data} = req.body                                        // Datos obtenidos en el body
        
        await User.findByIdAndUpdate(id , data)                                 // Buscar y actualizar con los datos

        const search = await User.find()                                        // Listar de nuevo todos los usuarios
        
        res.json(search)

    } catch (err) {
        next( {statusText : err.message} )                                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
    }
}
    // Eliminar usuario
const deleteUser = async (req , res , next)=>{
    // Gestion de errores
    try {
        const { id } = req.params                                              // Obtener el id por params (url)                      

        await User.findByIdAndDelete(id)                                       // Buscar y eliminar el usuario con el id anterior   

        const search = await User.find()                                       // Mostrar de nuevo los datos (se eliminará)

        res.json(search)

    } catch (err) {
        next( {statusText : err.message} )                                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
    }
}

// Exportaciones
module.exports = {
    postUser,
    putUser,
    deleteUser
}