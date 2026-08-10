class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameStarted = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const maxW = window.innerWidth * 0.98;
        const maxH = window.innerHeight * 0.96;

        // Calculate fixed pixel size per tile based on map dimensions
        window.TILE_SIZE = Math.floor(Math.min(maxW / COLS, maxH / ROWS));

        this.canvas.width = COLS * TILE_SIZE;
        this.canvas.height = ROWS * TILE_SIZE;

        if (this.gameStarted && window.game) {
            this.render(window.game.pacman);
        }
    }

    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(pacman = null) {
        this.clear();
        this.drawMap();

        // Draw Pac-Man if entity is active
        if (pacman) {
            pacman.draw(this.ctx);
        }
    }

    drawMap() {
        const sz = TILE_SIZE;
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
        this.ctx.fillStyle = '#1919A6';
        this.ctx.fillRect(x, y, sz, sz);
        this.ctx.strokeStyle = '#2828FF';
        this.ctx.lineWidth = Math.max(1, sz / 10);
        this.ctx.strokeRect(x + 0.5, y + 0.5, sz - 1, sz - 1);
    }

    drawDoor(x, y, sz) {
        this.ctx.fillStyle = '#FFB8FF';
        this.ctx.fillRect(x, y + sz / 2 - 2, sz, 4);
    }

    drawDot(x, y, sz) {
        this.ctx.fillStyle = '#FFB8AE';
        this.ctx.beginPath();
        this.ctx.arc(x + sz / 2, y + sz / 2, Math.max(2, sz / 6), 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPowerPellet(x, y, sz) {
        this.ctx.fillStyle = '#FFB8AE';
        this.ctx.beginPath();
        this.ctx.arc(x + sz / 2, y + sz / 2, Math.max(4, sz / 3), 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}