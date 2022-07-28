const respuesta = 0;
const tiempo = 0;
const respuesta1 = document.getElementById("respuesta1");
const respuesta2 = document.getElementById("respuesta2");
const respuesta3 = document.getElementById("respuesta3");
//const respuesta4 = document.getElementById("respuesta4");

function comenzarTemporizador(duration, display) {
    var temporizador = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(temporizador / 60, 10);
        seconds = parseInt(temporizador % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--temporizador < 0) {
            temporizador = duration;
        }
    }, 1000);
}

function randomizarRespuesta(respuestas) {
  var respuesta = "";
  return respuesta;
}

function game(opcion) {
  console.log("Elegista la opcion " + opcion);
}

function main() {
  respuesta1.addEventListener('click', function() {
    game("1");
  })

  respuesta2.addEventListener('click', function() {
    game("2");
  })

  respuesta3.addEventListener('click', function() {
    game("3");
  })

  /*
  respuesta4.addEventListener('click', function() {
    game("r4");
    console.log("Elegiste la respuesta 4");
  })
  */
}

main();
