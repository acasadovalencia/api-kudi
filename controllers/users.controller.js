// Importaciones
const { User } = require('./../models/users.models') 

// Funciones de los endpoints
    // Obtener usuarios
const getUsers = async (req , res , next)=>{
    // Gestion de errores
    try {                                                                      // Obtener el id por params (url)                      
        const search = await User.find()                                       // Mostrar de nuevo los datos (se eliminará)

        res.json(search)

    } catch (err) {
        next( {statusText : err.message} )                                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
    }
}

    // Obtener un usuario
const getUser = async (req , res , next)=>{
    // Gestion de errores
    try {                                                              
        const { id } = req.params                                              // Obtener el id por params (url)    
        const search = await User.findById(id)                                 // Buscar en el array el usuario cuyo id sea el mismo que el introducido por params

        res.json(search)
    
    } catch (err) {
        next( {statusText : err.message} )                                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
    }
}

    // Añadir usuario
const postUser = async (req , res , next)=>{
    // Gestion de errores
     try {
        const { username , password , favs } = req.body                                 // Los datos se obtienen del body al ser POST

        const existingUser = await User.findOne({ username })                           // Buscar un usuario en el array que tenga el mismo username que el pasado por el body
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya existe' })    // Enviar un error si encuentra una coincidencia
        }
        
        const newUser = new User({ username , password , favs})                         // Crear nuevo usuario con los mismos parámetros que los existentes

        await newUser.save()                                                            // Guardar el usuario en la bbdd.

        const search = await User.find()                                                // Listar de nuevo todos los usuarios (no se usará porque no se mostrarán todos los usuarios en pantalla)

        res.json(search)

     } catch (err) {
         next( {statusText : err.message} )                                             // Enviar datos de error a través de next al último middleware de tratamiento de errores
     }
}

    // Modificar usuario
const putUser = async (req , res , next)=>{
    // Gestion de errores
    try {
        const { id , username , ...data} = req.body                                         // Datos obtenidos del body (...data recoge el resto de datos del objeto)

        const existingUser = await User.findOne({ username })                               // Buscar un usuario en el array que tenga el mismo username que el pasado por el body
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya existe' })        // Enviar un error si encuentra una coincidencia
        }
        
        await User.findByIdAndUpdate(id , {username , ...data})                                 // Buscar con el id y actualizar con los nuevos datos del body

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

// Elimimar la pelicula favorita del usuario
const deleteFavMovie = async (req , res , next)=>{
    // Gestion de errores
    try {
        const { userId , movieId } = req.params                               // Obtener los id necesarios para buscar y eliminar                                        
        await User.updateOne(                                                 // Metodo updateOne para actualizar solo el usuario con el id deseado. Se necesitan 2 objetos, el valor buscado y el lugar
            {_id: userId},                                                    // Busqueda de un usuario en la bbdd con el mismo id que el logueado
            {$pull: { movies_favs: {_id: movieId} }}                          // Elimina todos los elementos de movies_favs cuyas id coincidan (entre el objeto de favs de la base de datos y el id de la pelicula)
        )                                       

        const search = await User.find()                                       // Mostrar de nuevo los datos
        res.json(search)

    } catch (err) {
        next( {statusText : err.message} )                                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
    }
}

// Elimimar la serie favorita del usuario
const deleteFavTvshow = async (req , res , next)=>{
    // Gestion de errores
    try {
        const { userId , tvshowId } = req.params                                // Obtener los id necesarios para buscar y eliminar                                        
        await User.updateOne(                                                   // Metodo updateOne para actualizar solo el usuario con el id deseado. Se necesitan 2 objetos, el valor buscado y el lugar
            {_id: userId},                                                      // Busqueda de un usuario en la bbdd con el mismo id que el logueado
            {$pull: { tvshows_favs: {_id: tvshowId} }}                          // Elimina todos los elementos de movies_favs cuyas id coincidan (entre el objeto de favs de la base de datos y el id de la pelicula)
        )                                       

        const search = await User.find()                                       // Mostrar de nuevo los datos
        res.json(search)

    } catch (err) {
        next( {statusText : err.message} )                                     // Enviar datos de error a través de next al último middleware de tratamiento de errores
    }
}

// Exportaciones
module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
    deleteFavMovie,
    deleteFavTvshow
}