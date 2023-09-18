import jwt from 'jsonwebtoken'

export async function generarJWT(uid = '') {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, (err, token) => { 

            if (err) {
                console.log(err);
                reject(' No se pudo generar el token')
            } else {
                resolve(token); // Si no hay error, resolvemos la promesa con el token
            }

        });
    });
}
