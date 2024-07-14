console.clear()
console.log( '🟡 JS init')

// Importaciones
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { router } = require('./router/router')

// Variables de entorno

const PORT = process.env.PORT || 3000
const MONGO = process.env.MONGO || "mongodb://127.0.0.1:27017/kudi'"

// Conexión a MongoDB
const connect = async ()=> mongoose.connect(MONGO) // Conexión asíncrona obligatoria en MongoDB
                        .then( ()=> console.log( '🟢 MongoDB connected' ) )
                        .catch( err => console.log( err.message ))
                        connect()

                       
const app = express() // Ejecutar express en app

const corsOptions = {
    origin: 'https://app-kudi.vercel.app', 
    optionsSuccessStatus: 200
};


    // Middlewares
    app.use(cors(corsOptions));
    app.use(express.json())
    app.use(express.urlencoded( { extended: false } ))
    app.use( router )

app.listen( PORT , ()=> console.log( '🟠 API init') )