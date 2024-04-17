const tilesContainer = document.querySelector('.tiles');
const colors = ["blue","red","purple","lime","darkolivegreen","orangered","teal","yellow"];
const colorsPickList = [...colors,...colors];
const tileCount = colorsPickList.length

let revealedCount = 0;
let activetile = null;
let awaitingEndofMove = false;

function buildTile(color){
  const element = document.createElement('div');
  
  element.classList.add('tile');
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element .addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if 
    (awaitingEndofMove
      || revealed === "true"
      || element === activetile
      ) {
      return;
    }
    element.style.backgroundColor = color;

    if(!activetile){
      activetile=element;

      return;
    }

    const colorToMatch = activetile.getAttribute("data-color");

    if (colorToMatch === color){
      activetile.setAttribute("data-revealed","true");
      element.setAttribute("data-revealed","true");

      activetile = null;
      awaitingEndofMove = false;
      revealedCount += 2;

      if(revealedCount=== tileCount){
        alert("you win! Refresh to play again.");
      }

      return;
    }
    
    awaitingEndofMove = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      activetile.style.backgroundColor = null;

      awaitingEndofMove = false;
      activetile = null;
    }, 1000);
  })

  return element;
}

for (let i = 0; i < tileCount; i++){
  const randomIndex = Math.floor(Math.random() * colorsPickList.length);
const color = colorsPickList[randomIndex];
const tile = buildTile(color);
  
colorsPickList.splice(randomIndex, 1);
tilesContainer.appendChild(tile);

}










