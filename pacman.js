class PacMan {
    constructor(tileX, tileY) {
        // Starting tile coordinates
        this.tileX = tileX;
        this.tileY = tileY;

        // Pixel position (centered on tile)
        this.x = tileX * TILE_SIZE + TILE_SIZE / 2;
        this.y = tileY * TILE_SIZE + TILE_SIZE / 2;

        // Movement speed (pixels per frame)
        this.speed = 2.5;

        // Current movement direction (dx, dy)
        this.dirX = 0;
        this.dirY = 0;

        // Next direction buffer (enables smooth turning at intersections)
        this.nextDirX = 0;
        this.nextDirY = 0;

        // Rotation angle for drawing (0 = Right, Math.PI/2 = Down, Math.PI = Left, -Math.PI/2 = Up)
        this.angle = 0;

        // Mouth animation state
        this.mouthAngle = 0.2; // Mouth opening size (0 to 0.45)
        this.mouthSpeed = 0.02; // Speed of chomping animation
    }

    // Set next desired direction from keyboard input
    setDirection(dx, dy) {
        this.nextDirX = dx;
        this.nextDirY = dy;
    }

    // Check if Pac-Man is centered enough on a grid cell to make a turn
    isAlignedWithGrid() {
        const centerMargin = this.speed;
        const tileCenterX = this.tileX * TILE_SIZE + TILE_SIZE / 2;
        const tileCenterY = this.tileY * TILE_SIZE + TILE_SIZE / 2;

        return (
            Math.abs(this.x - tileCenterX) < centerMargin &&
            Math.abs(this.y - tileCenterY) < centerMargin
        );
    }

    // Snap position precisely to the tile center
    snapToGridCenter() {
        this.x = this.tileX * TILE_SIZE + TILE_SIZE / 2;
        this.y = this.tileY * TILE_SIZE + TILE_SIZE / 2;
    }

    // Check if target grid tile is walkable (not a wall)
    canMove(dx, dy) {
        let nextTileX = this.tileX + dx;
        let nextTileY = this.tileY + dy;

        // Handle side-tunnel wrapping checks
        if (nextTileX < 0) nextTileX = COLS - 1;
        if (nextTileX >= COLS) nextTileX = 0;

        const targetTile = MAP[nextTileY][nextTileX];
        return targetTile !== WALL && targetTile !== DOOR;
    }

    update() {
        // Current tile index based on pixel position
        this.tileX = Math.floor(this.x / TILE_SIZE);
        this.tileY = Math.floor(this.y / TILE_SIZE);

        // Try turning if aligned with grid center
        if (this.isAlignedWithGrid()) {
            if (this.canMove(this.nextDirX, this.nextDirY)) {
                this.dirX = this.nextDirX;
                this.dirY = this.nextDirY;
                this.snapToGridCenter();
            }
        }

        // Move in current direction if path is open
        if (this.canMove(this.dirX, this.dirY)) {
            this.x += this.dirX * this.speed;
            this.y += this.dirY * this.speed;

            // Animate mouth when moving
            this.animateMouth();
        } else {
            // Stop moving if hitting wall & snap to grid
            if (this.dirX !== 0 || this.dirY !== 0) {
                this.snapToGridCenter();
                this.dirX = 0;
                this.dirY = 0;
            }
        }

        // Side Tunnel Screen Wrapping (Warp from edge to edge)
        if (this.x < 0) {
            this.x = COLS * TILE_SIZE;
        } else if (this.x > COLS * TILE_SIZE) {
            this.x = 0;
        }

        // Update facing angle based on movement direction
        if (this.dirX === 1) this.angle = 0; // Right
        else if (this.dirX === -1) this.angle = Math.PI; // Left
        else if (this.dirY === 1) this.angle = Math.PI / 2; // Down
        else if (this.dirY === -1) this.angle = -Math.PI / 2; // Up
    }

    animateMouth() {
        this.mouthAngle += this.mouthSpeed;
        if (this.mouthAngle > 0.35 || this.mouthAngle < 0.02) {
            this.mouthSpeed = -this.mouthSpeed;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const radius = TILE_SIZE * 0.42;

        // Draw Pac-Man body with animated mouth wedge
        ctx.fillStyle = '#FFD700'; // Yellow
        ctx.beginPath();
        ctx.arc(
            0,
            0,
            radius,
            this.mouthAngle * Math.PI,
            (2 - this.mouthAngle) * Math.PI
        );
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
}