import express from 'express';
import{ check } from'express-validator';
import validarCampos from '../middlewares/validar.campos.js';
import controllerCategorias from '../controllers/categoria.js'
import {esAdminRole} from '../middlewares/validar-roles.js';
import {existeIdCategoria} from '../helpers/db-validators.js';
import {nombreExisteCate} from '../helpers/db-validators.js';
import {azucarValido} from '../helpers/db-validators.js';


import validarJWT from '../middlewares/validar-jwt-seguridad.js';

var router = express.Router()


//obtener categorias - admin
router.get('/listar',[
    validarJWT,
    esAdminRole
], controllerCategorias.listarCategoria)

//obtener categorias - usuario
router.get('/listar',[
    validarJWT,
    
], controllerCategorias.listarCategoria)

//listar por id
router.get('/listar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdCategoria),
    
], controllerCategorias.listarCategoriaID)


//crear categorias - cualquier adminsitador valido
router.post('/guardarcategoria/admin',[
    validarJWT,
    esAdminRole,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('nombre', ).custom(nombreExisteCate),
    check('referencia', ).not().isEmpty(),
    validarCampos
], controllerCategorias.guadarCategoria) 

//crear categorias sin azucar - cualquier adminsitador valido
/*router.post('/guardarcategoria/sinazucar/admin',[
    validarJWT,
    esAdminRole,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('nombre', ).custom(nombreExisteCate),
    check('sinazucar', ).custom( azucarValido),
    validarCampos
], controllerCategorias.guadarCategoria) 

*/




router.put('/modificar/:id',[
    validarJWT,
    esAdminRole,
    check('nombre', ).custom( nombreExisteCate),
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    //esta pendiente el id que me arroje la modificacion 
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdCategoria),
    validarCampos,
], controllerCategorias.modificarCategoria);

router.delete('/eliminar/:id',[  
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdCategoria),
    validarCampos,
], controllerCategorias.eliminarCategoria,)


export default router