class PacMan {
  constructor(tileX, tileY) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.targetTileX = tileX;
    this.targetTileY = tileY;

    this.progress = 0;
    this.speed = 0.08; // 60fps smooth interpolation speed

    this.dirX = 0;
    this.dirY = 0;
    this.nextDirX = 0;
    this.nextDirY = 0;

    this.angle = 0;
    this.mouthAngle = 0.2;
    this.mouthSpeed = 0.025;

    this.updatePixelPosition();
  }

  updatePixelPosition() {
    const tw = window.TILE_W || 20;
    const th = window.TILE_H || 20;

    let startX = this.tileX * tw + tw / 2;
    let startY = this.tileY * th + th / 2;
    let endX = this.targetTileX * tw + tw / 2;
    let endY = this.targetTileY * th + th / 2;

    if (Math.abs(this.targetTileX - this.tileX) > 1) {
      if (this.dirX === -1) endX = startX - tw;
      else if (this.dirX === 1) endX = startX + tw;
    }

    this.x = startX + (endX - startX) * this.progress;
    this.y = startY + (endY - startY) * this.progress;
  }

  setDirection(dx, dy) {
    this.nextDirX = dx;
    this.nextDirY = dy;
  }

  canMove(fromX, fromY, dx, dy) {
    let targetX = fromX + dx;
    let targetY = fromY + dy;

    if (targetX < 0) targetX = COLS - 1;
    if (targetX >= COLS) targetX = 0;

    const tile = MAP[targetY][targetX];
    return tile !== WALL && tile !== DOOR;
  }

  update() {
    if (this.progress === 0) {
      // 1. Check buffered direction
      if (this.nextDirX !== 0 || this.nextDirY !== 0) {
        if (this.canMove(this.tileX, this.tileY, this.nextDirX, this.nextDirY)) {
          this.dirX = this.nextDirX;
          this.dirY = this.nextDirY;
        }
      }

      // 2. Check current direction
      if (this.canMove(this.tileX, this.tileY, this.dirX, this.dirY)) {
        this.targetTileX = this.tileX + this.dirX;
        this.targetTileY = this.tileY + this.dirY;

        if (this.targetTileX < 0) this.targetTileX = COLS - 1;
        if (this.targetTileX >= COLS) this.targetTileX = 0;

        this.progress += this.speed;
      } else {
        this.dirX = 0;
        this.dirY = 0;
      }
    } else {
      this.progress += this.speed;

      if (this.progress >= 1.0) {
        this.tileX = this.targetTileX;
        this.tileY = this.targetTileY;
        this.progress = 0;
      }
    }

    this.updatePixelPosition();

    // Facing direction
    if (this.dirX === 1) this.angle = 0;
    else if (this.dirX === -1) this.angle = Math.PI;
    else if (this.dirY === 1) this.angle = Math.PI / 2;
    else if (this.dirY === -1) this.angle = -Math.PI / 2;

    if (this.progress > 0) {
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
    const tw = window.TILE_W || 20;
    const th = window.TILE_H || 20;
    const radius = Math.min(tw, th) * 0.42;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

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