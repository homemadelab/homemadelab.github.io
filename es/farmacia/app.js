var correcta = false;
const body = document.getElementById("body");
const pregunta = document.getElementById("pregunta");
const respuesta1 = document.getElementById("respuesta1");
const respuesta2 = document.getElementById("respuesta2");
const respuesta3 = document.getElementById("respuesta3");
const respuesta4 = document.getElementById("respuesta4");
const indiceRespuestaCorrecta = document.getElementById("indiceRespuestaCorrecta");
const respuestas_span = [respuesta1, respuesta2, respuesta3, respuesta4];
const tiempoRestante_span = document.getElementById("tiempoRestante");

function calcularTiempoRestante(tiempoRestante) {
  var i = 100;
  if (i == 100) {
    i = 0;
    var width = 100;
    var id = setInterval(frame, 600);
    function frame() {
      if (width <= 0) {
        setTimeout(function() {
          window.location.href = "/es/tiempoAcabado.html";
        }, 3000);
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
  const archivo = await fetch("farmacia_es.csv"); // Recibo el archivo con las preguntas y respuestas
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

function verificarCorrecta(opcion, correcta) {
  if(opcion.innerHTML != correcta) {
    body.style.backgroundColor = "white";
    body.style.backgroundColor = "#F63E52";
    opcion.style.background = "#D52444";
    console.log("La respuesta es incorrecta.");
    setTimeout(function() {
      window.location.href = "/es/respuestaIncorrecta.html";
    }, 3000);
  }

  else {
    body.style.backgroundColor = "white";
    body.style.backgroundColor = "#00A653";
    opcion.style.background = "#008747";
    console.log("La respuesta es correcta.");
    setTimeout(function() {
      window.location.href = "/es/respuestaCorrecta.html";
    }, 3000);
  }

}

async function main() {
  var preguntas = [];
  var respuestas = [];
  var opciones = [];
  var indiceRespuestas = [0, 3, 5, 8, 11, 14, 16, 19, 22, 24, 27, 30, 33, 35, 38, 41, 43, 45, 47, 50, 53, 56, 59, 62, 65, 67, 70, 73, 76, 79];
  var preguntaAleatoria = aleatorizarPreguntas();
  var j = 0;
  var indiceAleatorio = indiceRespuestas[preguntaAleatoria];
  indiceRespuestaCorrecta.innerHTML = indiceAleatorio;

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
    verificarCorrecta(respuesta1, respuestas[indiceRespuestas[preguntaAleatoria]]);
  })

  respuesta2.addEventListener('click', function() {
    verificarCorrecta(respuesta2, respuestas[indiceRespuestas[preguntaAleatoria]]);
  })

  respuesta3.addEventListener('click', function() {
    verificarCorrecta(respuesta3, respuestas[indiceRespuestas[preguntaAleatoria]]);
  })

  respuesta4.addEventListener('click', function() {
    verificarCorrecta(respuesta4, respuestas[indiceRespuestas[preguntaAleatoria]]);
  })

  calcularTiempoRestante(tiempoRestante_span);

}

main();
