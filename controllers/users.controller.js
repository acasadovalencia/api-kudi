// Importaciones
const { User } = require('./../models/users.models') 

// Funciones de los endpoints
    // Añadir usuario
const postUser = async (req , res , next)=>{
    // Gestion de errores
     try {
        const { username , password , favs } = req.body                        // Los datos se obtienen del body al ser POST

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya existe' }) // Enviar un error si el usuario ya existe
        }
        
        const newUser = new User({ username , password , favs})                // Crear nuevo usuario con los mismos parámetros que los existentes

        await newUser.save()                                                   // Guardar el usuario en la bbdd.

        const search = await User.find()                                       // Listar de nuevo todos los usuarios (no se usará porque no se mostrarán todos los usuarios)

        res.json(search)

     } catch (err) {
         next( {statusText : err.message} )                                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
     }
}
    // Modificar usuario
const putUser = async (req , res , next)=>{
    // Gestion de errores
    try {
        const { id , ...data} = req.body                                        // Datos obtenidos del body (...data recoge el resto de datos del objeto)
        
        await User.findByIdAndUpdate(id , data)                                 // Buscar con el id y actualizar con los nuevos datos del body

        const search = await User.find()                                        // Listar de nuevo todos los usuarios (no se usará porque no se mostrarán todos los usuarios)
        
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