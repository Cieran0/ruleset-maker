let game = null;
var selectedPiece = "pawn";

var isMouseDown = false;

var moving = false; //F
var jumping = false; // RED = on
var first = false; // GREEN = on
var taking = false; // BLUE = on
var clearing = false;

/**
 * Move template 
 * {
 *  moving: true,
 *  jumping: false,
 *  taking: true,
 *  first: false
 * }
 * 
*/

const colorCombinations = {
    '0000': 'gray',
    '0001': 'red',
    '0010': 'blue',
    '0011': 'purple',
    '0100': 'green',
    '0101': 'yellow',
    '0110': 'cyan',
    '0111': 'white',
    '1000': 'brown',
    '1001': 'pink',
    '1010': 'orange',
    '1011': 'lightgreen',
    '1100': 'lightblue',
    '1101': 'violet',
    '1110': 'gold',
    '1111': 'black',
  };


var moves = {};
moves["pawn"] = {moves: []};
moves["rook"] = {moves: []};
moves["bishop"] = {moves: []};
moves["queen"] = {moves: []};
moves["king"] = {moves: []};
moves["knight"] = {moves: []};


window.onload = function() {
    MouseHandler.setUpMouseEvent();
    restart();
};

function restart() {
    Canvas.drawBoard();
}


function contains(array, pos) {
    var result = false;
    array.forEach(element => {
        if(element.x == pos.x && element.y == pos.y) {
            result = true;
        }
    });
    return result;
}

var piecesNames = [
    "pawn",
    "rook",
    "bishop",
    "knight",
    "queen",
    "king",
];

function nextPiece() {
    current = piecesNames.indexOf(selectedPiece);
    next = current+1;
    if(next >= piecesNames.length) next = 0;
    selectedPiece = piecesNames[next];
}

function save() {
    console.log(prompt("Copy to a file, place in custom rules directory",getRuleSet()));
}

function getRuleSet() {
    str = "";
    piecesNames.forEach(piece => {
        string = piece+"M";
        moves[piece].moves.forEach(element => {
            string += (element.x-8) + "," + (element.y-8) + "," + Number(element.moving) + "," + Number(element.jumping) + "," + Number(element.taking) + "," + Number(element.first) + "|";
        });
        string += "&"
        str += string
    });

    return str.slice(0,-1);
}

function getMoves(movesString) {
    movesArray = [];

    movesStringArray = movesString.split('|');

    movesStringArray.forEach(move => {
        if(move != "") {
            moveSplit = move.split(',');
            movePos = {
                x: parseInt(moveSplit[0]) + 8,
                y: parseInt(moveSplit[1]) + 8,
                moving: parseInt(moveSplit[2]) == 1,
                jumping: parseInt(moveSplit[3]) == 1,
                taking: parseInt(moveSplit[4]) == 1,
                first: parseInt(moveSplit[5]) == 1,
            }
            movesArray.push(movePos);
        }
    });

    return movesArray;
}

function setRuleSet(input) {
    const allMovesArray = input.split("&");

    piecesNames.forEach(piece => {
        i = -1;
        for (let index = 0; index < 6; index++) {
            if(allMovesArray[index].split('M')[0] == piece) {
                i = index;
                break;
            }
        }
        if(i == -1){
            console.log("error!");
        }
        allMoves = allMovesArray[i].split('M')[1];
        //console.log(allMovesArray);
        moves[piece].moves = getMoves(allMoves);
    });
    console.log(moves);
}

function load() {
    setRuleSet(prompt("Copy to a file, place in custom rules directory"));
    Canvas.drawBoard();
}

function toggleMoving() {
    moving = !moving;
    document.getElementById("toggleMoving").innerHTML = "Moving: " + moving;
}

function toggleJumping() {
    jumping = !jumping;
    document.getElementById("toggleJumping").innerHTML = "Jumping: " + jumping;
}

function toggleFirst() {
    first = !first;
    document.getElementById("toggleFirst").innerHTML = "First: " + first;
}

function toggleTaking() {
    taking = !taking;
    document.getElementById("toggleTaking").innerHTML = "Taking: " + taking;
}

function toggleClear() {
    clearing = !clearing;
    document.getElementById("toggleClear").innerHTML = "Clearing: " + clearing;
}