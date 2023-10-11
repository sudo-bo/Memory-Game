const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("colorNeutral");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

// a counter for cardsClicked
let cardsClicked = 0;
// array that tracks the two cards being selected
let cardsChanged = [];
function handleCardClick(event) {
  cardsClicked++;
  console.log(event.target);
  // set limit on # of user clicks
  if (cardsClicked <= 2) {
    event.target.classList.toggle("colorNeutral");
    cardsChanged.push(event.target);
  }
  // once two cards are selected, we check if they are the same by using the array 'cardsChanged'
  if (cardsClicked === 2) {
    if (cardsChanged[0].classList[0] === cardsChanged[1].classList[0]) {
      reset();
    } else {
      setTimeout(clearCards, 1000);
    }
  }
}

// the function below clears the array 'cardsChanged' so that it can never exceed a length of two
function clearCards() {
  for (card of cardsChanged) {
    card.classList.toggle("colorNeutral");
  }
  cardsClicked = 0;
  cardsChanged = [];
}

function reset() {
  cardsClicked = 0;
  cardsChanged = [];
}

// when the DOM loads
createDivsForColors(shuffledColors);
