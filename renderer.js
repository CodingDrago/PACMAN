class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Auto adjust canvas resolution for high-DPI displays & mobile screens
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        // Determine maximum fitting tile size for screen dimensions
        const maxW = window.innerWidth * 0.95;
        const maxH = window.innerHeight * 0.88;

        this.tileSize = Math.floor(Math.min(maxW / COLS, maxH / ROWS));

        // Set actual resolution
        this.canvas.width = COLS * this.tileSize;
        this.canvas.height = ROWS * this.tileSize;

        // Re-render when resized
        this.render();
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
                }
            }
        }
    }

    drawWall(x, y, sz) {
        this.ctx.fillStyle = '#1a1aff';
        this.ctx.fillRect(x, y, sz, sz);
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = Math.max(1, sz / 10);
        this.ctx.strokeRect(x, y, sz, sz);
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