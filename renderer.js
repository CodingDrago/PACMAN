class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameStarted = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const maxW = window.innerWidth * 0.95;
        const maxH = window.innerHeight * 0.88;

        this.tileSize = Math.floor(Math.min(maxW / COLS, maxH / ROWS));

        this.canvas.width = COLS * this.tileSize;
        this.canvas.height = ROWS * this.tileSize;

        // Only render if game has actually started
        if (this.gameStarted) {
            this.render();
        }
    }

    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.clear();
        this.drawMap();
    }

    drawMap() {
        const sz = this.tileSize;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let tile = MAP[r][c];
                let x = c * sz;
                let y = r * sz;

                if (tile === WALL) {
                    this.drawWall(x, y, sz);
                } else if (tile === DOT) {
                    this.drawDot(x, y, sz);
                } else if (tile === POWER_PELLET) {
                    this.drawPowerPellet(x, y, sz);
                } else if (tile === DOOR) {
                    this.drawDoor(x, y, sz);
                }
            }
        }
    }

    drawWall(x, y, sz) {
        // Solid blue walls with subtle dark border
        this.ctx.fillStyle = '#1919A6';
        this.ctx.fillRect(x, y, sz, sz);

        // Light top/left highlight for 3D arcade look
        this.ctx.strokeStyle = '#2828FF';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x + 0.5, y + 0.5, sz - 1, sz - 1);
    }

    drawDoor(x, y, sz) {
        // Pink ghost house door line
        this.ctx.fillStyle = '#FFB8FF';
        this.ctx.fillRect(x, y + sz / 2 - 2, sz, 4);
    }

    drawDot(x, y, sz) {
        this.ctx.fillStyle = '#FFB8AE';
        this.ctx.beginPath();
        this.ctx.arc(x + sz / 2, y + sz / 2, Math.max(2, sz / 7), 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPowerPellet(x, y, sz) {
        this.ctx.fillStyle = '#FFB8AE';
        this.ctx.beginPath();
        this.ctx.arc(x + sz / 2, y + sz / 2, Math.max(4, sz / 3.2), 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}