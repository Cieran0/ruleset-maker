class MouseHandler {

    static getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return Position.norm(new Position(
            /*x:*/ evt.clientX - rect.left,
            /*y:*/ evt.clientY - rect.top
        ));
    }

    static handleMouse(mousePos) {
        if(!moving && !taking)
            return;
        if(mousePos.x == 8 && mousePos.y == 8) {
            return;
        }
        
        moves[selectedPiece].moves = moves[selectedPiece].moves.filter((element) => {
            return element.x != mousePos.x || element.y != mousePos.y 
        });

        if(!clearing) {
            moves[selectedPiece].moves.push({
                x: mousePos.x,
                y: mousePos.y,
                moving: moving,
                jumping: jumping,
                taking: taking,
                first: first,
            });
        }

        Canvas.drawBoard();
    }

    static setUpMouseEvent() {

        var canvas = document.getElementById("board");
        canvas.addEventListener("mousemove", function (evt) {
            if (isMouseDown) {
                MouseHandler.handleMouse(MouseHandler.getMousePos(canvas, evt));
            }
        }, false);

        canvas.addEventListener("mousedown", function () {
            isMouseDown = true;
        }, false);
    
        canvas.addEventListener("mouseup", function () {
            isMouseDown = false;
        }, false);

        canvas.addEventListener("click", function (evt) {
            MouseHandler.mouseClick(MouseHandler.getMousePos(canvas, evt));
        }, false);
    }

    static mouseClick(mousePos) {
        if(mousePos.x == 8 && mousePos.y == 8) {
            nextPiece();
            Canvas.drawBoard();
            return;
        }
        this.handleMouse(mousePos);
    }
}
