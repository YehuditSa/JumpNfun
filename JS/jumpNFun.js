/*FUN 'N' JUMP Game*/

let isGameOver = false;
let isStartGame = false;
let gameOverJump = true; //A variable for stoping the jump option if the game over

heighestScoreFunc();
bottomButtons();

//The game start by pressing on Space
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !isStartGame) {
    createTreesFunc();
    isStartGame = true;
  }
});

function gameOver() {
  isGameOver = true;

  //Switching the divs of game and game over
  let gameOverDiv = document.getElementById("gameOver");
  gameOverDiv.style.display = "flex";
  gameContainer.style.display = "none";

  gameOverJump = false; //Stopping the jump option
  clearInterval(timerFunc);

  //Start again - by refreshing the page
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
      location.replace("../HTML/jumpNfun.html");
      insructionsDiv.style.display = "none";
    }
  });

  document.querySelector("#gameOver i").addEventListener("click", () => location.replace("../HTML/jumpNfun.html"));

  //Updating your highest score
  if (user.highScore < timer) {
    user.highScore = timer;
    localStorage.setItem("currentUser", JSON.stringify(user));
    if (user.username !== "Guest") localStorage.setItem(user.email, JSON.stringify(user));
  }

  document.getElementById("gameOverSound").play();
}

//timer

let timer = 0;
let yourScore = document.getElementById("yourScore");
let timerFunc = setInterval(() => {
  if (isStartGame) {
    timer++;
    if (timer < 10) yourScore.innerHTML = "0000" + timer;
    else if (timer < 100) yourScore.innerHTML = "000" + timer;
    else if (timer < 1000) yourScore.innerHTML = "00" + timer;
    else if (timer < 10000) yourScore.innerHTML = "0" + timer;
    else yourScore.innerHTML = timer;
  }
  if (timer === 100 || timer === 300 || timer === 500) {
    night();
  }
  if (timer === 200 || timer === 400 || timer === 600) {
    day();
  }
}, 100);

//For changing the your heighest score
let user = JSON.parse(localStorage.getItem("currentUser"));
let yourHighestScore = document.getElementById("yourheighestScore");
if (user.highScore != 0) {
  yourHighestScore.innerText = `Your HI: ${user.highScore}`;
} else {
  yourHighestScore.innerText = "Your HI: 0";
}

//For changing and printing the highest score
function heighestScoreFunc() {
  let heighestScore = 0;
  let indexOfHeighest=-1;
  for (let i = 0; i < localStorage.length; i++) {
    if (
      JSON.parse(localStorage.getItem(localStorage.key(i))).username !== "Guest" &&
      JSON.parse(localStorage.getItem(localStorage.key(i))).highScore > heighestScore
    ) {
      heighestScore = JSON.parse(localStorage.getItem(localStorage.key(i))).highScore;
      indexOfHeighest = i;
    }
  }
  if(indexOfHeighest!==-1)
  document.getElementById("highestScore").innerText = `HI:  ${
    JSON.parse(localStorage.getItem(localStorage.key(indexOfHeighest))).highScore
  } ${JSON.parse(localStorage.getItem(localStorage.key(indexOfHeighest))).username}`;
}

let gameContainer = document.getElementById("gameContainer");

//The runner

let runner = document.getElementById("runner");
let runnerStop = document.getElementById("runnerStop");
let j_runner = 74;
runner.style.top = j_runner + "%";

let i_runner = 0; //A variable that represents the number of times that top has changed

//A function for the runner's jumping - by changing the value of its top
function jump() {
  let runnerJump = setInterval(() => {
    if (i_runner < 35) {
      runner.style.top = j_runner - 2 + "%";
      j_runner -= 2;
      i_runner++;
    }
    if (i_runner >= 35) {
      j_runner += 2;
      runner.style.top = j_runner + 2 + "%";
      i_runner++;
    }
    if (i_runner === 70) {
      i_runner = 0;
      clearInterval(runnerJump);
    }
  }, 4);
}

let jumpSound = document.getElementById("jumpSound");

//The runner finally jump!!
document.addEventListener("keydown", (event) => {
  if ((event.code === "Space" || event.code === "ArrowUp") && gameOverJump === true && j_runner === 74) {
    jump();
    jumpSound.play();
  }
});

//The trees

/*At any one time there can be a maximum of three divs of trees on the screen.
  In the whole program - index will display which div number it is among the three*/

