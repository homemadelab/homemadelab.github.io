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
        let dieValue = Math.floor(Math.random()*6);
        console.log(dieOneValue);
        document.querySelector("#die").setAttribute("src", "/coronavirus/imagenes/" + images[dieOneValue]);
        document.querySelector("#total").innerHTML = "Your roll is " + ( (dieOneValue +1) + (dieTwoValue + 1) );
    },
    1000
    );
}
roll();
