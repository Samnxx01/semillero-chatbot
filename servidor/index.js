import express from 'express'
import morgan from 'morgan'
import {Server as Socketserver } from 'socket.io'
import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './routes/apis.js'
import login from './routes/auth.js'
import categorias from './routes/categorias.js'
import dot from 'dotenv'
//import db from './database/db.js'

//configuracion a mongoose
mongoose.Promise = global.Promise 

const app = express()



//Creamos el servidor con el modulo http
const server = http.createServer(app)
const io = new Socketserver(server,{
    cors:{
        origin: '*'
    }
})

//conexion de middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/api', router)
app.use('/api/auth', login)
app.use('/api/categorias', categorias)


io.on('connection', (socket)=>{
    console.log(socket.id)
    console.log("Cliente conectado")


    socket.on('message',(message,nickname)=>{
        socket.broadcast.emit('message',{
            body: message,
            from: nickname
        })
    })
})

//variables de entorno
dot.config();
const url = process.env.MONGODB_URI; 
const PORT = process.env.PORT;




//conexion a la BDD Y PETICIONES
mongoose.connect(url,{useNewUrlParser:true}).then(()=>{
    console.log('Conexion a la db exitosa')
    server.listen(PORT, ()=>{
        console.log('servidor ejecutandose en http://localhost',PORT)
    })
})