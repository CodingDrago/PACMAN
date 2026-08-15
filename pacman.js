class PacMan {
  constructor(tileX, tileY) {
    this.tileX = tileX;
    this.tileY = tileY;

    // Pixel position
    this.x = tileX * TILE_SIZE + TILE_SIZE / 2;
    this.y = tileY * TILE_SIZE + TILE_SIZE / 2;

    this.speed = 3; // Integer speed for clean grid alignment

    this.dirX = 0;
    this.dirY = 0;
    this.nextDirX = 0;
    this.nextDirY = 0;

    this.angle = 0;
    this.mouthAngle = 0.2;
    this.mouthSpeed = 0.025;
  }

  setDirection(dx, dy) {
    this.nextDirX = dx;
    this.nextDirY = dy;
  }

  canMove(dx, dy) {
    let targetX = this.tileX + dx;
    let targetY = this.tileY + dy;

    // Tunnel wrapping boundaries
    if (targetX < 0) targetX = COLS - 1;
    if (targetX >= COLS) targetX = 0;

    const tile = MAP[targetY][targetX];
    return tile !== WALL && tile !== DOOR;
  }

  update() {
    const tileCenterX = this.tileX * TILE_SIZE + TILE_SIZE / 2;
    const tileCenterY = this.tileY * TILE_SIZE + TILE_SIZE / 2;

    // Check if Pac-Man reached the center of the current tile
    const atCenter = (
      Math.abs(this.x - tileCenterX) < this.speed &&
      Math.abs(this.y - tileCenterY) < this.speed
    );

    if (atCenter) {
      // Snap exactly to center to avoid precision drift
      this.x = tileCenterX;
      this.y = tileCenterY;

      // Try applying buffered turn
      if (this.canMove(this.nextDirX, this.nextDirY)) {
        this.dirX = this.nextDirX;
        this.dirY = this.nextDirY;
      }

      // Check if current direction is blocked
      if (!this.canMove(this.dirX, this.dirY)) {
        this.dirX = 0;
        this.dirY = 0;
      }
    }

    // Move Pac-Man
    this.x += this.dirX * this.speed;
    this.y += this.dirY * this.speed;

    // Update current tile index
    this.tileX = Math.floor(this.x / TILE_SIZE);
    this.tileY = Math.floor(this.y / TILE_SIZE);

    // Tunnel wrapping
    if (this.x < 0) {
      this.x = COLS * TILE_SIZE;
      this.tileX = COLS - 1;
    } else if (this.x > COLS * TILE_SIZE) {
      this.x = 0;
      this.tileX = 0;
    }

    // Facing direction
    if (this.dirX === 1) this.angle = 0;
    else if (this.dirX === -1) this.angle = Math.PI;
    else if (this.dirY === 1) this.angle = Math.PI / 2;
    else if (this.dirY === -1) this.angle = -Math.PI / 2;

    // Animate mouth only while moving
    if (this.dirX !== 0 || this.dirY !== 0) {
      this.animateMouth();
    }
  }

  animateMouth() {
    this.mouthAngle += this.mouthSpeed;
    if (this.mouthAngle > 0.38 || this.mouthAngle < 0.03) {
      this.mouthSpeed = -this.mouthSpeed;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    const radius = TILE_SIZE * 0.42;

    ctx.fillStyle = '#FFD700';
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