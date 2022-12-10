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
        let valorDado = Math.floor(Math.random() * 6);
        console.log(valorDado);
        document.querySelector("#die").setAttribute("src", "/coronavirus/imagenes/" + images[valorDado]);
        document.querySelector("#total").innerHTML = "Your roll is " + (valorDado + 1);
    },
    1000
    );
}
roll();
