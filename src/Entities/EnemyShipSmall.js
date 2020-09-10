import Phaser from 'phaser';
import Entity from './Entity';
import EnemyLaser from './EnemyLaser';

class EnemyShipSmall extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy0', 'GunShip');
    this.play('sprEnemy0');
    this.body.velocity.y = Phaser.Math.Between(150, 200);
    this.body.velocity.x = Phaser.Math.Between(-150, 150);
    this.shootTimer = this.scene.time.addEvent({
      delay: 300,
      callback: () => {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
          this.body.velocity.y,
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }

  update() {
    if (this.x > this.scene.game.config.width) {
      this.x = this.scene.game.config.width - 10;
      this.body.velocity.x = 0 - this.body.velocity.x;
    }
    if (this.x < 0) {
      this.x = 10;
      this.body.velocity.x = 0 - this.body.velocity.x;
    }
  }
}

export default EnemyShipSmall;