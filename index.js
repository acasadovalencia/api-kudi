console.clear()
console.log( '🟡 JS init')

// Importaciones
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express() // Ejecutar express en app

    // Middlewares
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

