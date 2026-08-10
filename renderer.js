class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Set canvas dimensions based on map size
        this.canvas.width = COLS * TILE_SIZE;
        this.canvas.height = ROWS * TILE_SIZE;
    }

    // Clear the canvas
    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw the entire map loop
    drawMap() {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let tile = MAP[r][c];
                let x = c * TILE_SIZE;
                let y = r * TILE_SIZE;

                if (tile === WALL) {
                    this.drawWall(x, y);
                } else if (tile === DOT) {
                    this.drawDot(x, y);
                } else if (tile === POWER_PELLET) {
                    this.drawPowerPellet(x, y);
                }
            }
        }
    }

    // Draw a blue wall block
    drawWall(x, y) {
        this.ctx.fillStyle = '#1a1aff'; // Classic neon blue
        this.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        // Inner border for a slightly rounded look
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
    }

    // Draw a standard dot
    drawDot(x, y) {
        this.ctx.fillStyle = '#FFB8AE'; // Peachy white color
        this.ctx.beginPath();
        // Center it in the tile, radius 3
        this.ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    // Draw a flashing power pellet
    drawPowerPellet(x, y) {
        this.ctx.fillStyle = '#FFB8AE';
        this.ctx.beginPath();
        // Center it in the tile, radius 7
        this.ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 7, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}