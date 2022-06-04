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
  "purple"
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
    newDiv.classList.add('card');
    newDiv.value = color;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
  let previousClick = "";
  let match = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log(event.target.value);
  const newClass = "clicked"
  event.target.classList.add(newClass);
  let click = parseInt(document.getElementById("counter").innerText);
  click += 1;
  console.log(click);
  document.getElementById("counter").innerText = click;
  
  let currentClick = event.target;
  //checking if 2 items where already clicked
  if (click%2 != 0){
    previousClick = currentClick;
    currentClick.classList.add("disabled")
  }
  //checking if this matches
  if (currentClick.value === previousClick.value && click%2 === 0){
    console.log('match');
    previousClick.classList.add("disabled")
    currentClick.classList.add("disabled")
    previousClick.classList.add("match")
    currentClick.classList.add("match")
    match += 1;
    console.log(`Matches:${match}`);
    console.log(COLORS.length/2)
    if (match === COLORS.length/2){
      setTimeout(function(){
        alert("Game Over")
        location.reload();
      }, 1000)
    }
  }
  //if not a match, clicked class will be removed
  else if (currentClick != previousClick && click%2 === 0){ 
    console.log('not a match');
    let allItems = document.querySelectorAll('.card');
    //making all items disabled temporarily while checking if it's a match
    for (item of allItems){
      item.classList.add("disabled");
    }
    setTimeout(function(){
      previousClick.classList.toggle("clicked");
      currentClick.classList.toggle('clicked');
      for (item of allItems){
        if (item.classList.contains("match")){
          continue;
        }
        else{
          item.classList.remove("disabled");
        }
      }
    }, 1000)
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */