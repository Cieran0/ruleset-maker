class MouseHandler {

    static getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return Position.norm(new Position(
            /*x:*/ evt.clientX - rect.left,
            /*y:*/ evt.clientY - rect.top
        ));
    }

    static handleMouse(mousePos) {
        if(mousePos.x == 8 && mousePos.y == 8) {
            nextPiece();
            Canvas.drawBoard();
            return;
        }

        if(contains(moves[selectedPiece].blocking,mousePos)) {
            moves[selectedPiece].blocking = moves[selectedPiece].blocking.filter(function (element) {
                return element.x != mousePos.x || element.y != mousePos.y;
            });
            moves[selectedPiece].jumping.push(mousePos);
        } else if(contains(moves[selectedPiece].jumping,mousePos)) {
            moves[selectedPiece].jumping = moves[selectedPiece].jumping.filter(function (element) {
                return element.x != mousePos.x || element.y != mousePos.y;
            });
            moves[selectedPiece].first.push(mousePos);
        }else if(contains(moves[selectedPiece].first,mousePos)) {
            moves[selectedPiece].first = moves[selectedPiece].first.filter(function (element) {
                return element.x != mousePos.x || element.y != mousePos.y;
            });
        } else {
            moves[selectedPiece].blocking.push(mousePos);
        }
        Canvas.drawBoard();
    }

    static setUpMouseEvent() {
        var canvas = document.getElementById("board");
        canvas.addEventListener("click", function (evt) {
            MouseHandler.handleMouse(MouseHandler.getMousePos(canvas, evt));
        }, false);
    }
}