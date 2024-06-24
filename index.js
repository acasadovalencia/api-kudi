console.clear()
console.log( '🟡 JS init')

// Importaciones
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { router } = require('./router/router')

// Conexión a MongoDB
const connect = async ()=> mongoose.connect('mongodb://127.0.0.1:27017/kudi') // Conexión asíncrona obligatoria en MongoDB
                        .then( ()=> console.log( '🟢 MongoDB connected' ) )
                        .catch( err => console.log( err.message ))
                        connect()
    

const app = express() // Ejecutar express en app

    // Middlewares
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded( { extended: false } ))
    app.use( router )

app.listen( 3000 , ()=> console.log( '🟠 API init') )