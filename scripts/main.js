const startArea = document.getElementById(`start-area`);
const roundArea = document.getElementById(`round-area`);
const nextArea = document.getElementById(`next-area`);
const endArea = document.getElementById(`end-area`);

const startBtn = document.getElementById(`start-btn`);
const gameBtns = Array.from(document.querySelectorAll(`.game-btn`));
const nextBtn = document.getElementById(`next-btn`);

const roundPara = document.getElementById(`round-para`);
const selPara = document.getElementById(`sel-para`);
const resultPara = document.getElementById(`result-para`);
const scorePara = document.getElementById(`score-para`);

let score = new Score(0, 0);
let currentRound = 1;
const rounds = 2;

function Score(player, comp) {
  this.player = player;
  this.comp = comp;
  this.clear = () => {
    this.player = 0;
    this.comp = 0;
  }
}

startBtn.addEventListener('click', (event) => {
  startArea.classList.add(`off`);
  setNewGame();
});

function setNewGame() {
  roundArea.classList.toggle(`off`);
  score.clear();
  roundPara.textContent += ` ${currentRound} of ${rounds}`;
}

gameBtns.forEach((gameBtn) => {
  gameBtn.addEventListener(`click`, (event) => {
    gameBtn.classList.toggle(`selected`);
    disableInput();
    let playerSel = gameBtn.id.charAt(0).toUpperCase() + gameBtn.id.slice(1).toLowerCase();;
    let compSel = generateCompSel();
    selPara.textContent = `Computer picked ${compSel}`;
    resultPara.textContent = playRound(playerSel, compSel);
    scorePara.textContent = `Player: ${score.player}, Computer: ${score.comp}`;
    nextArea.classList.toggle(`off`);
  })
});

function generateCompSel() {
  const options = [
    `Rock`, 
    `Paper`, 
    `Scissors`
  ];
  return randomValueFromArray(options);
}

function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function disableInput() {
  gameBtns.forEach((gameBtn) => {
    gameBtn.disabled = true;
    gameBtn.classList.toggle(`disabled`);
  });
}

function toggleOnHover() {

}

function playRound(roundPlayerSel, roundCompSel) {
  let result = ``;
  if (roundPlayerSel === `Rock`) {
    if (roundCompSel === `Rock`) {
      result = `Draw!`
    } else if (roundCompSel === `Paper`) {
      result = `You Lose! ${roundCompSel} beats ${roundPlayerSel}!`;
      score.comp++;
    } else { //roundCompSel === `Scissors`
      result = `You Win! ${roundPlayerSel} beats ${roundCompSel}!`;
      score.player++;
    }
  } else if (roundPlayerSel === `Paper`) {
    if (roundCompSel === `Rock`) {
      result = `You Win! ${roundPlayerSel} beats ${roundCompSel}!`;
      score.player++;
    } else if (roundCompSel === `Paper`) {
      result = `Draw!`
    } else { //roundCompSel === `Scissors`
      result = `You Lose! ${roundCompSel} beats ${roundPlayerSel}!`;
      score.comp++;
    }
  } else { //roundPlayerSel === `Scissors`
    if (roundCompSel === `Rock`) {
      result = `You Lose! ${roundCompSel} beats ${roundPlayerSel}!`;
      score.comp++;
    } else if (roundCompSel === `Paper`) {
      result = `You Win! ${roundPlayerSel} beats ${roundCompSel}!`;
      score.player++;
    } else { //roundCompSel === `Scissors`
      result = `Draw!`
    }
  }
  return result;
}





function playGame() {
  
  let rounds = 2;
  for (i = 1; i <= rounds; i++) {
    
    
    let playerSelection = `Please Enter Your Selection`;
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