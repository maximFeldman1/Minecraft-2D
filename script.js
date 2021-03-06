const gameSize = 20;
const container = document.querySelector(".container");
const world = document.querySelector(".world");
const toolbar = document.querySelector(".toolbar");
const tools = document.querySelector(".tools");
const materials = document.querySelector(".materials");
let gameArea = [];

function buildTheBoard() {
  for (let row = 0; row < gameSize; row++) {
    gameArea[row] = [];
    for (let col = 0; col < gameSize; col++) {
      gameArea[row][col] = document.createElement("div");
      gameArea[row][col].setAttribute("data-row", row);
      gameArea[row][col].setAttribute("data-col", col);
      gameArea[row][col].classList.add("tile");
      world.appendChild(gameArea[row][col]);
    }
  }
}

function resetting() {
  sky();
  grass();
  soil();
  water();
  stone();
  treeTrunk();
  treeBranch();
  lava();
  gold();
  drawMF();
}

function drawMF() {
  for (let col = 3; col < 4; col++) {
    for (let row = 1; row < 5; row++) {
      gameArea[row][col].setAttribute("id", "cloud");
    }
    gameArea[1][4].setAttribute("id", "cloud");
    gameArea[2][5].setAttribute("id", "cloud");
    gameArea[3][6].setAttribute("id", "cloud");
    gameArea[2][7].setAttribute("id", "cloud");
    gameArea[1][8].setAttribute("id", "cloud");
  }
  for (let col = 9; col < 10; col++) {
    for (let row = 1; row < 5; row++) {
      gameArea[row][col].setAttribute("id", "cloud");
    }
    gameArea[4][11].setAttribute("id", "cloud");
  }
  for (let col = 13; col < 14; col++) {
    for (let row = 1; row < 5; row++) {
      gameArea[row][col].setAttribute("id", "cloud");
    }
    gameArea[1][14].setAttribute("id", "cloud");
    gameArea[1][15].setAttribute("id", "cloud");
    gameArea[1][16].setAttribute("id", "cloud");
    gameArea[3][14].setAttribute("id", "cloud");
    gameArea[3][15].setAttribute("id", "cloud");
  }
}

function sky() {
  for (let row = 0; row < gameSize; row++) {
    for (let col = 0; col < gameSize; col++) {
      gameArea[row][col].setAttribute("id", "sky");
    }
  }
}

function grass() {
  for (let row = 13; row < 14; row++) {
    for (let col = 1; col < gameSize; col++) {
      gameArea[row][col].setAttribute("id", "grass");
    }
  }
}

function soil() {
  for (let row = 14; row < 17; row++) {
    for (let col = 1; col < gameSize; col++) {
      gameArea[row][col].setAttribute("id", "soil");
    }
  }
}

function water() {
  for (let col = 0; col < 2; col++) {
    for (let row = 13; row < gameSize; row++) {
      gameArea[row][col].setAttribute("id", "water");
    }
  }
  for (let row = 19; row < gameSize; row++) {
    for (let col = 0; col < gameSize; col++) {
      gameArea[row][col].setAttribute("id", "water");
    }
  }
}

function stone() {
  for (let col = 5; col < 12; col++) {
    for (let row = 11; row < 13; row++) {
      gameArea[row][col].setAttribute("id", "stone");
    }
  }
}

function treeTrunk() {
  for (let col = 17; col < 18; col++) {
    for (let row = 9; row < 13; row++) {
      gameArea[row][col].setAttribute("id", "treeTrunk");
    }
  }
}

function treeBranch() {
  for (let col = 16; col < 19; col++) {
    for (let row = 6; row < 9; row++) {
      gameArea[row][col].setAttribute("id", "treeBranch");
    }
  }
}

function lava() {
  for (let row = 17; row < 18; row++) {
    for (let col = 1; col < gameSize; col++) {
      gameArea[row][col].setAttribute("id", "lava");
    }
  }
}

function gold() {
  for (let row = 18; row < 19; row++) {
    for (let col = 1; col < gameSize; col++) {
      gameArea[row][col].setAttribute("id", "gold");
    }
    gameArea[12][8].setAttribute("id", "gold");
  }
}

function createNewGame() {
  buildTheBoard();
  resetting();
}

createNewGame();

/* -------------------TOOLBAR----------------------- */

const toolbarUp = document.createElement("h1");
toolbarUp.classList.add("title");
toolbarUp.textContent = "Inventory";
toolbar.insertAdjacentElement("afterbegin", toolbarUp);

const toolbarMiddle = document.createElement("h3");
toolbarMiddle.classList.add("title");
toolbarMiddle.textContent = "Tools Of Trade";
tools.insertAdjacentElement("afterbegin", toolbarMiddle);

