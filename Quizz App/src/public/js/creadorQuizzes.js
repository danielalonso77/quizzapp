//Variable para hacer la inserción de elementos dentro del cuertpo del HTML
var insertor=document.getElementById("insercion");
//Variable global para "enumerar" todas las preguntas,respuestas y tipo  de un cuestionario
var contador=1;


//Función para nombrar los tipos de preguntas, y agregarles un contador para que no se pierdan en la request
function contadorTipo(){
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

function preguntaRelacional(){

  var strVar="";
strVar += "  <div class=\"tipoR cuestionario\">";
strVar += "                <div class=\"row\">";
strVar += "                    <div class=\"col-lg-8 col-md-12 col-sm-12 \">";
strVar += "                        <section class=\"panel \" style=\"background-color:  #ccffdc;\">";
strVar += "                            <div class=\"panel-body\"><h4 class=\"text-center\">Pregunta Relacional<\/h4><\/div>";
strVar += "                        <\/section>";
strVar += "                    <\/div>";
strVar += "                    <div class=\"row contenedorItem\">";
strVar += "                      <div class=\"row\">";
strVar += "                          <div class=\"col-lg-5 col-md-6 col-sm-6\">";
strVar += "                              <section class=\"panel\">";
strVar += "                                  <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
strVar += "                              <\/section>";
strVar += "                          <\/div>";
strVar += "                          <div class=\"col-lg-5 col-md-6 col-sm-6\">";
strVar += "                              <section class=\"panel\">";
strVar += "                                  <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
strVar += "                              <\/section>";
strVar += "                          <\/div>";
strVar += "                          <div class=\"col-lg-2 col-md-6 col-sm-6\">";
strVar += "                            <section class=\"panel\">";
strVar += "                              <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
strVar += "                            <\/section>";
strVar += "                          <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                    <section class=\"panel\">";
strVar += "                      <button class=\"btn btn-info \" type=\"button\" onclick=\"reactivoRelacional(this)\">Añadir Reactivo<\/button>";
strVar += "                    <\/section>";
strVar += "                <\/div>";

insertor.insertAdjacentHTML("beforeend",strVar);
}
//función para crear más reactivos en preguntas relacionales
function reactivoRelacional(obj){
      //Extración del Div donde se inyectará el nuevo reactivo
      var contenedorCuestionario=obj.parentElement.previousElementSibling;
      //.parentElement.parentElement.parentElement;

      /*
                            <div class="col-lg-5 col-md-6 col-sm-6">
                                <section class="panel">
                                    <input type="text" class="form-control pregunta "  placeholder="Pregunta">
                                </section>
                            </div>
                            <div class="col-lg-5 col-md-6 col-sm-6">
                                <section class="panel">
                                    <input type="text" class="form-control respuesta "  placeholder="Respuesta">
                                </section>
                            </div>
                             <div class="col-lg-2 col-md-6 col-sm-6">
                              <section class="panel">
                                <button class="btn btn-danger " type="button" onclick="quitarReactivoRelacional(this)">QuitarReactivo</button>
                              </section>
                            </div>
      */
    //Pregunta
    var contenedorRelacional=document.createElement("DIV");
    contenedorRelacional.className="row";

    var preguntaRelacional=document.createElement("DIV");
      preguntaRelacional.className="col-lg-5 col-md-6 col-sm-6";

      var sectionP=document.createElement("SECTION");
      sectionP.className="panel";
      //Input Pregunta
      var pregunta=document.createElement("INPUT");
      pregunta.type="text";
      pregunta.className="form-control pregunta"
      pregunta.placeholder="Pregunta";
    
    //Respuesta
      var respuestaRelacional=document.createElement("DIV");
      respuestaRelacional.className="col-lg-5 col-md-6 col-sm-6";

      var sectionR=document.createElement("SECTION");
      sectionR.className="panel";

      //Input Respuesta
      var respuesta=document.createElement("INPUT");
      respuesta.type="text";
      respuesta.className="form-control respuesta"
      respuesta.placeholder="Respuesta";

      //Botón para eliminar
      var contenedorBotonQuitar=document.createElement("DIV");
      contenedorBotonQuitar.className="col-lg-2 col-md-6 col-sm-6";

      var sectionB=document.createElement("SECTION");
      sectionB.className="panel";

      var botonQuitar = document.createElement("BUTTON");
      botonQuitar.type="button";
      botonQuitar.className="btn btn-danger";
      botonQuitar.addEventListener("click", function(){ quitarReactivoRelacional(this); });

      var textoQuitar = document.createTextNode("Quitar Reactivo");
      botonQuitar.appendChild(textoQuitar)
    
    sectionB.appendChild(botonQuitar);
    contenedorBotonQuitar.appendChild(sectionB);

    sectionP.appendChild(pregunta);
    preguntaRelacional.appendChild(sectionP);

    sectionR.appendChild(respuesta);
    respuestaRelacional.appendChild(sectionR);

    contenedorRelacional.appendChild(preguntaRelacional);
    contenedorRelacional.appendChild(respuestaRelacional);
    contenedorRelacional.appendChild(contenedorBotonQuitar);

    //Inyección de Reactivos
    contenedorCuestionario.appendChild(contenedorRelacional);
 
}

function quitarReactivoRelacional(obj){
  //Elemento que se destruirá
  obj.parentElement.parentElement.parentElement.remove();
}

function envioPreguntaRelacional(){

  var i=0;
  var cuestionarios=document.getElementsByClassName("tipoR");

  for(i=0;i<cuestionarios.length;i++){

    var tipoHTML=contadorTipo();
    //Definición del tipo de pregunta
    tipoHTML.value="tipoR";
    //inserción
    cuestionarios[i].appendChild(tipoHTML);
    /*
    var pregunta = cuestionarios[i].querySelectorAll("div.contenedorItem input.pregunta");
    pregunta[0].name="pregunta"+contador;

    var respuesta = cuestionarios[i].querySelectorAll("div.contenedorItem input.respuesta");
    respuesta[0].name="respuesta"+contador;
    */
   var reactivos=cuestionarios[i].querySelectorAll("div.contenedorItem input.pregunta");
   for(j=0;j<reactivos.length;j++){
    var pregunta = cuestionarios[i].querySelectorAll("div.contenedorItem input.pregunta");
    pregunta[j].name="pregunta"+contador;

    var respuesta = cuestionarios[i].querySelectorAll("div.contenedorItem input.respuesta");
    respuesta[j].name="respuesta"+contador;

   }
    contador=contador+1;
  }
 
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
    pregunta[0].name="pregunta"+contador;

    var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
    respuesta[0].name="respuesta"+contador;
 
    contador=contador+1;
    }

    
}


function eliminar(obj){
  obj.parentElement.parentElement.remove();
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
    envioPreguntaRelacional();
    document.getElementById("formularioQuizz").submit();
    
}