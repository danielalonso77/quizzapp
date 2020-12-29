
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

    /*
    <div class="tipoT">
                    <div class="mb-3">
                      <label for="formGroupExampleInput" class="form-label">Pregunta</label>
                      <input type="text" class="form-control pregunta"  placeholder="Escriba la pregunta">
                    </div>
                    <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">Respuesta</label>
                        <input type="text" class="form-control respuesta "  placeholder="Escriba la respuesta">
                    </div>
                    <!--Botones -->
                  <div class="editar" role="group" aria-label="Basic mixed styles example">
                    <br>
                    <button type="button" class="btn btn-success" onclick="preguntaAbierta()">Agregar Pregunta</button>
      
                    <button type="button" class="btn btn-danger">Quitar Pregunta</button>
                  </div>
              </div>
     */

     //Contenedor Global de la pregunta 
    var contenedor=document.createElement("DIV");
    contenedor.className="tipoT cuestionario"

    //Div para pregunta
    var divInput=document.createElement("DIV");
    divInput.className="mb-3";
    //label para pregunta
    var labPregunta=document.createElement("LABEL") ;//label
    labPregunta.className="form-label";
    var contenidolabPregunta=document.createTextNode("Pregunta");
    labPregunta.setAttribute("for","formGroupExampleInput");
    labPregunta.appendChild(contenidolabPregunta);

    //input de pregunta
    var pregunta=document.createElement("INPUT");
    pregunta.type="text";
    pregunta.className="form-control pregunta"
    pregunta.placeholder="Escriba la pregunta";

    
    //Div respuesta
    var divInput2=document.createElement("DIV");
    divInput.className="mb-3";

    //Label Respuesta
    var labRespuesta=document.createElement("LABEL");
    labPregunta.className="form-label";
    labRespuesta.setAttribute("for","formGroupExampleInput2");
    var contenidolabRespuesta=document.createTextNode("Respuesta");
    labRespuesta.appendChild(contenidolabRespuesta);

    //Input Respuesta
    var respuesta=document.createElement("INPUT");
    respuesta.type="text";
    respuesta.className="form-control respuesta"
    respuesta.placeholder="Escriba la respuesta";

  
    
    //B O T O N E S
    /*
    <div class="editar" role="group" aria-label="Basic mixed styles example">
    <br>
    <button type="button" class="btn btn-success" onclick="preguntaAbierta()">Agregar Pregunta</button>

    <button type="button" class="btn btn-danger">Quitar Pregunta</button>
  </div>
    */
  var contenedorBotones=document.createElement("DIV");
  contenedorBotones.className="editar";
  contenedorBotones.role="group";
 
  var botonCrear= document.createElement("BUTTON");
  botonCrear.type="button";
  botonCrear.className="btn btn-success";
  botonCrear.addEventListener("click", preguntaAbierta);
  var textoCrear = document.createTextNode("Agregar Pregunta");
  botonCrear.appendChild(textoCrear);

  var botonQuitar = document.createElement("BUTTON");
  botonQuitar.type="button";
  botonQuitar.className="btn btn-danger";
  botonQuitar.addEventListener("click", function(){ eliminar(this); });
  // element.addEventListener("click", function(){ myFunction(p1, p2); }); 
  var textoQuitar = document.createTextNode("Quitar Pregunta");
  botonQuitar.appendChild(textoQuitar);

  //Inyección de elementos HTML 
  divInput.appendChild(labPregunta);
  divInput.appendChild(pregunta);

  divInput2.appendChild(labRespuesta);
  divInput2.appendChild(respuesta);

  contenedorBotones.appendChild(botonCrear);
  contenedorBotones.appendChild(botonQuitar);
  
  //Inyección Final de los elementos al DOM HTML
  contenedor.appendChild(divInput);
  contenedor.appendChild(divInput2);
  contenedor.appendChild(contenedorBotones);

    insertor.appendChild(contenedor);
  


       
} 


function eliminar(obj){
    obj.parentElement.parentElement.remove();
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
    
    var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
    pregunta[0].name="pregunta"+(i+1);

    var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
    respuesta[0].name="respuesta"+(i+1);
 

    }

    
}



// Envío Final de todos los elementos
function envioQuizz(){
     //creación e inserción de un elemento con el número de preguntas del cuestionario
    var numeroPreguntas=document.getElementsByClassName("cuestionario").length;
    var numeroHTML=document.createElement("INPUT");
     numeroHTML.type="hidden";
     numeroHTML.name="numeroPreguntas";
     numeroHTML.value=numeroPreguntas;

     insertor.appendChild(numeroHTML);

     //Envío de tipos de preguntas
    envioPreguntaAbierta();
    document.getElementById("formularioQuizz").submit();
    
}