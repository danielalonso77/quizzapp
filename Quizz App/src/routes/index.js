const express= require('express');
const router=express.Router();
const bodyParser= require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


//Configuración del Body Parser
router.use(bodyParser.urlencoded({extendend:true}));
router.use(bodyParser.json());

//Motor de envío de Imágenes
Grid.mongo = mongoose.mongo;

 conn=mongoose.connection;

 // Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
   url: 'mongodb+srv://BVargas:p%213acE27@cluster0.4nutt.mongodb.net/Sistema_Quizz?retryWrites=true&w=majority',
   file: (req, file) => {
     return new Promise((resolve, reject) => {
       crypto.randomBytes(16, (err, buf) => {
         if (err) {
           return reject(err);
         }
         const filename = buf.toString('hex') + path.extname(file.originalname);
         const fileInfo = {
           filename: filename,
           bucketName: 'uploads'
         };
         resolve(fileInfo);
       });
     });
   }
 });
 const upload = multer({ storage });

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
 
   res.render('administrador/index',{user: usuarios});
 
});


//Crear
router.get('/administrador/crear',(req,res)=>{
   res.render('administrador/crear');
 
});

router.post('/administrador/crear',(req,res)=>{
  
  
  

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

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file.id });

 //res.redirect('/cuarto');
});

router.post('/editores/crear',upload.single('imagenes'),(req,res)=>{
  console.log(req.body);
  /*
  console.log("Error de Multer");
  res.json({ files: req.files });
  */
 res.json({ files: req.file });
 // router.post('/editores/crear',(req,res)=>{
/*
    var imagenes=[];
    var nimagenes=0;


      if( req.body.imagenes.length>1){
        for (i = 0; i < req.body.imagenes.length; i++){
            console.log( req.body.imagenes[i]);
          var conversor={name: req.body.imagenes[i]};
        
          imagenes.push(conversor);
        } 
      }
    
      upload.array(imagenes);
      console.log(req.files);
      */
    /*
    for (i = 0; i < req.body.numeroPreguntas; i++) {
      var tipo="tipo"+(i+1);
      if (req.body[tipo]=="TipoIT"){
        var conversor={ name: }
      }
    }
    */
  //res.json({ file: req.body.imagenes });
  //console.log(req.files);
 // req.body.pregunta1[0]=req.file.filename;
  //res.json(  req.body.pregunta1 );
 
  var i;
  //variable para construir el cuestionario como un array
  var cuestionario= [
  ];


  for (i = 0; i < req.body.numeroPreguntas; i++) {
     var tipo="tipo"+(i+1);
     var pregunta="pregunta"+(i+1);
     var respuesta="respuesta"+(i+1);

     
        if (req.body[tipo]=="tipoIT"){
          console.log("ACTIVADO");
          var preguntaImagen=req.body[pregunta];
          preguntaImagen[0]=req.file.filename;
          console.log( req.body[pregunta]);
       // console.log(req.file.filename);
    // req.body.pregunta1[0]=
   
      }
 

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
       claveMateria: "pruebaEnvioImagenes",
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
   res.render('alumnos/examen',{ quizz });
    /*
   var imagenes=Array;
   for (i = 0; i < quizz.cuestionario.length; i++) {
      if(quizz.cuestionario[i].tipo=="tipoIT")
      {
        
        var imagen=quizz.cuestionario[i].pregunta[0];
  
      }
     
  }
 */
 
 
 // res.response("Probando...");
  // res.render('alumnos/examen',{quizz,file:imagenes});

});



router.get('/alumnos/respuestas',(req,res)=>{
   res.render('alumnos/respuestas');

});

router.get('/alumnos/correccion',(req,res)=>{
   res.render('alumnos/correccion');

});


 //----------Cuarto de pruebas------------///


 

 router.get('/cuarto', (req, res) => {

   gfs.files.find().toArray((err, files) => {
     // Check if files
     if (!files || files.length === 0) {
       res.render('index', { files: false });
     } else {
       files.map(file => {
         if (
           file.contentType === 'image/jpeg' ||
           file.contentType === 'image/png'
         ) {
           file.isImage = true;
         } else {
           file.isImage = false;
         }
       });
       console.log(files)
       res.render('cuarto',{ files: files });
     }
   });
  

 });

// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file.id });

   //res.redirect('/cuarto');
 });
 
 // @route GET /files
 // @desc  Display all files in JSON
 router.get('/files', (req, res) => {
   gfs.files.find().toArray((err, files) => {
     // Check if files
     if (!files || files.length === 0) {
       return res.status(404).json({
         err: 'No files exist'
       });
     }
 
     // Files exist
     return res.json(files);
   });
 });
 
 // @route GET /files/:filename
 // @desc  Display single file object
 router.get('/files/:filename', (req, res) => {
   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
     // Check if file
     if (!file || file.length === 0) {
       return res.status(404).json({
         err: 'No file exists'
       });
     }
     // File exists
     return res.json(file);
   });
 });

 
 
 // @route GET /image/:filename
 // @desc Display Image
 router.get('/image/:filename', (req, res) => {
   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
     // Check if file
     if (!file || file.length === 0) {
       return res.status(404).json({
         err: 'No file exists'
       });
     }
 
     // Check if image
     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
       // Read output to browser
       const readstream = gfs.createReadStream(file.filename);
       readstream.pipe(res);
     } else {
       res.status(404).json({
         err: 'Not an image'
       });
     }
   });
 });
 
 // @route DELETE /files/:id
 // @desc  Delete file
 router.post('/files/:id', (req, res) => {
   gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
     if (err) {
       return res.status(404).json({ err: err });
     }
 
     res.redirect('/');
   });
 });






 module.exports=router;
