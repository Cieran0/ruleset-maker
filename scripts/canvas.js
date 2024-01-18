class Canvas {

    static ctx;

    static drawBoard() {
        var c = document.getElementById('board');
        this.ctx = c.getContext("2d");
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 800, 800);
        this.ctx.fillStyle = "#EE90EE";
        this.ctx.fill();
        for (let i = 0; i <17; i++) {
            this.drawLine(i);
        }
        moves[selectedPiece].moves.forEach(move => {
            const colour = colorCombinations[(move.first ? '1' : '0') + (move.taking ? '1' : '0') + (move.jumping ? '1' : '0') + (move.moving ? '1' : '0')];
            this.drawSquare(move.x,move.y,colour);
        });
        this.drawPiece(8,8,selectedPiece,"w");
        document.getElementById("turn").innerHTML = "Piece: " + selectedPiece;
    }
    
    static drawLine(y) {
        var start = (y%2 == 0)? 1 : 0;
        for (;start < 17; start+=2) {
            this.drawSquare(start,y, " #90EE90");
        }
    }
    
    static drawSquare(x, y, colour) {
        this.ctx.beginPath();
        this.ctx.rect(x*40, y*40, 40, 40);
        this.ctx.fillStyle = colour;
        this.ctx.fill();
    }

    static drawPiece(x,y,name,colour) {
        let str = colour + (name.toUpperCase());
        this.ctx.drawImage(document.getElementById(str), 40*x, 40*y, 40, 40)
    }
}