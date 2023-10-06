import { response } from 'express'
import jwt from 'jsonwebtoken'
import registroAu from '../models/regiUsu.js'


const validarJWT = async (req, res, next) => {
    
    const token = req.header('metasploit')
    if (!token) {
        return res.status(401).json({
            msg:'no hay peticion'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETKEY)
        
        const registrosUsu = await registroAu.findById(uid)


        //SI EL USUARIO ES EXISTENTE 
        if (!registrosUsu) {
            return res.status(401).json({
                msg: 'token no valido - ID NO EXISTENTE'
            })
        }    
        //verificar si el uid ESTADO 
        if (!registrosUsu.estado) {
            return res.status(401).json({
                msg: 'token no valido - ESTADO'
            })
            
        }
        req.registrosUsu = registrosUsu
        //req.app.set(registrosUsu)
        next();

    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            msg:'token no valido'
        })
        
    }
}
export default validarJWT;