const startArea = document.getElementById(`start-area`);
const roundArea = document.getElementById(`round-area`);
const nextArea = document.getElementById(`next-area`);
const endArea = document.getElementById(`end-area`);

const startBtn = document.getElementById(`start-btn`);
const gameBtns = Array.from(document.querySelectorAll(`.game-btn`));
const nextBtn = document.getElementById(`next-btn`);
const restartBtn = document.getElementById(`restart-btn`);

const roundHeading = document.getElementById(`round-heading`);
const endHeading = document.getElementById(`end-heading`);

const compSelPara = document.getElementById(`comp-sel-para`);
const resultPara = document.getElementById(`result-para`);
const scorePara = document.getElementById(`score-para`);

let stats = new Stats();
let currentRound = 1;
const rounds = 5;
let selBtn;

startBtn.addEventListener('click', () => {
  setGame(`new game`);
});

gameBtns.forEach((gameBtn) => {
  gameBtn.addEventListener(`click`, (event) => {
    selBtn = gameBtn;
    setGame(`end round`);
  });
});

nextBtn.addEventListener(`click`, (event) => {
  currentRound++;
  setGame(`new round`);
});

restartBtn.addEventListener('click', () => {
  currentRound = 1;
  setGame(`new game`);
});

function setGame(type) {
  switch (type) {
    case `new game`:
      stats.clearScore();
      if (!startArea.classList.value.includes(`off`)) {
        startArea.classList.toggle(`off`);
      }
    case `new round`:
      stats.clearRound();
      clearRoundText();
      if (currentRound === 1) {
        if (roundArea.classList.value.includes(`off`)) {
          roundArea.classList.toggle(`off`);
        } else {
          toggleGameBtns();
          endArea.classList.toggle(`off`);
        }
      } else {
        nextArea.classList.toggle(`off`);
        toggleGameBtns();
      }
      roundHeading.textContent = `Round ${currentRound} of ${rounds}`;
      break;
    case `end round`:
      toggleGameBtns();
      stats.pSel = selBtn.id.charAt(0).toUpperCase() + selBtn.id.slice(1).toLowerCase();
      stats.cSel = generateCompSel();
      compSelPara.textContent = `Computer picked ${stats.cSel}`;
      playRound();
      resultPara.textContent = stats.result;
      scorePara.textContent = `Player: ${stats.pScore}, Computer: ${stats.cScore}`;
      if (currentRound < rounds) {
        nextArea.classList.toggle(`off`);
        break;
      }
    case `end game`:
      endArea.classList.toggle(`off`);
      endHeading.textContent = getFinalResult();
    default:
  }
}

function playRound() {
  if (stats.pSel === `Rock`) {
    if (stats.cSel === `Rock`) {
      stats.result = `Draw!`
    } else if (stats.cSel === `Paper`) {
      stats.result = `You Lose! ${stats.cSel} beats ${stats.pSel}!`;
      stats.cScore++;
    } else { //stats.cSel === `Scissors`
      stats.result = `You Win! ${stats.pSel} beats ${stats.cSel}!`;
      stats.pScore++;
    }
  } else if (stats.pSel === `Paper`) {
    if (stats.cSel === `Rock`) {
      stats.result = `You Win! ${stats.pSel} beats ${stats.cSel}!`;
      stats.pScore++;
    } else if (stats.cSel === `Paper`) {
      stats.result = `Draw!`
    } else { //stats.cSel === `Scissors`
      stats.result = `You Lose! ${stats.cSel} beats ${stats.pSel}!`;
      stats.cScore++;
    }
  } else { //stats.pSel === `Scissors`
    if (stats.cSel === `Rock`) {
      stats.result = `You Lose! ${stats.cSel} beats ${stats.pSel}!`;
      stats.cScore++;
    } else if (stats.cSel === `Paper`) {
      stats.result = `You Win! ${stats.pSel} beats ${stats.cSel}!`;
      stats.pScore++;
    } else { //stats.cSel === `Scissors`
      stats.result = `Draw!`
    }
  }
}

function getFinalResult() {
  if (stats.pScore === stats.cScore) {
    endHeading.classList.add(`draw`);
    return `Game Over! It's a Draw!`;
  } else if (stats.pScore > stats.cScore) {
    endHeading.classList.add(`win`);
    return `Game Over! You Win!`;
  } else {
    endHeading.classList.add(`lose`);
    return `Game Over! You Lose!`;
  }
}

function toggleGameBtns() {
  selBtn.classList.toggle(`selected`);
  gameBtns.forEach((gameBtn) => {
    gameBtn.disabled = !gameBtn.disabled;
    gameBtn.classList.toggle(`disabled`);
  });
}

function clearRoundText() {
  compSelPara.textContent = ``;
  resultPara.textContent = ``;
  scorePara.textContent = ``;
  endHeading.textContent = ``;
}

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

function Stats(pScore = 0, cScore = 0, pSel = ``, cSel = ``, result =``) {
  this.pScore = pScore;
  this.cScore = cScore;
  this.pSel = pSel;
  this.cSel = cSel;
  this.result = result;
  this.clearScore = () => {
    this.pScore = 0;
    this.cScore = 0;
  }
  this.clearSel = () => {
    this.pSel = ``;
    this.cSel = ``;
  }
  this.clearResult = () => {
    this.result = ``;
  }
  this.clearRound = () => {
    this.pSel = ``;
    this.cSel = ``;
    this.result = ``;
  }
  this.clearAll = () => {
    this.pScore = 0;
    this.cScore = 0;
    this.pSel = ``;
    this.cSel = ``;
    this.result = ``;
  }
}