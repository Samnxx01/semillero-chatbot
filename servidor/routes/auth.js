import express from 'express';
import{ check } from'express-validator';
import loginController from '../controllers/loginUsu.js'
import validarCampos from '../middlewares/validar.campos.js';
import {esRoleValido} from '../helpers/db-validators.js';
import {esAdminRole} from '../middlewares/validar-roles.js';
import {existeIdUsuario} from '../helpers/db-validators.js';


import validarJWT from '../middlewares/validar-jwt-seguridad.js';

var router = express.Router()



router.get('/login/listar', loginController.listar )

router.post('/login/admin',[
    
    check('correo','el correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginController.guardarAdmin) 

router.post('/login/usuario',[
    
    check('correo','el correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginController.guardar)


router.post('/google',[
    check('id_token','id_token es obligatorio').not().isEmpty(),
    validarCampos
], loginController.googleSingIn)

router.put('/modificar/:id',[
    validarJWT,
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    esAdminRole,
    //esta pendiente el id que me arroje la modificacion 
    check('id', 'No es un ID valido').isMongoId(),
    check('rol', ).custom( esRoleValido),
    validarCampos
], loginController.modificar);

router.delete('/login/eliminar/:id',[  
    validarJWT,
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdUsuario),
    validarCampos
],loginController.eliminar)


export default router