let images = ["dado1.svg",
"dado2.svg",
"dado3.svg",
"dado4.svg",
"dado5.svg",
"dado6.svg"];
let dado = document.querySelectorAll("img");

function roll(){
    dado.forEach(function(die){
        die.classList.add("shake");
    });
    setTimeout(function(){
        dado.forEach(function(die){
            die.classList.remove("shake");
        });
<<<<<<< HEAD
        let valorDado = Math.floor(Math.random() * 6);
        console.log(valorDado);
        document.querySelector("#die").setAttribute("src", "/coronavirus/imagenes/" + images[valorDado]);
        document.querySelector("#total").innerHTML = "Your roll is " + (valorDado + 1);
=======
        let dieValue = Math.floor(Math.random()*6);
        console.log(dieOneValue);
        document.querySelector("#die").setAttribute("src", "/coronavirus/imagenes/" + images[dieOneValue]);
        document.querySelector("#total").innerHTML = "Your roll is " + ( (dieOneValue +1) + (dieTwoValue + 1) );
>>>>>>> 13f2dd5da46c3dacceedf5167c9a0a39568f4691
    },
    1000
    );
}
roll();
