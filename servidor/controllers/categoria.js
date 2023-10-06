import { response } from 'express';
import Categoria   from '../models/categoria.js';


var categorias = {
  

   listarCategoria: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const query = {estado : true}

      const registros = await Categoria.find(query)
      .populate({
        path: 'regisUsu',
        select: 'nickname' // Selecciona el campo 'nickname' que deseas traer
    });
      const total = await Categoria.countDocuments(query)
      
     
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
},

listarCategoriaID: async (req, res = response) => {
      try {
            const { id } = req.params;

    
            // Busca el registro por ID
            
            const verificarCa = await Categoria.findById(id)
            .populate({
                path: 'regisUsu',
                select: 'nickname' // Selecciona el campo 'nickname' que deseas traer
            });
            
    
            if (!verificarCa) {
                return res.status(404).json({ msg: 'Registro no encontrado' });
            }
    
            res.status(200).json({
                msg: 'Mostrando usuario por ID',
                verificarCa
            });
        } catch (error) {
            console.error("Error en la operación:", error);
    
            res.status(500).json({
                error: "Hubo un error en la operación"
            });
        }
},


    guadarCategoria: async (req, res = response) => {
      const nombre = req.body.nombre.toUpperCase();
      const referencia = req.body.referencia.toUpperCase();
      const categoriaDB = await Categoria.findOne({nombre, referencia});

      if (categoriaDB) {
        return res.status(400).json({
          msg: `la categoria ${categoriaDB.referencia}. ya existe`
        })
      }
      
      
      
      const data ={
        nombre,
        referencia,
        regisUsu: req.registrosUsu._id
      }



      const categoria = await new Categoria(data)

      await categoria.save();
      res.status(201).json({
        msg: 'categoria exitosa',
        categoria
      });
    },

    modificarCategoria: async (req, res = response) => {
      const {id} = req.params
      const {estado,regisUsu, ...data} = req.body;
      data.nombre = data.nombre.toUpperCase();
      data.regisUsu = req.registrosUsu._id;
      const categoria = await Categoria.findByIdAndUpdate(id, data ,{new:true})
      .populate({
        path: 'regisUsu',
        select: 'nickname' // Selecciona el campo 'nickname' que deseas traer
    });

      res.status(200).json({
        msg:'se ha modifcado',
        categoria
      })
    },

    eliminarCategoria: async (req, res = response) => {
      const {id} = req.params;
      const categoriaBorrada = await Categoria.findByIdAndUpdate( id,{estado: false}, {new: true})
      res.status(200).json({
        msg: "eliminado categoria",
        categoriaBorrada
      })
    }

};


export default categorias;
