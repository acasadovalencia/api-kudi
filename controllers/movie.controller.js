const getMovie = async (req , res , next)=>{
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

module.exports = {
    getMovie
}