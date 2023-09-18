import mongoose from "mongoose";


const Schema = mongoose.Schema;

const categoriaSchema = new Schema({

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
    google: {
        type: Boolean,
        default: false
    }
});


categoriaSchema.methods.toJSON = function () {
    const { __v, password, _id, ...categoria } = this.toObject();
    categoria.iud = _id;
    return categoria;
  };
  
export default mongoose.model('categoria', categoriaSchema);
