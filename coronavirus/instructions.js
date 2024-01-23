var currentUrl = window.location.href;
document.getElementById("seleccionar").style.display = "none";
const english = document.getElementById("english").style.display = "none";
const french = document.getElementById("french").style.display = "none";
const spanish = document.getElementById("spanish").style.display = "none";
const german = document.getElementById("german").style.display = "none";
const dutch = document.getElementById("dutch").style.display = "none";
const norwegian = document.getElementById("norwegian").style.display = "none";

let languages = [english, french, spanish, german, dutch, norwegian];

function loadInstructions(language) {
    if (currentUrl.includes('instructions1')) {
        document.getElementById("instructions").innerHTML = "Instructions 1";
        console.log('Instructions 1');
    } else if (currentUrl.includes('instructions2')) {
        document.getElementById("instructions").innerHTML = "Instructions 2";
        console.log('Instructions 2');
    } else if (currentUrl.includes('instructions3')) {
        document.getElementById("instructions").innerHTML = "Instructions 3";
        console.log('Instructions 3');
    } else if (currentUrl.includes('instructions4')) {
        document.getElementById("instructions").innerHTML = "Instructions 4";
        console.log('Instructions 4');
    } else {
        console.log('Referrer does not match any expected URL');
    }
    document.getElementById("instructions").style.display = "block";
    console.log("I loaded the instructions");
}

function loadLanguages(language) {
    document.getElementById("seleccionar").style.display = "block";
    for (let i = 0; i < languages.length; i++) {
        languages[i].style.display = "block";
    }
    console.log("I loaded the languages");
}

function main() {
    if (localStorage.getItem("language") != null) {
        loadInstructions(localStorage.getItem("language"));
    } else {
        loadLanguages(localStorage.getItem("language"));
    }

    console.log(localStorage.getItem("language"));
}

document.addEventListener("DOMContentLoaded", function (event) {
    main();
});
