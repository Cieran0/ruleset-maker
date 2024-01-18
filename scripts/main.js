let game = null;
var selectedPiece = "pawn";

var moves = {};
moves["pawn"] = {blocking: [], jumping: [], first:[]};
moves["rook"] = {blocking: [], jumping: [], first:[]};
moves["bishop"] = {blocking: [], jumping: [], first:[]};
moves["queen"] = {blocking: [], jumping: [], first:[]};
moves["king"] = {blocking: [], jumping: [], first:[]};
moves["knight"] = {blocking: [], jumping: [], first:[]};


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
        moves[piece].blocking.forEach(element => {
            string += (element.x-8) + "," + (element.y-8) + "|";
        });
        string += "#"
        moves[piece].jumping.forEach(element => {
            string += (element.x-8) + "," + (element.y-8) + "|";
        });
        string += "#"
        moves[piece].first.forEach(element => {
            string += (element.x-8) + "," + (element.y-8) + "|";
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
        blockJumpFirstArray = allMoves.split('#');
        moves[piece].blocking = getMoves(blockJumpFirstArray[0]);
        moves[piece].jumping = getMoves(blockJumpFirstArray[1]);
        moves[piece].first = getMoves(blockJumpFirstArray[2]);
    });
    console.log(moves);
}

function load() {
    setRuleSet(prompt("Copy to a file, place in custom rules directory"));
    Canvas.drawBoard();
}

