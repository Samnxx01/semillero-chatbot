import { response } from 'express';
import Regis from '../models/regiUsu.js';
import { generarJWT } from '../helpers/generar-jwt.js';
import bcryptjs from "bcryptjs"



var registrousu = {


    listar: async (req,res) => {


        try {
            // Obtiene todos los registros de la colección
            const query = {estado : true}
    
            const registros = await Regis.find(query);
            const total = await Regis.countDocuments(query)
           
            // Envía los registros como respuesta en formato JSON
            res.status(200).json({
                msg: 'Listado registros',
                total,
                registros,
               
            });
        } catch (error) {
            console.error('Error en la operación:', error);
            res.status(500).json({
                error: 'Hubo un error en la operación',
            });
        }


        //listar por registro de id usuario
        /*try {
            const { id } = req.params;

    
            // Busca el registro por ID
            const registro = await Regis.findById(id);
    
            if (!registro) {
                return res.status(404).json({ msg: 'Registro no encontrado' });
            }
    
            res.status(200).json({
                msg: 'Mostrando usuario por ID',
                registro
            });
        } catch (error) {
            console.error("Error en la operación:", error);
    
            res.status(500).json({
                error: "Hubo un error en la operación"
            });
        }*/
        
},


    guardar: async (req, res = response) => {
        

        try {

            var params = req.body;


            // Verificar que el rol sea "usuario"
        if (params.rol !== "USUARIO") {
            return res.status(400).json({
                error: `el rol debe ser usuario`
            });
        }

            // Crear una instancia de Regis (si es una clase o función)
            const registro = new Regis({
                nickname: params.nickname,
                correo: params.correo,
                password: params.password,
                rol: params.rol,

            });

            //encriptar la contraseña
            const salt = bcryptjs.genSaltSync(10);
            registro.password = bcryptjs.hashSync(params.password.toString(), salt)

            //aqui se guarda la info en la db
            const guardarApi = await registro.save();
            const token = await generarJWT(guardarApi.id)
            
            
            res.status(200).json({
                msg: 'Registro Completado',
                guardarApi,
                token
              
                
            });


        } catch (error) {
            console.error("Error en la operación:", error);

            res.status(500).json({
                error: "Hubo un error en la operación"
            });
        }
    },

    guardarAdmin: async (req, res = response) => {
        

        try {

            

            var params = req.body;


            if (params.rol !== "ADMINISTRADOR_ROLE") {
                return res.status(400).json({
                    error: `el rol debe ser administrador`
                });
            }

            // Crear una instancia de Regis (si es una clase o función)
            const registro = new Regis({
                nickname: params.nickname,
                correo: params.correo,
                password: params.password,
                rol: params.rol

            });

            //encriptar la contraseña
            const salt = bcryptjs.genSaltSync(10);
            registro.password = bcryptjs.hashSync(params.password.toString(), salt)

            //aqui se guarda la info en la db
            const guardarApi = await registro.save();
            const token = await generarJWT(guardarApi.id)
            
            
            res.status(200).json({
                msg: 'Registro Completado',
                guardarApi,
                token
                
            });


        } catch (error) {
            console.error("Error en la operación:", error);

            res.status(500).json({
                error: "Hubo un error en la operación"
            });
        }
    },



    modificar: async (req,res) => {

        try {
            const { id} = req.params;
            const { _id, password, google, ...resto } = req.body;
    
            // Valida si la contraseña se proporciona y encripta
            if (password) {
                const salt = bcryptjs.genSaltSync(10);
                resto.password = bcryptjs.hashSync(password.toString(), salt);
            }
    
            // Verifica si el registro con el ID proporcionado existe antes de actualizar
            const registroExistente = await Regis.findById(id);


            if (!registroExistente) {
                return res.status(404).json({ msg: 'Registro no encontrado' });
            }
    
            // Realiza la actualización del registro
            const modi = await Regis.findByIdAndUpdate(id, resto, { new: true }); // Usa { new: true } para obtener el registro actualizado
    
            res.json({
                msg: 'Registro actualizado',
                modi
            });
            
        } catch (error) {
            console.error('Error al modificar registro:', error);
            res.status(500).json({ msg: 'Error interno del servidor' });
        }
}, 

    eliminar: async (req,res) => {
        
        const {id} = req.params;
        

        //fisicamnente lo borramos del modelo
         /*const eliminarUsuario = await Regis.findByIdAndDelete(id);*/

         const estadoss = await Regis.findByIdAndUpdate( id, {estado:false});         

        res.status(200).json({
            msg: 'se ha eliminado',
            estadoss
            
        })
    }


};



export default registrousu;
