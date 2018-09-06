function game() {

  let score = [0, 0];

  for (i = 1; i <= 5; i++) {
    console.log(`Round #${i}`);
    let playerSelection = prompt(`Please Enter Your Selection`);
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase();
    if ((playerSelection === `Rock`) || (playerSelection === `Paper`) || (playerSelection === `Scissors`)) {
      let compSelection = computerPlay();
      console.log(`Player Selection: ${playerSelection}`);
      console.log(`Computer Selection: ${compSelection}`);
      console.log(playRound(playerSelection, compSelection, score));
      console.log(`Current Score is Player: ${score[0]} & Computer: ${score[1]}`);
    } else {
      console.log(`Please Enter a Valid Selection: Rock, Paper or Scissors`);
      i--;
    } 
  }

  calcFinalScore(score);

}

function calcFinalScore(score) {
  
  let winner = ``;
  
  if (score[0] === score[1]) {
    console.log(`Game Over! It's a Draw!`);
  } else {
    winner = (score[0] > score[1]) ? `Player` : `Computer`;
    console.log(`Game Over! The Winner is ${winner}!`);
  }
  console.log(`The Final Score is Player: ${score[0]} & Computer: ${score[1]}`)

}

function playRound(playerSelection, compSelection, score) {

  let result = ``;

  if (playerSelection === `Rock`) {
    if (compSelection === `Rock`) {
      result = `Draw!`
    } else if (compSelection === `Paper`) {
      result = `You Lose! ${compSelection} beats ${playerSelection}!`;
      score[1]++;
    } else { //compSelection === `Scissors`
      result = `You Win! ${playerSelection} beats ${compSelection}!`;
      score[0]++;
    }
  } else if (playerSelection === `Paper`) {
    if (compSelection === `Rock`) {
      result = `You Win! ${playerSelection} beats ${compSelection}!`;
      score[0]++;
    } else if (compSelection === `Paper`) {
      result = `Draw!`
    } else { //compSelection === `Scissors`
      result = `You Lose! ${compSelection} beats ${playerSelection}!`;
      score[1]++;
    }
  } else { //playerSelection === `Scissors`
    if (compSelection === `Rock`) {
      result = `You Lose! ${compSelection} beats ${playerSelection}!`;
      score[1]++;
    } else if (compSelection === `Paper`) {
      result = `You Win! ${playerSelection} beats ${compSelection}!`;
      score[0]++;
    } else { //compSelection === `Scissors`
      result = `Draw!`
    }
  }

  return result;

}

function computerPlay() {

  let compSelection = [
    `Rock`, 
    `Paper`, 
    `Scissors`
  ];
  
  return randomValueFromArray(compSelection);

}

function randomValueFromArray(array) {

  return array[Math.floor(Math.random()*array.length)];
  
}