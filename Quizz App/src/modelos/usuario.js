'use strict'

const mongoose=require('mongoose');
const Schema= mongoose.Schema;

//var autoIncrement = require('mongoose-auto-increment');

/*
var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
*/

/*
const opts = {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  };

  */


var modeloUsuario = Schema ({

  //  nombre: {type: 'String'}

    
    updated: { type: Date, default: Date.now },
    
    rol: {type: 'String', enum:['alumno','docente','editor']},
    estatus: {type: 'Boolean', default: true},
    nombre: {type: 'String'},
    apPaterno: {type: 'String'},
    apMaterno: {type: 'String'},
    correoElectronico:{type: 'String'},
    telefono: {type: 'String'}
    

   // ,opts
    /*
    _id: {type: 'String'},
    rol: {type: 'String', enum:['alumno','docente','editor']},
    estatus: {type: 'Boolean', default: true},
    nombre: {type: 'String'},
    apPaterno: {type: 'String'},
    apMaterno: {type: 'String'},
    correoElectronico:{type: 'String'},
    telefono: {type: 'String'}
    */
});

/*
autoIncrement.initialize(mongoose.connection);
CounterSchema.plugin(autoIncrement.plugin, 'Counter');
var Counter = mongoose.model('Counter', modeloUsuario);

*/

module.exports =
 mongoose.model('Usuario',modeloUsuario);
