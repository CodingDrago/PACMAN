class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameStarted = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        // Fill 100% of viewport width and height
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.canvas.width = width;
        this.canvas.height = height;

        // Calculate individual tile width and height to cover full screen
        this.tileW = width / COLS;
        this.tileH = height / ROWS;

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
        const tw = this.tileW;
        const th = this.tileH;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let tile = MAP[r][c];
                let x = c * tw;
                let y = r * th;

                if (tile === WALL) {
                    this.drawWall(x, y, tw, th);
                } else if (tile === DOT) {
                    this.drawDot(x, y, tw, th);
                } else if (tile === POWER_PELLET) {
                    this.drawPowerPellet(x, y, tw, th);
                } else if (tile === DOOR) {
                    this.drawDoor(x, y, tw, th);
                }
            }
        }
    }

    drawWall(x, y, tw, th) {
        this.ctx.fillStyle = '#1919A6';
        this.ctx.fillRect(x, y, tw, th);

        this.ctx.strokeStyle = '#2828FF';
        this.ctx.lineWidth = Math.max(1, Math.min(tw, th) / 10);
        this.ctx.strokeRect(x + 0.5, y + 0.5, tw - 1, th - 1);
    }

    drawDoor(x, y, tw, th) {
        this.ctx.fillStyle = '#FFB8FF';
        this.ctx.fillRect(x, y + th / 2 - 2, tw, 4);
    }

    drawDot(x, y, tw, th) {
        const radius = Math.max(2, Math.min(tw, th) / 6);
        this.ctx.fillStyle = '#FFB8AE';
        this.ctx.beginPath();
        this.ctx.arc(x + tw / 2, y + th / 2, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPowerPellet(x, y, tw, th) {
        const radius = Math.max(5, Math.min(tw, th) / 3);
        this.ctx.fillStyle = '#FFB8AE';
        this.ctx.beginPath();
        this.ctx.arc(x + tw / 2, y + th / 2, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}