//Creating the trees
function createTreesFunc() {
  function createTreesAccordingToTimer(timerStopValue, freqency) {
    let i_createTrees = 1;
    let createTrees = setInterval(() => {
      if (!isGameOver && document.visibilityState === "visible") {
        addDivOfTrees(i_createTrees);
        i_createTrees++;
        if (i_createTrees === 4) i_createTrees = 1;
        if (timer === timerStopValue) {
          clearInterval(createTrees);
        }
      }
    }, freqency);
  }

  setTimeout(() => {
    //From 0 seconds to 9 seconds - the freqency of creating trees is 1500 milliseconds
    createTreesAccordingToTimer(90, 1500);
  }, 0);

  setTimeout(() => {
    //From 9 seconds to 12 seconds - the freqency of creating trees is 1200 milliseconds
    createTreesAccordingToTimer(198, 1200);
  }, 9000);

  setTimeout(() => {
    //From 19.8 seconds to 29.7 seconds - the freqency of creating trees is 900 milliseconds
    createTreesAccordingToTimer(297, 900);
  }, 19800);

  setTimeout(() => {
    //From 29.7 seconds to the end - the freqency of creating trees is 600 milliseconds
    createTreesAccordingToTimer(-1, 600);
  }, 29700);
}

//Adding a div to gameContainer
function addDivOfTrees(index) {
  let addDivOfTrees = document.createElement("div");
  addDivOfTrees.setAttribute("class", "divOfTrees");
  addDivOfTrees.setAttribute("id", `divOfTrees${index}`);

  gameContainer.appendChild(addDivOfTrees);

  let numOfTrees = Math.floor(Math.random() * 3) + 1; // Returns a random integer from 1 to 3:
  addTreesToTheDiv(numOfTrees, index);
  moveTrees(index);
}

//Adding trees(1/2/3) to the div
function addTreesToTheDiv(numOfTrees, index) {
  for (let i = 1; i <= numOfTrees; i++) {
    let indexOfImage = Math.floor(Math.random() * 8) + 1; // Returns a random integer from 1 to 8:

    let addTreeToDiv = document.createElement("img");
    addTreeToDiv.setAttribute("src", `../Images/tree${indexOfImage}.png`);
    addTreeToDiv.setAttribute("class", `_${numOfTrees}trees`);

    switch (index) {
      case 1:
        divOfTrees1.appendChild(addTreeToDiv);
        break;

      case 2:
        divOfTrees2.appendChild(addTreeToDiv);
        break;

      case 3:
        divOfTrees3.appendChild(addTreeToDiv);
        break;
    }
  }
}

//Moving the tree along the x-axis from right to left - by changing the value of its right
function moveTrees(index) {
  function moveTreesAccordingToIndex(j_tree, divOfTrees) {
    j_tree = 0;
    divOfTrees.style.right = j_tree;
    let moveTrees = setInterval(() => {
      divOfTrees.style.right = j_tree++ + "%";
      // The meeting between the runner and the trees
      if (j_tree >= 92 && j_runner >= 44 && j_runner <= 74) {
        gameOver();
      }
      if (j_tree === 97) {
        j_tree = 0;
        clearInterval(moveTrees);
        divOfTrees.remove();
      }
    }, 15);
  }

  switch (index) {
    case 1:
      let j_tree1;
      moveTreesAccordingToIndex(j_tree1, divOfTrees1);
      break;

    case 2:
      let j_tree2;
      moveTreesAccordingToIndex(j_tree2, divOfTrees2);
      break;

    case 3:
      let j_tree3 = 0;
      moveTreesAccordingToIndex(j_tree3, divOfTrees3);
      break;
  }
}

let instructionsDiv = document.getElementById("instructions");
function bottomButtons() {
  document.getElementById("refreshButton").addEventListener("click", () => location.replace("../HTML/jumpNfun.html"));
  document.getElementById("instructionsButton").addEventListener("click", () => {
    instructionsDiv.style.display = "inline-block";
    setTimeout(() => (instructionsDiv.style.display = "none"), 10000);
  });
}

//night
function night() {
  let opacity = 0.1;
  let fromDayToNight = setInterval(() => {
    document.getElementById("gameContainer").style.backgroundColor = `rgba(0,0,0,${opacity})`;
    document.getElementById("gameOver").style.backgroundColor = `rgba(0,0,0,${opacity})`;
    document.getElementById("timer").style.backgroundColor = `rgba(0,0,0,${opacity})`;
    opacity += 0.05;
    if (opacity > 0.8) {
      clearInterval(fromDayToNight);
    }
  }, 50);
  document.querySelector("body").style.color = "white";
  gameContainer.style.borderBottom = "9px solid white";
}

//day
function day() {
  let opacity = 0.1;
  let fromNightToDay = setInterval(() => {
    document.getElementById("gameContainer").style.backgroundColor = `rgba(36, 167, 215,${opacity})`;
    document.getElementById("gameOver").style.backgroundColor = `rgba(36, 167, 215,${opacity})`;
    document.getElementById("timer").style.backgroundColor = `rgba(36, 167, 215,${opacity})`;
    opacity += 0.05;
    if (opacity > 1) {
      clearInterval(fromNightToDay);
    }
  }, 20);
  document.querySelector("body").style.color = "black";
  gameContainer.style.borderBottom = "9px solid rgb(56, 32, 1)";
}
