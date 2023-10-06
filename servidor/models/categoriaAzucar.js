import mongoose from "mongoose";

const Schema = mongoose.Schema;


const CategoriaAzucarSchema = new Schema({
    sinazucar:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

export default mongoose.model('CategoriaAzucar', CategoriaAzucarSchema);