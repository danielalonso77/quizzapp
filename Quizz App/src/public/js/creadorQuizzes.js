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

//pregunta arrastrable//
function readURL(event){
  var getImagePath = URL.createObjectURL(event.target.files[0]);
  $('#divImg').css('background-image', 'url(' + getImagePath + ')');
  $( "#divImg" ).droppable({
      drop: function( event, ui ) {
      $( this )
      .addClass( "ui-state-highlight" );
      }
      });
  }
  function crearRecuadroCorrecto(){
    $( "#correcto2" ).draggable();
    $( "#correcto2" ).draggable();
    $( "#correcto2" ).css("color","red");
    var texto = $("#text1").val();
    $("#correcto2").text(texto);
    }

    function crearImagen(){
      
      $( "#correcto" ).draggable();
      $( "#correcto" ).css("background-color","white");
            if ($("#size").val()=="chico") {
                $("#correcto").css({"width":"50","heigth":"90"});
            }else if ($("#size").val()=="mediano"){
                $("#correcto").css({"width":"90","heigth":"150"});
            }else if ($("#size").val()=="grande"){
                $("#correcto").css({"width":"150","heigth":"300"});
            }
            var strVar="";
            strVar += " <div id=\"correcto\" ><\/div>";
            insertor.insertAdjacentHTML( "afterbegin" , strVar);
            console.log("correcto");
            
      }

      function preguntaArrastrar() {
        var strVar="";
      strVar += "<div class=\"container cuestionario tipoA \" >";
      strVar += "<label for=\"file\">Agrega imagen <\/label>";
      strVar += " <input type='file' id='getval' name=\"background-image\" onchange=\"readURL(event)\" \/><br\/><br\/>  ";
      strVar += " <\/form>";
      strVar += " <input type=\"text\" name=\"texto\" id=\"text1\" value=\"\" placeholder=\"Texto\">";
      strVar += " <button class=\"btn btn-info type=\"button\" id=\"corr\" onclick=\"crearRecuadroCorrecto()\" >Recuadro correcto<\/button>";
      strVar += " <button class=\"btn btn-info \" type=\"button\" onclick=\"crearImagen()\">Añadir Cuadro Arrastrable<\/button>"
      strVar += " <label for=\"tamaño\">Seleciona el tamaño<\/label>";
      strVar += " <select name=\"tamaño\" id=\"size\">";
      strVar += " <option  value=\"chico\" selected >Chico<\/option>";
      strVar += " <option value=\"mediano\">Mediano<\/option>";
      strVar += " <option value=\"grande\">Grande<\/option>";
      strVar += " <\/select>";
      strVar += " <hr id=\"hr2\"  >";
      strVar += " <div id=\"divImg\" ><\/div>";
      strVar += " <div id=\"correcto\" ><\/div>";
      strVar += " <hr id=\"hr3\" >";
      strVar += "     <div id=\"correcto3\" ><\/div>";
      strVar += "     <h3 id=\"correcto2\">Texto</h3> ";
      strVar += " <\/div>";
      strVar += " <div class=\"editar\" role=\"group\" aria-label=\"Basic mixed styles example\">";
      strVar += " <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
      strVar += "      <\/div>";
      
      
      insertor.insertAdjacentHTML("beforeend",strVar);
      console.log("correcto",console.error());
        
      }


      
      
      

