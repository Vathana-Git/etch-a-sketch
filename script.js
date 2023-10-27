function colorSquare(e) {

  if (e.type === "mousedown" || isDown) {
    e.target.style.backgroundColor = color;
  }

}

function createSquare(squareSize) {

  let square = document.createElement("div");
  square.classList.add("square");
  square.style.height = squareSize;
  square.style.width = squareSize;
  square.style.border = "1px solid black";
  square.setAttribute("draggable", false);

  square.addEventListener("mouseover", colorSquare);
  square.addEventListener("mousedown", colorSquare);

  return square;

}

function createGrid(squaresPerSide = 16) {

  const squareSize = GRIDSIZE / squaresPerSide + "px";

  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container")

  gridContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    e.preventDefault();
  });

  gridContainer.addEventListener("mouseup", () => {
    isDown = false;
  });  

  let rowContainer;

  for (let i = 0; i < squaresPerSide; i++) {

    rowContainer = document.createElement("div");
    rowContainer.style.display = "flex";

    for (let j = 0; j < squaresPerSide; j++) {

      rowContainer.appendChild(createSquare(squareSize));

    }

    gridContainer.appendChild(rowContainer);

  }

  document.querySelector(".grid-background").appendChild(gridContainer);

}

function toggleActiveButton(e) {

  let buttons = document.querySelectorAll(".toggle-button");

  buttons.forEach((button) => {
    if (button != e.target) {
      button.classList.remove("toggle-active");
    }
  });

  if (e.target.id === "color-picker") {
    document.querySelector("#color-button").classList.add("toggle-active");
  } else {
    e.target.classList.add("toggle-active");
  }

}

function addEvents() {

  let gridSizeInput = document.querySelector("#grid-size-slider");

  gridSizeInput.addEventListener("input", (e) => {
  
    let gridSizeLabel = document.querySelector("#grid-size-label");
    let gridSize = e.target.value;
    gridSizeLabel.textContent = gridSize + "x" + gridSize;
  
    document.querySelector(".grid-container").remove();
  
    createGrid(gridSize);
  
  });
  
  let clearButton = document.querySelector("#clear-button");
  
  clearButton.addEventListener("click", () => {
  
    document.querySelector(".grid-container").remove();
    
    let gridSize = document.querySelector("#grid-size-slider").value;
  
    createGrid(gridSize);
  
  });
  
  let buttons = document.querySelectorAll(".toggle-button");
  buttons.forEach((button) => {
    button.addEventListener("click", toggleActiveButton)
  });

  let colorPicker = document.querySelector("#color-picker");
  colorPicker.addEventListener("input", (e) => {
    color = e.target.value;
  });

  let colorButton = document.querySelector("#color-button");
  colorButton.addEventListener("click", () => {
    color = colorPicker.value;
  });

  let eraserButton = document.querySelector("#eraser-button");
  eraserButton.addEventListener("click", () => {
    color = "#ffffff";
  });

}

const GRIDSIZE = 660;
let color = "#000000";
let isDown;

addEvents();

createGrid();