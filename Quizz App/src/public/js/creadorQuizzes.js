
//Variable para hacer la inserción de elementos dentro del cuertpo del HTML
var insertor=document.getElementById("insercion");
//Variable global para "enumerar" todas las preguntas de un cuestionario
var contador=0;


//Función para nombrar los tipos de preguntas, y agregarles un contador para que no se pierdan en la request
function contadorTipo(){
    contador=contador+1;
    tipo="tipo"+contador;

     //Creación de un elemento hidden para registrar el tipo de pregunta
     var tipoHTML=document.createElement("INPUT");
     tipoHTML.type="hidden";
     tipoHTML.name=tipo;
    return tipoHTML;
}

//Función para crear las preguntas abiertas en el cuerpo del HTML
function preguntaAbierta(){

    var contenedor=document.createElement("DIV");
    contenedor.className="tipoT"

    var pregunta=document.createElement("INPUT");
    pregunta.type="text";
    pregunta.id="pregunta";

    var respuesta=document.createElement("INPUT");
    respuesta.type="text";
    respuesta.id="respuesta";
    
    contenedor.appendChild(pregunta);
    contenedor.appendChild(respuesta);

    insertor.appendChild(contenedor);


       
} 


//Función para un envío clasificado de los tipos de preguntas
function envioPreguntaAbierta(){
   
    var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoT");
    
    
    //Clasificación de los elementos enviados para no tener conflictos en la request
    for(i=0;i<cuestionarios.length;i++){
    
    //Se agrega el tipo de pregunta por medio de un elemento hidden
    var tipoHTML=contadorTipo();
    //Definición del tipo de pregunta
    tipoHTML.value="tipoT";
    //inserción
    cuestionarios[i].appendChild(tipoHTML);


    //Envío de los items del tipo de cuestionario pregunta abierta
    var elementos=cuestionarios[i].children;
    elementos[0].name="pregunta"+(i+1);
    elementos[1].name="respuesta"+(i+1);
    }
}




// Envío Final de todos los elementos
function envioQuizz(){
    envioPreguntaAbierta();
    document.getElementById("formularioQuizz").submit();
    
}