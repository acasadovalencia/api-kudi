// Importaciones
const {Movies} = require('../models/movies.models')
const {Tvshows} = require('../models/tvshows.models')


const getCategories = async (req, res, next) => {
    try {
        const movies = await Movies.find();                             // Obtener todas las películas
        const tvshows = await Tvshows.find();                           // Obtener todas las series
        let categories = new Set();                                     // Set para guardar valores sin repetir (MDN)

       
        movies.forEach(movie => {                                       // Por cada pelicula
            movie.genre.forEach(genre => {                              // Devuelve cada género y de cada array de géneros añade cada género
                categories.add(genre);                                  // Al añadirse en el set, se añade sin repetir
            });
        });

        tvshows.forEach(tvshow => {                                     // Igual con cada serie
            tvshow.genre.forEach(genre => {
                categories.add(genre);
            });
        });

        
        res.json(Array.from(categories));                               // Convertir a array lo que devuelve el Set de categorias                           
    } catch (err) {
        next({ statusText: err.message });                              // Manejo de errores
    }
};

module.exports = {
    getCategories
}