var elDiceOne = document.getElementById('dice1');

function rollDice() {

  var diceOne = Math.floor((Math.random() * 6) + 1);

  console.log(diceOne);

  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (diceOne === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }
  setTimeout(rollDice(), 1000);
}
