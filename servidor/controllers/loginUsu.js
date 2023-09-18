import { response } from 'express';
import registros from '../models/regiUsu.js';
import bcryptjs from 'bcryptjs'
import { generarJWT } from '../helpers/generar-jwt.js';

var login = {


    listar: async (req,res) => {

        res.json({
            msg: 'login ok'
        })

        
},


    guardar: async (req, res = response) => {

        const {correo , password} = req.body

        try {
            
            //verificar si el email existe
            const verificar = await registros.findOne({correo});
        
            if(verificar != null){

                //SI el usuario esta activo
    
                if ( !verificar.estado ){
                    return res.status(400).json({
                        msg: 'estado inactivo'
                    })
                }
                
                //verficar la contraseña
            
                const validarcontra = bcryptjs.compareSync(password, verificar.password);
                if (!validarcontra) {
    
                    return res.status(400).json({
                        msg:'Escribio mal la password'
                    }) 
                }
            } else return res.status(400).json({
                msg: 'no se encontro un registro'
            })

            //generar el JWT
            const token = await generarJWT(verificar.id)

            res.status(200).json({
                verificar,
                token

            })
            
        } catch (error) {
            console.log(error)
             res.status(500).json({
                msg: 'hable con el administrador'
            })
            
        }       
},
    guardarAdmin: async (req, res = response) => {

        const {correo , password} = req.body

        try {
            
            //verificar si el email existe
            const auten = await registros.findOne({correo});
        
            if(auten != null){

                //SI el usuario esta activo

                if ( !auten.estado ){
                    return res.status(400).json({
                        msg: 'estado inactivo'
                    })
                }
                
                //verficar la contraseña
            
                const validarcontra = bcryptjs.compareSync(password, auten.password);
                if (!validarcontra) {

                    return res.status(400).json({
                        msg:'Escribio mal la password'
                    }) 
                }
            } else return res.status(400).json({
                msg: 'no se encontro un registro'
            })

            //generar el JWT
            const token = await generarJWT(auten.id)

            res.status(200).json({
                auten,
                token

            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'Error en el servidor'
            })
            
        }


        
    },




    modificar: async (req,res) => {

}


};



export default login;
