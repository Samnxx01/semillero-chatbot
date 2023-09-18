import { response } from "express";



const esAdminRole = async (req, res = response, next) => {
    if (!req.registrosUsu ) {
        return res.status(500).json({
            msg:'Se requiere verificar el role sin validar el token primero'
        });
    }

    const {rol, nickname} = req.registrosUsu 
    
    if (rol !== 'ADMINISTRADOR_ROLE') {
        return res.status(401).json({
            msg:`${nickname} no es administrador - no puede hacer modificaciones`
        })
    }

    next();
}

async function esTenerRoles(correo = '') {
    const existeEmail = await Regis.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ya existe`);
    }
}

export {esAdminRole, esTenerRoles}
 