const toolbarList = document.createElement("ul");
toolbarList.classList.add("toolbarList");
tools.insertAdjacentElement("beforeend", toolbarList);

function createTool(name) {
  const element = document.createElement("li");
  element.setAttribute("id", name);
  element.textContent = name;
  element.classList.add("toolbarBox");
  toolbarList.appendChild(element);
}

createTool("axe");
createTool("pickaxe");
createTool("shovel");
createTool("full-bucket");
createTool("drill");
createTool("empty-bucket");

/* -------------------MATERIALS----------------------- */

let materialsHead = document.createElement("h2");
materialsHead.classList.add("title");
materialsHead.textContent = "Building Materials";
materials.insertAdjacentElement("afterbegin", materialsHead);

let materialsList = document.createElement("ul");
materialsList.classList.add("materialsList");
materials.insertAdjacentElement("beforeend", materialsList);

function createMaterial(name) {
  let material = document.createElement("li");
  material.setAttribute("id", name);
  material.textContent = 0;
  material.classList.add("materialBox");
  materialsList.appendChild(material);
}

createMaterial("grass");
createMaterial("soil");
createMaterial("water");
createMaterial("stone");
createMaterial("treeTrunk");
createMaterial("treeBranch");
createMaterial("gold");
createMaterial("lava");

/* -------------------RESET----------------------- */
const refreshBtn = document.createElement("button");
refreshBtn.classList.add("refreshBtton");
toolbar.insertAdjacentElement("beforeend", refreshBtn);

/* ------------------LOGIC OF GAME----------------------- */

function handleTileClick(event) {
  let pressedTileType = event.currentTarget.getAttribute("id");
  if (document.querySelector(".selected")) {
    let selectedTool = document.querySelector(".selected");
    if (selectedTool.classList.contains("toolbarBox")) {
      mineTheTile(pressedTileType, selectedTool.getAttribute("id"));
    } else if (
      selectedTool.classList.contains("materialBox") &&
      checkInventory(selectedTool.getAttribute("id"))
    ) {
      placeTheTile(pressedTileType, selectedTool.getAttribute("id"));
    }
  }
}

function checkInventory(tileToPlaceType) {
  if (
    parseInt(
      document.querySelector(`[id=${tileToPlaceType}].materialBox`).textContent
    ) > 0
  )
    return true;
  else return false;
}

function placeTheTile(tileOut, tileIn) {
  if (tileOut === "sky") {
    removeFromInventory(tileIn);
    event.currentTarget.setAttribute("id", tileIn);
  }
}

function addToInventory(tileToMine) {
  document.querySelector(`[id =${tileToMine}].materialBox`).textContent =
    parseInt(
      document.querySelector(`[id=${tileToMine}].materialBox`).textContent
    ) + 1;
  console.log(tileToMine);
}

function refreshMaterials() {
  window.location.reload();
}

function removeFromInventory(tileToPlace) {
  document.querySelector(`[id=${tileToPlace}].materialBox`).textContent =
    parseInt(
      document.querySelector(`[id=${tileToPlace}].materialBox`).textContent
    ) - 1;
}

function mineTheTile(tileToMine, toolToUse) {
  if (
    (tileToMine === "stone" && toolToUse === "pickaxe") ||
    ((tileToMine === "treeTrunk" || tileToMine === "treeBranch") &&
      toolToUse === "axe") ||
    ((tileToMine === "soil" || tileToMine === "grass") &&
      toolToUse === "shovel") ||
    (tileToMine === "water" && toolToUse === "empty-bucket") ||
    (tileToMine === "lava" && toolToUse === "full-bucket") ||
    (tileToMine === "gold" && toolToUse === "drill")
  ) {
    event.currentTarget.setAttribute("id", "sky");
    addToInventory(tileToMine);
  }
}

function handleInventoryClick(event) {
  if (event.currentTarget.classList.contains("selected")) {
    event.currentTarget.classList.remove("selected");
  } else {
    inventoryNodeList.forEach((el) => el.classList.remove("selected"));
    event.currentTarget.classList.add("selected");
  }
}

const inventoryNodeList = document.querySelectorAll(".toolbar li");

inventoryNodeList.forEach((el) => {
  el.addEventListener("click", handleInventoryClick);
});

for (let row = 0; row < gameSize; row++) {
  for (let col = 0; col < gameSize; col++) {
    gameArea[row][col].addEventListener("click", handleTileClick);
  }
}

refreshBtn.addEventListener("click", resetting);
refreshBtn.addEventListener("click", refreshMaterials);
