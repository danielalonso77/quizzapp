
//--- Motor Universal del Proyecto----//
const express= require('express');
const app= express();
const path= require('path');
const mongoose= require('mongoose');

//Settings
app.set('port',3000);
app.set('views',path.join(__dirname,'views'));

//Motor de Plantillas
app.set('view engine','ejs');


//Middleware
//Routes
app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));


//Conexión a la BD
mongoose.connect('mongodb+srv://BVargas:p%213acE27@cluster0.4nutt.mongodb.net/Sistema_Quizz?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true } ,(err, res) =>{
   if (err) throw err
  console.log("Conexion con Mongo establecida");
  app.listen(app.get('port'), ()=>{console.log("Quizz app funcionando en : localhost:"+ app.get('port'))
                              });
})