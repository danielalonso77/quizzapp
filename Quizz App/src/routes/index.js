const express= require('express');
const router=express.Router();
const bodyParser= require('body-parser');

//Configuración del Body Parser
router.use(bodyParser.urlencoded({extendend:true}));
router.use(bodyParser.json());

//----M O D E L O S-----//
const Usuario=require('../modelos/usuario.js');
const Quizz=require('../modelos/quizz.js');


// ------------||  R U T A S  ||----------------//

router.get('/',(req,res)=>{
    res.render('index');

 });


//---------ADMINISTRADORES
 

//Dashboard
router.get('/administrador',async (req,res)=>{
   const usuarios=await Usuario.find({});
   console.log(usuarios);
   res.render('administrador/index',{user: usuarios});
 
});


//Crear
router.get('/administrador/crear',(req,res)=>{
   res.render('administrador/crear');
 
});

router.post('/administrador/crear',(req,res)=>{
  
   console.log('POST /Usuarios');
   console.log(req.body);
  

   Usuario.create(req.body,(error,usuario)=>{

   });
   res.redirect('/administrador');
});

//Editar

// vista del formulario con datos actuales del usuario a editar
router.get('/administrador/editar/:id',async(req,res)=>{
   const user=await Usuario.findById(req.params.id);

   res.render('administrador/editar',{user});
 
});



//envío por post para guardar los cambios
router.post('/administrador/editar',(req,res)=>{
  
         console.log('EDITAR /Usuarios');
         console.log(req.body.id);
         console.log(req.body);
         const idUsuario=req.body.id;

         Usuario.findByIdAndUpdate(idUsuario,{
             nombre:req.body.nombre,
             rol: req.body.rol,
             apPaterno: req.body.apPaterno,
             apMaterno: req.body.apMaterno,
             correoElectronico: req.body.correoElectronico,
             telefono: req.body.telefono,
             estatus:req.body.estatus
          },(error,user)=>{
             console.log(error,idUsuario);
             res.redirect('/administrador');
          } 
            );
     
});


router.post('/administrador/borrar',(req,res)=>{
   const idUsuario=req.body.id;
   console.log('CRUD/BORRAR');
   console.log(idUsuario);

   Usuario.findByIdAndRemove(idUsuario, function(err){
      if(err){
         res.send(err);
      }
      else{
         res.redirect("/administrador");
      }
   })

});

//----------EDITORES
router.get('/editores',(req,res)=>{
   res.render('editor/index');

});

router.get('/editores/aprobar',(req,res)=>{
   res.render('editor/aprobar');

});

router.get('/editores/crear',(req,res)=>{
   res.render('editor/crear');
   
});

router.post('/editores/crear',(req,res)=>{
  console.log(req.body);

  var i;
  //variable para construir el cuestionario como un array
  var cuestionario= [
  ];


  for (i = 0; i < req.body.numeroPreguntas; i++) {
     var tipo="tipo"+(i+1);
     var pregunta="pregunta"+(i+1);
     var respuesta="respuesta"+(i+1);

     //Construcción de documentos de cuestionarios de manera iterativa
     var contenidoCuestionario={
        tipo:req.body[tipo],
        pregunta:  req.body[pregunta],
        respuesta: req.body[respuesta]
     }

     cuestionario.push(contenidoCuestionario);
  } 
  
   //guardado en la BD
   Quizz.create( 
      {
       claveMateria: "pruebaCuestionarioEstilizado",
       nombreQuizz: req.body.nombreQuizz,
          cuestionario:cuestionario
       
       }
    
    );

  res.redirect("/editores/crear");
});

router.get('/editores/editar',(req,res)=>{
   res.render('editor/editar');

});


//---- DOCENTES

router.get('/docentes',(req,res)=>{
   res.render('docente/index');

});



router.get('/docentes/crear',(req,res)=>{
   res.render('docente/crear');

});

router.get('/docentes/editar',(req,res)=>{
   res.render('docente/editar');

});

router.get('/docentes/resultados',(req,res)=>{
   res.render('docente/resultados');

});


//----Alumnos------------------

router.get('/alumnos',async (req,res)=>{
   const Quizzes=await Quizz.find({ });
   res.render('alumnos/index',{quizzes: Quizzes});

});



router.get('/alumnos/registro',(req,res)=>{
   res.render('alumnos/registro');

});

router.get('/alumnos/examen/:id',async(req,res)=>{
   const quizz=await Quizz.findById(req.params.id);
    res.render('alumnos/examen',{quizz});

});



router.get('/alumnos/respuestas',(req,res)=>{
   res.render('alumnos/respuestas');

});

router.get('/alumnos/correccion',(req,res)=>{
   res.render('alumnos/correccion');

});


 //----------Cuarto de pruebas------------///
 router.get('/cuarto',(req,res)=>{
   res.render('cuarto',{dinamico:'Valor dinámico cargado desde Rutas'});

})






 module.exports=router;
