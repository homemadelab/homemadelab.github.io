var correcta = false;
var seleccionada = false;
const body = document.getElementById("body");
const id = document.getElementById("id");
const pregunta = document.getElementById("pregunta");
const respuesta1 = document.getElementById("respuesta1");
const respuesta2 = document.getElementById("respuesta2");
const respuesta3 = document.getElementById("respuesta3");
const respuesta4 = document.getElementById("respuesta4");
const indiceRespuestaCorrecta = document.getElementById("indiceRespuestaCorrecta");
const respuestas_span = [respuesta1, respuesta2, respuesta3, respuesta4];
const tiempoRestante_span = document.getElementById("tiempoRestante");
const fuente = document.getElementById("fuente").style.display = 'none';
const pdf = document.getElementById("pdf");

function calcularTiempoRestante(tiempoRestante) {
  var i = 100;
  if (i == 100) {
    i = 0;
    var width = 100;
    var id = setInterval(tiempo, 600);
    function tiempo() {
      if (width <= 0) { // Cuando el tiempo se termina
        setTimeout(function() {
          document.body.style.backgroundColor = '#F63E52'; // Cambio el fondo a rojo
          document.body.setAttribute('style', 'background-color:#F63E52 !important');
          document.getElementById("fuente").style.opacity = '1';
          mostrarOpciones(respuesta1, respuesta2, respuesta3, respuesta4);
        });
        clearInterval(id);
        i = 100;

      } else if(seleccionada == true){
        clearInterval(id);
        i = 100;

      } else {
        width--;
        tiempoRestante.style.width = width + "%";
      }
    }
  }
}

async function obtenerArchivo() {
  const archivo = await fetch("/coronavirus/preguntas/" + id.innerHTML + ".csv"); // Recibo el archivo con las preguntas y respuestas
  const datos = await archivo.text(); // Convierto el archivo a texto
  const tabla = datos.split("\n"); // Separo las preguntas
  return Promise.resolve(tabla);
}

function obtenerPreguntas(tabla) {
  var preguntas = [];

  tabla.forEach(columna => {
    const fila = columna.split(";"); // Separo las preguntas de las respuestas
    const pregunta = fila[0];
    preguntas.push(pregunta); // Agrego al array 'preguntas' cada pregunta
    //console.log(pregunta);
  });
  preguntas.pop(); // Elimino el último elemento que debe estar vacío

  return preguntas; // Retorno el array modificado
}

function obtenerRespuestas(tabla){
  var respuestas = [];

  tabla.forEach(columna => {
    const fila = columna.split(";"); // Separo las preguntas de las respuestas

    for(let i = 1; i < 5; i++) { // Separo las respuestas
      if(fila[i] != undefined) {
        const respuesta = fila[i];
        respuestas.push(respuesta);
      }
    }
    //console.log(respuestas);
  });
  return respuestas;
}

function aleatorizarPreguntas() {
  return Math.floor(Math.random() * 30); // Cantidad de preguntas
}

function aleatorizarRepuestas(opciones) {
  var indiceActual = opciones.length,  indiceAleatorio;

  // Mientras haya elementos para aleatorizar
  while (0 !== indiceActual) {
    // Elegir elemento restante
    indiceAleatorio = Math.floor(Math.random() * indiceActual);
    indiceActual--;

    // Intercambiar ese elemento por un elemento existente
    [opciones[indiceActual], opciones[indiceAleatorio]] = [opciones[indiceAleatorio], opciones[indiceActual]];
  }

  return opciones;
}

function aleatorizarRespuestas2(cantRespuestas) {
  for (var i = cantRespuestas; i < 100; i++) {
    indiceRespuestas[preguntaAleatoria];
  }
  if(indiceRespuesta == cantRespuestas){
    correcta = true;
  }

  return Math.floor(Math.random() * 30); // Cantidad de preguntas
}

function verificarCorrecta(opcion, correcta, respuesta1, respuesta2, respuesta3, respuesta4) {
  if(seleccionada == true){
    return;
  }
  if(opcion.innerHTML != correcta) {
    document.body.setAttribute('style', 'background-color:#F63E52');
    opcion.style.background = "#D52444";
    console.log("La respuesta es incorrecta.");
  }

  else {
    document.body.setAttribute('style', 'background-color:#00A653');
    opcion.style.background = "#008747";
    console.log("La respuesta es correcta.");
  }

  setTimeout(function(){ // Despues de 1 segundo de elegir muestro si las otras opciones son correctas o no
    mostrarOpciones(respuesta1, respuesta2, respuesta3, respuesta4);
    document.getElementById("fuente").style.opacity = '1';
  }, 1000);
}

function mostrarOpciones(respuesta1, respuesta2, respuesta3, respuesta4){
  if(respuesta1.innerHTML == correcta){
    respuesta1.style.background = "#008747";
    respuesta2.style.background = "#D52444";
    respuesta3.style.background = "#D52444";
    respuesta4.style.background = "#D52444";
  } else if(respuesta2.innerHTML == correcta){
    respuesta1.style.background = "#D52444";
    respuesta2.style.background = "#008747";
    respuesta3.style.background = "#D52444";
    respuesta4.style.background = "#D52444";
  } else if(respuesta3.innerHTML == correcta){
    respuesta1.style.background = "#D52444";
    respuesta2.style.background = "#D52444";
    respuesta3.style.background = "#008747";
    respuesta4.style.background = "#D52444";
  } else{
    respuesta1.style.background = "#D52444";
    respuesta2.style.background = "#D52444";
    respuesta3.style.background = "#D52444";
    respuesta4.style.background = "#008747";
  }
}

