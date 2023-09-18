import Message from "../models/message.js";


var controller = {
    //funcion para guardar los mensajes
    save: async (req, res) => {
        try {
            var params = req.body
            var message = new Message()
            message.message = params.message 
            message.from = params.from
    
            const messageStored = await message.save();
            
            return res.status(200).send({
                status: 'Enviado con exito',
                messageStored
            });
        } catch (error) {
            return res.status(404).send({
                status: 'error',
                message: 'No ha enviado el mensaje'
            });
        }
    },
    
    // Funcion para obtener todos los mensajes
    getMessages: async (req, res) => {
        try {
            const messages = await Message.find({}).sort('-_id');
    
            if (!messages || messages.length === 0) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay mensaje que mostrar'
                });
            }
    
            return res.status(200).send({
                status: 'success',
                messages
            });
        } catch (error) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al extraer datos'
            });
        }
    }
}

export default controller