function preguntaRelacional(){
  var strVar="";
strVar += "<div class=\"tipoR cuestionario\">";
strVar += "                                  <div class=\"row\">";
strVar += "                                          <div class=\"col-lg-8 col-md-12 col-sm-12 \">";
strVar += "                                              <section class=\"panel \" style=\"background-color:  #ccffdc;\">";
strVar += "                                                  <div class=\"panel-body\"><h4 class=\"text-center\">Pregunta Relacional<\/h4><\/div>";
strVar += "                                              <\/section>";
strVar += "                                          <\/div>";
strVar += "                                          <div class=\"row contenedorItem\">";
strVar += "                                                <div class=\"row\">";
strVar += "                                                      <div class=\"col-lg-5 col-md-6 col-sm-6\">";
strVar += "                                                          <section class=\"panel\">";
strVar += "                                                              <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
strVar += "                                                          <\/section>";
strVar += "                                                      <\/div>";
strVar += "                                                      <div class=\"col-lg-5 col-md-6 col-sm-6\">";
strVar += "                                                          <section class=\"panel\">";
strVar += "                                                              <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
strVar += "                                                          <\/section>";
strVar += "                                                      <\/div>";
strVar += "                                                      <div class=\"col-lg-2 col-md-6 col-sm-6\">";
strVar += "                                                        <section class=\"panel\">";
strVar += "                                                          <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
strVar += "                                                        <\/section>";
strVar += "                                                      <\/div>";
strVar += "                                  <\/div>";
strVar += "                                  <div class=\"row\">";
strVar += "                                    <div class=\"col-lg-5 col-md-6 col-sm-6\">";
strVar += "                                        <section class=\"panel\">";
strVar += "                                            <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
strVar += "                                        <\/section>";
strVar += "                                    <\/div>";
strVar += "                                    <div class=\"col-lg-5 col-md-6 col-sm-6\">";
strVar += "                                        <section class=\"panel\">";
strVar += "                                            <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
strVar += "                                        <\/section>";
strVar += "                                    <\/div>";
strVar += "                                    <div class=\"col-lg-2 col-md-6 col-sm-6\">";
strVar += "                                      <section class=\"panel\">";
strVar += "                                        <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
strVar += "                                      <\/section>";
strVar += "                                    <\/div>";
strVar += "                              <\/div>";
strVar += "                              <div class=\"row\">";
strVar += "                                <div class=\"col-lg-5 col-md-6 col-sm-6\">";
strVar += "                                    <section class=\"panel\">";
strVar += "                                        <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
strVar += "                                    <\/section>";
strVar += "                                <\/div>";
strVar += "                                <div class=\"col-lg-5 col-md-6 col-sm-6\">";
strVar += "                                    <section class=\"panel\">";
strVar += "                                        <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
strVar += "                                    <\/section>";
strVar += "                                <\/div>";
strVar += "                                <div class=\"col-lg-2 col-md-6 col-sm-6\">";
strVar += "                                  <section class=\"panel\">";
strVar += "                                    <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
strVar += "                                  <\/section>";
strVar += "                                <\/div>";
strVar += "                          <\/div>";
strVar += "                            <\/div>";
strVar += "                            <section class=\"panel\">";
strVar += "                              <button class=\"btn btn-info \" type=\"button\" onclick=\"reactivoRelacional(this)\">Añadir Reactivo<\/button>";
strVar += "                            <\/section>";
strVar += "                    <\/div>";
strVar += "                <div class=\"editar\" role=\"group\" aria-label=\"Basic mixed styles example\">";
strVar += "              <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
strVar += "                <\/div>";
strVar += "            <\/div>";

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

function preguntaOM(){

  var strVar="";
  strVar += "<div class=\"tipoOM cuestionario rounded-sm border border-primary\">";
  strVar += "                <div class=\"row\">";
  strVar += "                   ";
  strVar += "                        <div class=\"col-lg-12 col-md-6 col-sm-6 \">";
  strVar += "                              <div  align=\"center\">";
  strVar += "                                    <h3>Pregunta de Opción Múltiple<\/h3>";
  strVar += "                                    <div class=\"col-lg-8 col-md-6 col-sm-6 pb-5 pregunta\">";
  strVar += "                                    <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta para el alumno\">";
  strVar += "                                    <\/div>";
  strVar += "                              <\/div>";
  strVar += "                              <div class=\" col-lg-12 col-md-6 col-sm-6 reactivos\"  align=\"center\">";
  strVar += "                                    <div class=\"col pt-3 pb-3  \" >";
  strVar += "                                      <div class=\"col\">";
  strVar += "                                        <input type=\"text\" class=\"form-control opcion \"  placeholder=\"Opción\">";
  strVar += "                                      <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                      <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                      <\/div>";
  strVar += "                                    ";
  strVar += "                                    <\/div>";
  strVar += "                                    <div class=\"col pt-3 pb-3  \" >";
  strVar += "                                      <div class=\"col\">";
  strVar += "                                        <input type=\"text\" class=\"form-control opcion \"  placeholder=\"Opción\">";
  strVar += "                                      <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                      <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                      <\/div>";
  strVar += "                                    <\/div>";
  strVar += "                                    <div class=\"col pt-3 pb-3   \" >";
  strVar += "                                      <div class=\"col\">";
  strVar += "                                        <input type=\"text\" class=\"form-control opcion \"  placeholder=\"Opción\">";
  strVar += "                                      <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                      <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                      <\/div>";
  strVar += "                                    <\/div>  ";
  strVar += "                                ";
  strVar += "                              <\/div>";
  strVar += "                         ";
  strVar += "                         <\/div>";
  strVar += "                <\/div>";
  strVar += "                  <div class=\"editar\" role=\"group\" aria-label=\"Basic mixed styles example\">";
  strVar += "                    <button type=\"button\" class=\"btn btn-success\" onclick=\"reactivoOM(this)\">Agregar Reactivo<\/button>";
  strVar += "                    <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
  strVar += "                  <\/div>";
  strVar += "            <\/div>";

insertor.insertAdjacentHTML("beforeend",strVar);
}

//Función para la creación de una opción en preguntas de opción múltiple
function reactivoOM(obj){

  //búsqueda del div donde se inyectará el nuevo reactivo
  var contenedor=obj.parentElement.previousElementSibling.querySelectorAll("div div.reactivos");
  contenedor=contenedor[0];
  var strVar="";
  strVar += " <div class=\"col pt-3 pb-3  \" >";
  strVar += "                                      <div class=\"col\">";
  strVar += "                                        <input type=\"text\" class=\"form-control opcion \"  placeholder=\"Opción\">";
  strVar += "                                      <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                      <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                      <\/div>";
  strVar += "                                    ";
  strVar += "                                    <\/div>";

  contenedor.insertAdjacentHTML("beforeend",strVar);

}

//Función para seleccionar las respuestas correctas de la opción múltiple
function seleccionarRespuesta(obj){
  // Selección del elemento a cambiar de color
  var contenedor= obj.parentElement.parentElement;
  
  claseContenedor=contenedor.className;
  //Clase con palabra clave para definir el comportamiento de la respuesta
  
  pivote=claseContenedor.search("bg bg-success");

  if (pivote==-1){
    contenedor.className="col pt-3 pb-3 bg bg-success";
  }
  else{
    contenedor.className="col pt-3 pb-3 bg ";
  }

}

function preguntaIT(){
  var strVar="";
strVar += "    <div class=\"container tipoIT cuestionario \">";
strVar += "        <h4>Pregunta Texto-Imagen<\/h4>";
strVar += "        <p>Seleccione la imagen a cargar, y defina pregunta y respuesta<\/p>";
strVar += "        <input type=\"file\" id=\"file-upload\" accept=\"image\/*\" class=\"imagen\">";
strVar += "        <input type=\"hidden\" class=\"imagenrequest\">";
strVar += "        <div id=\"file-preview-zone\"  class=\"mx-auto\" align=\"center\"><\/div>";
strVar += "        <div class=\"mb-3\">";
strVar += "          <label for=\"formGroupExampleInput\" class=\"form-label\">Pregunta<\/label>";
strVar += "          <input type=\"text\" class=\"form-control pregunta\"  placeholder=\"Escriba la pregunta\">";
strVar += "        <\/div>";
strVar += "        <div class=\"mb-3\">";
strVar += "            <label for=\"formGroupExampleInput2\" class=\"form-label\">Respuesta<\/label>";
strVar += "            <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Escriba la respuesta\">";
strVar += "        <\/div>";
strVar += "      <div class=\"editar\" role=\"group\" aria-label=\"Basic mixed styles example\">";
strVar += "        <br>";
strVar += "        <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
strVar += "      <\/div>";
strVar += "    <\/div>";

insertor.insertAdjacentHTML("beforeend",strVar);

}


function preguntaMatematicas(){
  var strVar="";
strVar += "    <div class=\"tipoM cuestionario\">";
strVar += "            <h4>Pregunta de Matemáticas<\/h4>";
strVar += "            <p>Si requiere escribir una fracción ingrese guion bajo\"_\" p. ej. 3_4 <\/p>";
strVar += "            <div class=\"mb-3\">";
strVar += "              <label for=\"formGroupExampleInput\" class=\"form-label\">Expresión<\/label>";
strVar += "              <input type=\"text\" class=\"form-control pregunta\"  placeholder=\"Escriba la expresión a mostrar al alumno\">";
strVar += "            <\/div>";
strVar += "          ";
strVar += "            <div class=\"editar\" role=\"group\" aria-label=\"Basic mixed styles example\">";
strVar += "              <br>";
strVar += "              <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
strVar += "            <\/div>";
strVar += "    <\/div>";

insertor.insertAdjacentHTML("beforeend",strVar);
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

function envioPreguntaOM(){

  var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoOM");

    for(i=0;i<cuestionarios.length;i++){
    
     
      
      //Selección de la pregunta que aparecerá para el alumno
      var pregunta = cuestionarios[i].querySelectorAll("div.pregunta input.pregunta");
      pregunta[0].name="pregunta"+contador;

      //Recolección de las opciones a mostrar
      var reactivos=cuestionarios[i].querySelectorAll("div.reactivos input.opcion");

      for(j=0;j<reactivos.length;j++){
      reactivos[j].name="pregunta"+contador;
      }

      //Recolección de la(s) respuesta(s)
      var respuesta = cuestionarios[i].querySelectorAll("div.bg-success input.opcion");
      for(k=0;k<respuesta.length;k++){
        //Creacción de elementos hidden para el envío de la(s) respuesta(s)
        var respuestaHTML=document.createElement("INPUT");
        respuestaHTML.type="hidden";
        respuestaHTML.name="respuesta"+contador;
        respuestaHTML.value=respuesta[k].value;

        cuestionarios[i].appendChild(respuestaHTML);

        }
        
         //Se agrega el tipo de pregunta por medio de un elemento hidden
      var tipoHTML=contadorTipo();
      //Definición del tipo de pregunta
      tipoHTML.value="tipoOM";
      //inserción
      cuestionarios[i].appendChild(tipoHTML);

    
      contador=contador+1;
      }
}

function envioPreguntaIT(){
   
  var i=0;
  //Rastreo del div por su clase, que define el tipo de pregunta
  var cuestionarios=document.getElementsByClassName("tipoIT");
  
  
  //Clasificación de los elementos enviados para no tener conflictos en la request
  for(i=0;i<cuestionarios.length;i++){
  
  //Se agrega el tipo de pregunta por medio de un elemento hidden
  var tipoHTML=contadorTipo();
  //Definición del tipo de pregunta
  tipoHTML.value="tipoIT";
  //inserción
  cuestionarios[i].appendChild(tipoHTML);
  
  //Captura de la imagen
  var imagen = cuestionarios[i].querySelectorAll("input.imagen");
  imagen[0].name="imagenes";

    //Creación de un espacio en blanco en un array para enviar el id de la imagen
  var imagenHTML = cuestionarios[i].querySelectorAll("input.imagenrequest");
  imagenHTML[0].name="pregunta"+contador;
  imagenHTML[0].value="";

  var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
  pregunta[0].name="pregunta"+contador;

  

  var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
  respuesta[0].name="respuesta"+contador;

  contador=contador+1;
  }

  
}

function envioPreguntaMate(){
   
  var i=0;
  //Rastreo del div por su clase, que define el tipo de pregunta
  var cuestionarios=document.getElementsByClassName("tipoM");
  
  
  //Clasificación de los elementos enviados para no tener conflictos en la request
  for(i=0;i<cuestionarios.length;i++){
  
  //Se agrega el tipo de pregunta por medio de un elemento hidden
  var tipoHTML=contadorTipo();
  //Definición del tipo de pregunta
  tipoHTML.value="tipoM";
  //inserción
  cuestionarios[i].appendChild(tipoHTML);
  
 


  var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
  pregunta[0].name="pregunta"+contador;

  


  contador=contador+1;
  }

  
}


function readFile(input){
  if(input.files && input.files[0]){
      var reader = new FileReader();
      reader.onload = (e)=>{
          var filePreview = document.createElement("img");
          filePreview.setAttribute("width","460");
          filePreview.setAttribute("height","345");
         /*  filePreview.setAttribute("ondragenter","dragEnter(event)");
          filePreview.setAttribute("ondraleave","dragLeave(event)");
          filePreview.setAttribute("ondragover","allowDrop(event)");
          filePreview.setAttribute("ondrop","drop(event)");
          filePreview.setAttribute("ondragstart","drag(event)");*/
          filePreview.id = 'file-preview';
          filePreview.src = e.target.result;
          console.log(e.target.result);
          var previewZone = document.getElementById('file-preview-zone');
          previewZone.appendChild(filePreview);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
  var fileUpload = document.getElementById('file-upload');
  fileUpload.onchange = (e)=>{
      readFile(e.srcElement);
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
    envioPreguntaOM();
    envioPreguntaIT();
    envioPreguntaMate();
    document.getElementById("formularioQuizz").submit();
    
}