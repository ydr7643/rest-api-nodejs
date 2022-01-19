const express = require('express')
const app = express()
const morgan = require('morgan')

//Configuracion
app.set('json spaces', 2)

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Rutas
app.use(require('./routes/index'))
app.use('/usuarios', require('./routes/usuarios'))

//Server
app.listen(3000, () => {
    console.log('Ejecutando aplicación en el puerto 3000')
})