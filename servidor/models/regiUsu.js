import mongoose from "mongoose";


const Schema = mongoose.Schema;

const RegisUsuSchema = new Schema({

    nickname: {
        type: String,
        required: [true, 'El nickname es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    },
    tiempoSesion: {
        type: Date,
        default: null
    },
    google: {
        type: Boolean,
        default: false
    }
});


RegisUsuSchema.methods.toJSON = function () {
    const { __v, password, _id, ...RegisUsu } = this.toObject();
    RegisUsu.iud = _id;
    return RegisUsu;
  };
  
export default mongoose.model('RegisUsu', RegisUsuSchema);