async function main() {
  var preguntas = [];
  var respuestas = [];
  var opciones = [];
  var indiceRespuestas = [];
  var indiceRespuestasCasa = [0, 3, 5, 8, 11, 14, 16, 19, 22, 24, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87];
  var indiceRespuestasFarmacia = [0, 3, 5, 8, 11, 14, 16, 19, 22, 24, 27, 30, 33, 35, 38, 41, 43, 45, 47, 50, 53, 56, 59, 62, 65, 67, 70, 73, 76, 79];
  var indiceRespuestasHospital = [0, 3, 5, 8, 11, 14, 16, 19, 22, 24, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87];
  var indiceRespuestasSupermercado = [0, 3, 5, 8, 11, 14, 16, 19, 22, 24, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87];
  var indiceRespuestasEscuela = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87];
  var indiceRespuestasBanco = [0, 3, 5, 8, 11, 14, 16, 19, 22, 24, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87];
  var indiceRespuestasLaboratorio = [0, 3, 5, 8, 11, 14, 16, 19, 22, 24, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87];
  var indiceRespuestasZoologico = [0, 3, 5, 8, 11, 14, 16, 19, 22, 24, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87];
  var preguntaAleatoria = aleatorizarPreguntas();
  var j = 0;

  if((id.innerHTML).slice(0, -3) == "casa"){
    indiceRespuestas = indiceRespuestasCasa;
  } else if((id.innerHTML).slice(0, -3) == "farmacia"){
    indiceRespuestas = indiceRespuestasFarmacia;
  } else if((id.innerHTML).slice(0, -3) == "hospital"){
    indiceRespuestas = indiceRespuestasHospital;
  } else if((id.innerHTML).slice(0, -3) == "supermercado"){
    indiceRespuestas = indiceRespuestasSupermercado;
  } else if((id.innerHTML).slice(0, -3) == "escuela"){
    indiceRespuestas = indiceRespuestasEscuela;
  } else if((id.innerHTML).slice(0, -3) == "banco"){
    indiceRespuestas = indiceRespuestasBanco;
  } else if((id.innerHTML).slice(0, -3) == "Laboratorio"){
    indiceRespuestas = indiceRespuestasLaboratorio;
  } else if((id.innerHTML).slice(0, -3) == "Zoologico"){
    indiceRespuestas = indiceRespuestasZoologico;
  }

  var indiceAleatorio = indiceRespuestas[preguntaAleatoria];

  pdf.href = "/coronavirus/pdfs/" + (id.innerHTML).slice(0, -3) +"/" + (preguntaAleatoria+1).toString(); // Redirijo a página de fuente

  indiceRespuestaCorrecta.innerHTML = indiceAleatorio;
  console.log("Pregunta ", preguntaAleatoria+1);
  respuestas_span[0].style.display = 'none';
  respuestas_span[1].style.display = 'none';
  respuestas_span[2].style.display = 'none';
  respuestas_span[3].style.display = 'none';

  preguntas = obtenerPreguntas(await obtenerArchivo());
  respuestas = obtenerRespuestas(await obtenerArchivo());

  pregunta.innerHTML = preguntas[preguntaAleatoria];

  correcta = respuestas[indiceRespuestas[preguntaAleatoria]];

  for (var i = indiceRespuestas[preguntaAleatoria]; i < 100; i++) {
    if(respuestas[i].includes("\r")) {

      respuestas_span[j].innerHTML = respuestas[i];
      try {                                           // En el caso de que la pregunta tenga 2 opciones
        respuestas_span[j+1].style.display = 'none';
        respuestas_span[j+2].style.display = 'none';
      } catch (e) {                                   // En el caso de que la pregunta tenga 3 opciones
        respuestas_span[j+1].style.display = 'none';
      } finally {                                     // En el caso de que la pregunta tenga 4 opciones
        opciones[j] = respuestas[i];
        break;
      }
      break;
    }
    else {
      opciones[j] = respuestas[i];
    }

    j++;
  }

  opciones = aleatorizarRepuestas(opciones);

  for (var k = 0; k < opciones.length; k++) {
    respuestas_span[k].style.display = 'block';
    respuestas_span[k].innerHTML = opciones[k];
  }

  respuesta1.addEventListener('click', function() {
    verificarCorrecta(respuesta1, respuestas[indiceRespuestas[preguntaAleatoria]], respuesta1, respuesta2, respuesta3, respuesta4);
    seleccionada = true;
  })

  respuesta2.addEventListener('click', function() {
    verificarCorrecta(respuesta2, respuestas[indiceRespuestas[preguntaAleatoria]], respuesta1, respuesta2, respuesta3, respuesta4);
    seleccionada = true;
  })

  respuesta3.addEventListener('click', function() {
    verificarCorrecta(respuesta3, respuestas[indiceRespuestas[preguntaAleatoria]], respuesta1, respuesta2, respuesta3, respuesta4);
    seleccionada = true;
  })

  respuesta4.addEventListener('click', function() {
    verificarCorrecta(respuesta4, respuestas[indiceRespuestas[preguntaAleatoria]], respuesta1, respuesta2, respuesta3, respuesta4);
    seleccionada = true;
  })

  calcularTiempoRestante(tiempoRestante_span);

}

main();
