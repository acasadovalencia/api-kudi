// Importaciones
const {Movies} = require('../models/movies.models')

const getMovies = async (req , res , next)=>{
    const search = await Movies.find()
    res.json(search)
}

module.exports = {
    getMovies
}