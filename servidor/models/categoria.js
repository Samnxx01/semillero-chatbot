import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },    
    referencia: {
        type: String,
        required: [true, 'La referencia es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    regisUsu: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'RegisUsu'
    }
});

CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
  };
  

export default mongoose.model('Categoria', CategoriaSchema);