import Phaser from 'phaser';
import Entity from './Entity';

class BonusLife extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.play('sprBonusLife');
    this.body.velocity.y = Phaser.Math.Between(10, 50);
    this.body.velocity.x = Phaser.Math.Between(-200, 200);
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

export default BonusLife;