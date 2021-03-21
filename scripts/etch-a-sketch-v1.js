const GRID_CONTAINER = document.querySelector(".grid-container");

const SIZE_BUTTON = document.querySelector("#id-button");
SIZE_BUTTON.addEventListener("click", getUserSize);

let colorChange = 10;

initGrid(16);


function initGrid(defaultSize) {
    createGrid(defaultSize);
}

function getUserSize() {   
    let sizeInput = prompt("Please grid size (2-64)");

    if (sizeInput >= 2 && sizeInput <=64) {
        createGrid(sizeInput);
    } else {
        console.log("number needs to be between 2 and 64");
    }

}

function resetGrid() {  
    let gridCurrent = document.querySelector(".grid-main");
    if (gridCurrent) {
        console.log("exists")
        gridCurrent.remove();
    }
}


function createGrid(gridStartSize) {
    
    resetGrid();
    
    let gridMain = document.createElement('section');
    gridMain.setAttribute("class","grid-main center-align");

    for(let i =0; i < gridStartSize; i++) {
        let gridRow = document.createElement('section');
        gridRow.setAttribute("id",`grid-row-${i+1}`);
        gridRow.setAttribute("class","grid-row");

        for (let j=0; j < gridStartSize; j++) {

            // add item to grid row
            let gridItem = document.createElement('section');
            gridItem.setAttribute("id",`grid-item-${j+1}`);
            gridItem.setAttribute("class","grid-item");
            gridRow.appendChild(gridItem);

        }

        // add grid row to grid
        gridMain.appendChild(gridRow);

    }
   
    addGrid(gridMain);
}

function addGrid(grid) {
    // logic to add grid to page HTML
    GRID_CONTAINER.appendChild(grid);

    const GRID_ITEM_CURRENT = document.querySelectorAll(".grid-item");

    for (const ITEM of GRID_ITEM_CURRENT) {
        ITEM.addEventListener("mouseover", function(event) {
            setColor(event);
        });
    }
}

function setColor(itemListenerEvent) {
    
    let itemColor = itemListenerEvent.target.style["background-color"];

  

    if (!itemColor) {
        itemListenerEvent.target.style["background-color"] = "hsl(227, 100%, 90%)";

    } else {
        let currentRGBColor = itemColor.substring(4,itemColor.length-1); 

        let currentRed = currentRGBColor.split(",")[0]
        let currentGreen = currentRGBColor.split(",")[1]
        let currentBlue = currentRGBColor.split(",")[2]
      
        let currentHSLColor = rgbToHsl(currentRed,currentGreen,currentBlue);

        let currentLightness = currentHSLColor.l; 
        

        if (currentLightness > 0 ) {
            let decrementedColor = currentLightness - colorChange;
            let newColor = `hsl(227, 100%, ${decrementedColor}%)`
        
            itemListenerEvent.target.style["background-color"] = newColor;
        } else {
            // color is already black so do nothing
        }


    }

function rgbToHsl(r, g, b) {
    var min, max, i, l, s, maxcolor, h, rgb = [];
    rgb[0] = r / 255;
    rgb[1] = g / 255;
    rgb[2] = b / 255;
    min = rgb[0];
    max = rgb[0];
    maxcolor = 0;
    for (i = 0; i < rgb.length - 1; i++) {
        if (rgb[i + 1] <= min) {min = rgb[i + 1];}
        if (rgb[i + 1] >= max) {max = rgb[i + 1];maxcolor = i + 1;}
    }
    if (maxcolor == 0) {
        h = (rgb[1] - rgb[2]) / (max - min);
    }
    if (maxcolor == 1) {
        h = 2 + (rgb[2] - rgb[0]) / (max - min);
    }
    if (maxcolor == 2) {
        h = 4 + (rgb[0] - rgb[1]) / (max - min);
    }
    if (isNaN(h)) {h = 0;}
    h = h * 60;
    if (h < 0) {h = h + 360; }
    l = (min + max) / 2;
    if (min == max) {
        s = 0;
    } else {
        if (l < 0.5) {
        s = (max - min) / (max + min);
        } else {
        s = (max - min) / (2 - max - min);
        }
    }
    s = s;

    h = Math.floor(h);
    s = s * 100;
    l = l * 100;

    return {h,s,l};
    // return `hsl(${h}, ${s}%, ${l}%)`
    
    }
    
}
